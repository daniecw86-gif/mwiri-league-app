import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Compare Teams | Mwiri League",
    description: "Compare head-to-head statistics between any two teams in the Mwiri League.",
};

export default function CompareLayout({ children }: { children: React.ReactNode }) {
    return children;
}
