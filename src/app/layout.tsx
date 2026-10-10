import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { APP } from "@/config/constants";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: { default: APP.name, template: `%s · ${APP.name}` },
  description: "Smart car management: consumption, maintenance, costs, reminders and garages.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
