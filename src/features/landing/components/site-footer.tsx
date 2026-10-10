import { APP } from "@/config/constants";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/30 bg-bg px-6 py-6 text-center text-sm text-muted">
      © {new Date().getFullYear()} {APP.name}. All rights reserved. Template design by{" "}
      <a href="https://html.design" className="text-text hover:text-primary">HTML Design</a>, distributed by{" "}
      <a href="https://themewagon.com" target="_blank" rel="noreferrer" className="text-text hover:text-primary">ThemeWagon</a>.
    </footer>
  );
}
