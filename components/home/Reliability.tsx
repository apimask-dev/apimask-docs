import { Section, SectionHead } from "./Section";
import styles from "./Home.module.css";

// Deliberately not a "600,000 developers / 200M requests / 243ms" wall. Those
// numbers are the norm for this kind of page and they are the reason it works,
// but ApiMask cannot substantiate any of them, and publishing invented metrics
// is both dishonest and a liability. Everything below is a property of how the
// APIs are built and can be checked against the docs.
const guarantees = [
  {
    value: "One envelope",
    copy: "Every endpoint returns the same { success, data, error, meta } shape, so error handling is written once and reused everywhere.",
  },
  {
    value: "Versioned paths",
    copy: "Endpoints are namespaced under /v1. Breaking changes ship as a new version, never as a silent change to an existing one.",
  },
  {
    value: "Documented errors",
    copy: "A single error catalog covers every product, with the status codes and payloads to expect and what to do about each.",
  },
  {
    value: "No stored payloads",
    copy: "Requests are processed and returned. Bodies are not retained after the response is sent.",
  },
];

export function Reliability() {
  return (
    <Section label="Reliability">
      <SectionHead
        eyebrow="Built to integrate"
        title="Predictable in the ways that cost you time."
        lead="The expensive part of consuming an API isn't the first call — it's every inconsistency you discover afterwards."
      />
      <div className={styles.statGrid}>
        {guarantees.map((item) => (
          <div key={item.value} className={styles.stat}>
            <b>{item.value}</b>
            <p>{item.copy}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
