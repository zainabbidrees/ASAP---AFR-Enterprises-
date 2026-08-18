"use client";

// The quote manifest. One draft row at the top of <tbody> that adds lines, then
// the staged lines themselves.
//
// The draft row commits when focus leaves the ROW, not the field — a buyer
// tabbing from part number to quantity, or clicking +, is still mid-line.

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useCart } from "@/lib/cart-context";
import {
  manufacturerRoster,
  manufacturersForPart,
  searchParts,
  slugify,
} from "@/lib/catalog";
import QtyStepper from "@/components/ui/QtyStepper";
import Listbox from "@/components/ui/Listbox";
import styles from "./CartTable.module.css";

/** Where a staged part's RFQ page lives, when we can name one. */
function rfqHref(partNumber, manufacturer) {
  if (!manufacturer) return "";
  return `/rfq/${slugify(manufacturer)}/${slugify(partNumber)}/`;
}

/**
 * The manufacturer control, shared by the draft row and every staged line.
 * The source list belongs to the part number, so it narrows as soon as there
 * is one and falls back to the full roster while the field is blank.
 */
function MfrField({ partNumber, value, onChange, ariaLabel }) {
  const options = useMemo(() => {
    const list = String(partNumber || "").trim()
      ? manufacturersForPart(partNumber)
      : manufacturerRoster;
    // The current pick stays selectable even when today's list doesn't hold it
    // — a line restored from localStorage, or added from a part page.
    return value && !list.includes(value) ? [value, ...list] : list;
  }, [partNumber, value]);

  // An empty dropdown is a dead end. Say so in words and let the line submit
  // anyway: an unrecognised part number is a sourcing request, not an error.
  if (options.length === 0) {
    return <span className={styles.noMfr}>No manufacturer found</span>;
  }

  return (
    <Listbox
      value={value}
      onChange={onChange}
      aria-label={ariaLabel}
      placeholder="Select manufacturer"
    >
      {options.map((m) => (
        <option key={m} value={m}>
          {m}
        </option>
      ))}
    </Listbox>
  );
}

export default function CartTable() {
  const { items, hydrated, flashKey, addItem, removeItem, updateItem } = useCart();

  const [pn, setPn] = useState("");
  const [mfr, setMfr] = useState("");
  const [qty, setQty] = useState("");

  // The manufacturer re-seeds from the part number: typing a new number
  // replaces the previous choice rather than carrying it over to a part it
  // has nothing to do with.
  useEffect(() => {
    setMfr(manufacturersForPart(pn)[0] || "");
  }, [pn]);

  const commit = () => {
    const partNumber = pn.trim();
    if (!partNumber) return;

    const description = searchParts(partNumber, 1)[0]?.description || "";
    addItem({
      partNumber,
      manufacturer: mfr,
      description,
      // An empty quantity means one, never zero.
      qty: Number(qty) || 1,
      href: rfqHref(partNumber, mfr),
    });

    setPn("");
    setMfr("");
    setQty("");
  };

  // Blur bubbles, so this single handler on the <tr> covers all three controls.
  const commitOnLeave = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) commit();
  };

  return (
    <div className={styles.scroller}>
      <table className={styles.table}>
        <caption className="visually-hidden">
          Parts staged for quote. Use the first row to add a line: type a part
          number, choose a manufacturer and a quantity.
        </caption>
        <thead>
          <tr>
            <th scope="col" className={styles.colPart}>
              Part no.
            </th>
            <th scope="col" className={styles.colMfr}>
              Manufacturer / description
            </th>
            <th scope="col" className={styles.colQty}>
              Qty
            </th>
            <th scope="col" className={styles.colEnd}>
              Remove
            </th>
          </tr>
        </thead>

        <tbody>
          {/* ---- draft row: always rendered, independent of hydration ---- */}
          <tr className={styles.draftRow} onBlur={commitOnLeave}>
            <td className={styles.colPart}>
              <input
                className={styles.field}
                type="text"
                value={pn}
                onChange={(e) => setPn(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    commit();
                  }
                }}
                placeholder="Add line by part number…"
                aria-label="Part number to add"
                autoComplete="off"
                spellCheck="false"
              />
            </td>
            <td className={styles.colMfr}>
              <MfrField
                partNumber={pn}
                value={mfr}
                onChange={(e) => setMfr(e.target.value)}
                ariaLabel="Manufacturer for the part being added"
              />
            </td>
            <td className={styles.colQty}>
              {/* No pre-filled 1: the row genuinely has no quantity yet, and a
                  1 sitting there invites nobody to change it. */}
              <QtyStepper
                value={qty}
                onChange={setQty}
                allowEmpty
                placeholder="Qty"
                full
                label="Quantity for the part being added"
                decrementLabel="Decrease quantity for the part being added"
                incrementLabel="Increase quantity for the part being added"
              />
            </td>
            <td className={styles.colEnd}>
              <span className={styles.enterHint} aria-hidden="true">
                ↵
              </span>
            </td>
          </tr>

          {/* ---- staged lines: gated on hydration so the server markup and
                  localStorage never disagree on the first paint ---- */}
          {hydrated &&
            items.map((line) => {
              const href = line.href || rfqHref(line.partNumber, line.manufacturer);
              return (
                <tr
                  key={line.partNumber}
                  className={styles.row}
                  data-flash={
                    flashKey === line.partNumber.toLowerCase() ? "true" : undefined
                  }
                >
                  <td className={styles.colPart}>
                    {href ? (
                      <Link className={styles.part} href={href}>
                        {line.partNumber}
                      </Link>
                    ) : (
                      <span className={styles.part}>{line.partNumber}</span>
                    )}
                  </td>
                  <td className={styles.colMfr}>
                    <MfrField
                      partNumber={line.partNumber}
                      value={line.manufacturer}
                      onChange={(e) =>
                        // The RFQ link is per manufacturer, so it has to move
                        // with the pick — otherwise the line keeps pointing at
                        // the page for whoever was selected before.
                        updateItem(line.partNumber, {
                          manufacturer: e.target.value,
                          href: rfqHref(line.partNumber, e.target.value),
                        })
                      }
                      ariaLabel={`Manufacturer for ${line.partNumber}`}
                    />
                    {/* The description belongs to the source, so it sits under
                        the picker rather than under the part number. */}
                    {line.description && (
                      <span className={styles.desc}>{line.description}</span>
                    )}
                  </td>
                  <td className={styles.colQty}>
                    <QtyStepper
                      value={line.qty}
                      onChange={(next) => updateItem(line.partNumber, { qty: next })}
                      // Decrementing past one takes the line off the manifest.
                      onMinDecrement={() => removeItem(line.partNumber)}
                      full
                      label={`Quantity of ${line.partNumber}`}
                      decrementLabel={`Decrease quantity of ${line.partNumber}`}
                      incrementLabel={`Increase quantity of ${line.partNumber}`}
                    />
                  </td>
                  <td className={styles.colEnd}>
                    <button
                      type="button"
                      className={styles.remove}
                      onClick={() => removeItem(line.partNumber)}
                      aria-label={`Remove ${line.partNumber} from quote cart`}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                        <path d="M6 6l12 12M18 6L6 18" />
                      </svg>
                    </button>
                  </td>
                </tr>
              );
            })}

          {hydrated && items.length === 0 && (
            <tr>
              <td className={styles.emptyCell} colSpan={4}>
                <span className={styles.empty}>
                  No lines staged yet — add a part number above, or browse the
                  catalog and stage parts as you find them.
                </span>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
