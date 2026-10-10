"use client";

import Link from "next/link";
import { useState } from "react";
import { APP } from "@/config/constants";
import { cn } from "@/lib/format";
import { Close, Menu } from "./icons";

const LEFT = [
  { href: "#home", label: "Home" },
  { href: "#features", label: "Features" },
  { href: "#about", label: "About" },
];
const RIGHT = [
  { href: "#garages", label: "Garages" },
  { href: "#reviews", label: "Reviews" },
  { href: "#contact", label: "Contact" },
];

function Logo() {
  return (
    <span className="text-2xl font-bold text-bg">
      <span className="text-surface">Smart</span>Car
    </span>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const linkClass = "block px-4 py-5 text-sm font-medium uppercase text-text transition hover:text-primary";

  return (
    <header className="absolute inset-x-0 top-0 z-20 px-4 pt-5">
      {/* Desktop: template's centered bar with the logo tab in the middle */}
      <nav className="mx-auto hidden max-w-6xl items-stretch border border-border/40 bg-panel/95 lg:flex">
        {LEFT.map((l) => <a key={l.href} href={l.href} className={cn(linkClass, "flex-1 text-center")}>{l.label}</a>)}
        <Link href="/" className="-my-2 flex flex-[1.3] items-center justify-center rounded bg-primary shadow-lg shadow-primary/20">
          <Logo />
        </Link>
        {RIGHT.map((l) => <a key={l.href} href={l.href} className={cn(linkClass, "flex-1 text-center")}>{l.label}</a>)}
      </nav>

      {/* Mobile */}
      <div className="flex items-center justify-between rounded bg-panel/95 px-4 py-3 lg:hidden">
        <Link href="/" className="rounded bg-primary px-3 py-1"><Logo /></Link>
        <button aria-label="Menu" onClick={() => setOpen(!open)} className="text-text">
          {open ? <Close /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="mt-2 rounded bg-panel/95 lg:hidden">
          {[...LEFT, ...RIGHT].map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block px-4 py-3 text-sm uppercase text-text">
              {l.label}
            </a>
          ))}
          <Link href="/login" className="block px-4 py-3 text-sm uppercase text-primary">Sign in</Link>
        </div>
      )}

      <Link
        href="/login"
        className="absolute right-6 top-7 hidden text-sm font-medium text-primary hover:text-accent xl:block"
      >
        Sign in
      </Link>
      <span className="sr-only">{APP.name}</span>
    </header>
  );
}
