import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Us | Mwiri League',
    description: 'Get in touch with the Mwiri League organising committee. Reach out for sponsorship enquiries, team registration, and general questions.',
};

export default function ContactPage() {
    return (
        <main className="min-h-screen">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="font-barlow text-4xl md:text-5xl font-black text-white mb-4 text-shadow-lg">
                        Contact <span className="text-mwiri-gold">Us</span>
                    </h1>
                    <p className="text-white/60 text-sm">
                        Have a question? Get in touch with the organising committee.
                    </p>
                    <div className="w-20 h-1 bg-mwiri-gold mx-auto rounded-full mt-4"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Contact Info Cards */}
                    <div className="space-y-6">
                        <div className="crystal-glass rounded-3xl p-6">
                            <h2 className="font-barlow font-bold text-xl text-mwiri-gold mb-4 flex items-center gap-2">
                                <span>📧</span> Email
                            </h2>
                            <p className="text-white/80">
                                For general enquiries, sponsorship, and partnerships:
                            </p>
                            <a href="mailto:info@mwirileague.com" className="text-mwiri-gold hover:text-mwiri-yellow transition-colors font-medium block mt-2">
                                info@mwirileague.com
                            </a>
                        </div>

                        <div className="crystal-glass rounded-3xl p-6">
                            <h2 className="font-barlow font-bold text-xl text-mwiri-gold mb-4 flex items-center gap-2">
                                <span>📍</span> Venue
                            </h2>
                            <p className="text-white/80">
                                All matches are played at:
                            </p>
                            <p className="text-white font-medium mt-2">IUEA Sports Ground</p>
                            <p className="text-white/60 text-sm">Kampala, Uganda</p>
                        </div>

                        <div className="crystal-glass rounded-3xl p-6">
                            <h2 className="font-barlow font-bold text-xl text-mwiri-gold mb-4 flex items-center gap-2">
                                <span>🏫</span> Busoga College Mwiri
                            </h2>
                            <p className="text-white/80">
                                The league is an initiative by the Old Boys of Busoga College Mwiri, Jinja, Uganda.
                            </p>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="crystal-glass-gold rounded-3xl p-8">
                        <h2 className="font-barlow font-bold text-xl text-mwiri-gold mb-6 flex items-center gap-2">
                            <span>💬</span> How Can We Help?
                        </h2>
                        <div className="space-y-4">
                            <div className="p-4 bg-white/5 rounded-2xl">
                                <h3 className="font-bold text-white text-sm">🤝 Sponsorship</h3>
                                <p className="text-white/60 text-sm mt-1">
                                    Interested in supporting the league? We work with brands that share our vision of
                                    community and excellence.
                                </p>
                            </div>
                            <div className="p-4 bg-white/5 rounded-2xl">
                                <h3 className="font-bold text-white text-sm">⚽ Team Registration</h3>
                                <p className="text-white/60 text-sm mt-1">
                                    Want your graduating class to participate? Reach out to confirm your team&apos;s
                                    spot for the next season.
                                </p>
                            </div>
                            <div className="p-4 bg-white/5 rounded-2xl">
                                <h3 className="font-bold text-white text-sm">📰 Media & Press</h3>
                                <p className="text-white/60 text-sm mt-1">
                                    For media accreditation and press enquiries, contact us via email.
                                </p>
                            </div>
                            <div className="p-4 bg-white/5 rounded-2xl">
                                <h3 className="font-bold text-white text-sm">🐛 Website Feedback</h3>
                                <p className="text-white/60 text-sm mt-1">
                                    Found a bug or have feedback about this website? We&apos;d love to hear from you.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
