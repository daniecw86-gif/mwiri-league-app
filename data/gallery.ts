export interface GalleryImage {
    id: number;
    src: string;
    alt: string;
    category: string;
}

export interface GalleryAlbum {
    id: string;
    title: string;
    description: string;
    coverImage: string;
    date: string;
    images: GalleryImage[];
}

export const galleryAlbums: GalleryAlbum[] = [
    {
        id: 'season-2024',
        title: 'Season 2024 Highlights',
        description: 'Best moments from the 2024 Mwiri League season',
        coverImage: '/gallery/season-2024/IMG_20251013_075436_016.jpg',
        date: 'October 2024',
        images: [
            {
                id: 1,
                src: '/gallery/season-2024/IMG_20251013_075436_016.jpg',
                alt: 'Mwiri League 2024 - Match Action',
                category: 'Match Day',
            },
            {
                id: 2,
                src: '/gallery/season-2024/IMG_20251013_075441_466.jpg',
                alt: 'Mwiri League 2024 - Team Celebration',
                category: 'Match Day',
            },
            {
                id: 3,
                src: '/gallery/season-2024/IMG_20251013_075506_722.jpg',
                alt: 'Mwiri League 2024 - Fan Support',
                category: 'Match Day',
            },
            {
                id: 4,
                src: '/gallery/season-2024/IMG_20251013_075527_502.jpg',
                alt: 'Mwiri League 2024 - Championship Moment',
                category: 'Match Day',
            },
        ],
    },
    // Add more albums here as photos become available
    // {
    //     id: 'matchday-1-2025',
    //     title: 'Match Day 1 - 2025',
    //     description: 'Photos from the opening fixtures',
    //     coverImage: '/gallery/matchday-1/cover.jpg',
    //     date: 'November 2025',
    //     images: [],
    // },
];

export const getAllImages = (): GalleryImage[] => {
    return galleryAlbums.flatMap(album => album.images);
};

export const getAlbumById = (id: string): GalleryAlbum | undefined => {
    return galleryAlbums.find(album => album.id === id);
};
