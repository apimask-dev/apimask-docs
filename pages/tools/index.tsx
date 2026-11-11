import Link from "next/link";
import { ToolLayout } from "../../components/tools/ToolLayout";
import { SIGNUP_HREF } from "../../lib/products";

export default function ToolsIndex() {
  return (
    <ToolLayout
      slug={null}
      title="Free Email and Domain Tools: Disposable Email, DMARC and SPF Checkers | ApiMask"
      description="Free tools to check whether an email address is disposable, and to look up and explain a domain's DMARC and SPF records. Each runs on the ApiMask API."
      h1="Free email and domain checkers"
      lead={
        <p>
          Quick checks for signup forms and mail setup. Each tool runs on the same API you can call from your own
          code, with a <Link href={SIGNUP_HREF}>free key</Link> for 1,000 checks a month.
        </p>
      }
    >
      <h2>About these tools</h2>
      <p>
        Results come from live DNS lookups, and the addresses and domains you enter are not stored.
        The tools allow about 30 checks an hour per visitor in total, and ask you to pass a quick Cloudflare Turnstile
        check, which keeps scripts from using up the free quota.
      </p>
    </ToolLayout>
  );
}
