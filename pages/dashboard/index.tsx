import Link from "next/link";
import { useEffect, useState } from "react";
import { DashboardShell, formatDate, formatNumber, PLAN_NAMES } from "../../components/dashboard/DashboardShell";
import styles from "../../components/dashboard/Dashboard.module.css";
import { account, API_BASE, currentPeriod, errorText, type ApiKey, type Me, type UsagePeriod } from "../../lib/account";

function Overview({ me }: { me: Me }) {
  const [keys, setKeys] = useState<ApiKey[] | null>(null);
  const [period, setPeriod] = useState<UsagePeriod | undefined>();
  const [usageLoaded, setUsageLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([account.keys(), account.usage()])
      .then(([k, u]) => {
        setKeys(k);
        setPeriod(currentPeriod(u.periods, "live", me));
        setUsageLoaded(true);
      })
      .catch((err) => setError(errorText(err)));
  }, [me]);

  const quota = me.plan?.monthly_quota_units ?? 0;
  const used = period?.consumed ?? 0;
  const pct = quota > 0 ? Math.min(100, Math.round((used / quota) * 100)) : 0;
  const activeKeys = (keys ?? []).filter(
    (k) => !k.revoked_at && (!k.expires_at || new Date(k.expires_at).getTime() > Date.now()),
  );

  return (
    <>
      {error && (
        <div className={styles.alert} role="alert">
          {error}
        </div>
      )}
      <div className={styles.grid}>
        <section className={styles.card}>
          <p className={styles.label}>Plan</p>
          <p className={styles.stat}>{PLAN_NAMES[me.plan?.id ?? ""] ?? me.plan?.id ?? "—"}</p>
          <p className={styles.muted}>
            Renews {formatDate(me.plan?.period_end)} · <Link href="/dashboard/billing">Change plan</Link>
          </p>
        </section>
        <section className={styles.card}>
          <p className={styles.label}>Units used this period (live)</p>
          <p className={styles.stat}>
            {usageLoaded ? formatNumber(used) : "…"} <span className={styles.muted}>/ {formatNumber(quota)}</span>
          </p>
          <div className={styles.meter} aria-label={`${pct}% of monthly quota used`}>
            <div className={`${styles.meterFill} ${pct >= 80 ? styles.meterWarn : ""}`} style={{ width: `${pct}%` }} />
          </div>
          <p className={styles.muted}>
            <Link href="/dashboard/usage">See usage by endpoint</Link>
          </p>
        </section>
        <section className={styles.card}>
          <p className={styles.label}>Active keys</p>
          <p className={styles.stat}>{keys ? activeKeys.length : "…"}</p>
          <p className={styles.muted}>
            <Link href="/dashboard/keys">Manage keys</Link>
          </p>
        </section>
      </div>

      <section className={styles.card}>
        <h2 className={styles.cardTitle}>Make your first call</h2>
        {keys && activeKeys.length === 0 ? (
          <p className={styles.muted}>
            <Link href="/dashboard/keys">Create an API key</Link>, then run:
          </p>
        ) : (
          <p className={styles.muted}>Check an address against the disposable-domain list, MX records and role accounts:</p>
        )}
        <pre className={styles.code}>{`curl ${API_BASE}/v1/utility/email/validate \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"email": "someone@mailinator.com"}'`}</pre>
        <p className={styles.muted}>
          Test keys (<code>apim_test_…</code>) never use your live quota. <Link href="/quickstart">Read the quickstart</Link>.
        </p>
      </section>
    </>
  );
}

export default function DashboardPage() {
  return <DashboardShell title="Overview">{(me) => <Overview me={me} />}</DashboardShell>;
}
