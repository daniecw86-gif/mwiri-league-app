import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Gallery | Mwiri League",
    description: "Photo gallery showcasing memorable moments from the Mwiri League matches and events.",
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
    return children;
}
