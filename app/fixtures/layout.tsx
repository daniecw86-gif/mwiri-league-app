import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Fixtures | Mwiri League",
    description: "View all upcoming fixtures and match schedule for the Mwiri League season.",
};

export default function FixturesLayout({ children }: { children: React.ReactNode }) {
    return children;
}
