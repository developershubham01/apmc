import type { Metadata } from "next";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export const metadata: Metadata = {
  title: "Admin Control Centre | Photos, News & Operations",
  description: "Official administrative management portal for Navi Mumbai Merchants Chamber.",
  robots: { index: false, follow: false },
};

export default function AdminMainPage() {
  return <AdminDashboard />;
}
