import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://kadai.id"),
  title: {
    default: "Proyo — Construction Team Management",
    template: "%s | Proyo",
  },
  description:
    "Proyo is a mobile app for managing construction teams. GPS attendance, project payroll, leave management, and multi-site operations — all in one place.",
  keywords: [
    "construction management",
    "team attendance",
    "GPS absensi",
    "manajemen konstruksi",
    "payroll proyek",
    "project payroll",
    "leave management",
    "cuti karyawan",
    "Proyo",
    "Kadai",
  ],
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://kadai.id/proyo",
    siteName: "Proyo",
    title: "Proyo — Construction Team Management",
    description:
      "GPS attendance, project payroll, and leave management for construction companies.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Proyo — Construction Team Management",
    description:
      "GPS attendance, project payroll, and leave management for construction companies.",
  },
  alternates: {
    canonical: "https://kadai.id/proyo",
  },
};

export default function ProyoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
