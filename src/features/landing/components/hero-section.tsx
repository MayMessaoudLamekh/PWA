"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/format";
import { ArrowRight, ChevronLeft, ChevronRight } from "./icons";

const SLIDES = [
  {
    title: ["Smart Car", "Management"],
    text: "Track the consumption, maintenance and costs of your car in one place — from your first refuel to your next service.",
  },
  {
    title: ["Never Miss", "A Service"],
    text: "Based on your driving history, SmartCar predicts when your next maintenance is due and reminds you on time.",
  },
  {
    title: ["Know What", "You Spend"],
    text: "Fuel, maintenance and insurance in one dashboard, with charts that show how your costs evolve month after month.",
  },
];

export function HeroSection() {
  const [index, setIndex] = useState(0);
  const go = (delta: number) => setIndex((i) => (i + delta + SLIDES.length) % SLIDES.length);

  // Auto-advance every 6s; restarts when the user changes slide.
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), 6000);
    return () => clearInterval(id);
  }, [index]);

  const slide = SLIDES[index];

  return (
    <section id="home" className="relative overflow-hidden bg-surface">
      <Image src="/images/landing/banner-bg.png" alt="" fill priority className="object-cover opacity-70" />
      <div className="absolute inset-0 bg-gradient-to-r from-bg/90 via-bg/60 to-transparent" />

      <div className="relative grid min-h-[720px] items-center gap-10 px-6 pb-28 pt-40 md:grid-cols-2 md:pl-28 md:pr-16">
        <div key={index} className="max-w-xl animate-[fadeIn_.6s_ease]">
          <h1 className="text-5xl font-bold leading-tight text-text sm:text-6xl">
            {slide.title[0]}
            <br />
            <span className="text-primary">{slide.title[1]}</span>
          </h1>
          <p className="mt-6 text-lg text-text/90">{slide.text}</p>

          {/* Template search bar → quick start: email goes to the register form */}
          <form action="/register" className="mt-8 flex max-w-lg">
            <input
              type="email"
              name="email"
              placeholder="Enter your email to get started"
              className="w-full bg-text/90 px-6 py-4 text-bg placeholder:text-muted focus:outline-none"
            />
            <button aria-label="Get started" className="bg-primary px-6 text-bg transition hover:bg-accent">
              <ArrowRight />
            </button>
          </form>
          <p className="mt-4 text-sm text-muted">
            Already have an account? <Link href="/login" className="text-primary hover:underline">Sign in</Link>
          </p>

          <div className="mt-8 flex gap-2">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                aria-label={`Slide ${i + 1}`}
                onClick={() => setIndex(i)}
                className={cn("h-1.5 rounded-full transition-all", i === index ? "w-10 bg-primary" : "w-5 bg-border")}
              />
            ))}
          </div>
        </div>

        <div className="relative -mr-16 hidden md:block">
          <Image src="/images/landing/banner-img.png" alt="Sports car" width={982} height={740} className="ml-auto w-full max-w-3xl" />
        </div>
      </div>

      <button aria-label="Previous" onClick={() => go(-1)} className="absolute bottom-10 left-6 flex size-14 items-center justify-center rounded-full bg-primary text-bg transition hover:bg-accent md:left-5 md:top-1/2 md:bottom-auto">
        <ChevronLeft />
      </button>
      <button aria-label="Next" onClick={() => go(1)} className="absolute bottom-10 right-6 flex size-14 items-center justify-center rounded-full bg-text text-bg transition hover:bg-primary md:right-5 md:top-1/2 md:bottom-auto">
        <ChevronRight />
      </button>
    </section>
  );
}
