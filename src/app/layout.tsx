import type { Metadata } from "next";
import { APP } from "@/config/constants";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: APP.name, template: `%s · ${APP.name}` },
  description: "Smart car management",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
