"use client";

import { useEffect, useRef, useState } from "react";
import { addLine, useIsInCart } from "./quoteCart";
import styles from "./AddToCartButton.module.css";

// The per-row cart button that sits beside RFQ in every parts listing.
// Staging a part is silent otherwise, so the label flips to "Added" for a beat
// as confirmation, then settles to "In cart" while the line is staged.
export default function AddToCartButton({ part, href, mfr, desc }) {
  const inCart = useIsInCart(part);
  const [justAdded, setJustAdded] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const onClick = () => {
    addLine({ part, href, mfr, desc });
    setJustAdded(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setJustAdded(false), 1400);
  };

  const label = justAdded ? "Added" : inCart ? "In cart" : "Cart";

  return (
    <button
      type="button"
      className={styles.btn}
      onClick={onClick}
      data-state={justAdded ? "added" : inCart ? "in" : undefined}
      aria-label={
        inCart
          ? `${part} is in your quote cart — add another`
          : `Add ${part} to quote cart`
      }
    >
      <span className={styles.icon} aria-hidden="true">
        {justAdded || inCart ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 12.5l5 5L20 6.5" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="20" r="1.4" />
            <circle cx="18" cy="20" r="1.4" />
            <path d="M2.5 3h2.2l2.3 11.2a1.5 1.5 0 0 0 1.5 1.2h8.2a1.5 1.5 0 0 0 1.5-1.2L21 6.5H6" />
          </svg>
        )}
      </span>
      {label}
    </button>
  );
}
