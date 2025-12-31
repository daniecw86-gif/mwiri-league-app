export interface NewsItem {
    id: number;
    title: string;
    summary: string;
    category: string;
    date: string;
    author: string;
    imageUrl: string | null;
    link: string;
}

export const newsItems: NewsItem[] = [
    {
        id: 1,
        title: "Match Day 1: Makaya'08 Crushes Shadow'09 4-0",
        summary: "In a stunning display of attacking football, Makaya'08 opened their campaign with a dominant 4-0 victory over Shadow'09. The team looked sharp from the first whistle, controlling possession and creating numerous chances.",
        category: "Match Report",
        date: "Nov 22, 2025",
        author: "League Reporter",
        imageUrl: null,
        link: "#"
    },
    {
        id: 2,
        title: "Winter'94 Secure Clean Sheet Victory Over Wampa",
        summary: "Winter'94 showed great defensive discipline to shut out Wampa FC, earning a well-deserved 2-0 win. Their tactical organization proved too much for the opposition to break down.",
        category: "Match Report",
        date: "Nov 22, 2025",
        author: "Sports Desk",
        imageUrl: null,
        link: "#"
    },
    {
        id: 3,
        title: "Lukambwe'05 Starts Season with Convincing Win",
        summary: "Lukambwe'05 signaled their intent for the season with a solid performance against Buliti'01. The 2-0 scoreline reflected their control of the game.",
        category: "Match Report",
        date: "Nov 22, 2025",
        author: "Mwiri Gazette",
        imageUrl: null,
        link: "#"
    },
    {
        id: 4,
        title: "Suici'06 Defeats Destroyers in Tense Encounter",
        summary: "In one of the most closely contested matches of the day, Suici'06 managed to overcome Destroyers FC 2-0. Both sides had their moments, but Suici's finishing made the difference.",
        category: "Match Report",
        date: "Nov 22, 2025",
        author: "Daily Monitor",
        imageUrl: null,
        link: "#"
    }
];
