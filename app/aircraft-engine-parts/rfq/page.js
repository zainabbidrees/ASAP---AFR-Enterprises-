import { redirect } from "next/navigation";

// Bare /aircraft-engine-parts/rfq/ has no part to scope a quote to — send it to the master form.
export default function RfqRedirect() {
  redirect("/straightrfq/");
}
