import SiteNavbar from '@/components/site-navbar';
import { Head } from '@inertiajs/react';
import { BookOpen, Users, GraduationCap, Shield, Target, Zap, Heart, Globe } from 'lucide-react';

export default function About() {
    return (
        <>
            <Head title="About – AcademiaHub" />
            <div className="min-h-screen bg-gradient-to-b from-white to-neutral-100 dark:from-zinc-900 dark:to-zinc-950">
                <header className="border-b dark:border-zinc-800">
                    <SiteNavbar />
                </header>
                <main className="mx-auto max-w-6xl px-6 pb-16">
                    {/* Hero */}
                    <section className="relative isolate overflow-hidden rounded-2xl bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 p-12 text-white shadow-xl my-8">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        <div className="relative z-10 text-center">
                            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
                                About AcademiaHub
                            </h1>
                            <p className="text-lg text-white/90 max-w-2xl mx-auto">
                                A comprehensive educational platform designed to streamline module management, enhance teaching effectiveness, and empower student success.
                            </p>
                        </div>
                    </section>

                    {/* Core Features */}
                    <section className="mb-12">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">What We Offer</h2>
                            <p className="text-neutral-600 dark:text-neutral-300">Complete tools for modern education management</p>
                        </div>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                                <div className="mb-4 inline-flex rounded-lg bg-emerald-500 p-3 text-white">
                                    <BookOpen className="size-6" />
                                </div>
                                <h2 className="text-lg font-semibold mb-2">Module Management</h2>
                                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                                    Create, organize, and manage course modules with custom codes, capacity controls, and availability settings. Full CRUD operations with intuitive interfaces.
                                </p>
                            </div>

                            <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                                <div className="mb-4 inline-flex rounded-lg bg-blue-500 p-3 text-white">
                                    <GraduationCap className="size-6" />
                                </div>
                                <h2 className="text-lg font-semibold mb-2">Teacher Portal</h2>
                                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                                    Teachers access assigned modules, view enrolled students, and update progress statuses. Comprehensive dashboard for effective course management.
                                </p>
                            </div>

                            <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                                <div className="mb-4 inline-flex rounded-lg bg-purple-500 p-3 text-white">
                                    <Users className="size-6" />
                                </div>
                                <h2 className="text-lg font-semibold mb-2">Student Enrollment</h2>
                                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                                    Students browse available modules, enroll with one click, and track their progress. View enrollment history and completion status.
                                </p>
                            </div>

                            <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                                <div className="mb-4 inline-flex rounded-lg bg-red-500 p-3 text-white">
                                    <Shield className="size-6" />
                                </div>
                                <h2 className="text-lg font-semibold mb-2">Admin Controls</h2>
                                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                                    Complete administrative oversight. Manage users, create teacher accounts, assign modules, and monitor system-wide activity and performance.
                                </p>
                            </div>

                            <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                                <div className="mb-4 inline-flex rounded-lg bg-amber-500 p-3 text-white">
                                    <Target className="size-6" />
                                </div>
                                <h2 className="text-lg font-semibold mb-2">Progress Tracking</h2>
                                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                                    Real-time status updates from pending to completed. Teachers mark student progress, students view their journey, admins monitor overall performance.
                                </p>
                            </div>

                            <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                                <div className="mb-4 inline-flex rounded-lg bg-cyan-500 p-3 text-white">
                                    <Zap className="size-6" />
                                </div>
                                <h2 className="text-lg font-semibold mb-2">Secure Authentication</h2>
                                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                                    Laravel Fortify powers our authentication. Two-factor authentication, password resets, and role-based access control ensure security.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Mission */}
                    <section className="rounded-xl bg-gradient-to-r from-violet-500 to-purple-500 p-8 text-white shadow-xl">
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <div className="bg-white/20 backdrop-blur-sm rounded-full p-6">
                                <Heart className="size-12" />
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <h2 className="text-2xl font-bold mb-2">Our Mission</h2>
                                <p className="text-white/90">
                                    To provide educators and students with powerful, intuitive tools that simplify module management, enhance learning experiences, and foster academic success through innovative technology.
                                </p>
                            </div>
                            <div className="bg-white/20 backdrop-blur-sm rounded-full p-6">
                                <Globe className="size-12" />
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
}
