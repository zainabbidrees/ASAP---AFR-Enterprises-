import "./globals.css";
import { Manrope } from "next/font/google";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import CookieBanner from "@/components/CookieBanner";

// Typography — Manrope drives the whole site (headings, body, eyebrows) via a
// single CSS variable, so every page inherits it. It's a variable font, so all
// the weights the design uses (400 body, 500 medium headings) load from one
// face. Exposed as --font-manrope and aliased to --font in globals.css.
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata = {
  title: "Electronic Parts Distributor and Supplier | AFR Enterprises",
  description:
    "AFR Enterprises — leading distributor of quality electronic components, aviation parts, and IT hardware. Instant RFQ with quotes back within 15 minutes, 24/7.",
};

// Root layout = the global chrome shared by every page (header, footer, overlays).
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={manrope.variable}>
      <body>
        <Header />
        <main id="content">{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
