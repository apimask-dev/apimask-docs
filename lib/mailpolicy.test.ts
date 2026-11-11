import { test } from "node:test";
import assert from "node:assert/strict";
import { analyzeDmarc, analyzeSpf, parentDomain, parseTags, spfRecordsOf } from "./mailpolicy.ts";

test("DMARC tags are parsed case-insensitively and the first copy wins", () => {
  assert.deepEqual(parseTags("v=DMARC1; P=reject; rua=mailto:a@x.com; p=none"), {
    v: "DMARC1",
    p: "reject",
    rua: "mailto:a@x.com",
  });
});

test("DMARC verdicts", () => {
  assert.equal(analyzeDmarc(null), null);
  assert.equal(analyzeDmarc("v=DMARC1; p=reject")?.verdict.level, "good");
  assert.equal(analyzeDmarc("v=DMARC1; p=quarantine; rua=mailto:d@x.com")?.verdict.level, "good");
  assert.equal(analyzeDmarc("v=DMARC1; p=none")?.verdict.level, "warn");
  assert.equal(analyzeDmarc("v=DMARC1; rua=mailto:d@x.com")?.verdict.level, "bad");
  assert.equal(analyzeDmarc("v=DMARC1; p=block")?.verdict.level, "bad");
});

test("DMARC findings: partial pct, missing reports, subdomain policy", () => {
  const d = analyzeDmarc("v=DMARC1; p=quarantine; pct=25; sp=none")!;
  assert.equal(d.pct, 25);
  assert.equal(d.subdomainPolicy, "none");
  const texts = d.findings.map((f) => f.text).join("\n");
  assert.match(texts, /only 25%/);
  assert.match(texts, /No rua=/);
  assert.match(texts, /sp=none/);
  assert.deepEqual(analyzeDmarc("v=DMARC1;p=reject;rua=mailto:a@x.com, mailto:b@y.com")!.reportsTo, [
    "mailto:a@x.com",
    "mailto:b@y.com",
  ]);
});

test("SPF records are picked out of the TXT records", () => {
  assert.deepEqual(spfRecordsOf(["google-site-verification=abc", "v=spf1 -all", "v=spf10 x"]), ["v=spf1 -all"]);
  assert.deepEqual(spfRecordsOf(undefined), []);
});

test("SPF verdicts follow the all qualifier", () => {
  assert.equal(analyzeSpf([]), null);
  assert.equal(analyzeSpf(["v=spf1 include:_spf.google.com -all"])!.verdict.level, "good");
  assert.equal(analyzeSpf(["v=spf1 include:_spf.google.com ~all"])!.verdict.level, "good");
  assert.equal(analyzeSpf(["v=spf1 +all"])!.verdict.level, "bad");
  assert.equal(analyzeSpf(["v=spf1 all"])!.verdict.level, "bad");
  assert.equal(analyzeSpf(["v=spf1 ?all"])!.verdict.level, "warn");
  assert.equal(analyzeSpf(["v=spf1 ip4:192.0.2.1"])!.verdict.level, "warn");
  assert.match(analyzeSpf(["v=spf1 redirect=_spf.example.com"])!.verdict.text, /_spf\.example\.com/);
});

test("two SPF records is a permerror", () => {
  const s = analyzeSpf(["v=spf1 -all", "v=spf1 include:x.com ~all"])!;
  assert.equal(s.verdict.level, "bad");
  assert.match(s.verdict.text, /2 SPF records/);
});

test("SPF lookups are counted at the top level", () => {
  const s = analyzeSpf(["v=spf1 a mx include:a.com include:b.com ip4:192.0.2.0/24 exists:%{i}.x.com ~all"])!;
  assert.equal(s.lookups, 5);
  assert.deepEqual(s.includes, ["a.com", "b.com"]);
  const many = analyzeSpf(["v=spf1 " + Array.from({ length: 11 }, (_, i) => `include:s${i}.com`).join(" ") + " -all"])!;
  assert.equal(many.findings[0].level, "bad");
  assert.match(analyzeSpf(["v=spf1 ptr -all"])!.findings.map((f) => f.text).join(), /ptr is deprecated/);
  assert.match(analyzeSpf(["v=spf1 -all include:x.com"])!.findings.map((f) => f.text).join(), /after all/);
});

test("parent domain guesses avoid registry suffixes", () => {
  assert.equal(parentDomain("mail.example.com"), "example.com");
  assert.equal(parentDomain("example.com"), null);
  assert.equal(parentDomain("example.co.uk"), null);
  assert.equal(parentDomain("a.example.co.uk"), "example.co.uk");
});
