import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AuthLayout } from "../../components/dashboard/DashboardShell";
import styles from "../../components/dashboard/Dashboard.module.css";
import { account, errorText } from "../../lib/account";
import { takeNext } from "../../lib/next";

/**
 * Redeems a sign-in link. The token is spent only when the person clicks
 * Continue: mail scanners that open (and even render) links cannot use it.
 */
export default function VerifyPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!router.isReady) return;
    const t = router.query.token;
    if (typeof t === "string" && t) {
      setToken(t);
      // Drop the token from the address bar and history, keeping Next's own
      // history state so its router still recognizes the entry.
      window.history.replaceState(window.history.state, "", "/login/verify");
    } else if (!token) {
      setError("This page needs the link from your sign-in email.");
    }
  }, [router.isReady, router.query.token, token]);

  async function continueSignIn() {
    if (!token) return;
    setBusy(true);
    setError(null);
    try {
      await account.verify(token);
      router.replace(takeNext());
    } catch (err) {
      setError(errorText(err));
      setBusy(false);
    }
  }

  return (
    <AuthLayout title="Finish signing in">
      <Head>
        {/* Keep the token out of Referer headers to third-party scripts. */}
        <meta name="referrer" content="no-referrer" />
      </Head>
      <h1>Finish signing in</h1>
      {error ? (
        <>
          <div className={styles.alert} role="alert">
            {error}
          </div>
          <Link href="/login" className={styles.button}>
            Get a new link
          </Link>
        </>
      ) : (
        <div className={styles.stack}>
          <p className={styles.muted}>Continue to your ApiMask dashboard.</p>
          <button className={styles.button} type="button" onClick={continueSignIn} disabled={!token || busy}>
            {busy ? "Signing in…" : "Continue"}
          </button>
        </div>
      )}
    </AuthLayout>
  );
}
