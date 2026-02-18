import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Stats Centre | Mwiri League",
    description: "Comprehensive player and club statistics — top scorers, assists, clean sheets, and more.",
};

export default function StatsLayout({ children }: { children: React.ReactNode }) {
    return children;
}
