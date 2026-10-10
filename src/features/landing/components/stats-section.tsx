import { formatNumber } from "@/lib/format";
import { Car, MapPin, Users, Wrench } from "./icons";

type Stats = { drivers: number; cars: number; garages: number; services: number };

/** Template counters band — the numbers come live from the database. */
export function StatsSection({ stats }: { stats: Stats }) {
  const items = [
    { icon: Users, value: stats.drivers, label: "Drivers" },
    { icon: Car, value: stats.cars, label: "Cars tracked" },
    { icon: Wrench, value: stats.services, label: "Services logged" },
    { icon: MapPin, value: stats.garages, label: "Partner garages" },
  ];

  return (
    <section className="bg-primary px-6 py-20 text-bg">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ icon: Icon, value, label }) => (
          <div key={label}>
            <p className="flex items-center gap-4 text-4xl font-bold">
              <Icon width={36} height={36} />
              {formatNumber(value)}
            </p>
            <p className="mt-2 text-lg font-semibold uppercase">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
