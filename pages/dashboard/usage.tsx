import { useEffect, useMemo, useState } from "react";
import { DashboardShell, formatDate, formatNumber } from "../../components/dashboard/DashboardShell";
import styles from "../../components/dashboard/Dashboard.module.css";
import { account, currentPeriod, errorText, type Me, type UsageDay, type UsagePeriod } from "../../lib/account";

function Usage({ me }: { me: Me }) {
  const [periods, setPeriods] = useState<UsagePeriod[] | null>(null);
  const [daily, setDaily] = useState<UsageDay[]>([]);
  const [env, setEnv] = useState<"live" | "test">("live");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    account
      .usage()
      .then((u) => {
        setPeriods(u.periods);
        setDaily(u.daily);
      })
      .catch((err) => setError(errorText(err)));
  }, []);

  const rows = useMemo(() => daily.filter((d) => d.env === env), [daily, env]);
  const current = useMemo(() => currentPeriod(periods ?? [], env, me), [periods, env, me]);

  return (
    <>
      {error && (
        <div className={styles.alert} role="alert">
          {error}
        </div>
      )}
      <section className={styles.card}>
        <div className={styles.form}>
          <label className={styles.field}>
            Environment
            <select className={styles.select} value={env} onChange={(e) => setEnv(e.target.value as "live" | "test")}>
              <option value="live">Live</option>
              <option value="test">Test</option>
            </select>
          </label>
        </div>
        <p className={styles.label} style={{ marginTop: 16 }}>
          {formatDate(me.plan?.period_start)} – {formatDate(me.plan?.period_end)}
        </p>
        <p className={styles.stat}>
          {periods ? formatNumber(current?.consumed ?? 0) : "…"}{" "}
          <span className={styles.muted}>/ {formatNumber(current?.quota_units ?? (env === "live" ? me.plan?.monthly_quota_units ?? 0 : 0))} units</span>
        </p>
        <p className={styles.muted}>
          Simple calls cost 1 unit; bulk calls cost 1 unit per address. Usage is recorded within about a minute.
        </p>
      </section>

      <section className={styles.card}>
        <h2 className={styles.cardTitle}>By day and endpoint</h2>
        {!periods ? (
          <p className={styles.muted}>Loading…</p>
        ) : rows.length === 0 ? (
          <p className={styles.muted}>No {env} requests yet.</p>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Endpoint</th>
                  <th className={styles.num}>Requests</th>
                  <th className={styles.num}>Units</th>
                  <th className={styles.num}>4xx</th>
                  <th className={styles.num}>5xx</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((d) => (
                  <tr key={`${d.day}-${d.endpoint}`}>
                    <td>{formatDate(d.day)}</td>
                    <td className={styles.mono}>{d.endpoint}</td>
                    <td className={styles.num}>{formatNumber(d.requests)}</td>
                    <td className={styles.num}>{formatNumber(d.units)}</td>
                    <td className={styles.num}>{formatNumber(d.errors_4xx)}</td>
                    <td className={styles.num}>{formatNumber(d.errors_5xx)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}

export default function UsagePage() {
  return <DashboardShell title="Usage">{(me) => <Usage me={me} />}</DashboardShell>;
}
