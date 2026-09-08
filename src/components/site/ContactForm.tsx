"use client";

import { useState } from "react";
import { Send, CheckCircle2, ShieldCheck, Loader2, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

type EnquiryType = "Business Enquiries" | "Organization Enquiries" | "General Enquiries";

const enquiryTypes: EnquiryType[] = [
  "Business Enquiries",
  "Organization Enquiries",
  "General Enquiries",
];

const EMPTY_FORM = {
  name: "",
  phone: "",
  email: "",
  subject: "",
  message: "",
};

export function ContactForm() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [reference, setReference] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState<EnquiryType>("Business Enquiries");
  const [form, setForm] = useState(EMPTY_FORM);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, category: type }),
      });

      const data = (await res.json().catch(() => null)) as
        | { ok?: boolean; id?: string; error?: string }
        | null;

      if (!res.ok || !data?.ok) {
        const errorMessage =
          data?.error ?? "Something went wrong. Please try again later.";
        toast({
          title: "Could not send enquiry",
          description: errorMessage,
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      setReference(data.id ?? null);
      setSubmitted(true);
      setForm(EMPTY_FORM);
      toast({
        title: "Enquiry sent successfully",
        description: "Thank you for reaching out. We will get back to you shortly.",
      });
    } catch {
      toast({
        title: "Network error",
        description:
          "We could not reach the server. Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-gold/40 bg-gold-50/50 p-8 text-center">
        <span
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-gold/10 blur-2xl"
        />
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-premium ring-1 ring-gold/40">
          <CheckCircle2 className="h-9 w-9 text-gold-600" />
        </span>
        <h3 className="mt-4 font-heading text-xl font-700 text-navy">
          Enquiry Received
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-600">
          Thank you for reaching out. Our team will review your enquiry and get
          back to you shortly.
        </p>
        {reference && (
          <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-600 text-royal ring-1 ring-border">
            <ShieldCheck className="h-3.5 w-3.5 text-gold-600" />
            Reference: <span className="font-mono tracking-wide">{reference}</span>
          </p>
        )}
        <div className="mt-6">
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setReference(null);
            }}
            className="inline-flex items-center gap-2 rounded-xl bg-navy px-5 py-2.5 text-sm font-600 text-white transition hover:bg-navy-700"
          >
            <RotateCcw className="h-4 w-4" />
            Send Another Enquiry
          </button>
        </div>
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
          minLength={10}
          value={form.message}
          onChange={handleChange}
          placeholder="Write your message here..."
          className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-ink shadow-sm transition-colors placeholder:text-ink-600/40 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-1.5 text-xs text-ink-600/70">
          <ShieldCheck className="h-3.5 w-3.5 text-gold-600" />
          Your enquiry is sent securely and stored only for follow-up.
        </p>
        <button
          type="submit"
          disabled={loading}
          className="group inline-flex items-center justify-center gap-2 rounded-xl bg-navy px-6 py-3.5 text-sm font-600 text-white shadow-premium transition-all hover:bg-navy-700 hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending...
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
