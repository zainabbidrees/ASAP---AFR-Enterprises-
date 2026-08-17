"use client";

import { useState } from "react";

// Cookie consent banner (overlay, shown site-wide).
export default function CookieBanner() {
  const [hidden, setHidden] = useState(false);
  if (hidden) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-label="Cookie consent">
      <div className="container cookie-banner__inner">
        <p>
          We use cookies to ensure that we give you the best experience on our website. If you
          continue to use this site we will assume that you are happy with it.
        </p>
        <button className="btn btn--light btn--sm" type="button" onClick={() => setHidden(true)}>
          Yes, I Accept Cookies.
        </button>
        <button
          className="cookie-banner__close"
          type="button"
          aria-label="Close"
          onClick={() => setHidden(true)}
        >
          &times;
        </button>
      </div>
      <style jsx>{`
        .cookie-banner {
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(20, 20, 20, 0.92);
          color: #fff;
          z-index: 100;
        }
        .cookie-banner__inner {
          display: flex;
          align-items: center;
          gap: 16px;
          padding-top: 12px;
          padding-bottom: 12px;
        }
        .cookie-banner p {
          margin: 0;
          font-size: 13px;
          flex: 1;
        }
        .cookie-banner__close {
          background: none;
          border: 0;
          color: #fff;
          font-size: 22px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
