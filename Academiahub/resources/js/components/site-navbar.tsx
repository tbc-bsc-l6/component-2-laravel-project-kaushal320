import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export default function SiteNavbar() {
    const { auth } = usePage<SharedData>().props;

    return (
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 p-6">
            <div className="flex items-center gap-6 text-sm">
                <Link href="/" className="font-semibold">
                    AcademiaHub
                </Link>
                <Link
                    href="/about"
                    className="text-neutral-700 hover:underline dark:text-neutral-200"
                >
                    About
                </Link>
                <Link
                    href="/features"
                    className="text-neutral-700 hover:underline dark:text-neutral-200"
                >
                    Features
                </Link>
            </div>
            <div className="flex items-center gap-3">
                {auth?.user ? (
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center rounded-md border px-4 py-2 text-sm hover:bg-neutral-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
                    >
                        Dashboard
                    </Link>
                ) : (
                    <>
                        <Link
                            href="/login"
                            className="text-sm text-neutral-700 hover:underline dark:text-neutral-200"
                        >
                            Log in
                        </Link>
                        <Link
                            href="/register"
                            className="inline-flex items-center rounded-md bg-black px-4 py-2 text-sm text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
                        >
                            Create account
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}
