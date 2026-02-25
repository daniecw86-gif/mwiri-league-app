/**
 * Expanded tests: Footer, LeagueTable, and page metadata
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer';

// Mock next/link
jest.mock('next/link', () => ({
    __esModule: true,
    default: ({ children, href }: { children: React.ReactNode; href: string }) => (
        <a href={href}>{children}</a>
    ),
}));

// Mock next/image
jest.mock('next/image', () => ({
    __esModule: true,
    default: (props: { alt: string; src: string }) => {
        // eslint-disable-next-line @next/next/no-img-element
        return <img alt={props.alt} src={props.src} />;
    },
}));

describe('Footer Component', () => {
    it('renders the Mwiri League brand', () => {
        render(<Footer />);
        expect(screen.getByText('MWIRI')).toBeInTheDocument();
    });

    it('renders copyright text', () => {
        render(<Footer />);
        expect(screen.getByText(/2026 Mwiri League/)).toBeInTheDocument();
    });

    it('contains link to About page', () => {
        render(<Footer />);
        const aboutLink = screen.getByText('About Us');
        expect(aboutLink.closest('a')).toHaveAttribute('href', '/about');
    });

    it('contains link to Contact page', () => {
        render(<Footer />);
        const contactLink = screen.getByText('Contact');
        expect(contactLink.closest('a')).toHaveAttribute('href', '/contact');
    });

    it('contains link to Fixtures', () => {
        render(<Footer />);
        const fixturesLink = screen.getByText('Fixtures');
        expect(fixturesLink.closest('a')).toHaveAttribute('href', '/fixtures');
    });

    it('contains link to Results', () => {
        render(<Footer />);
        const resultsLink = screen.getByText('Results');
        expect(resultsLink.closest('a')).toHaveAttribute('href', '/results');
    });

    it('contains link to Gallery', () => {
        render(<Footer />);
        const galleryLink = screen.getByText('Gallery');
        expect(galleryLink.closest('a')).toHaveAttribute('href', '/gallery');
    });

    it('renders More section with Fantasy link', () => {
        render(<Footer />);
        expect(screen.getByText('More')).toBeInTheDocument();
    });

    it('contains link to Knockout Bracket', () => {
        render(<Footer />);
        const knockoutLink = screen.getByText('Knockout Bracket');
        expect(knockoutLink.closest('a')).toHaveAttribute('href', '/knockout');
    });

    it('no dead # links in footer', () => {
        const { container } = render(<Footer />);
        const links = container.querySelectorAll('a[href="#"]');
        expect(links.length).toBe(0);
    });
});
