# AFR Enterprises — Deep Website Study & Template Reference

## Context

We are going to **redesign afrenterprises.com**. Per your direction, the first step (this document)
is a **deep study of the entire existing website** — every page, template, flow, and navigation
path — captured as a reference. Design and build come later: you'll create a **shell and hand it to
me page by page**, and this study is the shared understanding we'll work from when you do.

No existing codebase is present in the working directory (`/Users/zainab.idrees/Documents/AFR
Enterprises` is empty), so this study is based entirely on the **live site**, examined via full-page
browsing (visual + DOM) and content fetches of every distinct template.

---

## 1. What the business is

**AFR Enterprises** is a B2B **independent parts distributor**, owned/operated by **ASAP
Semiconductor LLC**. It sells three families of parts:

- **Electronic components** (resistors, capacitors, relays, switches, semiconductors…)
- **Aviation / aerospace parts** (circuit breakers, starter-generators, engine parts, tooling…)
- **IT hardware** (microprocessors, memory, networking, wireless…)

**The single most important fact for the redesign:** there is **no cart, no checkout, no prices, no
stock counts, and no product images**. Availability is shown only as **"Avl."** The entire site is a
**lead-generation engine** whose one conversion event is **submitting an RFQ (Request for Quote)**,
with a **"quote back within 15 minutes, 24/7×365"** promise. Every template's job is to route the
user to an RFQ.

**Positioning / trust is the whole value proposition.** These signals appear on essentially every
page and must remain first-class in any redesign:
- Certifications: **AS9120B**, **ISO 9001:2015**, **FAA AC 0056B**, **AS 6081:2012**, **ESD
  S20.20-2014**; **ASA** (Aviation Suppliers Association) membership
- **NO CHINA SOURCING pledge** (positioned as "the only independent distributor with" this pledge)
- **100% U.S.A. fulfillment** + export-compliance notice
- **CAGE code 6RE77** for government bids
- Charitable: **Intrepid Fallen Heroes Fund** support
- Confidentiality: "We will not share your information to any third parties"

---

## 2. Global chrome (present on every template)

**Top utility bar:** certifications callout ("AS9120B, ISO 9001:2015, and FAA AC 0056B Accredited") ·
24/7 phone `1-714-705-4780` (tel link) · `sales@afrenterprises.com` (mailto).

**Header / primary nav:**
- Logo "AFR ENTERPRISES — an ASAP Semiconductor website" → home
- **Global search** — a text box + a **mode dropdown** with six modes:
  **Part Number · Manufacturer · Part Type · NSN · NIIN · CAGE Code** + Search button
- **Main menu:** Home · Manufacturers · Electronics Parts · Aviation Parts · Hardware Parts ·
  **NSN Parts ▾** · **Aircraft Tooling ▾** · Blog · Contact Us · About Us · Sitemap
  - **NSN Parts** submenu → Parts By NIIN · Parts By FSC · Parts By NSN · Manufacturers · CAGE Code · Part Types
  - **Aircraft Tooling** submenu → Aircraft Engine Parts · Aircraft Maintenance Tooling · Aircraft Engine Baffle · Avionics Test Equipment
- **"QUICK QUOTE HERE"** primary CTA → `/straightrfq/`

**Breadcrumbs:** on every non-home template — `Home / <Section> / <Item>`.

**Repeated mid/lower-page stack (on nearly every page, in this order):**
1. **"Send Instant RFQ"** widget with a **"Get A Quote"** button (sidebar or inline)
2. **"BROWSE BY CATEGORIES"** — 3 grouped link-lists (Electronic Components / Aviation Components /
   IT Hardware Parts), ~10 links each
3. **"Complete Electronics and Aviation Parts Purchasing Platform"** marketing block
4. **Certifications & Memberships** badge wall + NO CHINA SOURCING / USA-fulfillment / Intrepid
   Fallen Heroes
5. **"Get In Touch"** card — address **1341 South Sunkist Street, Anaheim CA 92806**, email, phone
6. **"How are we Doing?"** survey prompt → "Take A Survey Now!" (links to asapsemi survey)

**Footer:** Company Information (Home, About Us, Quality, Electronics/Hardware/Aviation Parts, Blog,
Sitemap) · Policies (Privacy, Cookie, Conflict Minerals, Combating Human Trafficking) · Terms
(Customer / Supplier) · Quick Links (FAR & DFARS Flow Downs, Consignment Options) · We Accept
(Visa/MC/Discover/Amex) · Follow Us (Instagram, Twitter, Blog) · Browser-Extension downloads
(Chrome/Firefox/Edge) · independent-distributor legal disclaimer + anti-scraping notice · "Copyright
© 2026, ASAP Semiconductor LLC."

**Overlays:** cookie consent banner ("Yes, I Accept Cookies") · **exit-intent RFQ popup** →
`/straightrfq/?utm_source=popup&utm_medium=exit-intent` · floating chat widget · back-to-top.

**Note:** Many secondary links (Quality, Privacy Policy, Customer/Supplier T&C, Consignment,
FAR/DFARS, survey) point to the **parent site asapsemi.com**, not afrenterprises.com.

---

## 3. URL taxonomy

```
/                                            Home
/manufacturer/                               Manufacturer index (A–Z)
/manufacturer/{slug}/                         Manufacturer detail (paginated)
/manufacturer/{slug}/page-{N}/                 …pagination
/manufacturer/page-{letter}/                   …index "View All" per letter (page-0 = 0-9)
/part-types/{family}/                          Part-type landing (electronics|aviation|hardware)
/part-types/{family}/{category}/               Category listing (the core catalog table)
/rfq/{manufacturer}/{part}/                     RFQ part-detail (electronics/general)
/straightrfq/                                  Standalone master RFQ form
/partno-search?searchby={mode}&searchkey={q}    Search results (6 modes)
/nsn/nsn-parts/                                NSN index (grouped by first digit)
/nsn/nsn-parts/{13-digit}/                      NSN leaf (richest attribute data)
/nsn/niin-parts/            /nsn/niin-parts/{9-digit}/
/nsn/fscs/                  /nsn/fscs/{code}-{slug}/
/nsn/cage-codes/            /nsn/cage-codes/{code}/
/nsn/manufacturer/          /nsn/manufacturer/{slug}/
/nsn/part-types/            /nsn/part-types/{name}/
/nsn/rfq/{manufacturer}/{nsn-numeric}/{part}/   Canonical NSN RFQ URL
/aircraft-engine-parts/            .../rfq/{mfr}/{engine}/{part}/
/aircraft-maintenance-tooling/     .../rfq/{mfr}/{aircraft-series}/{part}/
/aircraft-engine-baffle/           .../rfq/{mfr}/{part}/
/avionics-test-equipment/          .../rfq/{mfr}/{part}/
/blog/   /blog/{post}/             /contact/   /aboutus/   /sitemap/   /cookie-policy/
```

Two leaf-URL styles: **numeric-only** (`/nsn/cage-codes/{code}/`, `/nsn/nsn-parts/{13-digit}/`) vs.
**code+slug** (`/nsn/fscs/{code}-{slug}/`, `/nsn/part-types/{name}/`).

---

## 4. Template-by-template reference

### 4.1 Home (`/`)
Hero (industrial PCB imagery, "Welcome to AFR Enterprises", "Explore Parts" CTA, carousel arrows) →
overlapping **Instant RFQ mini-form** (Part Number, Quantity, Email → "Instant RFQ", "quotes back
within 15 minutes") → **Client Industry Focus** 3 tiles (Electronics / Aviation / IT Hardware, each
"View More") → about paragraph → **BOM upload** ("Upload Your Parts List or BOM Here!") → **Browse By
Categories** carousels → **Recently Searched / Demanding Manufacturers / Frequently Searched Part
Types / Hot Stock Items / Most Searched Inventory** link clusters → Board-Level & Aerospace promo
blocks (each "Instant RFQ") → **Featured Electronic Components** carousel → Popular Manufacturers →
**Unique Value Proposition** (Cost Effective / Quick Search / Quality Assured / Free Delivery) →
certifications wall → contact + survey → footer.

### 4.2 Part-type landing (`/part-types/{family}/`)
Top-of-funnel SEO hub; **no parts table**. Blocks: breadcrumb → intro → **"Why Choose AFR"** 3-col
value props → **"How to Source"** 4 steps (Browse Catalog → Submit RFQ → Receive Quote → Complete
Order) → **A–Z browse index** (tabbed `0-9 / A-E / F-J / K-O / P-T / U-Z`, each expands to category
links + green "View All") → standard stack. Benefit-led H1s (e.g. "Browse Our Electronic Parts
Catalog", "Aviation Components Online Listing").

### 4.3 Category listing (`/part-types/{family}/{category}/`) — CORE CATALOG PAGE
Breadcrumb → intro (names category + 15-min RFQ promise) → **"{Category} Manufacturers List"**
(inline links to `/manufacturer/{slug}/`) → **"{Category} Part Numbers List"** table → **FAQ** (5–6
Q&A) → standard stack.
**Table columns:** `Part No.` (→ RFQ page) · `Manufacturer` · `Part Description` (often "NA") ·
`QTY` (always "Avl") · `RFQ` button. ~100–120 rows, **no faceted filter/sort**, little/no pagination.
Row/RFQ → `/rfq/{manufacturer-slug}/{part-slug}/`.

### 4.4 Manufacturer index (`/manufacturer/`)
Breadcrumb → intro → **A–Z alphabetical listing** (letter-range groups, plain text links, no
logos/counts) → "Search by Manufacturer Name" box → standard stack. Item → `/manufacturer/{slug}/`;
"View All" per letter → `/manufacturer/page-{letter}/`.

### 4.5 Manufacturer detail (`/manufacturer/{slug}/`)
Breadcrumb → intro → "Frequently Requested Part Numbers" + "Supported Product Types" → **parts
table** → pagination ("Displaying Page: 1 of N", `/manufacturer/{slug}/page-{N}/`) → standard stack.
No FAQ, no related-manufacturers block.
**Table columns:** `Part No.` (→ RFQ) · `Part Type` (often "NA") · `Part Description` · `QTY` (Avl) ·
`RFQ`. (Differs from category listing: this shows **Part Type** since the manufacturer is fixed;
category listing shows **Manufacturer** since the part type is fixed — two variants of one shared
table component.)

### 4.6 Search results (`/partno-search?searchby={mode}&searchkey={q}`)
Partial-match SERP. Breadcrumb `Home / Part Number Search / {q}` → H1 "Search Result For Part Number
{q}" → results list, each row: **Part Number · Manufacturer · Part-type spec** (e.g. TQFP, QFP100, or
status like "AVAILABLE"/"New & Original") **· Category** (Electronics/Aviation/…) **· RFQ** → sidebar
(Recently Viewed Parts, Send Instant RFQ, Browse by Categories). Six modes via `searchby`
(partno, mfg, parttype, nsn, niin, cagecode).

### 4.7 RFQ part-detail (`/rfq/{manufacturer}/{part}/`) — CONVERSION PAGE
Thin SEO landing pre-scoped to one part. Breadcrumb → headline "{PART} from {MFR} - RFQ Now" →
part metadata (**Part Number · Alternate P/N · Manufacturer**; part type sometimes; "ready-to-ship"
availability — **no price, no specs, no NSN cross-ref**) → "Congratulations… now available" copy →
**the universal RFQ form** (see 4.8) with Part Number/Manufacturer pre-filled → quotation disclaimer
→ BOM upload → **related parts** → **FAQ (6 Q&A)** → standard stack.

### 4.8 Standalone RFQ form (`/straightrfq/`) — THE MASTER FORM
The one form reused everywhere (standalone, part-detail, exit-intent popup, sidebar widgets).
Breadcrumb → "Get an Instant RFQ for Required Part Number" + confidentiality note → form → Recently
Viewed Parts + Browse by Categories → standard stack.
**Canonical field set:**
- Part-line block: **Part Number**, **Manufacturer**, **Part Type**, **Quantity (ea)** \*,
  **Target Price (ea) USD** (line-item inputs render via a JS/table widget — confirm exact markup
  when rebuilding; Part Number + Quantity are the primary line inputs, likely repeatable rows)
- **Need Parts By** \* (Immediate, Within 1/2/4/8 Weeks, Bid Only, End of Life Buy, AOG)
- **Company Type** \* (Government Agency, Manufacturer, Airlines/Charter Operator, Repair Station,
  Distributor/Reseller)
- **Country of End Use** \* (200+ countries; default "United States (USA)")
- **Contact:** Name \*, Company Name \*, Phone \*, Email \*, Comments
- **BOM upload** ("Upload Your Parts List or BOM Here!" + BROWSE)
- **Consent:** required T&C acknowledgement checkbox + optional email-marketing opt-in
- **CAPTCHA** (required) · single **SUBMIT** CTA
Trust: "* Required Fields Are Compulsory", "We Will Not Share Your Information To Any Third Parties".

### 4.9 NSN section
- **`/nsn/nsn-parts/`** — index grouped by NSN first digit (1–9), rows = part name + 13-digit NSN.
- **`/nsn/nsn-parts/{13-digit}/`** (NSN leaf, RICHEST DATA) — H1 "Browse NSN {n} {desc} Parts
  Catalog" (NSN in dashed + concatenated form) → Manufacturer's List → **Part Numbers table**
  (Part Number · Manufacturer · Item Name · RFQ) → **Characteristics table (MRC · Criteria ·
  Characteristic** — the MIL-STD attribute data, e.g. `ABHP | OVERALL LENGTH | 2.437 INCHES`) →
  Relevant Components (related NSNs). This structured attribute data is unique to this template and
  is a **key differentiator to preserve/expand**.
- **`/nsn/niin-parts/`** — single-column NIIN list (dashed + 9-digit); the "Quick RFQ Process" here
  is the one place stating condition options **Factory New / New Surplus / Overhauled**.
- **`/nsn/fscs/`** — FSG-grouped table (FSC Code · Description · **No. Of Parts**); leaf
  `/nsn/fscs/{code}-{slug}/` = parts in that class, table (Part Number · NSN · Item Name ·
  Manufacturer · QTY · RFQ), deep pagination (e.g. "1 of 3147"). Rows deep-link three ways
  (part→RFQ, NSN→NSN leaf, manufacturer→`/nsn/manufacturer/{slug}/`).
- **`/nsn/cage-codes/`** — directory (CAGE Code · Manufacturer, ~280 pages); leaf
  `/nsn/cage-codes/{code}/` = one manufacturer + **CAGE Details box** (Manufacturer, Address,
  Status, Type, CAO Code, ADP Code) + parts table (Part Number · Item Name · NSN · QTY · RFQ).
- **`/nsn/part-types/`** — A–Z link grid of stocked part-type names; leaf `/nsn/part-types/{name}/`.
- Canonical NSN RFQ URL: `/nsn/rfq/{manufacturer}/{nsn-numeric}/{part}/`.

### 4.10 Aircraft Tooling section
All four are **category/product-listing templates** (hero + intro + "how to request a quote" 2
methods + paginated 4-col table + standard stack). Table cols: **Part No. · Manufacturer/Engine ·
Description · RFQ**.
- **`/aircraft-engine-parts/`** — cols Part No. · Engine Number · Description · RFQ ("1 of 247").
- **`/aircraft-maintenance-tooling/`** — Part No. · Manufacturer · Description · RFQ ("1 of 62");
  deep RFQ URLs include aircraft series, e.g. `.../rfq/boeing/b747-all-series-tooling/{part}/`.
- **`/aircraft-engine-baffle/`** — Part No. · Manufacturer · Description · RFQ ("1 of 12").
- **`/avionics-test-equipment/`** — Part No. · Manufacturer · Description · RFQ ("1 of 32").

### 4.11 Informational & legal
- **About (`/aboutus/`)** — hero, value bullets, certifications grid, "What You Get", credentials,
  Get In Touch, survey. No inline form; CTAs → `/straightrfq/`.
- **Contact (`/contact/`)** — intro, address, **contact form** (Country \* default USA, name/email/
  phone/message + T&C note + CAPTCHA + SUBMIT — confirm the exact text fields against live DOM when
  rebuilding), certifications, Get In Touch. No map, no fax.
- **Blog (`/blog/`)** — active SEO blog (~25 pages of posts): full-width article cards
  (title/date/excerpt/"Read more"/share icons) + sidebar (Categories, Recent Blogs) + numbered
  pagination. Recent topics: decoding part numbers, NIIN/CAGE/NSN guides. No newsletter signup.
- **Sitemap (`/sitemap/`)** — grouped link directory mirroring footer + product taxonomy.
- **Cookie Policy (`/cookie-policy/`)** — static legal template (What are Cookies / how used / cookie
  types / withdraw consent / contact). Siblings: Privacy, Conflict Minerals, Human Trafficking
  (several hosted on asapsemi.com).

---

## 5. Key flows

1. **RFQ conversion (the core):** any entry point → `/rfq/{mfr}/{part}/` (or `/nsn/rfq/…`, or a
   tooling `/…/rfq/…`) → universal RFQ form → SUBMIT. Global fallback = `QUICK QUOTE HERE` →
   `/straightrfq/`. RFQ is offered **4–5 redundant ways per page** (header button, per-row RFQ,
   sidebar widget, exit-intent popup, inline links).
2. **Search:** header search (6 modes) → `/partno-search?searchby=…&searchkey=…` → results list →
   per-row RFQ.
3. **Browse / drill-down:** nav or landing → A–Z index → category/manufacturer listing table →
   part → RFQ. NSN drill-down goes 3–4 levels deep (index → group → code/NSN leaf → RFQ).

---

## 6. UX observations & redesign opportunities

*(Design is a later phase — captured here so nothing is lost.)*

- **Consolidate the RFQ component** — it's one form repeated 4–5×/page; rebuild once, reuse
  everywhere; reduce redundancy while keeping RFQ prominent.
- **Add search/filter/sort to catalog tables** — biggest gap: 100+ row tables and up to 247-page
  pagination with **no faceting** anywhere. Surface NSN/CAGE/part-type as filterable columns.
- **Unify the listing table** into one configurable component (category variant shows Manufacturer;
  manufacturer variant shows Part Type; NSN/tooling variants add NSN/Engine columns).
- **Honest quote-based UX** — no price/stock/images; QTY always "Avl", Description/Part-Type often
  "NA". Set expectations clearly; consider hiding empty columns.
- **Preserve & elevate trust signals** — certifications, NO CHINA SOURCING, USA fulfillment,
  15-minute promise (currently only surfaced on some pages — make it consistent), Intrepid Fallen
  Heroes.
- **Enrich thin part-detail pages** by joining part records to the NSN/CAGE/FSC/MRC data the site
  already holds (currently siloed).
- **Modernize dated styling** — justified paragraphs, dense navy/red Bootstrap-era layout, heavy
  repeated marketing stacks on every page → componentize and lighten.
- **Data-quality flag:** the catalog mixes aerospace hardware with commercial goods (e.g. Travelpro
  luggage) — categorization/messaging should account for this.

---

## 7. How we proceed

- **This document = the deep study you asked for.** It's the shared reference for the redesign.
- **Next:** you build the **shell** and hand it to me **page by page**. For each page you give me,
  I'll map it to the relevant template section above and design/build against this study.
- **Open items to confirm when we start building** (not blocking the study): exact line-item RFQ
  widget markup; the Contact form's precise text fields; whether the 15-minute SLA should be
  surfaced site-wide; whether NSN attribute data should be joined into part-detail pages.

### Verification
This study was validated directly against the live site: homepage, category listing (resistors),
manufacturer index + detail, RFQ part-detail, standalone RFQ form, and search results were inspected
visually and via DOM in-browser; part-type landings, NSN hubs + all four leaf types, all four
Aircraft Tooling listings, About/Contact/Blog/Sitemap/Cookie-Policy were fetched and analyzed. When
you provide a shell page, re-open the corresponding live URL to confirm any dynamic widget details
before implementing.
```
