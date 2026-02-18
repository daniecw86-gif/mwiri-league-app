import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Predictions | Mwiri League",
    description: "Make your match predictions and see how you compare against the community.",
};

export default function PredictionsLayout({ children }: { children: React.ReactNode }) {
    return children;
}
