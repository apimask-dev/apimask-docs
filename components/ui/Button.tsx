import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";
import { cx } from "./cx";

type Variant = "primary" | "secondary" | "rapidapi";
type Size = "md" | "sm";

interface ButtonProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  variant?: Variant;
  size?: Size;
  external?: boolean;
  icon?: ReactNode;
  prefetch?: boolean;
  children: ReactNode;
}

export function Button({
  href,
  variant = "secondary",
  size = "md",
  external = false,
  icon,
  prefetch,
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = cx(styles.button, styles[variant], size === "sm" && styles.sm, className);

  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noreferrer" {...rest}>
        {children}
        {icon && <span className={styles.icon}>{icon}</span>}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} prefetch={prefetch} {...rest}>
      {children}
      {icon && <span className={styles.icon}>{icon}</span>}
    </Link>
  );
}
