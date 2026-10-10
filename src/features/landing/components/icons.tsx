// Small inline SVG icons (replaces the template's Font Awesome dependency).
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } as const;

export const ArrowRight = (p: IconProps) => <svg {...base} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
export const ChevronLeft = (p: IconProps) => <svg {...base} {...p}><path d="M15 18l-6-6 6-6" /></svg>;
export const ChevronRight = (p: IconProps) => <svg {...base} {...p}><path d="M9 18l6-6-6-6" /></svg>;
export const Menu = (p: IconProps) => <svg {...base} {...p}><path d="M4 6h16M4 12h16M4 18h16" /></svg>;
export const Close = (p: IconProps) => <svg {...base} {...p}><path d="M6 6l12 12M18 6L6 18" /></svg>;
export const Phone = (p: IconProps) => <svg {...base} {...p}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" /></svg>;
export const Mail = (p: IconProps) => <svg {...base} {...p}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 6l-10 7L2 6" /></svg>;
export const Users = (p: IconProps) => <svg {...base} {...p}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" /></svg>;
export const Car = (p: IconProps) => <svg {...base} {...p}><path d="M5 17h14M5 17a2 2 0 1 1-4 0v-5l2-6h18l2 6v5a2 2 0 1 1-4 0" /><circle cx="7" cy="17" r="2" /><circle cx="17" cy="17" r="2" /></svg>;
export const Wrench = (p: IconProps) => <svg {...base} {...p}><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9l-3.8 3.8z" /></svg>;
export const MapPin = (p: IconProps) => <svg {...base} {...p}><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>;
export const Quote = (p: IconProps) => (
  <svg width="56" height="47" viewBox="0 0 56 47" fill="currentColor" {...p}>
    <path d="M0 47V27.4C0 12.3 6.7 3.3 20.1 0l3 6.1C15.5 8.4 11.8 13 11.5 20.3H23V47H0zm33 0V27.4C33 12.3 39.7 3.3 53.1 0l2.9 6.1c-7.6 2.3-11.3 6.9-11.6 14.2H56V47H33z" />
  </svg>
);
export const Facebook = (p: IconProps) => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H8v4h2v8h4v-8h3l1-4h-4V8z" /></svg>;
export const Twitter = (p: IconProps) => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M18.2 2h3.4l-7.4 8.5L23 22h-6.8l-5.3-7-6.1 7H1.4l7.9-9.1L1 2h7l4.8 6.4L18.2 2zm-1.2 18h1.9L7.1 4H5.1L17 20z" /></svg>;
export const Linkedin = (p: IconProps) => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3V9zm7 0h3.8v1.7h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.6c0-1.3 0-3-1.9-3s-2.2 1.5-2.2 2.9V21h-4V9z" /></svg>;
export const Instagram = (p: IconProps) => <svg {...base} width={18} height={18} {...p}><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" /></svg>;
