import SiteNavbar from '@/components/site-navbar';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft,
    BookOpen,
    CheckCircle,
    GraduationCap,
    UserCircle,
    Users,
} from 'lucide-react';

interface Teacher {
    id: number;
    name: string;
    email: string;
}

interface Module {
    id: number;
    title: string;
    code: string;
    description?: string;
    capacity: number;
    available: boolean;
    created_at: string;
    teachers?: Teacher[];
}

interface ModuleDetailProps {
    module: Module;
    enrolledCount: number;
    isEnrolled: boolean;
    isAuthenticated: boolean;
}

export default function ModuleDetail({
    module,
    enrolledCount,
    isEnrolled,
    isAuthenticated,
}: ModuleDetailProps) {
    const availableSeats = module.capacity - enrolledCount;

    return (
        <>
            <Head title={`${module.title} - AcademiaHub`} />
            <div className="min-h-screen bg-gradient-to-b from-white to-neutral-100 dark:from-zinc-900 dark:to-zinc-950">
                <header className="border-b dark:border-zinc-800">
                    <SiteNavbar />
                </header>

                <main className="mx-auto max-w-6xl px-6 pb-16">
                    {/* Back button */}
                    <div className="py-6">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                        >
                            <ArrowLeft className="size-4" />
                            Back to Home
                        </Link>
                    </div>

                    {/* Module Header */}
                    <section className="relative isolate mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-12 text-white shadow-xl">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        <div className="relative z-10">
                            <div className="mb-4 flex items-center gap-3">
                                <div className="inline-flex rounded-lg bg-white/20 p-3 backdrop-blur-sm">
                                    <BookOpen className="size-8" />
                                </div>
                                <span
                                    className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
                                        module.available
                                            ? 'bg-green-500/20 text-green-100 backdrop-blur-sm'
                                            : 'bg-red-500/20 text-red-100 backdrop-blur-sm'
                                    }`}
                                >
                                    {module.available
                                        ? 'Available'
                                        : 'Unavailable'}
                                </span>
                            </div>
                            <h1 className="mb-2 text-4xl font-bold">
                                {module.title}
                            </h1>
                            <p className="mb-6 text-lg text-white/90">
                                Course Code: {module.code}
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <div className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 backdrop-blur-sm">
                                    <Users className="size-5" />
                                    <span className="text-sm font-medium">
                                        {enrolledCount} / {module.capacity}{' '}
                                        enrolled
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 backdrop-blur-sm">
                                    <CheckCircle className="size-5" />
                                    <span className="text-sm font-medium">
                                        {availableSeats} seats available
                                    </span>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="grid gap-8 lg:grid-cols-3">
                        {/* Main Content */}
                        <div className="space-y-6 lg:col-span-2">
                            {/* Teachers Section */}
                            {module.teachers && module.teachers.length > 0 && (
                                <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                                    <div className="mb-4 flex items-center gap-2">
                                        <GraduationCap className="size-5 text-indigo-500" />
                                        <h2 className="text-xl font-semibold">
                                            Instructors
                                        </h2>
                                    </div>
                                    <div className="space-y-3">
                                        {module.teachers.map((teacher) => (
                                            <div
                                                key={teacher.id}
                                                className="flex items-center gap-3 rounded-lg border p-4 dark:border-zinc-800"
                                            >
                                                <div className="flex size-10 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30">
                                                    <UserCircle className="size-6 text-indigo-600 dark:text-indigo-400" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">
                                                        {teacher.name}
                                                    </p>
                                                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                                        {teacher.email}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Module Description Section */}
                            <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                                <div className="mb-4 flex items-center gap-2">
                                    <BookOpen className="size-5 text-blue-500" />
                                    <h2 className="text-xl font-semibold">
                                        About This Module
                                    </h2>
                                </div>
                                <div className="prose dark:prose-invert max-w-none">
                                    {module.description ? (
                                        <p className="leading-relaxed text-neutral-700 dark:text-neutral-300">
                                            {module.description}
                                        </p>
                                    ) : (
                                        <p className="text-neutral-500 italic dark:text-neutral-400">
                                            No description available for this
                                            module yet.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Module Info Card */}
                            <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                                <h3 className="mb-4 text-lg font-semibold">
                                    Module Information
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <p className="mb-1 text-sm text-neutral-600 dark:text-neutral-400">
                                            Course Code
                                        </p>
                                        <p className="inline-block rounded bg-neutral-100 px-2 py-1 font-mono text-sm dark:bg-zinc-800">
                                            {module.code}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="mb-1 text-sm text-neutral-600 dark:text-neutral-400">
                                            Capacity
                                        </p>
                                        <p className="font-semibold">
                                            {module.capacity} students
                                        </p>
                                    </div>
                                    <div>
                                        <p className="mb-1 text-sm text-neutral-600 dark:text-neutral-400">
                                            Currently Enrolled
                                        </p>
                                        <p className="font-semibold">
                                            {enrolledCount} students
                                        </p>
                                    </div>
                                    <div>
                                        <p className="mb-1 text-sm text-neutral-600 dark:text-neutral-400">
                                            Available Seats
                                        </p>
                                        <p className="font-semibold text-green-600 dark:text-green-400">
                                            {availableSeats} seats
                                        </p>
                                    </div>
                                    <div>
                                        <p className="mb-1 text-sm text-neutral-600 dark:text-neutral-400">
                                            Status
                                        </p>
                                        <span
                                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                module.available
                                                    ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                                    : 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                            }`}
                                        >
                                            {module.available
                                                ? 'Open for enrollment'
                                                : 'Closed'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* CTA Card */}
                            <div className="rounded-xl border border-indigo-200 bg-gradient-to-br from-indigo-50 to-purple-50 p-6 dark:border-indigo-800 dark:from-indigo-950/30 dark:to-purple-950/30">
                                <h3 className="mb-2 text-lg font-semibold">
                                    Interested in this module?
                                </h3>
                                {isEnrolled ? (
                                    <>
                                        <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-400">
                                            You are already enrolled in this
                                            module.
                                        </p>
                                        <Link
                                            href="/student"
                                            className="block w-full rounded-md bg-green-600 px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-green-700"
                                        >
                                            Go to your dashboard
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-400">
                                            {isAuthenticated
                                                ? 'Enroll now to start your learning journey.'
                                                : 'Log in to enroll and start your learning journey.'}
                                        </p>
                                        {isAuthenticated ? (
                                            <Link
                                                method="post"
                                                href={`/student/enroll/${module.id}`}
                                                as="button"
                                                className="block w-full rounded-md bg-indigo-600 px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-indigo-700 disabled:opacity-60"
                                                disabled={
                                                    !module.available ||
                                                    availableSeats <= 0
                                                }
                                            >
                                                {module.available &&
                                                availableSeats > 0
                                                    ? 'Enroll now'
                                                    : 'Enrollment closed'}
                                            </Link>
                                        ) : (
                                            <Link
                                                href="/login"
                                                className="block w-full rounded-md bg-indigo-600 px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-indigo-700"
                                            >
                                                Log in to enroll
                                            </Link>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
