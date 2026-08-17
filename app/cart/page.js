import Testimonials from "@/components/home/Testimonials";
import CartView from "./CartView";

export const metadata = {
  title: "Quote Cart | Stage Parts for a 15-Minute RFQ | AFR Enterprises",
  description:
    "Your AFR quote cart. Stage part numbers as you browse, then send them to a named specialist for pricing, availability, condition and lead time in writing within 15 minutes.",
};

export default function CartPage() {
  return (
    <>
      {/* 01 · CART — staged lines, or the editorial empty state (client: the
          manifest reads the localStorage-backed quote cart). */}
      <CartView />

      {/* ============ 02 · PROOF — homepage testimonials ============ */}
      <Testimonials />
    </>
  );
}
