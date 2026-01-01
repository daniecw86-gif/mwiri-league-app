'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { galleryAlbums, GalleryImage, GalleryAlbum } from '../../data/gallery';

export default function GalleryPage() {
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
    const [selectedAlbum, setSelectedAlbum] = useState<GalleryAlbum | null>(null);

    const openLightbox = (image: GalleryImage) => {
        setSelectedImage(image);
    };

    const closeLightbox = () => {
        setSelectedImage(null);
    };

    const openAlbum = (album: GalleryAlbum) => {
        setSelectedAlbum(album);
    };

    const closeAlbum = () => {
        setSelectedAlbum(null);
    };

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-mwiri-blue via-mwiri-blue-dark to-mwiri-blue-deep text-white overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0 bg-[url('/gallery/season-2024/IMG_5109.jpg')] bg-cover bg-center"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-mwiri-blue-deep/80 to-mwiri-blue-deep"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                        <span className="text-2xl">📸</span>
                        <span className="text-sm font-bold uppercase tracking-wider text-mwiri-yellow">Photo Gallery</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
                        Capturing the <span className="text-mwiri-yellow">Moments</span>
                    </h1>

                    <p className="text-lg text-blue-100 max-w-2xl mx-auto">
                        Relive the best moments from the Mwiri League through our photo collection
                    </p>
                </div>
            </div>

            {/* Albums Grid */}
            {!selectedAlbum ? (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-8">Photo Albums</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {galleryAlbums.map((album) => (
                            <button
                                key={album.id}
                                onClick={() => openAlbum(album)}
                                className="group relative bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 text-left"
                            >
                                <div className="aspect-[4/3] relative overflow-hidden">
                                    <Image
                                        src={album.coverImage}
                                        alt={album.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <p className="text-white font-bold text-lg">{album.title}</p>
                                        <p className="text-white/70 text-sm">{album.images.length} photos • {album.date}</p>
                                    </div>
                                </div>
                            </button>
                        ))}

                        {/* Coming Soon Placeholder */}
                        <div className="bg-gray-100 dark:bg-slate-700 rounded-2xl overflow-hidden border-2 border-dashed border-gray-300 dark:border-slate-600">
                            <div className="aspect-[4/3] flex flex-col items-center justify-center p-6 text-center">
                                <span className="text-4xl mb-2">📷</span>
                                <p className="font-bold text-gray-600 dark:text-gray-300">More Photos Coming</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Match day photos will be added here</p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                /* Album View */
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Back Button */}
                    <button
                        onClick={closeAlbum}
                        className="flex items-center gap-2 text-mwiri-blue hover:text-mwiri-blue-dark font-bold mb-6 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Albums
                    </button>

                    <div className="mb-8">
                        <h2 className="text-2xl font-black text-gray-900 dark:text-white">{selectedAlbum.title}</h2>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">{selectedAlbum.description}</p>
                    </div>

                    {/* Photo Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {selectedAlbum.images.map((image) => (
                            <button
                                key={image.id}
                                onClick={() => openLightbox(image)}
                                className="group relative aspect-square rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                            >
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                                    <svg className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                    </svg>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Lightbox */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
                    onClick={closeLightbox}
                >
                    <button
                        className="absolute top-4 right-4 text-white hover:text-mwiri-yellow transition-colors"
                        onClick={closeLightbox}
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="relative max-w-5xl max-h-[90vh] w-full h-full" onClick={(e) => e.stopPropagation()}>
                        <Image
                            src={selectedImage.src}
                            alt={selectedImage.alt}
                            fill
                            className="object-contain"
                        />
                    </div>

                    <div className="absolute bottom-4 left-0 right-0 text-center">
                        <p className="text-white font-medium">{selectedImage.alt}</p>
                        <p className="text-white/60 text-sm">{selectedImage.category}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
