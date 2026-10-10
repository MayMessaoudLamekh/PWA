import Image from "next/image";
import { Quote } from "./icons";
import { SectionTitle } from "./section-title";

// Placeholder testimonial from the template — replace with real user feedback.
export function TestimonialSection() {
  return (
    <section id="reviews" className="bg-surface px-6 py-24">
      <SectionTitle>What Our Drivers Say</SectionTitle>
      <p className="mt-6 text-center text-text/80">Real drivers, real savings on fuel and maintenance.</p>

      <div className="relative mx-auto mt-16 max-w-5xl">
        <Image
          src="/images/landing/client-img.png"
          alt="Driver"
          width={278}
          height={260}
          className="relative z-10 mx-auto w-56 border-4 border-panel shadow-xl md:absolute md:-top-12 md:left-0 md:mx-0 md:w-72"
        />
        <div className="-mt-10 border border-border/30 bg-panel px-8 pb-14 pt-16 shadow-xl shadow-black/30 md:ml-16 md:mt-0 md:pl-80 md:pt-14">
          <h3 className="text-2xl font-bold text-primary">Yassine B.</h3>
          <p className="mt-4 leading-8 text-text/75">
            I used to forget my oil changes and had no idea how much my car really cost me. Now I log every refuel in
            a few seconds, SmartCar tells me when my next service is due, and I can see my monthly spending at a
            glance. It even reminded me before my insurance expired.
          </p>
          <Quote className="absolute bottom-0 right-1/3 translate-y-1/2 text-primary" />
        </div>
      </div>
    </section>
  );
}
