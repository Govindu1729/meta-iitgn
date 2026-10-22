import type { Metadata } from "next";
import AppLayout from "@/components/helpers/AppLayout";
import { getSeoMetadata, getBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = getSeoMetadata({
  title: "IITGN PrepMat - Placement & Internship Resources",
  description: "Comprehensive year-wise placement and internship preparation material, company archives, and official interview guidance for IIT Gandhinagar on META IITGN.",
  path: "/prepmat",
  keywords: ["IITGN PrepMat", "IIT Gandhinagar Placement Resources", "Internship Preparation", "Interview Docs", "PDC PrepMat"],
});

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "PrepMat", item: "/prepmat" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AppLayout>{children}</AppLayout>
    </>
  );
}
