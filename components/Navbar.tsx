"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { teams } from '../data/teams';
import { players } from '../data/players';
import { useRouter } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<{ teams: any[], players: any[] }>({ teams: [], players: [] });
    const pathname = usePathname();
    const router = useRouter();
    const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Debounced search effect
    useEffect(() => {
        // Clear previous timeout
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        // Only search if query is longer than 1 character
        if (searchQuery.length > 1) {
            // Set new timeout
            searchTimeoutRef.current = setTimeout(() => {
                const filteredTeams = teams.filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 3);
                const filteredPlayers = players.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5);
                setSearchResults({ teams: filteredTeams, players: filteredPlayers });
            }, 300); // 300ms debounce delay
        } else {
            setSearchResults({ teams: [], players: [] });
        }

        // Cleanup function
        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
        };
    }, [searchQuery]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const navigateTo = (path: string) => {
        router.push(path);
        setSearchQuery('');
        setSearchResults({ teams: [], players: [] });
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Table', href: '/table' },
        { name: 'Fixtures', href: '/fixtures' },
        { name: 'Results', href: '/results' },
        { name: 'Stats', href: '/stats' },
        { name: 'Knockout', href: '/knockout' },
        { name: 'Fantasy', href: '/fantasy' },
        { name: 'Clubs', href: '/clubs' },
        { name: 'News', href: '/news' },
    ];

    return (
        <header className="flex flex-col w-full z-50 relative font-sans">
            {/* Main Navigation */}
            <nav className="bg-mwiri-blue-deep text-white shadow-xl relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo & Brand */}
                        <div className="flex items-center gap-4">
                            <Link href="/" className="relative h-14 w-14 flex-shrink-0 bg-white rounded-full p-1 shadow-lg hover:scale-105 transition-transform duration-300">
                                <Image
                                    src="/images/mwiri-logo.png"
                                    alt="Mwiri League Logo"
                                    fill
                                    className="object-contain p-1"
                                    priority
                                />
                            </Link>
                            <span className="font-extrabold text-2xl tracking-tight text-white hidden sm:block">
                                MWIRI<span className="text-mwiri-yellow">LEAGUE</span>
                            </span>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-1">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className={`px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wide transition-all duration-200 ${isActive
                                            ? 'bg-white/10 text-mwiri-yellow shadow-inner'
                                            : 'text-gray-200 hover:bg-white/5 hover:text-white'
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Right Side Actions (Search & Fantasy) */}
                        <div className="hidden md:flex items-center gap-4 relative">
                            {/* Search Bar */}
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    className="block w-full pl-10 pr-3 py-1.5 border border-transparent rounded-full leading-5 bg-mwiri-blue-dark text-white placeholder-gray-400 focus:outline-none focus:bg-white focus:text-gray-900 sm:text-sm transition-all duration-300 w-48 focus:w-64"
                                    placeholder="Search clubs, players..."
                                    value={searchQuery}
                                    onChange={handleSearch}
                                />

                                {/* Search Results Dropdown */}
                                {(searchResults.teams.length > 0 || searchResults.players.length > 0) && (
                                    <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-2xl overflow-hidden z-50 text-gray-900 border border-gray-100">
                                        {searchResults.teams.length > 0 && (
                                            <div className="py-2">
                                                <div className="px-4 py-1 text-xs font-bold text-gray-500 uppercase tracking-wider">Clubs</div>
                                                {searchResults.teams.map((team: any) => (
                                                    <button
                                                        key={team.id}
                                                        onClick={() => navigateTo(`/clubs/${team.id}`)}
                                                        className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-3 transition-colors"
                                                    >
                                                        <div className="w-8 h-8 rounded-full bg-mwiri-blue-deep flex items-center justify-center text-white text-xs font-bold overflow-hidden">
                                                            {team.logo ? <img src={team.logo} alt={team.name} className="w-full h-full object-cover" /> : team.name.charAt(0)}
                                                        </div>
                                                        <span className="font-medium">{team.name}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        )}

                                        {searchResults.players.length > 0 && (
                                            <div className="py-2 border-t border-gray-100">
                                                <div className="px-4 py-1 text-xs font-bold text-gray-500 uppercase tracking-wider">Players</div>
                                                {searchResults.players.map((player: any) => (
                                                    <button
                                                        key={player.id}
                                                        onClick={() => navigateTo(`/players/${player.id}`)}
                                                        className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-3 transition-colors"
                                                    >
                                                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs font-bold">
                                                            {player.name.charAt(0)}
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="font-medium leading-none">{player.name}</span>
                                                            <span className="text-xs text-gray-500 mt-1">{player.teamName}</span>
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            <Link href="/fantasy" className="bg-mwiri-yellow text-mwiri-blue-deep px-5 py-2 rounded-full text-sm font-bold hover:bg-white hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
                                Fantasy
                            </Link>

                            <div className="border-l border-white/20 pl-4">
                                <ThemeToggle />
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="flex md:hidden">
                            <button
                                onClick={toggleMenu}
                                type="button"
                                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-mwiri-yellow focus:outline-none"
                                aria-controls="mobile-menu"
                                aria-expanded="false"
                            >
                                <span className="sr-only">Open main menu</span>
                                {!isOpen ? (
                                    <svg className="block h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                ) : (
                                    <svg className="block h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                    id="mobile-menu"
                >
                    <div className="px-4 pt-2 pb-6 space-y-2 bg-mwiri-blue-deep border-t border-white/10">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={toggleMenu}
                                className="block px-3 py-3 rounded-md text-base font-bold text-white hover:bg-white/10 hover:text-mwiri-yellow border-b border-white/5 last:border-0"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="pt-4 flex flex-col gap-3">
                            <button className="w-full bg-mwiri-yellow text-mwiri-blue-deep px-5 py-3 rounded-lg text-base font-bold hover:bg-white transition-colors">
                                Fantasy
                            </button>
                            <button className="w-full text-center text-gray-300 hover:text-white font-bold py-2">
                                Sign In
                            </button>
                            <div className="flex items-center justify-between px-3 py-2 bg-black/20 rounded-lg">
                                <span className="font-bold text-white">Theme</span>
                                <ThemeToggle />
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header >
    );
};

export default Navbar;
