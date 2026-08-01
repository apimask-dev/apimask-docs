import type { ReactNode } from "react";
import styles from "./highlight.module.css";

/* ---------------------------------------------------------------------------
   Snippet highlighting for the hand-built code panels (the homepage sample and
   the hero request/response card).

   MDX code blocks go through Shiki via Nextra, but these two panels are React,
   not Markdown, so they need their own pass. This is deliberately a small
   regex tokenizer rather than pulling Shiki into the client bundle: the
   snippets are fixed, short, and only ever shell / JavaScript / Python / JSON.
   Both paths draw from the same --syntax-* tokens, so the output matches.
--------------------------------------------------------------------------- */

function source(...parts: RegExp[]): RegExp {
  return new RegExp(parts.map((part) => part.source).join("|"), "g");
}

// Order is significant: earlier alternatives win at the same position, so
// strings and comments must precede the patterns that could match inside them.
const CODE_PATTERN = source(
  // Comment markers only count at the start of a token, so "https://host" and
  // a "#fragment" inside a URL are not mistaken for the start of a comment.
  /(?<=^|\s)(#[^\n]*|\/\/[^\n]*)/,
  /("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)/,
  /(\$\{?[A-Za-z_][A-Za-z0-9_]*\}?)/,
  /\b(const|let|var|await|async|function|return|import|from|as|export|if|else|for|in|new|None|True|False)\b/,
  // Anchored to a word start so hyphens inside hosts and paths
  // ("apimask-developer-utilities-api") are not read as CLI flags.
  /(?<=^|[\s(])(--?[A-Za-z][A-Za-z0-9-]*)/,
  /\b(curl|fetch|requests|process|os|URL|JSON|console|print|npm|npx|pip|python3?|node|jq|echo)\b/,
  /\b(\d+(?:\.\d+)?)\b/,
);

const CODE_CLASSES = [
  styles.comment,
  styles.string,
  styles.variable,
  styles.keyword,
  styles.flag,
  styles.builtin,
  styles.number,
];

const JSON_PATTERN = source(
  /("(?:\\.|[^"\\])*")(?=\s*:)/,
  /("(?:\\.|[^"\\])*")/,
  /\b(true|false)\b/,
  /\b(null)\b/,
  /(-?\d+(?:\.\d+)?)/,
);

const JSON_CLASSES = [
  styles.jsonKey,
  styles.jsonString,
  styles.jsonBoolean,
  styles.jsonNull,
  styles.jsonNumber,
];

function tokenize(value: string, pattern: RegExp, classes: string[]): ReactNode[] {
  const parts: ReactNode[] = [];
  let cursor = 0;
  let match: RegExpExecArray | null;

  pattern.lastIndex = 0;

  while ((match = pattern.exec(value)) !== null) {
    if (match.index > cursor) parts.push(value.slice(cursor, match.index));

    // Group N+1 corresponds to classes[N]; exactly one group ever matches.
    const group = classes.findIndex((_, index) => match![index + 1] !== undefined);

    parts.push(
      <span className={classes[group]} key={`${match.index}-${match[0]}`}>
        {match[0]}
      </span>,
    );
    cursor = pattern.lastIndex;
  }

  if (cursor < value.length) parts.push(value.slice(cursor));
  return parts;
}

/** Highlights shell, JavaScript, and Python snippets. */
export function highlightCode(value: string): ReactNode[] {
  return tokenize(value, CODE_PATTERN, CODE_CLASSES);
}

/** Highlights a JSON document (request bodies, responses). */
export function highlightJson(value: string): ReactNode[] {
  return tokenize(value, JSON_PATTERN, JSON_CLASSES);
}
