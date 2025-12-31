'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { teams } from '../data/teams';

const LeftSidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    // Sort teams alphabetically
    const sortedTeams = [...teams].sort((a, b) => a.name.localeCompare(b.name));

    return (
        <div className={`hidden lg:block transition-all duration-300 ease-in-out ${isCollapsed ? 'w-20' : 'w-64'}`}>
            <div className="sticky top-24 space-y-6">

                {/* Clubs Directory */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col transition-all duration-300">
                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                        {!isCollapsed && <h3 className="font-bold text-mwiri-blue text-sm uppercase tracking-wide">Clubs</h3>}
                        <button
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            className="p-1 hover:bg-gray-200 rounded text-gray-500 transition-colors mx-auto"
                            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                        >
                            {isCollapsed ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" /></svg>
                            )}
                        </button>
                    </div>

                    <div className="max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200">
                        {sortedTeams.map((team) => (
                            <Link
                                key={team.id}
                                href={`/clubs/${team.id}`}
                                className={`flex items-center ${isCollapsed ? 'justify-center px-2' : 'justify-start px-4'} gap-3 py-2.5 hover:bg-blue-50 transition-colors border-b border-gray-50 last:border-0 group select-none`}
                                title={team.name}
                            >
                                <div className="relative w-8 h-8 flex-shrink-0 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden border border-gray-100 group-hover:border-mwiri-blue transition-colors">
                                    {team.logo ? (
                                        <Image
                                            src={team.logo}
                                            alt={team.name}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <span className="text-xs font-bold text-gray-400 group-hover:text-mwiri-blue">
                                            {team.name.charAt(0)}
                                        </span>
                                    )}
                                </div>
                                {!isCollapsed && (
                                    <span className="text-sm font-medium text-gray-700 group-hover:text-mwiri-blue transition-colors truncate">
                                        {team.name}
                                    </span>
                                )}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Socials / Extra Links */}
                {!isCollapsed && (
                    <div className="bg-mwiri-blue rounded-lg shadow-sm p-4 text-white">
                        <h3 className="font-bold mb-2 text-sm">Follow Us</h3>
                        <div className="flex gap-4">
                            <a href="#" className="hover:text-mwiri-yellow transition-colors">
                                {/* Twitter Icon */}
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
                            </a>
                            <a href="#" className="hover:text-mwiri-yellow transition-colors">
                                {/* Instagram Icon */}
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LeftSidebar;
