"use client";

import { useState } from "react";

export function MudibazarInquiryForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div id="membership-form" className="rounded-3xl border border-amber-900/15 bg-[#FFFBEB] p-8 shadow-xl">
      <h3 className="font-heading text-xl font-bold text-[#042017] mb-2">
        Merchant Inquiry &amp; Membership Request
      </h3>
      <p className="text-xs text-[#4B5563] mb-6">
        Fill out the form below to connect with the BMKMA Secretariat.
      </p>

      {submitted ? (
        <div className="rounded-2xl bg-emerald-100 p-6 border border-emerald-300 text-center text-emerald-900">
          <h4 className="font-heading text-base font-bold text-emerald-950 mb-1">
            Inquiry Submitted Successfully!
          </h4>
          <p className="text-xs text-emerald-800">
            Thank you for contacting the Bombay Mudibazar Secretariat. Our representative will contact your trading house shortly.
          </p>
        </div>
      ) : (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-bold uppercase text-[#042017] mb-1">
              Trading Firm / Merchant Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Royal Spices & Kirana Trading Co."
              className="w-full rounded-xl border border-amber-900/20 bg-white px-4 py-3 text-sm text-[#042017] outline-none focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/20"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold uppercase text-[#042017] mb-1">
                Contact Person
              </label>
              <input
                type="text"
                required
                placeholder="Full Name"
                className="w-full rounded-xl border border-amber-900/20 bg-white px-4 py-3 text-sm text-[#042017] outline-none focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/20"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-[#042017] mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                required
                placeholder="+91 98765 43210"
                className="w-full rounded-xl border border-amber-900/20 bg-white px-4 py-3 text-sm text-[#042017] outline-none focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/20"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-[#042017] mb-1">
              Inquiry Type
            </label>
            <select className="w-full rounded-xl border border-amber-900/20 bg-white px-4 py-3 text-sm text-[#042017] outline-none focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/20">
              <option>New Merchant Membership Application</option>
              <option>Commercial Dispute Arbitration Request</option>
              <option>Commodity Quality & Rate Inquiry</option>
              <option>General Trade Verification Certificate</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-[#042017] mb-1">
              Message / Trade Details
            </label>
            <textarea
              rows={3}
              placeholder="Describe your query or trading house profile..."
              className="w-full rounded-xl border border-amber-900/20 bg-white px-4 py-3 text-sm text-[#042017] outline-none focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/20"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-[#D97706] to-[#B45309] py-3.5 text-sm font-extrabold text-white shadow-md hover:from-amber-500 hover:to-amber-600 transition-all uppercase tracking-wider"
          >
            Submit Inquiry to BMKMA
          </button>
        </form>
      )}
    </div>
  );
}
