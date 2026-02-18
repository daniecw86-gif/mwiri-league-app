import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "News | Mwiri League",
    description: "Latest news, match reports, and updates from the Mwiri League.",
};

export default function NewsLayout({ children }: { children: React.ReactNode }) {
    return children;
}
