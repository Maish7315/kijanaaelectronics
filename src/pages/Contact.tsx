import { Mail, MapPin, Phone } from "lucide-react";
import { useEffect } from "react";

const Contact = () => {
  useEffect(() => { document.title = "Contact — Kijanaa Electronics"; }, []);

  return (
    <div className="container py-12 lg:py-20">
      <div className="max-w-2xl">
        <p className="text-primary text-xs font-bold uppercase tracking-[0.25em] mb-3">Contact</p>
        <h1 className="font-display text-4xl lg:text-6xl font-bold tracking-tight mb-4">
          We'd love to hear from you
        </h1>
        <p className="text-lg text-muted-foreground">
          Visit our shop in Mwingi, give us a call or message us on WhatsApp — we respond fast.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-5 mt-12">
        {[
          { icon: MapPin, title: "Visit us", lines: ["Mwingi Town", "Kitui County, Kenya"] },
          { icon: Phone, title: "Call / WhatsApp", lines: ["+254769964404", "Mon–Sat · 8am – 8pm"] },
          { icon: Mail, title: "Email", lines: ["kijanaacyber@gmail.com", "We reply within 24 hours"] },
        ].map(({ icon: Icon, title, lines }) => (
          <div key={title} className="rounded-2xl bg-card border border-border p-6">
            <div className="size-12 rounded-xl bg-accent text-primary flex items-center justify-center mb-4">
              <Icon className="size-5" />
            </div>
            <h3 className="font-display font-semibold mb-2">{title}</h3>
            {lines.map((l) => <p key={l} className="text-sm text-muted-foreground">{l}</p>)}
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-3xl overflow-hidden border border-border shadow-elegant aspect-[16/8]">
        <iframe
          title="Map"
          src="https://www.google.com/maps?q=Mwingi,Kitui,Kenya&output=embed"
          className="w-full h-full"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default Contact;
