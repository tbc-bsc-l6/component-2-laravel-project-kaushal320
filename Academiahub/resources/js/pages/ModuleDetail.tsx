import SiteNavbar from '@/components/site-navbar';
import { Head, Link } from '@inertiajs/react';
import { BookOpen, Users, GraduationCap, CheckCircle, ArrowLeft, UserCircle } from 'lucide-react';

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

export default function ModuleDetail({ module, enrolledCount }: { module: Module; enrolledCount: number }) {
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
                        <Link href="/" className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100">
                            <ArrowLeft className="size-4" />
                            Back to Home
                        </Link>
                    </div>

                    {/* Module Header */}
                    <section className="relative isolate overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-12 text-white shadow-xl mb-8">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        <div className="relative z-10">
                            <div className="mb-4 flex items-center gap-3">
                                <div className="inline-flex rounded-lg bg-white/20 backdrop-blur-sm p-3">
                                    <BookOpen className="size-8" />
                                </div>
                                <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
                                    module.available 
                                        ? 'bg-green-500/20 text-green-100 backdrop-blur-sm' 
                                        : 'bg-red-500/20 text-red-100 backdrop-blur-sm'
                                }`}>
                                    {module.available ? 'Available' : 'Unavailable'}
                                </span>
                            </div>
                            <h1 className="text-4xl font-bold mb-2">{module.title}</h1>
                            <p className="text-lg text-white/90 mb-6">Course Code: {module.code}</p>
                            <div className="flex flex-wrap gap-4">
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center gap-2">
                                    <Users className="size-5" />
                                    <span className="text-sm font-medium">{enrolledCount} / {module.capacity} enrolled</span>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center gap-2">
                                    <CheckCircle className="size-5" />
                                    <span className="text-sm font-medium">{availableSeats} seats available</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="grid gap-8 lg:grid-cols-3">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Teachers Section */}
                            {module.teachers && module.teachers.length > 0 && (
                                <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                                    <div className="mb-4 flex items-center gap-2">
                                        <GraduationCap className="size-5 text-indigo-500" />
                                        <h2 className="text-xl font-semibold">Instructors</h2>
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
                                                    <p className="font-medium">{teacher.name}</p>
                                                    <p className="text-sm text-neutral-600 dark:text-neutral-400">{teacher.email}</p>
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
                                    <h2 className="text-xl font-semibold">About This Module</h2>
                                </div>
                                <div className="prose dark:prose-invert max-w-none">
                                    {module.description ? (
                                        <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                                            {module.description}
                                        </p>
                                    ) : (
                                        <p className="text-neutral-500 dark:text-neutral-400 italic">
                                            No description available for this module yet.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Module Info Card */}
                            <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                                <h3 className="text-lg font-semibold mb-4">Module Information</h3>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">Course Code</p>
                                        <p className="font-mono text-sm bg-neutral-100 dark:bg-zinc-800 px-2 py-1 rounded inline-block">
                                            {module.code}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">Capacity</p>
                                        <p className="font-semibold">{module.capacity} students</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">Currently Enrolled</p>
                                        <p className="font-semibold">{enrolledCount} students</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">Available Seats</p>
                                        <p className="font-semibold text-green-600 dark:text-green-400">{availableSeats} seats</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">Status</p>
                                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                            module.available 
                                                ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                                                : 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                        }`}>
                                            {module.available ? 'Open for enrollment' : 'Closed'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* CTA Card */}
                            <div className="rounded-xl border bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 p-6 border-indigo-200 dark:border-indigo-800">
                                <h3 className="text-lg font-semibold mb-2">Interested in this module?</h3>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                                    Log in to enroll and start your learning journey.
                                </p>
                                <Link
                                    href="/login"
                                    className="block w-full text-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
                                >
                                    Log in to enroll
                                </Link>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
