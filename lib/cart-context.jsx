"use client";

// Quote-cart store — React context over one localStorage key.
//
// A line is { partNumber, manufacturer, description, qty } plus an optional
// `href` so a staged part can link back to the RFQ page it came from (the
// listing buttons know that URL; the cart table would otherwise have to guess).
//
// No prices, totals or checkout live here: the cart is a manifest a buyer hands
// to a specialist, so quantity is the only number it carries.

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const KEY = "afr-rfq-cart";
const LEGACY_KEY = "afr_quote_cart"; // the pre-context module store
const FLASH_MS = 900;

const CartContext = createContext(null);

/** Coerce one stored record into a line, or null if it isn't one. */
function toLine(raw) {
  if (!raw || typeof raw !== "object") return null;
  // Also accepts the legacy { part, mfr, desc } shape so a cart staged before
  // this store landed survives the upgrade instead of silently emptying.
  const partNumber = String(raw.partNumber ?? raw.part ?? "").trim();
  if (!partNumber) return null;
  const qty = Math.floor(Number(raw.qty));
  return {
    partNumber,
    manufacturer: String(raw.manufacturer ?? raw.mfr ?? ""),
    description: String(raw.description ?? raw.desc ?? ""),
    qty: Number.isFinite(qty) && qty > 0 ? qty : 1,
    href: typeof raw.href === "string" ? raw.href : "",
  };
}

function parse(json) {
  const parsed = JSON.parse(json);
  return Array.isArray(parsed) ? parsed.map(toLine).filter(Boolean) : [];
}

function readStored() {
  try {
    const raw =
      window.localStorage.getItem(KEY) ?? window.localStorage.getItem(LEGACY_KEY);
    return raw ? parse(raw) : [];
  } catch {
    // Corrupt JSON, or storage blocked in private mode. Neither is fatal: the
    // cart just starts empty and works in memory for this session.
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [hydrated, setHydrated] = useState(false);
  const [flashKey, setFlashKey] = useState(null);

  const flashTimer = useRef(null);
  // The last payload this tab wrote. Guards the write effect against no-op
  // writes and stops the cross-tab sync below from ping-ponging.
  const lastSaved = useRef(null);

  // Read on mount, never during render — the server has no localStorage, so
  // reading it in the render pass would mismatch the hydrating markup.
  useEffect(() => {
    const stored = readStored();
    lastSaved.current = JSON.stringify(stored);
    setItems(stored);
    setHydrated(true);
  }, []);

  // Write on every change, but only once hydrated: the empty first render
  // would otherwise overwrite the saved cart before it has been read.
  useEffect(() => {
    if (!hydrated) return;
    const json = JSON.stringify(items);
    if (json === lastSaved.current) return;
    lastSaved.current = json;
    try {
      window.localStorage.setItem(KEY, json);
    } catch {
      // Quota or private mode — the in-memory cart still works.
    }
  }, [items, hydrated]);

  // Keep other tabs in step.
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key !== KEY || e.newValue === lastSaved.current) return;
      lastSaved.current = e.newValue;
      try {
        setItems(e.newValue ? parse(e.newValue) : []);
      } catch {
        /* another tab wrote something unreadable — keep what we have */
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => () => clearTimeout(flashTimer.current), []);

  const addItem = useCallback((part) => {
    const partNumber = String(part?.partNumber ?? "").trim();
    if (!partNumber) return; // a blank part number is not a line

    const parsedQty = Math.floor(Number(part.qty));
    const qty = Number.isFinite(parsedQty) && parsedQty > 0 ? parsedQty : 1;
    const key = partNumber.toLowerCase();

    setItems((prev) => {
      // Part numbers are matched case-insensitively: MS27473 and ms27473 are
      // the same line, and folding beats a duplicate row a buyer has to spot.
      const at = prev.findIndex((l) => l.partNumber.toLowerCase() === key);
      if (at !== -1) {
        return prev.map((l, i) => (i === at ? { ...l, qty: l.qty + qty } : l));
      }
      return [
        ...prev,
        {
          partNumber,
          manufacturer: part.manufacturer || "",
          description: part.description || "",
          qty,
          href: part.href || "",
        },
      ];
    });

    // A fold that merges into a row further down the manifest reads as
    // "nothing happened" — flag the affected line so the table can flash it.
    setFlashKey(key);
    clearTimeout(flashTimer.current);
    flashTimer.current = setTimeout(() => setFlashKey(null), FLASH_MS);
  }, []);

  const removeItem = useCallback((partNumber) => {
    setItems((prev) => prev.filter((l) => l.partNumber !== partNumber));
  }, []);

  const updateItem = useCallback((partNumber, patch) => {
    setItems((prev) =>
      prev.map((l) => (l.partNumber === partNumber ? { ...l, ...patch } : l))
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(
    () => ({
      items,
      hydrated,
      flashKey,
      count: items.length,
      addItem,
      removeItem,
      updateItem,
      clear,
    }),
    [items, hydrated, flashKey, addItem, removeItem, updateItem, clear]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
}
