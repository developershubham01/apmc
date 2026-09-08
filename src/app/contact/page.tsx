import type { Metadata } from "next";
import { Briefcase, Building2, MessageSquare, Mail, Info, MapPin } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { ContactForm } from "@/components/site/ContactForm";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact | Kirti Rana",
  description:
    "Connect with Kirti Rana for business enquiries, organization matters or general information.",
  alternates: { canonical: "/contact" },
};

const enquirySections = [
  {
    icon: Briefcase,
    title: "Business Enquiries",
    description:
      "For business-related matters concerning Kisan Kirti Agro Pvt. Ltd. and agriculture & trade engagements.",
  },
  {
    icon: Building2,
    title: "Organization Enquiries",
    description:
      "For matters related to the Navi Mumbai Merchants Chamber or the Bombay Mudibazar Kariana Merchants Association.",
  },
  {
    icon: MessageSquare,
    title: "General Enquiries",
    description:
      "For general information, media requests or any other questions you may have.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Connect With Us"
        description="Reach out for business, organization or general enquiries. Choose the relevant category and send your message through the form below."
        crumbs={[{ label: "Contact" }]}
      />

      {/* Enquiry types */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Enquiry Categories"
            title="How Can We Help?"
            description="Select the category that best matches your enquiry when filling out the form."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {enquirySections.map((s, i) => {
              const Icon = s.icon;
              return (
                <ScrollReveal key={s.title} variant="up" delay={i * 90} className="h-full">
                  <div className="group h-full rounded-2xl border border-border bg-mist p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-premium-lg">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-gold ring-1 ring-gold/30 transition-colors group-hover:bg-royal">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-5 font-heading text-lg font-700 text-navy">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-600">
                      {s.description}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form + info */}
      <section className="bg-mist py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:gap-12 lg:grid-cols-5">
            {/* Form */}
            <ScrollReveal variant="left" className="lg:col-span-3">
              <div className="rounded-2xl border border-border bg-white p-6 sm:p-8 shadow-premium">
                <h2 className="font-heading text-2xl font-700 text-navy">
                  Send an Enquiry
                </h2>
                <p className="mt-2 text-sm text-ink-600">
                  Fill in the form and your email client will open with the
                  enquiry pre-filled.
                </p>
                <div className="mt-6">
                  <ContactForm />
                </div>
              </div>
            </ScrollReveal>

            {/* Info sidebar */}
            <ScrollReveal variant="right" className="lg:col-span-2">
              <div className="space-y-5">
                <div className="rounded-2xl border border-border bg-white p-6 shadow-premium">
                  <h3 className="flex items-center gap-2 font-heading text-base font-700 text-navy">
                    <MapPin className="h-5 w-5 text-gold" />
                    Location
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-600">
                    {siteConfig.location}
                  </p>
                  <div className="mt-4 rounded-xl bg-mist p-4">
                    <p className="text-xs uppercase tracking-[0.14em] text-royal font-600">
                      APMC Address
                    </p>
                    <p className="mt-1 text-sm font-500 text-ink">
                      {siteConfig.apmcAddress}
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-gold/30 bg-gold-50/50 p-6">
                  <h3 className="flex items-center gap-2 font-heading text-base font-700 text-navy">
                    <Mail className="h-5 w-5 text-gold-600" />
                    Contact Details
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-600">
                    Submit the enquiry form and our team will respond using the
                    details you share. Every enquiry is recorded with a unique
                    reference so it can be tracked to a resolution.
                  </p>
                  <div className="mt-4 flex items-start gap-2 rounded-xl bg-white/60 p-3">
                    <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                    <p className="text-xs text-ink-600">
                      Enquiries are reviewed on working days. For urgent trade
                      matters, please mention your organisation and preferred
                      contact window in the message.
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-navy p-6 text-white">
                  <p className="text-xs uppercase tracking-[0.18em] text-gold">
                    Organizations
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-white/80">
                    <li>Navi Mumbai Merchants Chamber</li>
                    <li>Bombay Mudibazar Kariana Merchants Association</li>
                    <li className="text-white/60">Kisan Kirti Agro Pvt. Ltd.</li>
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
