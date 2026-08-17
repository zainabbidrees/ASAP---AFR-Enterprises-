import ToolingListing from "@/components/ToolingListing/ToolingListing";

export const metadata = {
  title: "Complete Catalog of Avionic Test Equipment | AFR Enterprises",
  description:
    "A leading source for avionics test equipment — communication, navigation, radar, flight-control, and component testers. Browse and submit an RFQ.",
};

const R = (part, col2, desc, href) => ({ part, col2, desc, href });
const base = "/avionics-test-equipment/rfq";

const ROWS = [
  R("ZSAY-3", "dfw instruments", "universal pitot static adaptor system", `${base}/dfw-instruments/zsay-3/`),
  R("Zing Test V2K", "honeywell chadwick", "balancer / analyzer", `${base}/honeywell-chadwick/zing-test-v2k/`),
  R("XRP-3000", "spectroline", "advanced digital radiometer/photometer kit for ndt", `${base}/spectroline/xrp-3000/`),
  R("XLG3", "ge", "videoprobe ndt video borescope", `${base}/ge/xlg3/`),
  R("WX-PA", "3m", "stormscope portable analyzer", `${base}/3m/wx-pa/`),
  R("WRA-615-R01", "techsat gmbh", "flightline wrangler advanced portable data loader (apdl)", `${base}/techsat-gmbh/wra-615-r01/`),
  R("Wavetek 4015", "wavetek", "communications service monitor", `${base}/wavetek/wavetek-4015/`),
  R("VXP", "chadwick helmuth", "vibration expert vxp data acquisition & health monitoring system", `${base}/chadwick-helmuth/vxp/`),
  R("Vibrex 2000", "honeywell chadwick", "balancer / analyzer", `${base}/honeywell-chadwick/vibrex-2000/`),
  R("USL-48", "krautkramer branson", "portable ultrasonic flaw detector", `${base}/krautkramer-branson/usl-48/`),
  R("USB-429-4", "avionics interface tech ait", "four channel arinc 429 test and simulation usb module", `${base}/avionics-interface-tech-ait/usb-429-4/`),
  R("USB 429/717", "ballard technology", "arinc 429 avionics interface", `${base}/ballard-technology/usb-429-717/`),
  R("UL-1Ze", "pyrometric", "pyrobond z-purge hot bonder composite bonding repair system", `${base}/pyrometric/ul-1ze/`),
  R("UC-584", "ifr aeroflex", "universal transponder antenna coupler", `${base}/ifr-aeroflex/uc-584/`),
  R("UA1431", "ballard technology", "usb interface to arinc 429 and arinc 717", `${base}/ballard-technology/ua1431/`),
  R("TTU-205C/E", "testvonics", "pressure temperature test set", `${base}/testvonics/ttu-205c-e/`),
  R("TTG-7000", "atg", "tcas / transponder test set", `${base}/atg/ttg-7000/`),
  R("TTG-5000", "atg", "transponder rf signal generator", `${base}/atg/ttg-5000/`),
  R("TTG-3000", "atg", "nextgen rf signal generator", `${base}/atg/ttg-3000/`),
  R("TT700", "time high tech", "precision ultrasonic thickness gauge", `${base}/time-high-tech/tt700/`),
  R("TT210", "time high tech", "coating thickness gauge", `${base}/time-high-tech/tt210/`),
  R("TS200", "dukane avionics", "ulb test set", `${base}/dukane-avionics/ts200/`),
  R("Tracker 2800", "huntron tracker", "2800 and 2800s diagnostic circuit board troubleshooting test set", `${base}/huntron-tracker/tracker-2800/`),
  R("TR-420", "tel instruments", "ramp test set", `${base}/tel-instruments/tr-420/`),
  R("TR-220", "tic tel instruments", "transponder tcas dme ads-b test set", `${base}/tic-tel-instruments/tr-220/`),
  R("TR-211", "tel instruments", "mode s transponder / dme / tis / ads-b in test set", `${base}/tel-instruments/tr-211/`),
  R("TR-210", "tel instruments", "transponder / dme / tis / ads-b in test set", `${base}/tel-instruments/tr-210/`),
  R("TR-100AF", "tel instruments", "tacan test set", `${base}/tel-instruments/tr-100af/`),
  R("TPT-81A", "bf goodrich jc air", "tcas interface test panel", `${base}/bf-goodrich-jc-air/tpt-81a/`),
  R("TPS2024", "tektronix", "4 channel 200 mhz digital storage oscilloscope", `${base}/tektronix/tps2024/`),
  R("TI120EL/TI130/TI200/", "time high tech", "infrared thermometor", `${base}/time-high-tech/ti120el-ti130-ti200-ti210/`),
  R("THS730A", "tektronix", "tekscope portable oscilloscope / dmm / power analyzer", `${base}/tektronix/ths730a/`),
  R("Thales 7010", "thales", "portable ils / vor receiver", `${base}/thales/thales-7010/`),
  R("TEB-7020-0012-500", "ifr aeroflex", "ifr ifr-4000, ifr-6000, ifr-35xx compatible battery pack", `${base}/ifr-aeroflex/teb-7020-0012-500/`),
  R("TE69B48251", "boeing", "lighting protection test set", `${base}/boeing/te69b48251/`),
  R("TDS3032", "tektronix", "digital oscilloscope", `${base}/tektronix/tds3032/`),
  R("TDR1000/3", "megger", "metallic time-domain reflectometer tdr cable tester", `${base}/megger/tdr1000-3/`),
  R("TCAS-201-2", "ifr aeroflex", "tcas ramp test set", `${base}/ifr-aeroflex/tcas-201-2/`),
  R("TCAS-201", "ifr aeroflex", "tcas ramp test set", `${base}/ifr-aeroflex/tcas-201/`),
  R("TB-2100", "tic tel instruments", "atc dme mode s test set", `${base}/tic-tel-instruments/tb-2100/`),
  R("TAP-200-50", "tel instruments", "anti-radiation coupler for tr-220 transponder test set", `${base}/tel-instruments/tap-200-50/`),
  R("TAP-141", "tel instruments", "direct connect coupler for t-49c", `${base}/tel-instruments/tap-141/`),
  R("TAP-135", "tel instruments", "antenna assembly for t-49c", `${base}/tel-instruments/tap-135/`),
  R("T477W", "avtron", "bonding meter", `${base}/avtron/t477w/`),
  R("T1206 DFIU", "ifr aeroflex", "satcom system", `${base}/ifr-aeroflex/t1206-dfiu/`),
  R("T1205A DFIU", "ifr aeroflex", "control head", `${base}/ifr-aeroflex/t1205a-dfiu/`),
  R("T1204 DFIU", "ifr aeroflex", "rdmi/rmi/ddi/rai indicator", `${base}/ifr-aeroflex/t1204-dfiu/`),
  R("T1203-03", "ifr aeroflex", "dfiu t1203 lra interface cable", `${base}/ifr-aeroflex/t1203-03/`),
  R("T1203 DFIU", "ifr aeroflex", "dme, atc, lra discrete function interface unit (dfiu)", `${base}/ifr-aeroflex/t1203-dfiu/`),
  R("T1202 DFIU", "ifr aeroflex", "vhf/hf communication", `${base}/ifr-aeroflex/t1202-dfiu/`),
];

export default function AvionicsTestEquipmentPage() {
  return (
    <ToolingListing
      breadcrumb={[{ label: "Home", href: "/" }, { label: "Avionics Test Equipment" }]}
      h1="A Leading Source for Avionics Test Equipment"
      intro="At AFR Enterprises, we are your trusted source for high-quality avionics test equipment, offering a comprehensive selection that is designed to meet the rigorous demands of the aerospace industry. Our inventory features reliable solutions sourced from premier manufacturers and suppliers across the globe, ensuring your maintenance and calibration operations are supported by dependable, industry-recognized equipment. To keep your MRO and line-station workflows efficient, our expansive catalog of avionics test equipment includes essential items and kits like:"
      sections={[
        {
          bullets: [
            "Communication Test Parts: Equipment for testing radios, transceivers, and communication systems to verify performance and signal integrity across different aircraft platforms.",
            "Navigation Test Solutions: Tools for verifying GPS, VOR, ILS, and other navigation equipment, helping you ensure precise route guidance and approach reliability.",
            "Radar Test Options: Devices for testing airborne radar systems, weather radar, and transponders, so you can confirm detection and reporting accuracy under operational conditions.",
            "Flight Control System Testers: Devices for testing airborne radar systems, weather radar, and transponders, so you can confirm detection and reporting accuracy under operational conditions.",
            "Avionic Component Testers: Tools for individual components like indicators, sensors, and displays, giving you the flexibility to test and validate parts at the component level.",
          ],
        },
      ]}
      closing="If you find any item of interest within our collection, we encourage you to request a quote at your earliest convenience using our online forms. Alternatively, you are always welcome to call or email us for a more direct interaction, so never hesitate to reach out when you need support with avionics test equipment selection or sourcing."
      col2Header="Manufacturer"
      rows={ROWS}
      displaying="Displaying Page: 1 of 32"
      pageBase="/avionics-test-equipment/page-"
      totalPages={10}
    />
  );
}
