import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { account, ApiError, errorText, type Me } from "../../lib/account";
import styles from "./Dashboard.module.css";

const NAV = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/keys", label: "API keys" },
  { href: "/dashboard/usage", label: "Usage" },
  { href: "/dashboard/billing", label: "Billing" },
];

function PageHead({ title }: { title: string }) {
  return (
    <Head>
      <title>{`${title} | ApiMask`}</title>
      <meta name="robots" content="noindex,nofollow" />
    </Head>
  );
}

/** Centered card layout for sign-in pages. */
export function AuthLayout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className={styles.authPage}>
      <PageHead title={title} />
      <Link href="/" className={styles.brand}>
        ApiMask
      </Link>
      <main className={styles.authCard}>{children}</main>
    </div>
  );
}

interface ShellProps {
  title: string;
  children: (me: Me, reload: () => void) => ReactNode;
}

/**
 * Signed-in layout. Loads /account/me; a 401 sends the visitor to sign in and
 * back here afterwards.
 */
export function DashboardShell({ title, children }: ShellProps) {
  const router = useRouter();
  const [me, setMe] = useState<Me | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    account
      .me()
      .then((m) => {
        setMe(m);
        setError(null);
      })
      .catch((err) => {
        if (err instanceof ApiError && err.status === 401) {
          router.replace(`/login?next=${encodeURIComponent(router.asPath)}`);
          return;
        }
        setError(errorText(err));
      });
  }, [router]);

  useEffect(() => {
    if (router.isReady) load();
  }, [router.isReady, load]);

  async function signOut() {
    try {
      await account.logout();
    } finally {
      router.replace("/login");
    }
  }

  return (
    <div className={styles.page}>
      <PageHead title={title} />
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link href="/" className={styles.brand}>
            ApiMask
          </Link>
          <nav className={styles.nav} aria-label="Dashboard">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={router.pathname === item.href ? styles.navActive : styles.navLink}
                aria-current={router.pathname === item.href ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className={styles.account}>
            {me && <span className={styles.email}>{me.email}</span>}
            <button type="button" className={styles.linkButton} onClick={signOut}>
              Sign out
            </button>
          </div>
        </div>
      </header>
      <main className={styles.main}>
        <h1 className={styles.title}>{title}</h1>
        {error && (
          <div className={styles.alert} role="alert">
            {error}{" "}
            <button type="button" className={styles.linkButton} onClick={load}>
              Retry
            </button>
          </div>
        )}
        {!me && !error && <p className={styles.muted}>Loading…</p>}
        {me && children(me, load)}
      </main>
    </div>
  );
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat("en-US").format(n);
}

export function formatDate(iso: string | null | undefined): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" });
}

export const PLAN_NAMES: Record<string, string> = { free: "Free", starter: "Starter", pro: "Pro" };
