"use client";

import { useSyncExternalStore } from "react";

// Quote cart — a tiny localStorage-backed store shared by the listing buttons,
// the header badge and the cart page. Deliberately a module-level store rather
// than a React context: the consumers are scattered across otherwise-static
// server-rendered pages, so this keeps the root layout untouched and avoids
// making whole page trees client components just to read a count.
//
// A line is { part, href, mfr, desc, qty }. `part` is the identity — adding the
// same part number again bumps its quantity instead of duplicating the row.

const KEY = "afr_quote_cart";

// Frozen module-level constant: useSyncExternalStore requires the server
// snapshot to be referentially stable, or React re-renders forever.
const EMPTY = Object.freeze([]);

let items = null; // null = not yet hydrated from localStorage
const listeners = new Set();

function read() {
  if (typeof window === "undefined") return EMPTY;
  try {
    const parsed = JSON.parse(window.localStorage.getItem(KEY) || "[]");
    if (!Array.isArray(parsed)) return EMPTY;
    // Tolerate hand-edited or older payloads rather than throwing at render.
    return parsed
      .filter((l) => l && typeof l.part === "string" && l.part.length > 0)
      .map((l) => ({
        part: l.part,
        href: typeof l.href === "string" ? l.href : "/straightrfq/",
        mfr: typeof l.mfr === "string" ? l.mfr : "",
        desc: typeof l.desc === "string" ? l.desc : "",
        qty: Number.isFinite(l.qty) && l.qty > 0 ? Math.floor(l.qty) : 1,
      }));
  } catch {
    return EMPTY;
  }
}

function getSnapshot() {
  if (items === null) items = read();
  return items;
}

function getServerSnapshot() {
  return EMPTY;
}

function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function commit(next) {
  items = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Private mode / quota — the in-memory cart still works for this session.
  }
  listeners.forEach((fn) => fn());
}

// Keep other tabs in step.
if (typeof window !== "undefined") {
  window.addEventListener("storage", (e) => {
    if (e.key !== KEY) return;
    items = read();
    listeners.forEach((fn) => fn());
  });
}

export function addLine(line) {
  const current = getSnapshot();
  const at = current.findIndex((l) => l.part === line.part);
  if (at !== -1) {
    const next = current.map((l, i) => (i === at ? { ...l, qty: l.qty + 1 } : l));
    commit(next);
    return;
  }
  commit([
    ...current,
    {
      part: line.part,
      href: line.href || "/straightrfq/",
      mfr: line.mfr || "",
      desc: line.desc || "",
      qty: 1,
    },
  ]);
}

export function removeLine(part) {
  commit(getSnapshot().filter((l) => l.part !== part));
}

export function setQty(part, qty) {
  const n = Math.max(1, Math.floor(Number(qty) || 1));
  commit(getSnapshot().map((l) => (l.part === part ? { ...l, qty: n } : l)));
}

export function clearCart() {
  commit([]);
}

// Full cart. Empty on the server and on the first client render, so markup
// matches and hydration stays clean; it fills in immediately after mount.
export function useQuoteCart() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function useIsInCart(part) {
  const lines = useQuoteCart();
  return lines.some((l) => l.part === part);
}
