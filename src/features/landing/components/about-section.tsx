import Image from "next/image";
import { ButtonLink } from "./button-link";
import { SectionTitle } from "./section-title";

export function AboutSection() {
  return (
    <section id="about" className="bg-bg px-6 py-24 md:px-16">
      <div className="mx-auto grid max-w-7xl items-center gap-14 md:grid-cols-2">
        <Image src="/images/landing/about-img.png" alt="Cars in a showroom" width={775} height={565} className="w-full" />
        <div>
          <SectionTitle align="left">About SmartCar</SectionTitle>
          <p className="mt-8 leading-8 text-text/85">
            SmartCar is a platform to manage your car. You enter its model, mileage, refuels and maintenance — the
            system turns them into clear insights: your real consumption, what you spend, which services are due and
            how everything evolves over time. You can also keep your insurance policies, find partner garages and
            send complaints, all from one account.
          </p>
          <ButtonLink href="/register" className="mt-10">Create your account</ButtonLink>
        </div>
      </div>
    </section>
  );
}
