"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { teams } from '../data/teams';
import { players } from '../data/players';
import { useRouter } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle';
import InstallAppButton from './InstallAppButton';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<{ teams: any[], players: any[] }>({ teams: [], players: [] });
    const pathname = usePathname();
    const router = useRouter();
    const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Debounced search effect
    useEffect(() => {
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        if (searchQuery.length > 1) {
            searchTimeoutRef.current = setTimeout(() => {
                const filteredTeams = teams.filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 3);
                const filteredPlayers = players.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5);
                setSearchResults({ teams: filteredTeams, players: filteredPlayers });
            }, 300);
        } else {
            setSearchResults({ teams: [], players: [] });
        }

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
        { name: 'Home', href: '/', icon: '🏠' },
        { name: 'Table', href: '/table', icon: '📊' },
        { name: 'Fixtures', href: '/fixtures', icon: '📅' },
        { name: 'Results', href: '/results', icon: '⚽' },
        { name: 'Stats', href: '/stats', icon: '📈' },
        { name: 'Knockout', href: '/knockout', icon: '🏆' },
        { name: 'Gallery', href: '/gallery', icon: '📸' },
        { name: 'Fantasy', href: '/fantasy', icon: '🎮' },
        { name: 'Clubs', href: '/clubs', icon: '🛡️' },
        { name: 'News', href: '/news', icon: '📰' },
    ];

    // Mobile dock links (subset for space)
    const dockLinks = [
        { name: 'Home', href: '/', icon: '🏠' },
        { name: 'Table', href: '/table', icon: '📊' },
        { name: 'Fixtures', href: '/fixtures', icon: '📅' },
        { name: 'Stats', href: '/stats', icon: '📈' },
        { name: 'More', href: '#', icon: '☰', isMore: true },
    ];

    return (
        <>
            {/* Desktop Navigation */}
            <header className="hidden md:block sticky top-0 z-50">
                <nav className="crystal-nav">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            {/* Logo & Brand */}
                            <div className="flex items-center gap-3">
                                <Link href="/" className="relative h-10 w-10 flex-shrink-0 bg-white/10 rounded-xl p-1 hover:bg-white/20 transition-colors">
                                    <Image
                                        src="/images/mwiri-logo.png"
                                        alt="Mwiri League Logo"
                                        fill
                                        className="object-contain p-0.5"
                                        priority
                                    />
                                </Link>
                                <span className="font-barlow font-extrabold text-xl tracking-tight text-white">
                                    MWIRI<span className="text-mwiri-gold">LEAGUE</span>
                                </span>
                            </div>

                            {/* Desktop Menu */}
                            <div className="flex items-center space-x-1">
                                {navLinks.map((link) => {
                                    const isActive = pathname === link.href;
                                    return (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide transition-all duration-200 ${isActive
                                                ? 'bg-mwiri-gold/20 text-mwiri-gold'
                                                : 'text-white/60 hover:text-white hover:bg-white/10'
                                                }`}
                                        >
                                            {link.name}
                                        </Link>
                                    );
                                })}
                            </div>

                            {/* Right Side Actions */}
                            <div className="flex items-center gap-3 relative">
                                {/* Search Bar */}
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-4 w-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        className="block w-40 focus:w-56 pl-10 pr-3 py-1.5 border-0 rounded-xl leading-5 bg-white/10 text-white placeholder-white/40 focus:outline-none focus:bg-white/20 focus:ring-1 focus:ring-mwiri-gold/50 text-sm transition-all duration-300"
                                        placeholder="Search..."
                                        value={searchQuery}
                                        onChange={handleSearch}
                                    />

                                    {/* Search Results Dropdown */}
                                    {(searchResults.teams.length > 0 || searchResults.players.length > 0) && (
                                        <div className="absolute right-0 mt-2 w-72 crystal-glass rounded-2xl overflow-hidden z-50 border border-mwiri-gold/20">
                                            {searchResults.teams.length > 0 && (
                                                <div className="py-2">
                                                    <div className="px-4 py-1 text-xs font-bold text-mwiri-gold uppercase tracking-wider">Clubs</div>
                                                    {searchResults.teams.map((team: any) => (
                                                        <button
                                                            key={team.id}
                                                            onClick={() => navigateTo(`/clubs/${team.id}`)}
                                                            className="w-full text-left px-4 py-2 hover:bg-white/10 flex items-center gap-3 transition-colors"
                                                        >
                                                            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white text-xs font-bold overflow-hidden">
                                                                {team.logo ? <img src={team.logo} alt={team.name} className="w-full h-full object-cover" /> : team.name.charAt(0)}
                                                            </div>
                                                            <span className="font-medium text-white">{team.name}</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            )}

                                            {searchResults.players.length > 0 && (
                                                <div className="py-2 border-t border-white/10">
                                                    <div className="px-4 py-1 text-xs font-bold text-mwiri-gold uppercase tracking-wider">Players</div>
                                                    {searchResults.players.map((player: any) => (
                                                        <button
                                                            key={player.id}
                                                            onClick={() => navigateTo(`/players/${player.id}`)}
                                                            className="w-full text-left px-4 py-2 hover:bg-white/10 flex items-center gap-3 transition-colors"
                                                        >
                                                            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white text-xs font-bold">
                                                                {player.name.charAt(0)}
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <span className="font-medium text-white leading-none">{player.name}</span>
                                                                <span className="text-xs text-white/50 mt-1">{player.teamName}</span>
                                                            </div>
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <Link href="/fantasy" className="crystal-btn text-xs py-1.5 px-4">
                                    Fantasy
                                </Link>

                                <InstallAppButton />

                                <div className="border-l border-white/20 pl-3">
                                    <ThemeToggle />
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>

            {/* Mobile Top Bar */}
            <header className="md:hidden fixed top-0 left-0 right-0 z-50 crystal-nav">
                <div className="flex items-center justify-between px-4 h-14">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="relative h-8 w-8 bg-white/10 rounded-lg p-0.5">
                            <Image
                                src="/images/mwiri-logo.png"
                                alt="Mwiri League"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                        <span className="font-barlow font-bold text-white text-sm">
                            MWIRI<span className="text-mwiri-gold">LEAGUE</span>
                        </span>
                    </Link>

                    <div className="flex items-center gap-2">
                        <ThemeToggle />
                        <button
                            onClick={toggleMenu}
                            className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                            aria-label="Menu"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Dropdown Menu */}
                <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[60vh] opacity-100' : 'max-h-0 opacity-0'}`}
                >
                    <div className="px-4 py-4 space-y-1 bg-mwiri-green-deep/95 border-t border-white/10 max-h-[50vh] overflow-y-auto scrollbar-crystal">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={toggleMenu}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-colors ${pathname === link.href
                                        ? 'bg-mwiri-gold/20 text-mwiri-gold'
                                        : 'text-white hover:bg-white/10'
                                    }`}
                            >
                                <span className="text-lg">{link.icon}</span>
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </header>

            {/* Mobile Bottom Dock */}
            <div className="md:hidden bottom-dock">
                <div className="bottom-dock-inner">
                    {dockLinks.map((link) => {
                        if (link.isMore) {
                            return (
                                <button
                                    key={link.name}
                                    onClick={toggleMenu}
                                    className={`dock-item ${isOpen ? 'active' : ''}`}
                                >
                                    <span className="text-lg">{link.icon}</span>
                                    <span className="text-[10px] font-bold">{link.name}</span>
                                </button>
                            );
                        }

                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`dock-item ${isActive ? 'active' : ''}`}
                            >
                                <span className="text-lg">{link.icon}</span>
                                <span className="text-[10px] font-bold">{link.name}</span>
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Spacer for mobile top bar */}
            <div className="h-14 md:hidden" aria-hidden="true"></div>
        </>
    );
};

export default Navbar;
