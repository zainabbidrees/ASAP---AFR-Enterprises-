// Single source of truth for every accreditation, registration, membership and
// award AFR holds. Badge artwork lives in /public/logos/cert/. Order is
// deliberate: audited quality standards first, then registrations/memberships,
// then industry awards — so any component that truncates the list still leads
// with the credentials buyers actually gatekeep on. `name` is both the alt text
// and the hover tooltip, so it carries the badge for anyone who can't read the
// seal at rail size.
export const CERTS = [
  { file: "11",   name: "AS9120B / ISO 9001:2015 certified (ASACB)" },
  { file: "002",  name: "FAA AC 00-56B accredited company" },
  { file: "001",  name: "Aviation Suppliers Association (ASA) member" },
  { file: "13",   name: "AS6081 certified supplier for counterfeit avoidance" },
  { file: "12",   name: "ANSI/ESD S20.20 certified handling" },
  { file: "itar", name: "ITAR registered (International Traffic in Arms Regulations)" },
  { file: "14",   name: "NIST 800-171 compliant" },
  { file: "005",  name: "Defense Logistics Agency CAGE Code 6RE77" },
  { file: "006",  name: "National Business Aviation Association (NBAA) member" },
  { file: "008",  name: "Dun & Bradstreet D-U-N-S registered" },
  { file: "10",   name: "Visual Compliance (eCustoms) export screening" },
  { file: "004",  name: "Inc. 500 list of America's fastest-growing private companies" },
  { file: "16",   name: "Supply Chain Connect / PartsDirect Top Distributors 2025, Authorized" },
  { file: "17",   name: "Supply Chain Connect / PartsDirect Top Distributors 2026, Independent" },
  { file: "15",   name: "SourceToday / SourceESB Top Distributors 2020" },
  { file: "009",  name: "SourceToday / SourceESB Top Distributors 2018" },
];

export const certSrc = (file) => `/logos/cert/${file}.png`;
