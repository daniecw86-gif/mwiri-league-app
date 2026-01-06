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
        summary: "In a stunning display of attacking football, Makaya'08 opened their campaign with a dominant 4-0 victory over Shadow'09. Kabayaga Shakira was the standout performer with a hat-trick, while the team looked sharp from the first whistle, controlling possession and creating numerous chances.",
        category: "Match Report",
        date: "Nov 22, 2025",
        author: "League Reporter",
        imageUrl: null,
        link: "/news/1"
    },
    {
        id: 2,
        title: "Winter'94 Secure Clean Sheet Victory Over Wampa",
        summary: "Winter'94 showed great defensive discipline to shut out Wampa FC, earning a well-deserved 2-0 win. Kawesi Reagan opened the scoring in the first half, and their tactical organization proved too much for the opposition to break down.",
        category: "Match Report",
        date: "Nov 22, 2025",
        author: "Sports Desk",
        imageUrl: null,
        link: "/news/2"
    },
    {
        id: 3,
        title: "Lukambwe'05 Starts Season with Convincing Win",
        summary: "Lukambwe'05 signaled their intent for the season with a solid 2-0 performance against Buliti'01. Goals from Okello Okello and Jenkins sealed the victory as the team controlled the game from start to finish.",
        category: "Match Report",
        date: "Nov 22, 2025",
        author: "Mwiri Gazette",
        imageUrl: null,
        link: "/news/3"
    },
    {
        id: 4,
        title: "Season 6 Preview: Teams to Watch",
        summary: "As the Mwiri League kicks off its sixth season, we take a look at the contenders for the title. With returning champions and hungry challengers, this promises to be the most competitive season yet.",
        category: "Feature",
        date: "Nov 20, 2025",
        author: "Editorial Team",
        imageUrl: null,
        link: "/news/4"
    },
    {
        id: 5,
        title: "Kombora'03: The Founding Fathers Return to Leadership",
        summary: "As the founding cohort of the Mwiri League, Kombora'03 has returned to helm the league administration for Season 6. Their legacy of excellence both on and off the pitch continues to inspire.",
        category: "Club Focus",
        date: "Nov 18, 2025",
        author: "League Admin",
        imageUrl: null,
        link: "/news/5"
    },
    {
        id: 6,
        title: "Top Scorer Watch: Kabayaga Shakira Leads Early Charts",
        summary: "With 4 goals in the opening matchday, Makaya'08's Kabayaga Shakira has stormed to the top of the scoring charts. Can anyone catch the prolific forward?",
        category: "Stats Corner",
        date: "Nov 23, 2025",
        author: "Stats Team",
        imageUrl: null,
        link: "/news/6"
    }
];

