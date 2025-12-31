import React from 'react';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-mwiri-blue-deep text-white pt-20 pb-10 border-t-8 border-mwiri-yellow font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">



                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
                    {/* Links Column 1 */}
                    <div>
                        <h3 className="font-bold text-lg mb-6 text-white">Mwiri League</h3>
                        <ul className="space-y-3 text-sm text-blue-200">
                            <li><Link href="/" className="hover:text-mwiri-yellow transition-colors">Home</Link></li>
                            <li><Link href="/fixtures" className="hover:text-mwiri-yellow transition-colors">Fixtures</Link></li>
                            <li><Link href="/results" className="hover:text-mwiri-yellow transition-colors">Results</Link></li>
                            <li><Link href="/table" className="hover:text-mwiri-yellow transition-colors">Tables</Link></li>
                            <li><Link href="/clubs" className="hover:text-mwiri-yellow transition-colors">Clubs</Link></li>
                        </ul>
                    </div>

                    {/* Links Column 2 */}
                    <div>
                        <h3 className="font-bold text-lg mb-6 text-white">Stats</h3>
                        <ul className="space-y-3 text-sm text-blue-200">
                            <li><Link href="/stats" className="hover:text-mwiri-yellow transition-colors">Player Stats</Link></li>
                            <li><Link href="/stats" className="hover:text-mwiri-yellow transition-colors">Club Stats</Link></li>
                            <li><Link href="/stats" className="hover:text-mwiri-yellow transition-colors">Records</Link></li>
                        </ul>
                    </div>

                    {/* Links Column 3 */}
                    <div>
                        <h3 className="font-bold text-lg mb-6 text-white">The Club</h3>
                        <ul className="space-y-3 text-sm text-blue-200">
                            <li><a href="#" className="hover:text-mwiri-yellow transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-mwiri-yellow transition-colors">Contact</a></li>
                            <li><a href="#" className="hover:text-mwiri-yellow transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-mwiri-yellow transition-colors">News</a></li>
                        </ul>
                    </div>

                    {/* Links Column 4 */}
                    <div>
                        <h3 className="font-bold text-lg mb-6 text-white">Legal</h3>
                        <ul className="space-y-3 text-sm text-blue-200">
                            <li><a href="#" className="hover:text-mwiri-yellow transition-colors">Terms & Conditions</a></li>
                            <li><a href="#" className="hover:text-mwiri-yellow transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-mwiri-yellow transition-colors">Cookie Policy</a></li>
                            <li><a href="#" className="hover:text-mwiri-yellow transition-colors">Accessibility</a></li>
                        </ul>
                    </div>
                </div>



                {/* Copyright */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-blue-400">
                    <p>&copy; 2025 Mwiri League. All rights reserved.</p>
                    <p className="mt-2 md:mt-0">Designed for Champions.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
