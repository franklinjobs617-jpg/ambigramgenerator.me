"""Browser regression for the shared 2D generator.

Run against a local Next server with Python Playwright and Chromium available:
    BASE_URL=http://localhost:3100 python tests/test_generator2d_result_snapshot.py -v
Set CHROMIUM_PATH for a system Chromium or UX01_SCREENSHOTS to save evidence.
"""

import base64
import hashlib
import os
from pathlib import Path
import re
from tempfile import TemporaryDirectory
import unittest
from urllib.parse import urlsplit

from playwright.sync_api import expect, sync_playwright


BASE_URL = os.environ.get("BASE_URL", "http://localhost:3100").rstrip("/")
SITE = urlsplit(BASE_URL).netloc


class ResultSnapshotTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        playwright = sync_playwright().start()
        cls.addClassCleanup(playwright.stop)
        cls.browser = playwright.chromium.launch(executable_path=os.environ.get("CHROMIUM_PATH"))
        cls.addClassCleanup(cls.browser.close)

    def setUp(self):
        self.context = self.browser.new_context(accept_downloads=True, locale="en-US", reduced_motion="reduce")
        self.addCleanup(self.context.close)
        self.context.route("**/*", self.local_requests_only)
        self.page = self.context.new_page()

    @staticmethod
    def local_requests_only(route):
        url = urlsplit(route.request.url)
        if url.netloc == SITE or url.scheme == "data":
            route.continue_()
        else:
            route.abort()

    def open_tool(self, path="/"):
        response = self.page.goto(BASE_URL + path, wait_until="networkidle")
        self.assertTrue(response.ok, f"{path} returned HTTP {response.status}")
        self.tool = self.page.locator("#generator2d")
        self.word_a = self.tool.locator("#ambigenerator_word_1")
        self.word_b = self.tool.locator("#ambigenerator_word_2")
        self.style = self.tool.locator("#style_dropdown")
        italian = path == "/it" or path.startswith("/it/")
        self.generate = self.tool.get_by_role("button", name="Genera l’ambigramma" if italian else "Generate Two-Word")
        self.png = self.tool.get_by_role("link", name="Scarica PNG del risultato 1" if italian else "Download PNG").first
        self.image = self.tool.locator("#ambigrams img").first

    def enter_pair(self, first, second):
        self.word_a.fill(first)
        self.word_b.fill(second)

    def screenshot(self, name):
        directory = os.environ.get("UX01_SCREENSHOTS")
        if directory:
            folder = Path(directory)
            folder.mkdir(parents=True, exist_ok=True)
            self.tool.screenshot(path=str(folder / name), animations="disabled")

    def verify_saved_png(self, filename, keyboard=False):
        preview = self.image.get_attribute("src")
        self.assertTrue(preview.startswith("data:image/png;base64,"))
        dimensions = self.image.evaluate("async img => { await img.decode(); return [img.naturalWidth, img.naturalHeight]; }")
        with self.page.expect_download() as download_info:
            if keyboard:
                self.png.press("Enter")
            else:
                self.png.click()
        download = download_info.value
        self.assertEqual(download.suggested_filename, filename)
        with TemporaryDirectory() as directory:
            path = Path(directory) / filename
            download.save_as(path)
            data = path.read_bytes()
            self.assertTrue(data.startswith(b"\x89PNG\r\n\x1a\n"))
            self.assertEqual(data, base64.b64decode(preview.split(",", 1)[1]))
            reopened = self.context.new_page()
            try:
                # Decode bytes read from the saved file in a separate page, independent of the original preview.
                opened = reopened.evaluate("""async encoded => {
                    const bytes = Uint8Array.from(atob(encoded), byte => byte.charCodeAt(0));
                    const img = await createImageBitmap(new Blob([bytes], {type: 'image/png'}));
                    const canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0);
                    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
                    return {
                        size: [canvas.width, canvas.height],
                        hasInk: pixels.some((value, index) => index % 4 !== 3 && value < 128)
                    };
                }""", base64.b64encode(data).decode("ascii"))
            finally:
                reopened.close()
            self.assertEqual(opened["size"], dimensions)
            self.assertTrue(opened["hasInk"])
            print(f"{filename} {len(data)} bytes {dimensions[0]}x{dimensions[1]} SHA-256 {hashlib.sha256(data).hexdigest()}", flush=True)

    def test_edit_keeps_old_art_and_exports_both_batches(self):
        self.open_tool()
        self.enter_pair("LOVE", "PAIN")
        self.word_b.press("Enter")
        expect(self.png).to_have_attribute("download", "love-pain-1.png")
        expect(self.tool.get_by_role("link", name="Download PNG")).to_have_count(2)
        expect(self.image).to_be_visible()
        self.image.click()
        expect(self.tool.get_by_text("↑ PAIN", exact=True)).to_have_count(1)
        self.screenshot("generated-love-pain.png")
        original = self.image.get_attribute("src")

        self.enter_pair("EMMA", "NOAH")
        expect(self.image).to_have_attribute("src", original)
        self.screenshot("edited-emma-noah.png")
        self.assertEqual(self.png.get_attribute("download"), "love-pain-1.png", "Editing inputs renamed unchanged LOVE/PAIN pixels")
        expect(self.tool.get_by_text("↑ PAIN", exact=True)).to_have_count(1)
        expect(self.tool.get_by_text("Preview is from LOVE / PAIN", exact=False)).to_be_visible()
        self.verify_saved_png("love-pain-1.png")

        self.generate.click()
        expect(self.png).to_have_attribute("download", "emma-noah-1.png")
        expect(self.image).not_to_have_attribute("src", original)
        expect(self.tool.get_by_text("↑ EMMA", exact=True).first).to_be_visible()
        expect(self.image).to_have_css("transform", "matrix(1, 0, 0, 1, 0, 0)")
        expect(self.tool.get_by_text("Preview is from LOVE / PAIN", exact=False)).to_have_count(0)
        self.verify_saved_png("emma-noah-1.png")

    def test_style_swap_preset_invalid_and_dark_rotation(self):
        self.open_tool()
        self.generate.click()
        expect(self.png).to_have_attribute("download", "love-pain-1.png")
        original = self.image.get_attribute("src")

        self.style.select_option("calligraphy")
        expect(self.tool.get_by_text("Preview is from LOVE / PAIN", exact=False)).to_contain_text("Blocky")
        self.tool.get_by_role("button", name="Swap", exact=True).click()
        expect(self.word_a).to_have_value("pain")
        self.tool.get_by_role("button", name="noah / liam", exact=True).click()
        expect(self.word_b).to_have_value("liam")
        self.enter_pair("", "PAIN")
        self.generate.click()
        expect(self.tool.get_by_text("Please enter both words.")).to_be_visible()
        self.word_a.fill("!!!")
        self.generate.click()
        expect(self.tool.get_by_text("Please use only letters in each word.")).to_be_visible()
        self.word_a.fill("A" * 32)
        self.generate.click()
        expect(self.tool.get_by_text("No match found", exact=False)).to_be_visible()
        expect(self.png).to_have_attribute("download", "love-pain-1.png")
        expect(self.image).to_have_attribute("src", original)

        self.tool.get_by_role("button", name="love / pain", exact=True).click()
        self.generate.click()
        expect(self.tool.get_by_text("Preview: LOVE / PAIN", exact=False)).to_contain_text("Calligraphy")
        expect(self.image).not_to_have_attribute("src", original)
        self.tool.get_by_role("button", name="Dark Preview", exact=False).click()
        expect(self.image).to_have_css("filter", "invert(1)")
        rotate = self.tool.get_by_role("button", name="Rotate Ambigram result 1")
        rotate.focus()
        self.page.keyboard.press("Space")
        expect(self.image).to_have_css("transform", "matrix(-1, 0, 0, -1, 0, 0)")
        self.page.keyboard.press("Enter")
        expect(self.image).to_have_css("transform", "matrix(1, 0, 0, 1, 0, 0)")
        self.page.keyboard.press("Tab")
        expect(self.png).to_be_focused()

    def test_older_generation_cannot_overwrite_a_newer_one(self):
        self.verify_request_race("/")

    def test_italian_older_generation_cannot_overwrite_a_newer_one(self):
        self.verify_request_race("/it/two-word-ambigram-generator")

    def verify_request_race(self, path):
        self.open_tool(path)
        first_glyph = "/glyph%20images/new/l1.png"
        held = []

        def hold_first_glyph(route):
            if held:
                route.fallback()
            else:
                held.append(route)

        self.page.route(f"**{first_glyph}", hold_first_glyph)
        with self.page.expect_request(f"**{first_glyph}"):
            self.word_b.press("Enter")
        self.enter_pair("EMMA", "NOAH")
        self.word_b.press("Enter")
        expect(self.png).to_have_attribute("download", "emma-noah-1.png")
        new_art = self.image.get_attribute("src")
        self.assertEqual(len(held), 1)
        with self.page.expect_request_finished(lambda request: request.url.endswith(first_glyph)):
            held[0].continue_()
        self.page.wait_for_load_state("networkidle")
        expect(self.image).to_have_attribute("src", new_art)
        expect(self.generate).to_be_enabled()

    def test_hero_delay_respects_form_edits_and_captures_style(self):
        self.verify_hero_delay("/")

    def test_italian_hero_delay_respects_form_edits_and_captures_style(self):
        self.verify_hero_delay("/it")

    def verify_hero_delay(self, path):
        self.open_tool(path)
        self.generate.click()
        expect(self.png).to_have_attribute("download", "love-pain-1.png")
        old_art = self.image.get_attribute("src")
        hero_a = self.page.locator("#hero-word-a")
        hero_b = self.page.locator("#hero-word-b")
        italian = path == "/it"
        hero_generate = self.page.get_by_role("button", name="Crea un ambigramma 2D" if italian else "2D Tattoo Design", exact=False)
        hero_a.fill("EMMA")
        hero_b.fill("NOAH")
        self.page.evaluate("""() => {
            const setTimeout = window.setTimeout.bind(window);
            window.heldHeroTimer = null;
            window.setTimeout = (callback, delay, ...args) => {
                if (delay !== 100) return setTimeout(callback, delay, ...args);
                window.heldHeroTimer = () => callback(...args);
                return setTimeout(() => {}, 0);
            };
            window.releaseHeroTimer = () => {
                window.setTimeout = setTimeout;
                window.heldHeroTimer();
            };
        }""")
        hero_generate.click()
        expect(self.word_a).to_have_value("EMMA")
        self.page.wait_for_function("window.heldHeroTimer !== null")
        self.style.select_option("calligraphy")
        self.word_a.fill("ERIN")
        self.page.evaluate("window.releaseHeroTimer()")
        self.page.wait_for_load_state("networkidle")
        expect(self.png).to_have_attribute("download", "love-pain-1.png")
        expect(self.image).to_have_attribute("src", old_art)

        hero_a.fill("LOVE")
        hero_b.fill("PAIN")
        hero_generate.click()
        notice = "Anteprima" if italian else "Preview"
        expect(self.tool.get_by_text(f"{notice}: LOVE / PAIN", exact=False)).to_contain_text("Corsivo" if italian else "Calligraphy")
        expect(self.image).not_to_have_attribute("src", old_art)

    def test_shared_routes(self):
        for path in ("/two-word-ambigram-generator", "/ambigram-tattoo-generator", "/it"):
            with self.subTest(path=path):
                self.open_tool(path)
                self.generate.click()
                expect(self.png).to_have_attribute("download", "love-pain-1.png")
                self.enter_pair("EMMA", "NOAH")
                expect(self.png).to_have_attribute("download", "love-pain-1.png")
                notice = "L’anteprima mostra ancora" if path == "/it" else "Preview is from"
                expect(self.tool.get_by_text(f"{notice} LOVE / PAIN", exact=False)).to_be_visible()

    def test_italian_desktop_results_and_exports(self):
        self.page.set_viewport_size({"width": 1440, "height": 1120})
        self.open_tool("/it/two-word-ambigram-generator")
        labels = self.tool.get_by_role("group", name="Due nomi o parole")
        expect(labels.get_by_role("textbox", name="Primo nome o parola")).to_have_value("love")
        expect(labels.get_by_role("textbox", name="Secondo nome o parola")).to_have_value("pain")
        expect(self.word_a).to_have_accessible_description("Usa solo lettere dalla A alla Z, senza accenti, spazi o punteggiatura.")
        self.word_a.focus()
        self.page.keyboard.press("Tab")
        expect(self.word_b).to_be_focused()
        self.word_b.press("Enter")
        expect(self.tool.locator("#ambigrams img")).to_have_count(2)

        dark = self.tool.get_by_role("button", name="Sfondo scuro")
        dark.click()
        expect(dark).to_have_attribute("aria-pressed", "true")
        expect(self.image).to_have_css("filter", "invert(1)")
        self.page.keyboard.press("Tab")
        rotate = self.tool.get_by_role("button", name="Ruota di 180° l’anteprima 1")
        expect(rotate).to_be_focused()
        expect(rotate).to_have_css("outline-style", "solid")
        expect(rotate).to_have_accessible_description("Orientamento 0°. Si legge: LOVE.")
        self.page.keyboard.press("Space")
        expect(rotate).to_have_accessible_description("Orientamento 180°. Si legge: PAIN.")
        expect(self.image).to_have_css("transition-duration", "0s")
        expect(self.image).to_have_css("transform", "matrix(-1, 0, 0, -1, 0, 0)")
        expect(self.tool.get_by_role("button", name="Ruota di 180° l’anteprima 2")).to_have_attribute("aria-pressed", "false")
        self.page.keyboard.press("Tab")
        expect(self.png).to_be_focused()
        self.tool.evaluate("tool => window.scrollBy(0, tool.getBoundingClientRect().top - 95)")
        self.screenshot("it-desktop-results.png")
        original = self.image.get_attribute("src")

        self.enter_pair("EMMA", "NOAH")
        expect(self.tool.get_by_text("L’anteprima mostra ancora LOVE / PAIN · Stampatello.", exact=False)).to_be_visible()
        expect(self.image).to_have_attribute("src", original)
        self.verify_saved_png("love-pain-1.png", keyboard=True)
        expect(rotate).to_have_attribute("aria-pressed", "true")

        self.generate.click()
        expect(self.png).to_have_attribute("download", "emma-noah-1.png")
        expect(self.tool.locator("#ambigrams img")).to_have_count(6)
        expect(rotate).to_have_accessible_description("Orientamento 0°. Si legge: EMMA.")
        self.verify_saved_png("emma-noah-1.png")

        self.style.select_option("calligraphy")
        expect(self.tool.get_by_text("potrebbe funzionare", exact=False)).to_be_visible()
        self.generate.click()
        error = self.tool.get_by_role("alert")
        expect(error).to_contain_text("Nessuna corrispondenza per «emma» e «noah» con questo stile.")
        expect(self.tool.get_by_text("potrebbe funzionare", exact=False)).to_have_count(0)
        expect(self.png).to_have_attribute("download", "emma-noah-1.png")
        self.tool.get_by_role("button", name="Inverti l’ordine").click()
        expect(self.word_a).to_have_value("NOAH")
        self.tool.get_by_role("button", name="Usa love e pain").click()
        self.generate.click()
        expect(self.tool.get_by_text("Anteprima: LOVE / PAIN · Corsivo")).to_be_visible()
        expect(self.tool.locator("#ambigrams img")).to_have_count(1)
        expect(error).to_be_empty()

    def test_italian_validation_loading_and_recovery(self):
        self.open_tool("/it/two-word-ambigram-generator")
        error = self.tool.get_by_role("alert")
        self.enter_pair("", "")
        self.generate.click()
        expect(error).to_contain_text("in entrambi i campi")
        expect(self.word_a).to_be_focused()
        expect(self.word_a).to_have_attribute("aria-invalid", "true")
        expect(self.word_b).to_have_attribute("aria-invalid", "true")
        self.word_b.fill("NOAH")
        expect(self.word_b).not_to_have_attribute("aria-invalid", "true")
        expect(error).to_contain_text("in entrambi i campi")
        for first in ("NICCOLÒ", "!!!", "AN NA"):
            self.word_a.fill(first)
            self.generate.click()
            expect(error).to_contain_text("senza accenti, spazi o punteggiatura")
            expect(self.word_a).to_have_attribute("aria-describedby", "ambigram-pair-help ambigram-feedback")
            expect(self.word_b).to_have_value("NOAH")
        self.page.wait_for_timeout(4200)
        expect(error).to_be_visible()
        self.enter_pair("ABCDEFGHIJKLMNOPQRSTUVWXYZ", "NOAH")
        expect(self.tool.get_by_text("Prova ad abbreviare quella più lunga", exact=False)).to_be_visible()
        self.generate.click()
        expect(error).to_contain_text("22 lettere")

        first_glyph = "**/glyph%20images/new/l1.png"
        requests = []
        self.page.route(first_glyph, lambda route: requests.append(route))
        self.enter_pair("LOVE", "PAIN")
        with self.page.expect_request(first_glyph):
            self.word_b.press("Enter")
        loading = self.tool.get_by_role("button", name="Generazione in corso…")
        expect(loading).to_be_disabled()
        expect(loading.locator("svg")).to_have_css("animation-name", "none")
        self.word_b.press("Enter")
        self.word_b.press("Enter")
        self.page.wait_for_timeout(100)
        self.assertEqual(len(requests), 1)
        with self.page.expect_request_finished(lambda request: request.url.endswith("/glyph%20images/new/l1.png")):
            requests[0].continue_()
        self.page.unroute(first_glyph)
        expect(self.png).to_have_attribute("download", "love-pain-1.png")

        self.page.evaluate("""() => {
            const encode = HTMLCanvasElement.prototype.toDataURL;
            HTMLCanvasElement.prototype.toDataURL = function (...args) {
                HTMLCanvasElement.prototype.toDataURL = encode;
                throw new Error('Controlled PNG encoder error');
            };
        }""")
        self.generate.click()
        expect(error).to_contain_text("Si è verificato un errore durante la generazione. Riprova.")
        expect(self.png).to_have_attribute("download", "love-pain-1.png")
        self.generate.click()
        expect(error).to_be_empty()
        expect(self.tool.get_by_text("Anteprima: LOVE / PAIN · Stampatello")).to_be_visible()

    def test_italian_mobile_hero_and_guide_links(self):
        self.context = self.browser.new_context(
            accept_downloads=True, viewport={"width": 390, "height": 844}, is_mobile=True,
            has_touch=True, reduced_motion="reduce", locale="it-IT",
        )
        self.addCleanup(self.context.close)
        self.context.route("**/*", self.local_requests_only)
        self.page = self.context.new_page()
        self.open_tool("/it")
        hero_a = self.page.locator("#hero-word-a")
        hero_b = self.page.locator("#hero-word-b")
        expect(hero_a).to_have_accessible_name("Primo nome o parola")
        expect(hero_b).to_have_accessible_name("Secondo nome o parola")
        expect(hero_a).to_have_accessible_description(re.compile(r"LOVE.*HATE"))
        hero_button = self.page.get_by_role("button", name="Crea un ambigramma 2D", exact=True)
        hero_a.fill("NICCOLÒ")
        hero_b.fill("PAIN")
        hero_button.tap()
        expect(hero_a).to_be_focused()
        expect(self.page.locator("#hero-word-error")).to_contain_text("senza accenti")
        expect(self.word_a).to_have_value("love")
        hero_a.fill("")
        hero_b.fill("")
        hero_button.tap()
        expect(self.word_a).to_have_value("LOVE")
        expect(self.word_b).to_have_value("HATE")
        expect(self.word_a).to_be_focused()
        hero_a.fill("LOVE")
        hero_b.fill("PAIN")
        hero_button.tap()
        expect(self.png).to_have_attribute("download", "love-pain-1.png")
        rotate = self.tool.get_by_role("button", name="Ruota di 180° l’anteprima 1")
        rotate.tap()
        expect(rotate).to_have_attribute("aria-pressed", "true")
        self.screenshot("it-mobile-results.png")
        self.assertEqual(self.page.evaluate("document.documentElement.clientWidth"), 390)
        self.assertEqual(self.tool.evaluate("tool => tool.scrollWidth"), self.tool.evaluate("tool => tool.clientWidth"))
        ai = self.page.get_by_role("link", name="Scopri AI Tattoo", exact=True)
        expect(ai).to_have_attribute("href", "/it/ai-tattoo-generator")
        expect(self.page.get_by_text("È un servizio separato dai generatori di ambigrammi 2D e 3D.", exact=False)).to_be_visible()

        guide = "/it/ambigramma-con-due-nomi"
        target = "/it/two-word-ambigram-generator#two-word-tool"
        for index in range(3):
            self.page.goto(BASE_URL + guide, wait_until="networkidle")
            cta = self.page.locator(f'a[href="{target}"]').nth(index)
            expect(cta).to_have_text("Vai al generatore 2D" if index < 2 else "Crea un ambigramma 2D")
            cta.tap()
            expect(self.page).to_have_url(BASE_URL + target)
            expect(self.page.locator("html")).to_have_attribute("lang", "it")
            anchor = self.page.locator("#two-word-tool")
            expect(anchor).to_be_focused()
            expect(self.generate).to_be_visible()
            self.page.go_back()
            expect(self.page).to_have_url(BASE_URL + guide)

        self.open_tool("/it/two-word-ambigram-generator")
        self.page.get_by_role("link", name="Vai al generatore", exact=True).tap()
        expect(self.page).to_have_url(BASE_URL + target)
        expect(self.page.locator("#two-word-tool")).to_be_focused()

    def test_locale_smoke(self):
        errors = []
        self.page.on("console", lambda message: errors.append(message.text.splitlines()[0]) if "MISSING_MESSAGE" in message.text else None)
        for language in ("en", "fr", "de", "es", "it", "pt"):
            with self.subTest(language=language):
                self.context.clear_cookies()
                prefix = "" if language == "en" else f"/{language}"
                self.open_tool(prefix + "/two-word-ambigram-generator")
                expect(self.page.locator("html")).to_have_attribute("lang", language)
                self.generate.click()
                expect(self.png).to_have_attribute("download", "love-pain-1.png")
                self.word_b.fill("")
                self.generate.click()
                if language == "it":
                    expect(self.tool.get_by_role("alert")).to_contain_text("in entrambi i campi")
                else:
                    expect(self.tool.get_by_text("Please enter both words.")).to_be_visible()
                self.page.goto(BASE_URL + (prefix or "/"), wait_until="networkidle")
                expect(self.page.locator("html")).to_have_attribute("lang", language)
                expect(self.page.locator("#hero-word-a")).to_be_visible()
        self.assertEqual(errors, [])


if __name__ == "__main__":
    unittest.main()
