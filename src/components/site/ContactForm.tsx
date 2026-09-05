"use client";

import { useState } from "react";
import { Send, CheckCircle2, Mail, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type EnquiryType = "Business Enquiries" | "Organization Enquiries" | "General Enquiries";

const enquiryTypes: EnquiryType[] = [
  "Business Enquiries",
  "Organization Enquiries",
  "General Enquiries",
];

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState<EnquiryType>("Business Enquiries");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Static site fallback: build a mailto link.
    // Replace the recipient address below with the verified email,
    // OR integrate EmailJS/Formspree for serverless submission.
    const recipient = "contact@kirtirana.in"; // placeholder — update with verified address
    const subjectLine = `[${type}] ${form.subject || "Website Enquiry"}`;
    const body = [
      `Enquiry Type: ${type}`,
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Email: ${form.email}`,
      "",
      "Message:",
      form.message,
    ].join("\n");

    const mailto = `mailto:${recipient}?subject=${encodeURIComponent(
      subjectLine
    )}&body=${encodeURIComponent(body)}`;

    // Simulate brief processing for UX, then open mail client
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      window.location.href = mailto;
    }, 600);
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-gold/40 bg-gold-50/50 p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-gold-600" />
        <h3 className="mt-4 font-heading text-xl font-700 text-navy">
          Enquiry Prepared
        </h3>
        <p className="mt-2 text-sm text-ink-600">
          Your email client should have opened with your enquiry. If it
          didn&apos;t, please email us directly with the details you provided.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setForm({ name: "", phone: "", email: "", subject: "", message: "" });
          }}
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-navy px-5 py-2.5 text-sm font-600 text-white transition hover:bg-navy-700"
        >
          Send Another Enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Enquiry type */}
      <div>
        <label className="mb-2 block text-xs font-600 uppercase tracking-[0.12em] text-royal">
          Enquiry Type
        </label>
        <div className="flex flex-wrap gap-2">
          {enquiryTypes.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setType(t)}
              className={cn(
                "rounded-full px-4 py-2 text-xs font-600 transition-all",
                type === t
                  ? "bg-navy text-white shadow-premium"
                  : "bg-mist text-ink-600 ring-1 ring-border hover:bg-royal-50 hover:text-royal"
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" required value={form.name} onChange={handleChange} placeholder="Your full name" />
        <Field label="Phone" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="Your phone number" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="you@example.com" />
        <Field label="Subject" name="subject" value={form.subject} onChange={handleChange} placeholder="Subject of your enquiry" />
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-xs font-600 uppercase tracking-[0.12em] text-royal"
        >
          Message <span className="text-destructive">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder="Write your message here..."
          className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-ink shadow-sm transition-colors placeholder:text-ink-600/40 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-1.5 text-xs text-ink-600/70">
          <Mail className="h-3.5 w-3.5" />
          This form opens your email client (mailto). No data is stored.
        </p>
        <button
          type="submit"
          disabled={loading}
          className="group inline-flex items-center justify-center gap-2 rounded-xl bg-navy px-6 py-3.5 text-sm font-600 text-white shadow-premium transition-all hover:bg-navy-700 hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Preparing...
            </>
          ) : (
            <>
              <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              Send Enquiry
            </>
          )}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
  placeholder,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-xs font-600 uppercase tracking-[0.12em] text-royal"
      >
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-ink shadow-sm transition-colors placeholder:text-ink-600/40 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
      />
    </div>
  );
}
