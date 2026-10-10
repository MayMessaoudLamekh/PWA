export type NavItem = {
  href: string;
  label: string;
  adminOnly?: boolean;
};

/** App navigation — one entry per module. */
export const NAV_ITEMS: NavItem[] = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/cars", label: "My cars" },
  { href: "/insurance", label: "Insurance" },
  { href: "/garages", label: "Garages" },
  { href: "/complaints", label: "Complaints" },
  { href: "/users", label: "Users", adminOnly: true },
  { href: "/profile", label: "Profile" },
];
