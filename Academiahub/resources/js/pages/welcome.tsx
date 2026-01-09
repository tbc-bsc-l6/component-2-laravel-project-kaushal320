import SiteNavbar from '@/components/site-navbar';
import ChatWidget from '@/components/ChatWidget';
import { Head, Link } from '@inertiajs/react';
import {
    Award,
    BookOpen,
    CheckCircle,
    Clock,
    GraduationCap,
    Sparkles,
    TrendingUp,
    UserCircle,
    Users,
} from 'lucide-react';

interface Module {
    id: number;
    title: string;
    code: string;
    description?: string;
    capacity: number;
    available: boolean;
    teachers?: Array<{
        id: number;
        name: string;
    }>;
}

interface WelcomeProps {
    modules?: Module[];
    auth?: { user: { id: number; name: string } };
}

export default function Welcome({ modules = [], auth }: WelcomeProps) {
    return (
        <>
            <Head title="AcademiaHub">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <div className="min-h-screen bg-gradient-to-b from-white to-neutral-100 dark:from-zinc-900 dark:to-zinc-950">
                <header className="border-b dark:border-zinc-800">
                    <SiteNavbar />
                </header>

                <main className="mx-auto max-w-6xl px-6 pb-16">
                    {/* Hero Section */}
                    <section className="relative isolate my-8 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-12 text-white shadow-xl">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        <div className="absolute top-0 right-0 size-96 translate-x-32 translate-y-[-50%] rounded-full bg-white/10 blur-3xl"></div>
                        <div className="relative z-10 mx-auto max-w-3xl text-center">
                            <div className="mb-4 flex items-center justify-center gap-2">
                                <Sparkles className="size-6 animate-pulse text-yellow-300" />
                                <span className="text-sm font-medium tracking-wider uppercase">
                                    Welcome to
                                </span>
                            </div>
                            <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
                                AcademiaHub
                            </h1>
                            <p className="mb-6 text-lg text-white/90">
                                Your comprehensive platform for managing
                                modules, tracking progress, and streamlining
                                education with modern tools.
                            </p>
                            <div className="flex flex-wrap justify-center gap-3">
                                <div className="flex items-center gap-2 rounded-lg bg-white/20 px-4 py-2 backdrop-blur-sm">
                                    <BookOpen className="size-4" />
                                    <span className="text-sm font-medium">
                                        150+ Modules
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 rounded-lg bg-white/20 px-4 py-2 backdrop-blur-sm">
                                    <Users className="size-4" />
                                    <span className="text-sm font-medium">
                                        1000+ Students
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 rounded-lg bg-white/20 px-4 py-2 backdrop-blur-sm">
                                    <GraduationCap className="size-4" />
                                    <span className="text-sm font-medium">
                                        50+ Teachers
                                    </span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Featured Modules */}
                    {modules.length > 0 && (
                        <section className="mb-12">
                            <div className="mb-8 text-center">
                                <h2 className="mb-2 text-2xl font-bold text-neutral-900 dark:text-white">
                                    Available Modules
                                </h2>
                                <p className="text-neutral-600 dark:text-neutral-300">
                                    Browse our latest courses and start your
                                    learning journey
                                </p>
                            </div>
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {modules.map((module) => (
                                    <Link
                                        key={module.id}
                                        href={`/modules/${module.id}`}
                                        className="rounded-xl border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
                                    >
                                        <div className="mb-4 flex items-start justify-between">
                                            <div className="inline-flex rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 p-3 text-white">
                                                <BookOpen className="size-5" />
                                            </div>
                                            <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                                Available
                                            </span>
                                        </div>
                                        <h3 className="mb-2 text-lg font-semibold">
                                            {module.title}
                                        </h3>
                                        <div className="mb-3 flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                                            <span className="rounded bg-neutral-100 px-2 py-1 font-mono text-xs dark:bg-zinc-800">
                                                {module.code}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Users className="size-4" />
                                                {module.capacity} seats
                                            </span>
                                        </div>
                                        {module.teachers &&
                                            module.teachers.length > 0 && (
                                                <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                                                    <UserCircle className="size-4" />
                                                    <span className="truncate">
                                                        {
                                                            module.teachers[0]
                                                                .name
                                                        }
                                                    </span>
                                                </div>
                                            )}
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Module Management Features */}
                    <section className="mb-12">
                        <div className="mb-8 text-center">
                            <h2 className="mb-2 text-2xl font-bold text-neutral-900 dark:text-white">
                                Powerful Module Management
                            </h2>
                            <p className="text-neutral-600 dark:text-neutral-300">
                                Everything you need to organize and deliver
                                exceptional education
                            </p>
                        </div>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            <div className="cursor-pointer rounded-xl border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
                                <div className="mb-4 inline-flex rounded-lg bg-blue-500 p-3 text-white">
                                    <BookOpen className="size-6" />
                                </div>
                                <h3 className="mb-2 text-lg font-semibold">
                                    Module Creation
                                </h3>
                                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                                    Create comprehensive modules with custom
                                    codes, capacity limits, and detailed
                                    descriptions. Organize content efficiently.
                                </p>
                            </div>

                            <div className="cursor-pointer rounded-xl border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
                                <div className="mb-4 inline-flex rounded-lg bg-purple-500 p-3 text-white">
                                    <Users className="size-6" />
                                </div>
                                <h3 className="mb-2 text-lg font-semibold">
                                    Student Enrollment
                                </h3>
                                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                                    Students can easily enroll in available
                                    modules. Track enrollment status, capacity,
                                    and completion progress in real-time.
                                </p>
                            </div>

                            <div className="cursor-pointer rounded-xl border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
                                <div className="mb-4 inline-flex rounded-lg bg-pink-500 p-3 text-white">
                                    <GraduationCap className="size-6" />
                                </div>
                                <h3 className="mb-2 text-lg font-semibold">
                                    Teacher Assignment
                                </h3>
                                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                                    Admins assign qualified teachers to modules.
                                    Teachers can manage their assigned courses
                                    and student progress.
                                </p>
                            </div>

                            <div className="cursor-pointer rounded-xl border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
                                <div className="mb-4 inline-flex rounded-lg bg-green-500 p-3 text-white">
                                    <CheckCircle className="size-6" />
                                </div>
                                <h3 className="mb-2 text-lg font-semibold">
                                    Progress Tracking
                                </h3>
                                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                                    Monitor student completion status with
                                    detailed tracking. Teachers update progress
                                    as students advance through modules.
                                </p>
                            </div>

                            <div className="cursor-pointer rounded-xl border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
                                <div className="mb-4 inline-flex rounded-lg bg-orange-500 p-3 text-white">
                                    <Award className="size-6" />
                                </div>
                                <h3 className="mb-2 text-lg font-semibold">
                                    Achievement System
                                </h3>
                                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                                    Track completions and achievements. Students
                                    can view their completed modules and
                                    academic milestones.
                                </p>
                            </div>

                            <div className="cursor-pointer rounded-xl border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
                                <div className="mb-4 inline-flex rounded-lg bg-indigo-500 p-3 text-white">
                                    <TrendingUp className="size-6" />
                                </div>
                                <h3 className="mb-2 text-lg font-semibold">
                                    Analytics Dashboard
                                </h3>
                                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                                    Comprehensive insights into module
                                    performance, enrollment trends, and
                                    completion rates for data-driven decisions.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Status Workflow */}
                    <section className="mb-12 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 p-8 text-white shadow-xl">
                        <h2 className="mb-6 text-center text-2xl font-bold">
                            Student Progress Workflow
                        </h2>
                        <div className="grid gap-4 sm:grid-cols-4">
                            <div className="rounded-lg bg-white/10 p-4 text-center backdrop-blur-sm">
                                <Clock className="mx-auto mb-2 size-8" />
                                <h3 className="mb-1 font-semibold">Pending</h3>
                                <p className="text-xs text-white/80">
                                    Initial enrollment status
                                </p>
                            </div>
                            <div className="rounded-lg bg-white/10 p-4 text-center backdrop-blur-sm">
                                <TrendingUp className="mx-auto mb-2 size-8" />
                                <h3 className="mb-1 font-semibold">
                                    In Progress
                                </h3>
                                <p className="text-xs text-white/80">
                                    Actively working on module
                                </p>
                            </div>
                            <div className="rounded-lg bg-white/10 p-4 text-center backdrop-blur-sm">
                                <CheckCircle className="mx-auto mb-2 size-8" />
                                <h3 className="mb-1 font-semibold">
                                    Completed
                                </h3>
                                <p className="text-xs text-white/80">
                                    Successfully finished
                                </p>
                            </div>
                            <div className="rounded-lg bg-white/10 p-4 text-center backdrop-blur-sm">
                                <Award className="mx-auto mb-2 size-8" />
                                <h3 className="mb-1 font-semibold">
                                    Certified
                                </h3>
                                <p className="text-xs text-white/80">
                                    Achievement recognized
                                </p>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
            <ChatWidget user={auth?.user} />
        </>
    );
}
