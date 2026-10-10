import Image from "next/image";
import { cn } from "@/lib/format";
import { ButtonLink } from "./button-link";
import { SectionTitle } from "./section-title";

type Garage = { id: string; name: string; city: string; address: string; services: string | null };

const IMAGES = ["/images/landing/img-4.png", "/images/landing/img-5.png", "/images/landing/img-6.png"];

/** Template "Featured vehicles" cards, used for the partner garages from the database. */
export function GaragesSection({ garages }: { garages: Garage[] }) {
  return (
    <section id="garages" className="bg-bg px-6 py-24">
      <SectionTitle>Partner Garages</SectionTitle>

      {garages.length === 0 ? (
        <p className="mt-12 text-center text-muted">Partner garages will appear here soon.</p>
      ) : (
        <div className="mx-auto mt-16 flex max-w-6xl flex-wrap justify-center gap-10">
          {garages.map((g, i) => {
            const highlighted = i === 1;
            return (
              <article key={g.id} className="flex w-full flex-col items-center bg-surface pb-8 text-center md:w-[calc((100%-5rem)/3)]">
                <div className="relative w-full">
                  <Image src={IMAGES[i % IMAGES.length]} alt={g.name} width={375} height={342} className="h-64 w-full object-cover" />
                  <p
                    className={cn(
                      "absolute inset-x-4 -bottom-6 py-4 text-lg",
                      highlighted ? "bg-text text-bg shadow-lg" : "bg-primary text-bg",
                    )}
                  >
                    📍 {g.city}
                  </p>
                </div>
                <h3 className="mt-14 text-2xl font-bold text-text">{g.name}</h3>
                <p className="mt-4 max-w-xs leading-7 text-text/75">
                  {g.address}
                  {g.services && <><br /><span className="text-muted">{g.services}</span></>}
                </p>
                <ButtonLink href="/garages" variant={highlighted ? "outline" : "primary"} className="mt-8">
                  View garages
                </ButtonLink>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
