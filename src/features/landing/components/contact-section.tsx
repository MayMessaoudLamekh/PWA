"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { APP } from "@/config/constants";
import { sendContactMessage } from "@/features/contact/actions";
import { cn } from "@/lib/format";
import { Facebook, Instagram, Linkedin, Mail, Phone, Twitter } from "./icons";

const inputClass =
  "w-full border-b border-border/60 bg-transparent py-3 text-text placeholder:text-muted focus:border-primary focus:outline-none";
const outlineBtn =
  "w-full border-2 border-primary py-4 text-lg font-bold uppercase text-primary transition hover:bg-primary hover:text-bg disabled:opacity-60 sm:w-52";

function FieldError({ errors }: { errors?: string[] }) {
  return errors?.[0] ? <p className="mt-1 text-sm text-red-400">{errors[0]}</p> : null;
}

export function ContactSection() {
  const [state, action, pending] = useActionState(sendContactMessage, undefined);
  const [showMap, setShowMap] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.ok) formRef.current?.reset();
  }, [state]);

  return (
    <section id="contact" className="bg-bg px-6 py-24">
      <h2 className="text-center text-4xl font-bold uppercase text-text">Get In Touch</h2>

      <div className="mx-auto mt-14 max-w-3xl">
        {showMap ? (
          <div>
            {/* OpenStreetMap embed — no API key needed */}
            <iframe
              title="Map"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-7.70%2C33.55%2C-7.55%2C33.62&layer=mapnik"
              className="h-96 w-full border border-border/40"
            />
            <div className="mt-6 flex justify-center">
              <button type="button" onClick={() => setShowMap(false)} className={outlineBtn}>Form</button>
            </div>
          </div>
        ) : (
          <form ref={formRef} action={action} className="space-y-6">
            {state?.message && (
              <p className={cn("rounded px-4 py-3 text-sm", state.ok ? "bg-primary/15 text-primary" : "bg-red-500/15 text-red-300")}>
                {state.message}
              </p>
            )}
            <div>
              <input name="name" placeholder="Name" className={inputClass} required />
              <FieldError errors={state?.errors?.name} />
            </div>
            <div>
              <input name="phone" placeholder="Phone Number" className={inputClass} />
              <FieldError errors={state?.errors?.phone} />
            </div>
            <div>
              <input name="email" type="email" placeholder="Email" className={inputClass} required />
              <FieldError errors={state?.errors?.email} />
            </div>
            <div>
              <textarea name="message" placeholder="Message" rows={4} className={inputClass} required />
              <FieldError errors={state?.errors?.message} />
            </div>
            <div className="flex flex-col justify-end gap-4 pt-4 sm:flex-row">
              <button type="button" onClick={() => setShowMap(true)} className={outlineBtn}>Map</button>
              <button type="submit" disabled={pending} className={outlineBtn}>{pending ? "Sending…" : "Send Now"}</button>
            </div>
          </form>
        )}

        <ul className="mt-14 flex flex-wrap justify-center gap-x-12 gap-y-4 text-lg text-text">
          <li><a href={`tel:${APP.contactPhone.replace(/\s/g, "")}`} className="flex items-center gap-3 hover:text-primary"><Phone /> {APP.contactPhone}</a></li>
          <li><a href={`mailto:${APP.contactEmail}`} className="flex items-center gap-3 hover:text-primary"><Mail /> {APP.contactEmail}</a></li>
        </ul>

        <ul className="mt-12 flex justify-center gap-3">
          {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
            <li key={i}>
              <a href="#" aria-label="Social link" className="flex size-14 items-center justify-center rounded-full bg-text text-bg transition hover:bg-primary">
                <Icon />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
