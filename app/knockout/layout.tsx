import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Knockout Stage | Mwiri League",
    description: "Follow the Mwiri League knockout stage bracket — quarter-finals, semi-finals, and the grand final.",
};

export default function KnockoutLayout({ children }: { children: React.ReactNode }) {
    return children;
}
