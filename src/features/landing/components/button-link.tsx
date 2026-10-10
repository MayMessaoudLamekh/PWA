import Link from "next/link";
import { cn } from "@/lib/format";
import { ArrowRight } from "./icons";

/** Template "Read More" button, recoloured. */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline";
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-3 rounded px-7 py-3 text-base font-medium transition",
        variant === "primary"
          ? "bg-primary text-bg hover:bg-accent"
          : "border-2 border-primary text-primary hover:bg-primary hover:text-bg",
        className,
      )}
    >
      {children}
      <ArrowRight />
    </Link>
  );
}
