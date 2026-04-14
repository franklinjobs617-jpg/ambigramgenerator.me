import { redirect } from "@/i18n/routing";

export default function PricingShortcutPage() {
  redirect({href: "/pricing", locale: "en"});
}
