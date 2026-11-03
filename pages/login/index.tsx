import { useRouter } from "next/router";
import { useState, type FormEvent } from "react";
import { AuthLayout } from "../../components/dashboard/DashboardShell";
import styles from "../../components/dashboard/Dashboard.module.css";
import { Turnstile, TURNSTILE_SITE_KEY } from "../../components/dashboard/Turnstile";
import { account, errorText } from "../../lib/account";
import { rememberNext } from "../../lib/next";
import { storedSource } from "../../lib/source";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [resetKey, setResetKey] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sentTo, setSentTo] = useState<string | null>(null);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      // The emailed link carries only the token, so remember where to return.
      rememberNext(router.query.next);
      await account.login(email.trim(), token, storedSource());
      setSentTo(email.trim());
    } catch (err) {
      setError(errorText(err));
      // A Turnstile token is single use; get a fresh one for the next try.
      setResetKey((k) => k + 1);
    } finally {
      setBusy(false);
    }
  }

  if (sentTo) {
    return (
      <AuthLayout title="Check your email">
        <h1>Check your email</h1>
        <p className={styles.muted}>
          We sent a sign-in link to <strong>{sentTo}</strong>. It works once and expires in 15 minutes.
        </p>
        <p className={styles.muted}>
          No email? Check spam, or{" "}
          <button
            type="button"
            className={styles.linkButton}
            onClick={() => {
              setSentTo(null);
              setResetKey((k) => k + 1);
            }}
          >
            try again
          </button>
          .
        </p>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Sign in">
      <h1>Sign in to ApiMask</h1>
      <p className={styles.muted}>
        New or returning, enter your email and we will send you a link. No password. The Free plan includes 1,000
        units a month, one per simple call.
      </p>
      {!TURNSTILE_SITE_KEY ? (
        <div className={styles.alert} role="alert">
          Sign-in is not available yet.
        </div>
      ) : (
        <form className={styles.stack} onSubmit={submit}>
          <label className={styles.field}>
            Work email
            <input
              className={styles.input}
              type="email"
              name="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <Turnstile onToken={setToken} resetKey={resetKey} />
          {error && (
            <div className={styles.alert} role="alert">
              {error}
            </div>
          )}
          <button className={styles.button} type="submit" disabled={busy || !token || !email}>
            {busy ? "Sending…" : "Email me a sign-in link"}
          </button>
        </form>
      )}
    </AuthLayout>
  );
}
