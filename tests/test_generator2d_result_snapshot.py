"""Browser regression for the shared 2D generator.

Run against a local Next server with Python Playwright and Chromium available:
    BASE_URL=http://localhost:3100 python tests/test_generator2d_result_snapshot.py -v
Set CHROMIUM_PATH for a system Chromium or UX01_SCREENSHOTS to save evidence.
"""

import base64
import hashlib
import os
from pathlib import Path
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
        self.generate = self.tool.get_by_role("button", name="Generate Two-Word")
        self.png = self.tool.get_by_role("link", name="Download PNG").first
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

    def verify_saved_png(self, filename):
        preview = self.image.get_attribute("src")
        self.assertTrue(preview.startswith("data:image/png;base64,"))
        dimensions = self.image.evaluate("async img => { await img.decode(); return [img.naturalWidth, img.naturalHeight]; }")
        with self.page.expect_download() as download_info:
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
        self.open_tool()
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
        self.open_tool()
        self.generate.click()
        expect(self.png).to_have_attribute("download", "love-pain-1.png")
        old_art = self.image.get_attribute("src")
        hero_a = self.page.get_by_placeholder("Word A", exact=True)
        hero_b = self.page.get_by_placeholder("Word B", exact=True)
        hero_generate = self.page.get_by_role("button", name="2D Tattoo Design", exact=False)
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
        expect(self.tool.get_by_text("Preview: LOVE / PAIN", exact=False)).to_contain_text("Calligraphy")
        expect(self.image).not_to_have_attribute("src", old_art)

    def test_shared_routes(self):
        for path in ("/two-word-ambigram-generator", "/ambigram-tattoo-generator", "/it"):
            with self.subTest(path=path):
                self.open_tool(path)
                self.generate.click()
                expect(self.png).to_have_attribute("download", "love-pain-1.png")
                self.enter_pair("EMMA", "NOAH")
                expect(self.png).to_have_attribute("download", "love-pain-1.png")
                expect(self.tool.get_by_text("Preview is from LOVE / PAIN", exact=False)).to_be_visible()


if __name__ == "__main__":
    unittest.main()
