import Link from "next/link";
import { ArrowIcon } from "../ui/ArrowIcon";
import { Section, SectionHead } from "./Section";
import styles from "./Home.module.css";

// Claims are limited to what is structurally true of a RapidAPI-distributed
// service. No compliance certifications are asserted — ApiMask holds none, and
// claiming SOC 2 or an audit status it doesn't have would be a real problem.
const points = [
  {
    title: "Keys never touch ApiMask",
    copy: "RapidAPI issues, rotates, and revokes your key, and enforces your plan's quota. There is no second credential to manage or leak.",
  },
  {
    title: "TLS on every call",
    copy: "All traffic to *.p.rapidapi.com is encrypted in transit. Plain HTTP is not served.",
  },
  {
    title: "Request bodies aren't retained",
    copy: "Payloads are processed to build the response and then discarded — relevant if you're passing customer emails or page content.",
  },
  {
    title: "Public data only",
    copy: "The social and website endpoints read publicly accessible data. Nothing requires you to hand over end-user credentials.",
  },
];

export function Security() {
  return (
    <Section tint label="Security">
      <SectionHead
        eyebrow="Security"
        title="Fewer secrets to look after."
        lead="Because distribution runs through RapidAPI, most of the surface area you'd normally have to review simply isn't yours to manage."
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
