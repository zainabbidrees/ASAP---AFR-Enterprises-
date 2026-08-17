import Link from "next/link";
import InnerSidebar from "@/components/Sidebar/InnerSidebar";
import styles from "./page.module.css";

export const metadata = {
  title: "Federal Supply Group (FSG) & FSC Lookup | AFR Enterprises",
  description:
    "Browse parts by Federal Supply Group (FSG) and Federal Supply Class (FSC). AFR Enterprises lists FSC codes with part counts and fast 15-minute RFQs.",
};

// FSC leaf href derives from code + a slug of the description.
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
const fscHref = (code, desc) => `/nsn/fscs/${code}-${slug(desc)}/`;

// [code, description, No. Of Parts]
const GROUPS = [
  { g: "FSG 15", name: "Aircraft and Airframe Structural Components", r: [
    ["1560", "Airframe Structural Components", "278355"] ] },
  { g: "FSG 16", name: "Aircraft Components and Accessories", r: [
    ["1610", "Aircraft Propellers and Components", "4132"],
    ["1615", "Helicopter Rotor Blades Drive Mechanisms and Components", "12982"],
    ["1620", "Aircraft Landing Gear Components", "19485"],
    ["1630", "Aircraft Wheel and Brake Systems", "9422"],
    ["1650", "Aircraft Hydraulic Vacuum and De-icing System Components", "46842"],
    ["1660", "Aircraft Air Conditioning Heating and Pressurizing Equipment", "34083"],
    ["1670", "Parachutes Aerial Pick Up Delivery and Recovery Systems and Tie Down Equipment", "6866"],
    ["1680", "Miscellaneous Aircraft Accessories Components", "115331"] ] },
  { g: "FSG 20", name: "Ship and Marine Equipment", r: [
    ["2010", "Ship and Boat Propulsion Components", "5393"],
    ["2020", "Rigging and Rigging Gear", "71"],
    ["2030", "Deck Machinery", "2265"],
    ["2040", "Marine Hardware and Hull Items", "4555"],
    ["2050", "Buoys", "17"],
    ["2090", "Miscellaneous Ship and Marine Equipment", "1727"] ] },
  { g: "FSG 25", name: "Vehicular Equipment Components", r: [
    ["2510", "Vehicular Cab Body and Frame Structural Components", "37824"],
    ["2520", "Vehicle Power Transmission Components", "58609"],
    ["2530", "Vehicular Brake Steering Axle Wheel and Track Components", "83218"],
    ["2540", "Vehicle Furniture and Accessories", "48370"],
    ["2590", "Miscellaneous Vehicular Components", "37236"] ] },
  { g: "FSG 26", name: "Tires and Tubes", r: [
    ["2610", "Tires and Tubes Pneumatic Except Aircraft", "3197"],
    ["2620", "Tires and Tubes Pneumatic Aircraft", "946"],
    ["2630", "Tires Solid and Cushion", "229"],
    ["2640", "Tire Rebuilding and Tire and Tube Repair Materials", "1554"] ] },
  { g: "FSG 28", name: "Engines Turbines and Components", r: [
    ["2805", "Gasoline Reciprocating Engines Except Aircraft and Components", "35537"],
    ["2810", "Gasoline Reciprocating Engines Aircraft Prime Mover and Components", "8526"],
    ["2815", "Diesel Engines and Components", "55439"],
    ["2820", "Steam Engines Reciprocating and Components", "381"],
    ["2825", "Steam Turbines and Components", "45436"],
    ["2830", "Water Turbines Water Wheels and Components", "6"],
    ["2835", "Gas Turbines and Jet Engines Non-Aircraft Prime Mover Aircraft Non-Prime Mover and Components", "17404"],
    ["2840", "Gas Turbines and Jet Engines Aircraft Prime Moving and Components", "70628"],
    ["2850", "Gasoline Rotary Engines and Components", "23"],
    ["2895", "Miscellaneous Engines and Components", "638"] ] },
  { g: "FSG 29", name: "Engine Accessories", r: [
    ["2910", "Engine Fuel System Components Nonaircraft", "47185"],
    ["2915", "Engine Fuel System Components Aircraft and Missile Prime Movers", "39466"],
    ["2920", "Engine Electrical System Components Nonaircraft", "41106"],
    ["2925", "Engine Electrical System Components Aircraft Prime Moving", "8136"],
    ["2930", "Engine Cooling System Components Nonaircraft", "20728"],
    ["2935", "Engine System Cooling Components Aircraft Prime Moving", "1698"],
    ["2940", "Engine Air and Oil Filters Strainers and Cleaners Nonaircraft", "23605"],
    ["2945", "Engine Air and Oil Filters Cleaners Aircraft Prime Moving", "2390"],
    ["2950", "Turbosupercharger and Components", "2392"],
    ["2990", "Miscellaneous Engine Accessories Nonaircraft", "34520"],
    ["2995", "Miscellaneous Engine Accessories Aircraft", "12993"] ] },
  { g: "FSG 30", name: "Mechanical Power Transmission Equipment", r: [
    ["3010", "Torque Converters and Speed Changers", "41359"],
    ["3020", "Gear Pulley Sprocket and Transmission Chain", "118426"],
    ["3030", "Belting Drive Belts Fan Belts and Accessories", "28831"],
    ["3040", "Miscellaneous Power Transmission Equipment", "170136"] ] },
  { g: "FSG 31", name: "Bearings", r: [
    ["3110", "Bearings Antifriction Unmounted", "208829"],
    ["3120", "Bearings Plain Unmounted", "187457"],
    ["3130", "Bearings Mounted", "14098"] ] },
  { g: "FSG 32", name: "Woodworking Machinery and Equipment", r: [
    ["3210", "Sawmill and Planing Mill Machinery", "18"],
    ["3220", "Woodworking Machines", "553"],
    ["3230", "Tools Attachments for Woodwork Machinery", "540"] ] },
  { g: "FSG 34", name: "Metalworking Machinery", r: [
    ["3405", "Saws and Filing Machines", "127"],
    ["3408", "Machining Centers and Way Type Machines", "11"],
    ["3410", "Electrical and Ultrasonic Erosion Machines", "1"],
    ["3411", "Boring Machines", "10"],
    ["3413", "Drilling and Tapping Machines", "173"],
    ["3415", "Grinding Machines", "265"],
    ["3417", "Milling Machines", "60"],
    ["3418", "Planers and Shapers", "3"],
    ["3419", "Miscellaneous Machine Tools", "91"],
    ["3422", "Rolling Mills and Drawing Machines", "5"],
    ["3424", "Metal Heat Treating and Non-Thermal Treating Equipment", "61"],
    ["3426", "Metal Finishing Equipment", "66"],
    ["3431", "Electric Arc Welding Equipment", "1030"],
    ["3432", "Electric Resistance Welding Equipment", "62"],
    ["3433", "Gas Welding Heat Cutting and Metalizing Equipment", "819"],
    ["3436", "Welding Positioners and Manipulators", "35"],
    ["3438", "Miscellaneous Welding Equipment", "34"],
    ["3439", "Miscellaneous Welding Soldering and Brazing Supplies and Accessories", "3463"],
    ["3441", "Bending and Forming Machines", "180"],
    ["3442", "Hydraulic and Pneumatic Presses Power Driven", "43"],
    ["3443", "Mechanical Presses Power Driven", "14"],
    ["3444", "Manual Presses", "51"],
    ["3445", "Punching and Shearing Machines", "58"],
    ["3446", "Forging Machinery and Hammers", "15"],
    ["3447", "Wire and Metal Ribbon Forming Machines", "1"],
    ["3448", "Riveting Machines", "36"],
    ["3449", "Miscellaneous Secondary Metal Forming and Cutting Machines", "20"],
    ["3450", "Machine Tools Portable", "82"],
    ["3455", "Cutting Tools for Machine Tools", "7336"],
    ["3456", "Cutting and Forming Tools for Secondary Metalworking Machinery", "144"],
    ["3460", "Machine Tool accessories", "1699"],
    ["3461", "Accessories for Secondary Metalworking Machinery", "2"],
    ["3465", "Production Jigs Fixtures and Template", "612"],
    ["3470", "Machine Shop Sets Kits and Outfits", "9"] ] },
  { g: "FSG 36", name: "Special Industry Machinery", r: [
    ["3610", "Printing Duplicating and Bookbind Equipment", "4258"],
    ["3615", "Pulp and Paper Industries Machinery", "1"],
    ["3620", "Rubber and Plastics Working Machinery", "4"],
    ["3625", "Textile Industries Machinery", "2"],
    ["3630", "Clay and Concrete Products Industries Machinery", "53"],
    ["3655", "Gas Generating and Dispensing Systems Fixed or Mobile", "899"],
    ["3660", "Industrial Size Reduction Machinery", "1"],
    ["3670", "Specialized Semiconductor Microcircuit and Printed Circuit Board Manufacturing Machinery", "33"],
    ["3680", "Foundry Machine Related Equipment and Supplies", "14"],
    ["3685", "Specialized Metal Container Manufacturing Machinery and Related Equipment", "1"],
    ["3693", "Industrial Assembly Machines", "9"],
    ["3694", "Clean Work Stations Controlled Environment and Related Equipment", "22"],
    ["3695", "Miscellaneous Special Industry Machinery", "202"] ] },
  { g: "FSG 37", name: "Agricultural Machinery and Equipment", r: [
    ["3710", "Soil Preparation Equipment", "19"],
    ["3720", "Harvesting Equipment", "5"],
    ["3740", "Pest Disease and Frost Control Equipment", "63"],
    ["3750", "Gardening Implements and Tools", "97"],
    ["3770", "Saddlery Hamess Whips and Furnishing", "2"] ] },
  { g: "FSG 39", name: "Materials Handling Equipment", r: [
    ["3910", "Conveyors", "499"],
    ["3915", "Materials Feeders", "3"],
    ["3920", "Material Handling Equipment Nonself-Propelled", "307"],
    ["3930", "Warehouse Trucks and Tractors Self-Propelled", "1764"],
    ["3940", "Blocks Tackle Rigging and Slings", "930"],
    ["3950", "Winches Hoists Cranes and Derricks", "3820"],
    ["3960", "Freight Elevators", "1123"],
    ["3990", "Miscellaneous Materials Handling Equipment", "901"] ] },
  { g: "FSG 40", name: "Rope Cable Chain and Fittings", r: [
    ["4010", "Chain and Wire Rope", "7499"],
    ["4020", "Fiber Rope Cordage and Twine", "567"],
    ["4030", "Fittings for Rope Cable and Chain", "3307"] ] },
  { g: "FSG 41", name: "Refrigeration Air Conditioning and Air Circulating Equipment", r: [
    ["4110", "Refrigeration Equipment", "761"],
    ["4120", "Air Conditioning Equipment", "152"],
    ["4130", "Refrigeration and Air Condition Components", "7688"],
    ["4150", "Vortex Tubes and Other Related Cooling Tubes", "1"] ] },
  { g: "FSG 42", name: "Fire Fighting Rescue and Safety Equipment", r: [
    ["4235", "Hazardous Material Spill Containment and Clean up Equipment and Material", "35"],
    ["4250", "Recycling and Reclamation Equipment", "102"] ] },
  { g: "FSG 47", name: "Pipe Tubing Hose and Fittings", r: [
    ["4710", "Pipe Tube and Rigid Tubing", "107575"],
    ["4720", "Hose and Flexible Tubing", "203854"],
    ["4730", "Hose Pipe Tube Lubrication and Railing Fittings", "374474"] ] },
  { g: "FSG 48", name: "Valves", r: [
    ["4810", "Valves Powered", "59952"],
    ["4820", "Valves Nonpowered", "325912"] ] },
  { g: "FSG 51", name: "Hand Tools", r: [
    ["5110", "Hand Tools Edged Nonpowered", "2780"],
    ["5120", "Hand Tools Nonedged Nonpowered", "40901"],
    ["5130", "Hand Tools Power Driven", "5502"],
    ["5133", "Drill Bits Counterbores and Sinks", "6475"],
    ["5136", "Taps Dies and Collets Hand and Machine", "351"],
    ["5140", "Tool and Hardware Boxes", "186"],
    ["5180", "Sets Kits and Outfits of Hand Tools", "430"] ] },
  { g: "FSG 52", name: "Measuring Tools", r: [
    ["5210", "measuring Tools Craftsmens", "11921"],
    ["5220", "Inspection Gages and Precision Layout Tools", "10329"],
    ["5280", "Sets Kits and Outfits of Measuring Tools", "440"] ] },
  { g: "FSG 53", name: "Hardware and Abrasives", r: [
    ["5305", "Screws", "365202"],
    ["5306", "Bolts", "179522"],
    ["5307", "Studs", "40840"],
    ["5310", "Nuts and Washers", "352708"],
    ["5315", "Nails Machine Keys and Pins", "158766"],
    ["5320", "Rivets", "214038"],
    ["5325", "Fastening Devices", "112191"],
    ["5330", "Packing and Gasket Materials", "448389"],
    ["5335", "Metal Screening", "962"],
    ["5340", "Hardware Commercial", "368638"],
    ["5345", "Disks and Stones Abrasive", "4098"],
    ["5350", "Abrasive Materials", "2244"],
    ["5355", "Knobs and Pointers", "38184"],
    ["5360", "Coil Flat and Wire Springs", "157752"],
    ["5365", "Bushings Rings Shims and Spacers", "204847"] ] },
  { g: "FSG 55", name: "Lumber Millwork Plywood and Veneer", r: [
    ["5510", "Lumber and Related Basic Wood Materials", "116"],
    ["5520", "Millwork", "34"],
    ["5530", "Plywood and Veneer", "31"] ] },
  { g: "FSG 59", name: "Electrical and Electronic Equipment Components", r: [
    ["5905", "Resistors", "377321"],
    ["5910", "Capacitors", "250278"],
    ["5915", "Filters and Networks", "65001"],
    ["5920", "Fuses Arresters Absorbers and Protector", "20261"],
    ["5925", "Circuit Breakers", "48375"],
    ["5930", "Switches", "274336"],
    ["5935", "Connectors Electrical", "440556"],
    ["5940", "Lugs Terminals and Terminal Strips", "92049"],
    ["5945", "Relays and Solenoids", "107002"],
    ["5950", "Coils and Transformers", "228011"],
    ["5955", "Oscillators Piezoelectric Crystals", "38605"],
    ["5960", "Electron Tubes and Associated Hardware", "18709"],
    ["5961", "Semiconductor Devices and Associated Hardware", "157312"],
    ["5962", "Microcircuits Electronic", "310529"],
    ["5963", "Electronic Modules", "8038"],
    ["5965", "Headset Handset Microphone and Speak", "12845"],
    ["5970", "Electrical Insulators and Insulating Materials", "61375"],
    ["5975", "Electrical Hardware and Supplies", "70259"],
    ["5977", "Electrical Contact Brushes and Electrodes", "20398"],
    ["5980", "Optoelectrical Devices and Associated Hardware", "14417"],
    ["5985", "Antennas Waveguides and Related Equipment", "117979"],
    ["5990", "Synchros and Resolvers", "9883"],
    ["5995", "Cable Cord Wire Assembly Communications Equipment", "174334"],
    ["5998", "Electrical and Electronic Assemblies Boards Cards and Associated Hardware", "314014"],
    ["5999", "Miscellaneous Electrical and Electronic Components", "141719"] ] },
  { g: "FSG 60", name: "Fiber Optics Materials Components Assemblies and Accessories", r: [
    ["6010", "Fiber Optic Conductors", "39"],
    ["6015", "Fiber Optic Cables", "345"],
    ["6020", "Fiber Optic Cable Assemblies and Harnesses", "1303"],
    ["6021", "Fiber Optic Switches", "95"],
    ["6030", "Fiber Optic Devices", "496"],
    ["6032", "Fiber Optic Light Sources and Photo Detectors", "23"],
    ["6035", "Fiber Optic Light Image Transfer", "53"],
    ["6060", "Fiber Optic Interconnectors", "709"],
    ["6070", "Fiber Optic Accessories and Supplies", "19"],
    ["6080", "Fiber Optic Kits and Sets", "108"],
    ["6099", "Miscellaneous Fiber Optic Components", "32"] ] },
  { g: "FSG 61", name: "Electric Wire and Power and Distribution Equipment", r: [
    ["6105", "Motors Electrical", "62681"],
    ["6110", "Electrical Control Equipment", "49259"],
    ["6115", "Generators and Generator Sets Electrical", "15255"],
    ["6116", "Fuel Cell Power Units Components and Accessories", "61"],
    ["6117", "Solar Electric Power Systems", "159"],
    ["6120", "Transformers Distribution and Power Station", "3418"],
    ["6125", "Converters Electrical Rotating", "3899"],
    ["6130", "Converters Electrical Nonrotating", "73319"],
    ["6135", "Batteries Nonrechargeable", "3803"],
    ["6140", "Batteries Rechargeable", "10347"],
    ["6145", "Wire and Cable Electrical", "77799"],
    ["6150", "Miscellaneous Electric Power and Distribution Equipment", "132264"] ] },
  { g: "FSG 62", name: "Lighting Fixtures and Lamps", r: [
    ["6210", "Indoor and Outdoor Electrical lighting Fixtures", "85083"],
    ["6220", "Electric Vehicular Lights and Fixtures", "38696"],
    ["6230", "Electric Portable and Hand Lighting Equipment", "5314"],
    ["6240", "Electric Lamps", "32589"],
    ["6250", "Ballasts Lampholders and Starters", "6246"],
    ["6260", "Nonelect lighting Fixtures", "879"] ] },
  { g: "FSG 63", name: "Alarm Signal and Security Detection Systems", r: [
    ["6340", "Aircraft Alarm and Signal Systems", "1383"] ] },
  { g: "FSG 66", name: "Instruments and Laboratory Equipment", r: [
    ["6610", "Flight Instruments", "6928"],
    ["6615", "Automatic Pilot Mechanisms and Airborne Gyro Components", "4778"],
    ["6620", "Engine Instruments", "6358"] ] },
  { g: "FSG 70", name: "ADP Equipment Software Supplies and Support Equipment", r: [
    ["7010", "ADPE System Configuration", "2317"],
    ["7020", "ADP Central Processing Unit CPU Computer Analog", "61"],
    ["7021", "ADP Central Processing Unit CPU Computer Digital", "3316"],
    ["7022", "ADP Central Processing Unit CPU Computer Hybrid", "15"],
    ["7025", "ADP Input Output and Storage Devices", "22326"],
    ["7030", "ADP Software", "877"],
    ["7035", "ADP Support Equipment", "2143"],
    ["7040", "Punched Card Equipment", "221"],
    ["7042", "Mini and Micro Computer Control Devices", "20"],
    ["7045", "ADP Supplies", "699"],
    ["7050", "ADP Components", "2957"] ] },
  { g: "FSG 83", name: "Textiles Leather Furs Apparel and Shoe Findings Tents and Flags", r: [
    ["8305", "Textile Fabrics", "263"],
    ["8310", "Yarn and Thread", "79"],
    ["8315", "Notions and Apparel Findings", "62"],
    ["8320", "Padding and Sewing Materials", "31"],
    ["8330", "Leather", "19"],
    ["8335", "Shoe Findings and Soling Materials", "10"],
    ["8340", "Tents and Tarpaulins", "515"],
    ["8345", "Flags and Pennants", "307"] ] },
  { g: "FSG 95", name: "Metal Bars Sheets and Shapes", r: [
    ["9505", "Wire Nonelectrical", "2195"],
    ["9510", "Bars and Rods", "8315"],
    ["9515", "Plate Sheet Strip Foil and Leaf", "6312"],
    ["9520", "Structural Shapes", "1467"],
    ["9525", "Wire Nonelectrical Nonferrous Base Metal", "860"],
    ["9530", "Bars and Rods Nonferrous Base Metal", "7520"],
    ["9535", "Plate Sheet Strip and Foil Nonferrous Base Metal", "9861"],
    ["9540", "Structural Shapes Nonferrous Base Metal", "19525"],
    ["9545", "Plate Sheet Strip Foil and Wire Precious Metal", "57"] ] },
];

const PAGES = ["1","2","3","4","5","6","7","8","9"];

export default function FscsPage() {
  return (
    <>
      <section className="section">
        <div className={`container ${styles.layout}`}>
          <div className={styles.main}>
            <h1 className="section-title section-title--left">Explore Parts by Federal Supply Group (FSG) Codes (FSCs) Data</h1>

            <p className={styles.intro}>A Federal Supply Group (FSG) is a standard 2-digit commodity code used by NATO and the U.S. Department of Defense to manage defense logistics. Each FSG is subdivided into 4-digit Federal Supply Classes (FSCs), which make up the first four digits of a 13-digit National Stock Number (NSN).</p>

            <h2 className={styles.blockTitle}>Understanding FSG and FSC Codes</h2>
            <ul className={styles.bullets}>
              <li>FSG Example: 59 (Electrical and Electronic Equipment Components)</li>
              <li>FSC Example: 5961 (Semiconductor Devices and Associated Hardware)</li>
              <li>NIIN Example: Last 9 digits (01-123-4567)</li>
              <li>NSN Example: Full 13-digit code (5961-01-123-4567)</li>
            </ul>

            <h2 className={styles.blockTitle}>Key Sourcing Applications</h2>
            <ul className={styles.bullets}>
              <li>Board-Level &amp; IT Hardware: Rapid procurement for integrated circuits, microcontrollers, passive components, connectors, and computer networking equipment.</li>
              <li>Defense &amp; Aviation Logistics: Direct sourcing for MIL-SPEC hardware, defense electronics, and airframe assemblies meeting ITAR and DFARS requirements.</li>
              <li>Emergency AOG Support: 24/7/365 rapid cross-referencing and expedited shipping options to minimize Aircraft On Ground and mission-critical operational downtime.</li>
            </ul>

            <h2 className={styles.blockTitle}>Why Choose AFR Enterprises?</h2>
            <ul className={styles.bullets}>
              <li>Compliant Sourcing Options: Adherence to TAA, DFARS, and customer-specified sourcing guidelines.</li>
              <li>Instant 15-Minute RFQ: Submit an online quote request to receive custom pricing, condition details, and realistic delivery schedules within 15 minutes.</li>
              <li>Full Inspection &amp; Traceability: Every order ships with complete manufacturer Certificates of Conformance (CoC), test reports, and ATA 106 paperwork.</li>
            </ul>

            <h2 className={styles.blockTitle}>Request an Instant Quote</h2>
            <p className={styles.intro}>Submit your required part number, quantity, part condition (Factory New, Surplus, Overhauled), and delivery timeline online, or contact our sales specialists for dedicated NSN cross-referencing support.</p>

            {/* Pagination */}
            <div className={styles.pager}>
              {PAGES.map((p) => (
                <Link key={p} href={`/nsn/fscs/page-${p}/`} className={styles.page}>{p}</Link>
              ))}
              <Link href="/nsn/fscs/" className={styles.pageViewAll}>View All</Link>
            </div>

            {/* FSG group cards */}
            <div className={styles.groups}>
              {GROUPS.map((grp) => (
                <div className={styles.fsgCard} key={grp.g}>
                  <div className={styles.fsgHead}>
                    <span className={styles.fsgName}>{grp.g} {grp.name}</span>
                    <span className={styles.fsgCountLabel}>No. Of Parts</span>
                  </div>
                  <ul className={styles.fscList}>
                    {grp.r.map(([code, desc, count]) => (
                      <li className={styles.fscRow} key={code}>
                        <span className={styles.fscCode}>FSC {code}</span>
                        <Link className={styles.fscDesc} href={fscHref(code, desc)}>{desc}</Link>
                        <span className={styles.fscCount}>{count}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <InnerSidebar />
        </div>
      </section>
    </>
  );
}
