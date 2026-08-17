import Link from "next/link";
import InnerSidebar from "@/components/Sidebar/InnerSidebar";
import styles from "./page.module.css";

export const metadata = {
  title: "CAGE Code Lookup & Verification Directory | AFR Enterprises",
  description:
    "Search and verify Commercial and Government Entity (CAGE) codes to identify certified aerospace, defense, and military equipment manufacturers.",
};

const cageHref = (code) => `/nsn/cage-codes/${code.toLowerCase()}/`;

// [CAGE Code, Manufacturer]
const ROWS = [
  ["08291", "General Electric Company"], ["1VZM8", "Newark Electronics Corporation"], ["26269", "U S Dynamics Corporation"],
  ["0LSG7", "Litton Systems Inc"], ["66028", "Latshaw Enterprises"], ["4CVM0", "National Refrigeration And Air"],
  ["09791", "Low Temp Industries Inc"], ["75497", "Lamson And Sessions Co"], ["82357", "Graham Paige Corp"],
  ["9R867", "Telemecanique Inc"], ["067X3", "Ibm Corp"], ["58889", "National Oilwell"], ["1QFG3", "Kraissl Company Inc"],
  ["6R666", "Hoerbiger Corp"], ["54331", "Monitor Products Co Inc"], ["97899", "Universal Mfg Corp"],
  ["ZW552", "Hastings Deering Corp"], ["U4494", "Eka Ltd"], ["57203", "Dixon Valve And Coupling Company"],
  ["2T637", "Remote Ocean Systems Inc"], ["78741", "Hitco Carbon Composites Inc"], ["55751", "Akorn Inc"],
  ["36513", "Atlas Polar Company Limited Dbahiab"], ["U0100", "Trelleborg Industrie Gmbh"], ["92196", "Universal Industries Inc"],
  ["41758", "O F Mossberg And Sons Incorporated"], ["51900", "Itt Corporation"], ["94198", "Bliss Electronics Corp"],
  ["64707", "National Fluid Seperators"], ["06967", "Jameson Llc"], ["23049", "Dart Container Of Michigan Llc"],
  ["10242", "Symetrics Industries Llc"], ["71700", "General Cable Industries Inc"], ["D0730", "Poeppelmann Gmbh And Co"],
  ["3J847", "Cpi Radant Technologies Division"], ["A222N", "Trelleborg Ersmark Ab"], ["D9524", "Man Diesel And Turbo Ltd"],
  ["09SP4", "Real Time Logic Inc"], ["05XC4", "Burkert Contromatic Ltd"], ["09448", "Hyperion Industries Inc"],
  ["19226", "Consolidated Aeronautics Corp"], ["0AZP3", "General Electric Company"], ["82343", "Engineering Laboratories Inc"],
  ["1LKZ0", "Dresser Industries Inc"], ["Z0ST5", "Keysight Technologies Inc"], ["9G070", "Detroit Flexible Metal Products"],
  ["54648", "Microsemi Corp"], ["07332", "Waukesha Bearings Ltd"], ["31408", "Arrow Pneumatics Inc"], ["19428", "Empire Abrasive Equipment Company"],
  ["0NUD3", "Bristol Myers Squibb Company"], ["06607", "Blanchat Machine Company Inc"], ["K2234", "Eastman Kodak Company"],
  ["6N299", "Agco Corp"], ["03GK1", "Andrew Canada Inc"], ["3C2U0", "J Line Pump Co"], ["08407", "Mirada Research And Manufacturing"],
  ["0BT76", "Pro Fab Inc"], ["2Y841", "Guardian Rivet And Fastner Inc"], ["0HVX9", "Parker Hannifin Corp"],
  ["U2253", "Schneider Electric Limited"], ["F8385", "E2v Semiconductors"], ["Z03T6", "Babcock Inc"], ["85046", "Fisher Controls Co Inc"],
  ["5BGG1", "Fairlead Integrated Power"], ["H6332", "Stanley Works Pty Ltd"], ["64054", "Spectrian"], ["8S013", "Belmont Equipment Corp"],
  ["12843", "Triangle Tool Co"], ["05624", "Ge Aviation Systems Llc"], ["4G580", "Micron Company Inc"], ["83624", "Uniroyal Inc"],
  ["3L9C9", "Western Industrial Parts Inc"], ["U0853", "Teddington Controls Ltd"], ["05896", "Uhrden Inc"], ["51267", "Imi Cornelius Inc"],
  ["71431", "A W Chesterton Company"], ["4LPM8", "Eaton Corp"], ["5G979", "Canadian Commercial Corp"], ["48804", "Steamgard Llc"],
  ["94227", "Scovill Fasteners Inc"], ["92439", "Babcock And Wilcox Co"], ["08649", "Wheelabrator Corp"], ["45225", "Service Solutions U S Llc"],
  ["02031", "Entwistle Company The"], ["0PF82", "Honeywell Control Systems Ltd"], ["U3965", "Wouter Witzel Ltd"], ["C7965", "Iss International Spares"],
  ["92053", "R And M Materials Handling Inc"], ["3D387", "Consolidated Electrical Distrubutors"], ["61606", "Treo Industries Inc"],
  ["42099", "Filtek Inc"], ["U7065", "L 3 Communications Corporation"], ["0RPT6", "Atlas Corp"], ["1K129", "C And D Batteries"],
  ["63017", "Concorde Battery Corporation"], ["0LD16", "Fasco Industries Corp"], ["0C0C7", "The Parvus Corporation"],
  ["97557", "Morton Machine Works Inc"], ["K0653", "Ultra Electronics Precision Air"],
];

const LEFT = ROWS.slice(0, 50);
const RIGHT = ROWS.slice(50);

function CageTable({ rows }) {
  return (
    <table className={styles.table}>
      <thead>
        <tr><th>CAGE Code</th><th>Manufacturer</th></tr>
      </thead>
      <tbody>
        {rows.map(([code, mfr]) => (
          <tr key={code}>
            <td><Link href={cageHref(code)}>{code}</Link></td>
            <td>{mfr}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function CageCodesPage() {
  return (
    <>
      <section className="section">
        <div className={`container ${styles.layout}`}>
          <div className={styles.main}>
            <h1 className="section-title section-title--left">CAGE Code Search Directory</h1>
            <p className={styles.intro}>Search and verify Commercial and Government Entity CAGE codes to identify certified aerospace, defense, and military equipment manufacturers.</p>

            <h2 className={styles.blockTitle}>What is a CAGE Code?</h2>
            <p className={styles.intro}>A Commercial and Government Entity CAGE Code is a unique five character alphanumeric identifier assigned by the Defense Logistics Agency DLA. It is used across the Department of Defense DoD, NASA, and NATO to standardize facility and manufacturer identification in government procurement.</p>

            <h2 className={styles.blockTitle}>How to Search and Cross Reference CAGE Codes</h2>
            <p className={styles.intro}>AFR Enterprises provides multi level cross referencing across aerospace and defense hardware databases. Search our catalog to link:</p>
            <ul className={styles.bullets}>
              <li>CAGE Codes (5 character entity identifier)</li>
              <li>National Stock Numbers / NSNs (13 digit supply classification)</li>
              <li>National Item Identification Numbers / NIINs (9 digit item code)</li>
              <li>Manufacturer Part Numbers / MPNs (Original OEM designation)</li>
            </ul>

            <h2 className={styles.blockTitle}>Why Choose AFR Enterprises?</h2>
            <p className={styles.intro}>As a purchasing platform owned and operated by ASAP Semiconductor, <Link href="/">AFR Enterprises</Link> simplifies component sourcing for AOG emergency maintenance, defense contracts, and commercial aviation procurement.</p>
            <ul className={styles.bullets}>
              <li>Certified Quality Management: Operations comply with strict AS9120B, ISO 9001:2015, and FAA AC 00-56B standards.</li>
              <li>Supply Chain Integrity: We source exclusively through vetted OEMs and authorized distributors.</li>
              <li>Full Traceability: Every shipped order includes complete documentation, including Certificates of Conformance CoC and manufacturer traceability.</li>
              <li>Fast Response: Our 24/7 procurement team provides custom quotes within 15 minutes of receiving an RFQ.</li>
            </ul>

            {/* Pagination */}
            <div className={styles.pager}>
              <span className={styles.displaying}>Displaying Page: 1 of 280</span>
              <div className={styles.pages}>
                <span className={styles.pageArrow} aria-hidden="true">&laquo;</span>
                <span className={`${styles.page} ${styles.pageActive}`} aria-current="page">1</span>
                {[2, 3, 4, 5, 6, 7, 8].map((p) => (
                  <Link key={p} href={`/nsn/cage-codes/page-${p}/`} className={styles.page}>{p}</Link>
                ))}
                <Link href="/nsn/cage-codes/page-2/" className={styles.pageArrow} aria-label="Next">&raquo;</Link>
              </div>
            </div>

            {/* Two-column directory */}
            <div className={styles.tables}>
              <CageTable rows={LEFT} />
              <CageTable rows={RIGHT} />
            </div>
          </div>

          <InnerSidebar />
        </div>
      </section>
    </>
  );
}
