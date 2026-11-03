import { DashboardShell, formatDate, formatNumber, PLAN_NAMES } from "../../components/dashboard/DashboardShell";
import styles from "../../components/dashboard/Dashboard.module.css";
import type { Me } from "../../lib/account";

/**
 * Plan prices and limits from apimask-platform docs/business/monetization.md.
 * Starter and Pro become purchasable with Lemon Squeezy checkout (roadmap
 * item 5); until then this page shows the current plan only.
 */
const PLANS = [
  {
    id: "free",
    price: "$0",
    units: 1_000,
    features: ["Every live API except AI", "Test keys with a separate quota", "No card required"],
  },
  {
    id: "starter",
    price: "$9",
    units: 25_000,
    features: ["Everything in Free", "25× the monthly units"],
  },
  {
    id: "pro",
    price: "$29",
    units: 250_000,
    features: ["Everything in Starter", "AI endpoints", "10× Starter's units and higher rate limits"],
  },
];

function Billing({ me }: { me: Me }) {
  const current = me.plan?.id ?? "free";
  return (
    <>
      <section className={styles.card}>
        <p className={styles.label}>Current plan</p>
        <p className={styles.stat}>{PLAN_NAMES[current] ?? current}</p>
        <p className={styles.muted}>
          {formatNumber(me.plan?.monthly_quota_units ?? 0)} units a month · current period{" "}
          {formatDate(me.plan?.period_start)} – {formatDate(me.plan?.period_end)}
          {me.plan?.status && me.plan.status !== "active" ? ` · status: ${me.plan.status}` : ""}
        </p>
      </section>

      <div className={styles.plans}>
        {PLANS.map((p) => {
          const isCurrent = p.id === current;
          return (
            <section key={p.id} className={`${styles.card} ${isCurrent ? styles.planCurrent : ""}`}>
              <h2 className={styles.cardTitle}>{PLAN_NAMES[p.id]}</h2>
              <p className={styles.price}>
                {p.price} <span>/ month</span>
              </p>
              <p className={styles.muted}>{formatNumber(p.units)} units a month</p>
              <ul className={styles.list}>
                {p.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              {isCurrent ? (
                <span className={styles.badgeLive}>Your plan</span>
              ) : p.id === "free" ? null : (
                <button type="button" className={styles.button} disabled title="Paid plans open soon">
                  Upgrade — opening soon
                </button>
              )}
            </section>
          );
        })}
      </div>
      <p className={styles.muted}>
        Payments are handled by Lemon Squeezy, our merchant of record, which also handles sales tax and VAT. Want a paid
        plan before checkout opens? Email <a href="mailto:support@apimask.dev">support@apimask.dev</a>.
      </p>
    </>
  );
}

export default function BillingPage() {
  return <DashboardShell title="Billing">{(me) => <Billing me={me} />}</DashboardShell>;
}
