import type { HTMLAttributes, ReactNode } from "react";
import styles from "./Badge.module.css";
import { cx } from "./cx";

type Tone = "brand" | "green" | "neutral" | "soon";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
  children: ReactNode;
}

export function Badge({ tone = "neutral", className, children, ...rest }: BadgeProps) {
  return (
    <span className={cx(styles.badge, styles[tone], className)} {...rest}>
      {children}
    </span>
  );
}
