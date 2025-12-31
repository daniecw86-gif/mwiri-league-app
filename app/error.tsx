'use client';

import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to console in development
        console.error('App error:', error);
    }, [error]);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 text-center">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Something went wrong!
                </h2>

                <p className="text-gray-600 dark:text-gray-300 mb-6">
                    We encountered an unexpected error while loading this page.
                </p>

                {process.env.NODE_ENV === 'development' && (
                    <div className="mb-6 p-4 bg-gray-100 dark:bg-slate-700 rounded-lg text-left">
                        <p className="text-sm font-mono text-red-600 dark:text-red-400 break-words">
                            {error.message}
                        </p>
                        {error.digest && (
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                Digest: {error.digest}
                            </p>
                        )}
                    </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                        onClick={reset}
                        className="bg-mwiri-blue hover:bg-mwiri-blue-dark text-white font-bold py-3 px-6 rounded-full transition-colors duration-300"
                    >
                        Try Again
                    </button>

                    <a
                        href="/"
                        className="bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 text-gray-900 dark:text-white font-bold py-3 px-6 rounded-full transition-colors duration-300"
                    >
                        Go Home
                    </a>
                </div>
            </div>
        </div>
    );
}
