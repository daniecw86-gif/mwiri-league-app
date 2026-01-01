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
        coverImage: '/gallery/season-2024/IMG_5109.jpg',
        date: '2024',
        images: [
            { id: 1, src: '/gallery/season-2024/IMG_5109.jpg', alt: 'Mwiri League 2024', category: 'Match Day' },
            { id: 2, src: '/gallery/season-2024/IMG_5117.jpg', alt: 'Mwiri League 2024', category: 'Match Day' },
            { id: 3, src: '/gallery/season-2024/IMG_5120.jpg', alt: 'Mwiri League 2024', category: 'Match Day' },
            { id: 4, src: '/gallery/season-2024/IMG_5124.jpg', alt: 'Mwiri League 2024', category: 'Match Day' },
            { id: 5, src: '/gallery/season-2024/IMG_5151.jpg', alt: 'Mwiri League 2024', category: 'Match Day' },
            { id: 6, src: '/gallery/season-2024/IMG_5184.jpg', alt: 'Mwiri League 2024', category: 'Match Day' },
            { id: 7, src: '/gallery/season-2024/IMG_5185.jpg', alt: 'Mwiri League 2024', category: 'Match Day' },
            { id: 8, src: '/gallery/season-2024/IMG_5186.jpg', alt: 'Mwiri League 2024', category: 'Match Day' },
            { id: 9, src: '/gallery/season-2024/IMG_5227.jpg', alt: 'Mwiri League 2024', category: 'Match Day' },
            { id: 10, src: '/gallery/season-2024/IMG_5242.jpg', alt: 'Mwiri League 2024', category: 'Match Day' },
            { id: 11, src: '/gallery/season-2024/IMG_5244.jpg', alt: 'Mwiri League 2024', category: 'Match Day' },
            { id: 12, src: '/gallery/season-2024/IMG_5261.jpg', alt: 'Mwiri League 2024', category: 'Match Day' },
            { id: 13, src: '/gallery/season-2024/IMG_5270.jpg', alt: 'Mwiri League 2024', category: 'Match Day' },
            { id: 14, src: '/gallery/season-2024/IMG_5272.jpg', alt: 'Mwiri League 2024', category: 'Match Day' },
            { id: 15, src: '/gallery/season-2024/IMG_5287.jpg', alt: 'Mwiri League 2024', category: 'Match Day' },
            { id: 16, src: '/gallery/season-2024/IMG_5313 (1).jpg', alt: 'Mwiri League 2024', category: 'Match Day' },
            { id: 17, src: '/gallery/season-2024/IMG_5325.jpg', alt: 'Mwiri League 2024', category: 'Match Day' },
            { id: 18, src: '/gallery/season-2024/IMG_5329.jpg', alt: 'Mwiri League 2024', category: 'Match Day' },
            { id: 19, src: '/gallery/season-2024/IMG_5340.jpg', alt: 'Mwiri League 2024', category: 'Match Day' },
            { id: 20, src: '/gallery/season-2024/IMG_5373.jpg', alt: 'Mwiri League 2024', category: 'Match Day' },
            { id: 21, src: '/gallery/season-2024/IMG_5375.jpg', alt: 'Mwiri League 2024', category: 'Match Day' },
            { id: 22, src: '/gallery/season-2024/IMG_5376.jpg', alt: 'Mwiri League 2024', category: 'Match Day' },
        ],
    },
];

export const getAllImages = (): GalleryImage[] => {
    return galleryAlbums.flatMap(album => album.images);
};

export const getAlbumById = (id: string): GalleryAlbum | undefined => {
    return galleryAlbums.find(album => album.id === id);
};
