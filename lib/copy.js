// Page copy for the generated templates. Kept out of the components so the
// wording for 1,000+ catalog pages lives in one reviewable place — edit here and
// every page in that family updates.

import { titleize } from "./catalog";

export const FAMILY = {
  electronics: { label: "Electronics Parts", noun: "electronic", href: "/part-types/electronics/" },
  aviation: { label: "Aviation Parts", noun: "aviation", href: "/part-types/aviation/" },
  hardware: { label: "Hardware Parts", noun: "IT hardware", href: "/part-types/hardware/" },
};

/* ------------------------------------------------- category listing (§4.3) */

export function categoryIntro(family, category) {
  const name = titleize(category);
  const f = FAMILY[family];
  return `AFR Enterprises is a trusted source for ${name} ${f.noun} parts, and the catalog on this page compiles every part number we hold in this product category. Each line is stocked or sourceable through our vetted supply network, ships with full traceability, and quotes back within 15 minutes of your request.`;
}

export function categoryFaq(family, category) {
  const name = titleize(category);
  const f = FAMILY[family];
  return {
    title: `Frequently Asked Questions: ${name}`,
    items: [
      {
        q: `What are ${name} parts used for?`,
        a: `${name} components are specified across ${f.noun} assemblies where the build standard and documentation trail both have to hold up to audit. We supply them for new build, scheduled maintenance and AOG recovery alike.`,
      },
      {
        q: `Which part numbers are available under ${name}?`,
        a: `The table above lists the part numbers currently mapped to this category, with the manufacturer against each line. If the number you need isn't shown, send it through anyway. The catalogue is a subset of what we can source.`,
      },
      {
        q: `Who supplies your ${name} inventory?`,
        a: `Only vetted manufacturers and franchised distributors. We are AS9120B and ISO 9001:2015 certified, FAA AC 00-56B accredited and AS6081 certified for counterfeit avoidance, so every line is traceable to an approved source.`,
      },
      {
        q: `How is quality maintained on these parts?`,
        a: `Incoming inspection, document verification and, where the part calls for it, electronic test. Handling follows ANSI/ESD S20.20. Certificates travel with the shipment, and we keep the records on file for audit.`,
      },
      {
        q: `How do I buy ${name} parts from AFR Enterprises?`,
        a: `Click RFQ on any row, or send the part number, quantity and required date through the request form. A named specialist returns pricing, availability, condition and lead time in writing, normally within 15 minutes.`,
      },
      {
        q: `Do you supply obsolete or hard-to-find ${name} items?`,
        a: `Yes. Obsolete, end-of-life and long-lead ${f.noun} parts are a core part of what we do. Tell us the number and the deadline and we will tell you honestly whether we can hit it.`,
      },
    ],
  };
}

/* --------------------------------------------- manufacturer detail (§4.5) */

export function manufacturerIntro(slug) {
  const name = titleize(slug);
  return `Browse the ${name} part numbers held by AFR Enterprises. We supply ${name} components to airlines, MRO facilities, defense primes and industrial OEMs worldwide, with full traceability on every shipment and quotes back within 15 minutes.`;
}

/* -------------------------------------------------- RFQ part detail (§4.7) */

export function rfqFaq(part, mfr) {
  return {
    title: "Frequently Asked Questions",
    items: [
      {
        q: `Is part number ${part} in stock?`,
        a: `${part} is listed as available through our supply network. Submit the form above with your quantity and required date and we will confirm the exact on-hand position, condition and lead time in writing.`,
      },
      {
        q: `How quickly will I get a quote for ${part}?`,
        a: "Within 15 minutes during business hours, from a named specialist rather than an autoresponder. AOG requests are worked immediately on a desk staffed 24/7/365.",
      },
      {
        q: `What documentation ships with ${part}?`,
        a: "Certificate of conformance as standard, with trace documentation back to the approved source. Additional paperwork (test reports, material certs, ATA 106) on request at the time of quote.",
      },
      {
        q: `Can you supply alternates to ${part}?`,
        a: `Yes. If ${part} is obsolete or long-lead we will quote form-fit-function alternates alongside it and flag clearly which is which, so the substitution decision stays yours.`,
      },
      {
        q: `Do I need an account to order ${part}?`,
        a: "No. No account, no minimum order and no obligation to proceed. The specialist who quotes the part sees it through to shipment.",
      },
      {
        q: `Which conditions is ${part} offered in?`,
        a: "Factory New, New Surplus and Overhauled where applicable. Condition is stated explicitly on every quote. We never leave it ambiguous.",
      },
    ],
  };
}

/* ------------------------------------------------------- NSN leaves (§4.9) */

export function nsnIntro(nsn, item) {
  return `National Stock Number ${nsn} covers ${item.toLowerCase()} items held and sourced by AFR Enterprises. The part numbers, approved manufacturers and MIL-STD characteristic data mapped to this NSN are listed above. Submit an RFQ against any line for pricing and availability.`;
}

/* ------------------------------------------------ shared closing CTA block */

export const CTA = {
  title: "Need a quote on any of these part numbers?",
  body: "Send the part number, quantity and the date you need it by. A named specialist returns pricing, availability, condition and lead time in writing, normally inside 15 minutes. No account required.",
  href: "/straightrfq/",
  label: "Request a Quote",
};
