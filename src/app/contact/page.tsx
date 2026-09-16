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
        backgroundImage="/images/hero/chamber-headquarters-hero.jpg"
        imageOpacity={90}
      />

      {/* Enquiry types */}
      <section className="bg-white py-16 lg:py-20 border-b border-[#D1E7DD]">
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
                  <div className="group h-full rounded-2xl border border-[#D1E7DD] bg-[#F0FDF4] p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:border-[#059669] hover:shadow-md">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#042017] text-[#10B981] ring-1 ring-[#059669]/30 transition-colors group-hover:bg-[#059669] group-hover:text-white">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-5 font-heading text-lg font-bold text-[#042017]">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#4B5563]">
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
      <section className="bg-[#F0FDF4] py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:gap-12 lg:grid-cols-5">
            {/* Form */}
            <ScrollReveal variant="left" className="lg:col-span-3">
              <div className="rounded-2xl border border-[#D1E7DD] bg-white p-6 sm:p-8 shadow-sm">
                <h2 className="font-heading text-2xl font-bold text-[#042017]">
                  Send an Enquiry
                </h2>
                <p className="mt-2 text-sm text-[#4B5563]">
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
                <div className="rounded-2xl border border-[#D1E7DD] bg-white p-6 shadow-sm">
                  <h3 className="flex items-center gap-2 font-heading text-base font-bold text-[#042017]">
                    <MapPin className="h-5 w-5 text-[#059669]" />
                    Location
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#4B5563]">
                    {siteConfig.location}
                  </p>
                  <div className="mt-4 rounded-xl bg-[#F0FDF4] p-4 border border-[#D1E7DD]">
                    <p className="text-xs uppercase tracking-[0.14em] text-[#047857] font-bold">
                      APMC Address
                    </p>
                    <p className="mt-1 text-sm font-semibold text-[#042017]">
                      {siteConfig.apmcAddress}
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-[#D1E7DD] bg-white p-6 shadow-sm">
                  <h3 className="flex items-center gap-2 font-heading text-base font-bold text-[#042017]">
                    <Mail className="h-5 w-5 text-[#059669]" />
                    Contact Details
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#4B5563]">
                    Submit the enquiry form and our team will respond using the
                    details you share. Every enquiry is recorded with a unique
                    reference so it can be tracked to a resolution.
                  </p>
                  <div className="mt-4 flex items-start gap-2 rounded-xl bg-[#F0FDF4] p-3 border border-[#D1E7DD]">
                    <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#059669]" />
                    <p className="text-xs text-[#4B5563]">
                      Enquiries are reviewed on working days. For urgent trade
                      matters, please mention your organisation and preferred
                      contact window in the message.
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#042017] p-6 text-white shadow-md">
                  <p className="text-xs uppercase tracking-[0.18em] text-[#10B981] font-bold">
                    Organizations
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-slate-200">
                    <li className="font-semibold">Navi Mumbai Merchants Chamber</li>
                    <li className="font-semibold">Bombay Mudibazar Kariana Merchants Association</li>
                    <li className="text-slate-400">Kisan Kirti Agro Pvt. Ltd.</li>
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
