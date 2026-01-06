import React from 'react';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="crystal-glass border-t border-mwiri-gold/20 pt-16 pb-8 mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
                    {/* Links Column 1 */}
                    <div>
                        <h3 className="font-barlow font-bold text-base mb-5 text-mwiri-gold">Mwiri League</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/" className="text-white/60 hover:text-mwiri-gold transition-colors">Home</Link></li>
                            <li><Link href="/fixtures" className="text-white/60 hover:text-mwiri-gold transition-colors">Fixtures</Link></li>
                            <li><Link href="/results" className="text-white/60 hover:text-mwiri-gold transition-colors">Results</Link></li>
                            <li><Link href="/table" className="text-white/60 hover:text-mwiri-gold transition-colors">Tables</Link></li>
                            <li><Link href="/clubs" className="text-white/60 hover:text-mwiri-gold transition-colors">Clubs</Link></li>
                        </ul>
                    </div>

                    {/* Links Column 2 */}
                    <div>
                        <h3 className="font-barlow font-bold text-base mb-5 text-mwiri-gold">Stats</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/stats" className="text-white/60 hover:text-mwiri-gold transition-colors">Player Stats</Link></li>
                            <li><Link href="/stats" className="text-white/60 hover:text-mwiri-gold transition-colors">Club Stats</Link></li>
                            <li><Link href="/stats" className="text-white/60 hover:text-mwiri-gold transition-colors">Records</Link></li>
                        </ul>
                    </div>

                    {/* Links Column 3 */}
                    <div>
                        <h3 className="font-barlow font-bold text-base mb-5 text-mwiri-gold">The Club</h3>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#" className="text-white/60 hover:text-mwiri-gold transition-colors">About Us</a></li>
                            <li><a href="#" className="text-white/60 hover:text-mwiri-gold transition-colors">Contact</a></li>
                            <li><Link href="/news" className="text-white/60 hover:text-mwiri-gold transition-colors">News</Link></li>
                            <li><Link href="/gallery" className="text-white/60 hover:text-mwiri-gold transition-colors">Gallery</Link></li>
                        </ul>
                    </div>

                    {/* Links Column 4 */}
                    <div>
                        <h3 className="font-barlow font-bold text-base mb-5 text-mwiri-gold">Legal</h3>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#" className="text-white/60 hover:text-mwiri-gold transition-colors">Terms & Conditions</a></li>
                            <li><a href="#" className="text-white/60 hover:text-mwiri-gold transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="text-white/60 hover:text-mwiri-gold transition-colors">Cookie Policy</a></li>
                            <li><a href="#" className="text-white/60 hover:text-mwiri-gold transition-colors">Accessibility</a></li>
                        </ul>
                    </div>
                </div>

                {/* Brand & Copyright */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="font-barlow font-extrabold text-lg text-white">
                            MWIRI<span className="text-mwiri-gold">LEAGUE</span>
                        </span>
                    </div>
                    <p className="text-white/40 text-xs">© 2026 Mwiri League. All rights reserved.</p>
                    <p className="text-mwiri-gold/60 text-xs font-medium">Designed for Champions 🏆</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
