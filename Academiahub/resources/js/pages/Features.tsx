import SiteNavbar from '@/components/site-navbar';
import { Head } from '@inertiajs/react';
import { BookOpen, Users, GraduationCap, Shield, BarChart3, Settings, CheckCircle, FileText, Bell, Lock, Upload, Search } from 'lucide-react';

export default function Features() {
    return (
        <>
            <Head title="Features – AcademiaHub" />
            <div className="min-h-screen bg-gradient-to-b from-white to-neutral-100 dark:from-zinc-900 dark:to-zinc-950">
                <header className="border-b dark:border-zinc-800">
                    <SiteNavbar />
                </header>
                <main className="mx-auto max-w-6xl px-6 pb-16">
                    {/* Hero */}
                    <section className="relative isolate overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 p-12 text-white shadow-xl my-8">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        <div className="relative z-10 text-center">
                            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
                                Platform Features
                            </h1>
                            <p className="text-lg text-white/90 max-w-2xl mx-auto">
                                Powerful tools and capabilities to manage your educational institution with ease and efficiency.
                            </p>
                        </div>
                    </section>

                    {/* Admin Features */}
                    <section className="mb-12">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2 flex items-center gap-2">
                                <Shield className="size-6 text-red-500" />
                                Admin Features
                            </h2>
                            <p className="text-neutral-600 dark:text-neutral-300">Complete administrative control and oversight</p>
                        </div>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                                <div className="mb-4 inline-flex rounded-lg bg-red-500 p-3 text-white">
                                    <BookOpen className="size-6" />
                                </div>
                                <h3 className="text-lg font-semibold mb-2">
                                    Module Management
                                </h3>
                                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                                    Create, edit, delete modules. Set capacity limits, module codes, and availability. Full CRUD operations with validation.
                                </p>
                            </div>

                            <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                                <div className="mb-4 inline-flex rounded-lg bg-orange-500 p-3 text-white">
                                    <Users className="size-6" />
                                </div>
                                <h3 className="text-lg font-semibold mb-2">
                                    User Management
                                </h3>
                                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                                    Create teacher accounts, manage roles, view all users. Control access permissions and monitor user activity.
                                </p>
                            </div>

                            <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                                <div className="mb-4 inline-flex rounded-lg bg-pink-500 p-3 text-white">
                                    <BarChart3 className="size-6" />
                                </div>
                                <h3 className="text-lg font-semibold mb-2">
                                    Analytics Dashboard
                                </h3>
                                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                                    View enrollment statistics, completion rates, and module performance. Data-driven insights at your fingertips.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Teacher Features */}
                    <section className="mb-12">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2 flex items-center gap-2">
                                <GraduationCap className="size-6 text-blue-500" />
                                Teacher Features
                            </h2>
                            <p className="text-neutral-600 dark:text-neutral-300">Tools for effective teaching and student management</p>
                        </div>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                                <div className="mb-4 inline-flex rounded-lg bg-blue-500 p-3 text-white">
                                    <FileText className="size-6" />
                                </div>
                                <h3 className="text-lg font-semibold mb-2">
                                    Module Access
                                </h3>
                                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                                    View assigned modules, see enrolled students, access module details and manage course content.
                                </p>
                            </div>

                            <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                                <div className="mb-4 inline-flex rounded-lg bg-indigo-500 p-3 text-white">
                                    <CheckCircle className="size-6" />
                                </div>
                                <h3 className="text-lg font-semibold mb-2">
                                    Status Updates
                                </h3>
                                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                                    Update student progress from pending to in-progress to completed. Track individual student journeys.
                                </p>
                            </div>

                            <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                                <div className="mb-4 inline-flex rounded-lg bg-violet-500 p-3 text-white">
                                    <Users className="size-6" />
                                </div>
                                <h3 className="text-lg font-semibold mb-2">
                                    Student Roster
                                </h3>
                                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                                    View complete student lists, enrollment dates, progress status, and contact information for each module.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Student Features */}
                    <section className="mb-12">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2 flex items-center gap-2">
                                <Users className="size-6 text-green-500" />
                                Student Features
                            </h2>
                            <p className="text-neutral-600 dark:text-neutral-300">Empowering students to manage their learning journey</p>
                        </div>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                                <div className="mb-4 inline-flex rounded-lg bg-green-500 p-3 text-white">
                                    <Search className="size-6" />
                                </div>
                                <h3 className="text-lg font-semibold mb-2">
                                    Browse Modules
                                </h3>
                                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                                    Explore available modules with detailed descriptions, capacity info, and teacher assignments.
                                </p>
                            </div>

                            <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                                <div className="mb-4 inline-flex rounded-lg bg-emerald-500 p-3 text-white">
                                    <Upload className="size-6" />
                                </div>
                                <h3 className="text-lg font-semibold mb-2">
                                    Quick Enrollment
                                </h3>
                                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                                    Enroll in modules with one click. Instant confirmation and automatic capacity tracking.
                                </p>
                            </div>

                            <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                                <div className="mb-4 inline-flex rounded-lg bg-teal-500 p-3 text-white">
                                    <BarChart3 className="size-6" />
                                </div>
                                <h3 className="text-lg font-semibold mb-2">
                                    Progress Dashboard
                                </h3>
                                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                                    Track your enrolled modules, current status, completion history, and academic achievements.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* System Features */}
                    <section className="rounded-xl bg-gradient-to-r from-slate-700 to-slate-900 p-8 text-white shadow-xl">
                        <h2 className="text-2xl font-bold mb-6 text-center">System-Wide Features</h2>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                                <Lock className="size-8 mx-auto mb-2" />
                                <h3 className="font-semibold mb-1">Secure Auth</h3>
                                <p className="text-xs text-white/80">Laravel Fortify with 2FA</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                                <Bell className="size-8 mx-auto mb-2" />
                                <h3 className="font-semibold mb-1">Notifications</h3>
                                <p className="text-xs text-white/80">Real-time updates</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                                <Settings className="size-8 mx-auto mb-2" />
                                <h3 className="font-semibold mb-1">Customization</h3>
                                <p className="text-xs text-white/80">Flexible configuration</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                                <Shield className="size-8 mx-auto mb-2" />
                                <h3 className="font-semibold mb-1">Role-Based</h3>
                                <p className="text-xs text-white/80">Access control</p>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
}
