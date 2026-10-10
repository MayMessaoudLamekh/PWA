import Image from "next/image";
import { cn } from "@/lib/format";
import { ButtonLink } from "./button-link";
import { SectionTitle } from "./section-title";

const FEATURES = [
  {
    image: "/images/landing/img-1.png",
    title: "Consumption tracking",
    text: "Log every refuel and SmartCar calculates your real consumption in L/100km, with a chart that shows how it evolves over time.",
    tag: "L/100km · fuel costs",
  },
  {
    image: "/images/landing/img-2.png",
    title: "Maintenance & reminders",
    text: "Keep your full service history and get reminders by date or mileage. SmartCar predicts when your next maintenance is due from the way you drive.",
    tag: "Next service prediction",
  },
  {
    image: "/images/landing/img-3.png",
    title: "Costs & insurance",
    text: "Fuel, maintenance and insurance in one place: total spent, cost per kilometre, monthly evolution and alerts before your policy expires.",
    tag: "Cost per km · renewals",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="bg-surface px-6 py-24">
      <SectionTitle>What SmartCar Does</SectionTitle>
      <div className="mx-auto mt-16 max-w-6xl space-y-14">
        {FEATURES.map((f, i) => (
          <article key={f.title} className="grid items-center gap-8 border border-border/30 bg-panel p-6 shadow-xl shadow-black/30 md:grid-cols-2">
            <Image src={f.image} alt={f.title} width={619} height={413} className={cn("h-full w-full object-cover", i % 2 === 1 && "md:order-2")} />
            <div className="md:px-4">
              <h3 className="flex items-baseline gap-4 text-2xl font-bold text-text">
                <span className="text-xl font-medium text-border">{String(i + 1).padStart(2, "0")}</span>
                {f.title}
              </h3>
              <p className="mt-6 leading-8 text-text/80">{f.text}</p>
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                <p><span className="text-primary">Includes</span> <span className="text-text">{f.tag}</span></p>
                <ButtonLink href="/register">Try it</ButtonLink>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
