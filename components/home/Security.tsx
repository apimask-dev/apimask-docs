import Link from "next/link";
import { ArrowIcon } from "../ui/ArrowIcon";
import { Section, SectionHead } from "./Section";
import styles from "./Home.module.css";

// Claims are limited to what the gateway actually does
// (apimask-platform/internal/apikeys, internal/gateway). No compliance
// certifications are asserted — ApiMask holds none, and claiming SOC 2 or an
// audit status it doesn't have would be a real problem.
const points = [
  {
    title: "Keys are stored as hashes",
    copy: "A key is shown once when you create it. ApiMask keeps only a hash, and you can rotate or revoke any key from the dashboard.",
  },
  {
    title: "Test keys never spend quota",
    copy: "apim_test_ keys have their own small allowance, so a CI run or a local script can't use up your live quota.",
  },
  {
    title: "Request bodies aren't retained",
    copy: "Payloads are processed to build the response and then discarded — relevant if you're passing customer emails or page content.",
  },
  {
    title: "Keys only in headers",
    copy: "Keys are accepted in the Authorization header, never in the query string, so they don't end up in access logs or browser history.",
  },
];

export function Security() {
  return (
    <Section tint label="Security">
      <SectionHead
        eyebrow="Security"
        title="Fewer secrets to look after."
        lead="The things a reviewer asks about first: how keys are stored, where they're accepted, and what happens to your payloads."
      />
      <div className={styles.split}>
        <ul className={styles.featureList}>
          {points.slice(0, 2).map((point) => (
            <li key={point.title}>
              <h3>{point.title}</h3>
              <p>{point.copy}</p>
            </li>
          ))}
        </ul>
        <ul className={styles.featureList}>
          {points.slice(2).map((point) => (
            <li key={point.title}>
              <h3>{point.title}</h3>
              <p>{point.copy}</p>
            </li>
          ))}
          <li>
            <Link href="/authentication" className={styles.moreLink} prefetch={false}>
              How authentication works
              <ArrowIcon />
            </Link>
          </li>
        </ul>
      </div>
    </Section>
  );
}
