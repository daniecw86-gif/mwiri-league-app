import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Fantasy | Mwiri League",
    description: "Play the Mwiri League Fantasy game — pick your best XI and compete on the leaderboard.",
};

export default function FantasyLayout({ children }: { children: React.ReactNode }) {
    return children;
}
