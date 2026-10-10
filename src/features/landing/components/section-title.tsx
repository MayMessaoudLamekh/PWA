import { cn } from "@/lib/format";

/** Uppercase title with the short coloured underline used across the template. */
export function SectionTitle({ children, align = "center", className }: { children: React.ReactNode; align?: "center" | "left"; className?: string }) {
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      <h2 className="text-3xl font-bold uppercase tracking-tight text-text sm:text-4xl">{children}</h2>
      <span className={cn("mt-4 block h-1.5 w-24 bg-primary", align === "center" && "mx-auto")} />
    </div>
  );
}
