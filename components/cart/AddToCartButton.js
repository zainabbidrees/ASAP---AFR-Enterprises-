"use client";

import { useCart } from "@/lib/cart-context";
import QtyStepper from "@/components/ui/QtyStepper";
import styles from "./AddToCartButton.module.css";

// The per-row cart control in every parts listing. ONE control, two states:
//
//   not staged →  [ 🛒 Cart ]
//   staged     →  [ −  2  + ]
//
// Once the part is in the cart the button becomes its quantity, so the number a
// buyer sees is the number actually staged — there is no separate "quantity to
// add" to keep in sync, and no second button competing with RFQ in the row.
// Decrementing past 1 takes the line back off the cart.
export default function AddToCartButton({ part, href, mfr, desc }) {
  const { items, addItem, updateItem, removeItem, flashKey } = useCart();
  const line = items.find((l) => l.partNumber.toLowerCase() === part.toLowerCase());

  if (line) {
    return (
      <div className={styles.wrap} data-flash={flashKey === part.toLowerCase() ? "true" : undefined}>
        <QtyStepper
          value={line.qty}
          onChange={(next) => updateItem(line.partNumber, { qty: next })}
          onMinDecrement={() => removeItem(line.partNumber)}
          size="sm"
          className={styles.qty}
          label={`Quantity of ${part} in quote cart`}
          decrementLabel={
            line.qty === 1
              ? `Remove ${part} from quote cart`
              : `Decrease quantity of ${part} in quote cart`
          }
          incrementLabel={`Increase quantity of ${part} in quote cart`}
        />
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      <button
        type="button"
        className={styles.btn}
        onClick={() =>
          addItem({
            partNumber: part,
            manufacturer: mfr || "",
            description: desc && desc !== "NA" ? desc : "",
            qty: 1,
            href: href || "",
          })
        }
        aria-label={`Add ${part} to quote cart`}
      >
        <span className={styles.icon} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="20" r="1.4" />
            <circle cx="18" cy="20" r="1.4" />
            <path d="M2.5 3h2.2l2.3 11.2a1.5 1.5 0 0 0 1.5 1.2h8.2a1.5 1.5 0 0 0 1.5-1.2L21 6.5H6" />
          </svg>
        </span>
        Cart
      </button>
    </div>
  );
}
