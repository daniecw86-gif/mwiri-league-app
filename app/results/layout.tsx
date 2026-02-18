import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Results | Mwiri League",
    description: "View all completed match results, scores, and match day reports for the Mwiri League.",
};

export default function ResultsLayout({ children }: { children: React.ReactNode }) {
    return children;
}
