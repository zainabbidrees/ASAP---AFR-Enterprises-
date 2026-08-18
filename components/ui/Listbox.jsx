"use client";

// A <select>-shaped custom listbox.
//
// Two reasons it isn't a native <select>: the OS popup can't be styled to the
// monochrome system, and its trigger height is font-derived, so it refuses to
// line up with the 44px fields beside it.
//
// Drop-in shaped: takes <option> children and fires a { target: { value } }
// event, so callers read like a controlled <select>.
//
// Two details that matter:
//  · The menu is portalled to <body> at fixed coordinates. The cart table lives
//    in an overflow-x-auto box, which would clip an absolutely-positioned menu.
//  · DOM focus never leaves the trigger — the active option is tracked with
//    aria-activedescendant instead. Moving focus into a portalled menu would
//    look like "focus left the row" to the cart's commit-on-leave handler and
//    file the draft line the moment the buyer opened the dropdown.

import { Children, useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./Listbox.module.css";

const MAX_MENU_H = 264;

export default function Listbox({
  value = "",
  onChange,
  children,
  placeholder = "Select",
  size = "md",
  className = "",
  "aria-label": ariaLabel,
  id,
}) {
  const options = Children.toArray(children)
    .filter((child) => child?.type === "option")
    .map((child) => {
      const label = child.props.children ?? child.props.value ?? "";
      return { value: String(child.props.value ?? label), label };
    });

  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState(null);
  const [active, setActive] = useState(-1);

  const triggerRef = useRef(null);
  const menuRef = useRef(null);
  const reactId = useId();
  const listId = `${id || reactId}-listbox`;

  const selectedIndex = options.findIndex((o) => o.value === value);
  const selected = selectedIndex === -1 ? null : options[selectedIndex];

  const measure = useCallback(() => {
    const el = triggerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const below = window.innerHeight - r.bottom - 12;
    const above = r.top - 12;
    // Flip above when the viewport has run out underneath.
    const flip = below < Math.min(MAX_MENU_H, 200) && above > below;
    setPos({
      left: Math.round(r.left),
      width: Math.round(r.width),
      top: flip ? undefined : Math.round(r.bottom + 6),
      bottom: flip ? Math.round(window.innerHeight - r.top + 6) : undefined,
      maxHeight: Math.max(120, Math.min(MAX_MENU_H, flip ? above : below)),
    });
  }, []);

  const openMenu = useCallback(
    (startAt) => {
      measure(); // measured before paint, so the menu never flashes at 0,0
      setActive(startAt ?? (selectedIndex === -1 ? 0 : selectedIndex));
      setOpen(true);
    },
    [measure, selectedIndex]
  );

  const closeMenu = useCallback(() => {
    setOpen(false);
    setActive(-1);
  }, []);

  const commit = useCallback(
    (index) => {
      const option = options[index];
      closeMenu();
      if (option && option.value !== value) onChange?.({ target: { value: option.value } });
    },
    [options, closeMenu, onChange, value]
  );

  // Track the trigger while the menu is open: capture-phase scroll catches the
  // table's own overflow box, not just the window.
  useEffect(() => {
    if (!open) return;
    const onScroll = () => measure();
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onScroll);
    };
  }, [open, measure]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e) => {
      if (triggerRef.current?.contains(e.target) || menuRef.current?.contains(e.target)) return;
      closeMenu();
    };
    document.addEventListener("pointerdown", onPointerDown, true);
    return () => document.removeEventListener("pointerdown", onPointerDown, true);
  }, [open, closeMenu]);

  // Keep the active option in view as the arrows walk the list.
  useEffect(() => {
    if (!open || active < 0) return;
    menuRef.current
      ?.querySelector(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  const onKeyDown = (e) => {
    if (!open) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openMenu(e.key === "ArrowUp" ? options.length - 1 : undefined);
      }
      return;
    }
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActive((i) => Math.min(options.length - 1, i + 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActive((i) => Math.max(0, i - 1));
        break;
      case "Home":
        e.preventDefault();
        setActive(0);
        break;
      case "End":
        e.preventDefault();
        setActive(options.length - 1);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        commit(active);
        break;
      case "Escape":
        e.preventDefault();
        closeMenu();
        break;
      case "Tab":
        // Let focus move on naturally, but don't leave a menu hanging over it.
        closeMenu();
        break;
      default:
        break;
    }
  };

  const menu =
    open && pos && typeof document !== "undefined"
      ? createPortal(
          <ul
            ref={menuRef}
            id={listId}
            role="listbox"
            className={styles.menu}
            aria-label={ariaLabel}
            style={{
              left: pos.left,
              width: pos.width,
              top: pos.top,
              bottom: pos.bottom,
              maxHeight: pos.maxHeight,
            }}
          >
            {options.map((option, i) => (
              <li
                key={option.value}
                id={`${listId}-opt-${i}`}
                role="option"
                data-index={i}
                aria-selected={option.value === value}
                className={styles.option}
                data-active={i === active ? "true" : undefined}
                // preventDefault keeps the trigger focused through the click, so
                // the row never sees a blur it would read as "buyer left".
                onMouseDown={(e) => e.preventDefault()}
                onMouseEnter={() => setActive(i)}
                onClick={() => commit(i)}
              >
                {option.label}
              </li>
            ))}
          </ul>,
          document.body
        )
      : null;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        id={id}
        className={`${styles.trigger} ${className}`}
        data-size={size === "sm" ? "sm" : "md"}
        data-placeholder={selected ? undefined : "true"}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-activedescendant={open && active >= 0 ? `${listId}-opt-${active}` : undefined}
        aria-label={ariaLabel}
        onClick={() => (open ? closeMenu() : openMenu())}
        onKeyDown={onKeyDown}
        onBlur={closeMenu}
      >
        <span className={styles.label}>{selected ? selected.label : placeholder}</span>
        <svg className={styles.chevron} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M6 9.5l6 6 6-6" />
        </svg>
      </button>
      {menu}
    </>
  );
}
