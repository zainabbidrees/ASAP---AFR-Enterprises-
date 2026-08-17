import Link from "next/link";
import styles from "./Breadcrumb.module.css";

// Shared breadcrumb, used on every inner page. `items` = [{ label, href }].
// The last item renders as the current page (no link).
export default function Breadcrumb({ items = [] }) {
  return (
    <nav className={styles.breadcrumb} aria-label="Breadcrumb">
      <div className="container">
        <ol className={styles.list}>
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            return (
              <li key={`${item.label}-${i}`} className={styles.item}>
                {item.href && !isLast ? (
                  <Link href={item.href}>{item.label}</Link>
                ) : (
                  <span aria-current="page">{item.label}</span>
                )}
                {!isLast && <span className={styles.sep} aria-hidden="true">/</span>}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
