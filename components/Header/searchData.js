// Client-side dataset powering the header search suggestions.
// (Shell data — swap for a real search API later. Links point to existing routes.)

export const TOP_MANUFACTURERS = [
  { name: "Honeywell Aerospace", href: "/manufacturer/honeywell-aerospace/" },
  { name: "Boeing", href: "/manufacturer/boeing/" },
  { name: "Airbus", href: "/manufacturer/airbus/" },
  { name: "Collins Aerospace", href: "/manufacturer/collins-aerospace/" },
  { name: "Eaton Aerospace", href: "/manufacturer/eaton-aerospace/" },
  { name: "Parker Hannifin", href: "/manufacturer/parker-hannifin-corp/" },
  { name: "TE Connectivity", href: "/manufacturer/te-connectivity/" },
  { name: "Amphenol", href: "/manufacturer/amphenol/" },
  { name: "Texas Instruments", href: "/manufacturer/texas-instruments/" },
  { name: "Raytheon", href: "/manufacturer/raytheon/" },
  { name: "Molex", href: "/manufacturer/molex/" },
  { name: "ABB", href: "/manufacturer/abb/" },
  { name: "Andrew", href: "/manufacturer/andrew/" },
  { name: "Renesas Electronics", href: "/manufacturer/renesas-electronics-america/" },
];

export const POPULAR_PARTS = [
  { part: "3291186-6", mfr: "Honeywell Aerospace", href: "/rfq/honeywell-aerospace/3291186-6/" },
  { part: "CHO-BOND 1029", mfr: "Parker Hannifin", href: "/rfq/parker-hannifin-corp/cho-bond-1029/" },
  { part: "M30876MJ-XXXGP", mfr: "Renesas Electronics", href: "/rfq/renesas-electronics-america/m30876mj-xxxgp/" },
  { part: "ADTS-403", mfr: "Druck GE", href: "/avionics-test-equipment/rfq/druck-ge-gensing/adts-403/" },
  { part: "J3103", mfr: "ASUS Computer Intl", href: "/rfq/asus-computer-international/j3103/" },
  { part: "429EX", mfr: "BF Goodrich / JcAIR", href: "/avionics-test-equipment/rfq/bf-goodrich-jc-air/429ex/" },
  { part: "TMBXX-6517-A2M", mfr: "Andrew", href: "/rfq/andrew/tmbxx-6517-a2m/" },
  { part: "MIT115A5002", mfr: "Boeing", href: "/aircraft-maintenance-tooling/rfq/boeing/b737-all-series-tooling/mit115a5002/" },
  { part: "OD3X3-XXXXDD", mfr: "Motorola", href: "/rfq/motorola/od3x3-xxxxdd/" },
  { part: "390-611-501-0", mfr: "1st Choice Aerospace", href: "/aircraft-engine-parts/rfq/1st-choice-aerospace/cfm56-5b/390-611-501-0/" },
];

export const PART_TYPES = [
  { name: "Capacitors", href: "/part-types/electronics/capacitors/" },
  { name: "Relays", href: "/part-types/electronics/relays/" },
  { name: "Thin Film Resistors", href: "/part-types/electronics/thin-film-resistors-through-hole/" },
  { name: "Zero Ohm Jumpers", href: "/part-types/electronics/zero-ohm-jumpers/" },
  { name: "Circuit Breaker", href: "/part-types/aviation/circuit-breaker/" },
  { name: "Pressure Switch", href: "/part-types/aviation/pressure-switch/" },
  { name: "Starter Generator", href: "/part-types/aviation/starter-generator/" },
  { name: "Potentiometer", href: "/part-types/aviation/potentiometer/" },
  { name: "Reading Light", href: "/part-types/aviation/reading-light/" },
  { name: "Gasket", href: "/part-types/aviation/gasket/" },
  { name: "Kit Hose", href: "/part-types/aviation/kit-hose/" },
  { name: "LED", href: "/part-types/aviation/led/" },
  { name: "Bulkhead Unit", href: "/part-types/aviation/bulkhead-unit/" },
  { name: "Equipped Support", href: "/part-types/aviation/equipped-support/" },
];
