import { useCallback, useEffect, useState, type FormEvent } from "react";
import { DashboardShell, formatDate } from "../../components/dashboard/DashboardShell";
import styles from "../../components/dashboard/Dashboard.module.css";
import { account, errorText, type ApiKey } from "../../lib/account";

function status(k: ApiKey): { label: string; className: string } {
  if (k.revoked_at) return { label: "Revoked", className: styles.badgeOff };
  if (k.expires_at && new Date(k.expires_at).getTime() <= Date.now()) {
    return { label: "Expired", className: styles.badgeOff };
  }
  if (k.expires_at) return { label: `Expires ${formatDate(k.expires_at)}`, className: styles.badge };
  return { label: "Active", className: styles.badgeLive };
}

/** Shows a newly issued key once, with a copy button. */
function NewKey({ value, note, onDone }: { value: string; note: string; onDone: () => void }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }
  return (
    <section className={styles.notice} aria-live="polite">
      <h2 className={styles.cardTitle}>Copy your key now</h2>
      <p className={styles.muted}>{note} It will not be shown again.</p>
      <div className={styles.secret}>
        <code>{value}</code>
        <button type="button" className={styles.buttonSecondary} onClick={copy}>
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <p className={styles.muted}>
        <button type="button" className={styles.linkButton} onClick={onDone}>
          I've stored it
        </button>
      </p>
    </section>
  );
}

function Keys() {
  const [keys, setKeys] = useState<ApiKey[] | null>(null);
  const [name, setName] = useState("");
  const [env, setEnv] = useState<"live" | "test">("live");
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [issued, setIssued] = useState<{ key: string; note: string } | null>(null);

  const load = useCallback(() => {
    account
      .keys()
      .then(setKeys)
      .catch((err) => setError(errorText(err)));
  }, []);
  useEffect(load, [load]);

  async function run(id: string, action: () => Promise<void>) {
    setBusy(id);
    setError(null);
    try {
      await action();
      load();
    } catch (err) {
      setError(errorText(err));
    } finally {
      setBusy(null);
    }
  }

  function create(e: FormEvent) {
    e.preventDefault();
    run("create", async () => {
      const created = await account.createKey(name.trim() || "default", env);
      setIssued({ key: created.key, note: `This ${created.env} key is ready to use.` });
      setName("");
    });
  }

  function revoke(k: ApiKey) {
    if (!window.confirm(`Revoke "${k.name}"? Requests using it will fail immediately.`)) return;
    run(k.id, async () => {
      await account.revokeKey(k.id);
    });
  }

  function rotate(k: ApiKey) {
    if (!window.confirm(`Rotate "${k.name}"? The current key keeps working for 24 hours.`)) return;
    run(k.id, async () => {
      const rotated = await account.rotateKey(k.id);
      setIssued({
        key: rotated.key,
        note: `This replaces "${k.name}", which stops working on ${formatDate(rotated.old_key_expires_at)}.`,
      });
    });
  }

  const usable = (k: ApiKey) => status(k).className !== styles.badgeOff;

  return (
    <>
      {issued && <NewKey value={issued.key} note={issued.note} onDone={() => setIssued(null)} />}
      {error && (
        <div className={styles.alert} role="alert">
          {error}
        </div>
      )}
      <section className={styles.card}>
        <h2 className={styles.cardTitle}>Create a key</h2>
        <form className={styles.form} onSubmit={create}>
          <label className={styles.field}>
            Name
            <input
              className={styles.input}
              value={name}
              maxLength={100}
              placeholder="production"
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label className={styles.field}>
            Environment
            <select className={styles.select} value={env} onChange={(e) => setEnv(e.target.value as "live" | "test")}>
              <option value="live">Live</option>
              <option value="test">Test (free, separate quota)</option>
            </select>
          </label>
          <button type="submit" className={styles.button} disabled={busy === "create"}>
            {busy === "create" ? "Creating…" : "Create key"}
          </button>
        </form>
      </section>

      <section className={styles.card}>
        <h2 className={styles.cardTitle}>Your keys</h2>
        {!keys ? (
          <p className={styles.muted}>Loading…</p>
        ) : keys.length === 0 ? (
          <p className={styles.muted}>No keys yet. Create one above to start calling the API.</p>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Key</th>
                  <th>Env</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th>Last used</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {keys.map((k) => {
                  const s = status(k);
                  return (
                    <tr key={k.id}>
                      <td>{k.name}</td>
                      <td className={styles.mono}>{k.display}</td>
                      <td>{k.env}</td>
                      <td>
                        <span className={s.className}>{s.label}</span>
                      </td>
                      <td>{formatDate(k.created_at)}</td>
                      <td>{formatDate(k.last_used_at)}</td>
                      <td>
                        {usable(k) && (
                          <div className={styles.actions}>
                            <button
                              type="button"
                              className={styles.buttonSecondary}
                              disabled={busy === k.id}
                              onClick={() => rotate(k)}
                            >
                              Rotate
                            </button>
                            <button
                              type="button"
                              className={styles.buttonDanger}
                              disabled={busy === k.id}
                              onClick={() => revoke(k)}
                            >
                              Revoke
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}

export default function KeysPage() {
  return <DashboardShell title="API keys">{() => <Keys />}</DashboardShell>;
}
