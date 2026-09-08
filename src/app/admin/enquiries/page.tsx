import type { Metadata } from "next";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export const metadata: Metadata = {
  title: "Control Centre | Admin",
  description: "Administration area — restricted access.",
  robots: { index: false, follow: false },
};

export default function AdminEnquiriesPage() {
  return <AdminDashboard />;
}
