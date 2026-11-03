import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { DashboardShell, formatDate, formatNumber, PLAN_NAMES } from "../../components/dashboard/DashboardShell";
import styles from "../../components/dashboard/Dashboard.module.css";
import { account, ApiError, errorText, type BillingStatus, type Me } from "../../lib/account";

/**
 * Plan prices and limits from apimask-platform docs/business/monetization.md.
 * Prices are charged by Lemon Squeezy; these figures are display copy and
 * must match the variants configured there.
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

function subscriptionLine(sub: NonNullable<BillingStatus["subscription"]>): string {
  switch (sub.status) {
    case "active":
      return `Renews ${formatDate(sub.renews_at)}.`;
    case "on_trial":
      return `Trial, first charge ${formatDate(sub.renews_at)}.`;
    case "cancelled":
      return `Cancelled. Your plan stays active until ${formatDate(sub.ends_at)}.`;
    case "past_due":
      return `Your last payment failed. Update your card by ${formatDate(sub.grace_until)} to keep your plan.`;
    case "unpaid":
    case "expired":
      return "This subscription has ended. You are on Free limits.";
    case "paused":
      return "Payments are paused. You are on Free limits until you resume.";
    default:
      return `Status: ${sub.status}.`;
  }
}

function Billing({ me, reload }: { me: Me; reload: () => void }) {
  const router = useRouter();
  const [status, setStatus] = useState<BillingStatus | null>(null);
  const [disabled, setDisabled] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const returned = router.query.checkout === "success";
  const [waiting, setWaiting] = useState(returned);

  useEffect(() => {
    account
      .billing()
      .then(setStatus)
      .catch((err) => {
        if (err instanceof ApiError && err.code === "BILLING_DISABLED") setDisabled(true);
        else setError(errorText(err));
      });
  }, [me]);

  // Back from checkout: access changes when Lemon Squeezy's webhook lands,
  // usually within seconds. Poll briefly instead of asking for a refresh.
  // The deadline is fixed when the page opens: reload() replaces `me`, which
  // re-runs this effect, so a counter inside it would never run out.
  const deadline = useRef(Date.now() + 60_000);
  useEffect(() => {
    if (!waiting) return;
    if (me.plan?.id && me.plan.id !== "free") {
      setWaiting(false);
      return;
    }
    if (Date.now() >= deadline.current) {
      setWaiting(false);
      return;
    }
    const timer = setTimeout(reload, 3000);
    return () => clearTimeout(timer);
  }, [waiting, me, reload]);

  async function go(action: string, fn: () => Promise<{ url: string }>) {
    setBusy(action);
    setError(null);
    try {
      const { url } = await fn();
      window.location.href = url;
    } catch (err) {
      setError(errorText(err));
      setBusy(null);
    }
  }

  const current = me.plan?.id ?? "free";
  const sub = status?.subscription ?? null;
  const holds = !!sub?.holds_plan;

  return (
    <>
      {returned && (
        <div className={styles.notice} role="status">
          {waiting
            ? "Payment received. Your plan is being activated; this page updates on its own."
            : current !== "free"
              ? `You're on ${PLAN_NAMES[current] ?? current}. Thank you!`
              : "Your plan has not updated yet. It can take a few minutes; email support@apimask.dev if it does not."}
        </div>
      )}
      {error && (
        <div className={styles.alert} role="alert">
          {error}
        </div>
      )}

      <section className={styles.card}>
        <p className={styles.label}>Current plan</p>
        <p className={styles.stat}>{PLAN_NAMES[current] ?? current}</p>
        <p className={styles.muted}>
          {formatNumber(me.plan?.monthly_quota_units ?? 0)} units a month · current period{" "}
          {formatDate(me.plan?.period_start)} – {formatDate(me.plan?.period_end)}
        </p>
        {sub && <p className={styles.muted}>{subscriptionLine(sub)}</p>}
        {holds && (
          <p className={styles.muted}>
            <button
              type="button"
              className={styles.buttonSecondary}
              disabled={busy === "portal"}
              onClick={() => go("portal", account.portal)}
            >
              {busy === "portal" ? "Opening…" : "Manage subscription"}
            </button>
          </p>
        )}
      </section>

      <div className={styles.plans}>
        {PLANS.map((p) => {
          const isCurrent = p.id === current;
          const buyable = !disabled && !holds && (status?.purchasable ?? []).includes(p.id);
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
              ) : p.id === "free" ? null : holds ? (
                <span className={styles.muted}>Change plans from Manage subscription.</span>
              ) : (
                <button
                  type="button"
                  className={styles.button}
                  disabled={!buyable || busy !== null}
                  onClick={() => go(p.id, () => account.checkout(p.id))}
                >
                  {busy === p.id ? "Opening checkout…" : buyable ? `Upgrade to ${PLAN_NAMES[p.id]}` : "Opening soon"}
                </button>
              )}
            </section>
          );
        })}
      </div>
      <p className={styles.muted}>
        Payments are handled by Lemon Squeezy, our merchant of record, which also handles sales tax and VAT. Cancel any
        time; your plan stays active until the end of the paid period. Questions:{" "}
        <a href="mailto:support@apimask.dev">support@apimask.dev</a>.
      </p>
    </>
  );
}

export default function BillingPage() {
  return <DashboardShell title="Billing">{(me, reload) => <Billing me={me} reload={reload} />}</DashboardShell>;
}
