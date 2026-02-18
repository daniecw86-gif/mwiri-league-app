import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Standings | Mwiri League",
    description: "Full league table standings with points, goal difference, and form for every team.",
};

export default function TableLayout({ children }: { children: React.ReactNode }) {
    return children;
}
