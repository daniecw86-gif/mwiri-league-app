import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "All Clubs | Mwiri League",
    description: "Explore all teams competing in the Mwiri League. View club profiles, stats, and squad details.",
};

export default function ClubsLayout({ children }: { children: React.ReactNode }) {
    return children;
}
