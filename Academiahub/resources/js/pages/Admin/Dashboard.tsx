import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import {
    Activity,
    BookOpen,
    Palette,
    ShieldCheck,
    UserPlus,
    Users,
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin',
        href: '/admin',
    },
];

export default function AdminDashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                {/* Top bar */}
                <div className="flex items-center justify-between gap-4">
                    <h1 className="text-2xl font-semibold">Admin Dashboard</h1>

                    <div className="flex items-center gap-2">
                        <Link href="/admin/modules">
                            <Button variant="outline" size="sm">
                                Manage Modules
                            </Button>
                        </Link>
                        <Link href="/admin/modules">
                            <Button size="sm">New Module</Button>
                        </Link>
                    </div>
                </div>

                {/* Hero / Headline */}
                <Card className="overflow-hidden border-0 shadow-md">
                    <div className="relative isolate rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 text-white">
                        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                            <div>
                                <h2 className="text-2xl font-semibold tracking-tight">
                                    Admin Dashboard
                                </h2>
                                <p className="mt-1 text-white/90">
                                    Manage modules, teachers, and students.
                                    Quick actions and recent activity below.
                                </p>
                                <div className="mt-3 flex flex-wrap items-center gap-2">
                                    <Badge className="bg-white/15 text-white hover:bg-white/25">
                                        AcademiaHub
                                    </Badge>
                                    <Badge
                                        variant="secondary"
                                        className="bg-black/30 text-white hover:bg-black/40"
                                    >
                                        Admin
                                    </Badge>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Link href="/admin/modules">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="border-white/50 bg-white/10 text-white hover:bg-white/20"
                                    >
                                        Manage Modules
                                    </Button>
                                </Link>
                                <Link href="/admin/modules">
                                    <Button
                                        size="sm"
                                        className="bg-white text-indigo-600 hover:bg-white/90"
                                    >
                                        New Module
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </Card>

                <div className="grid gap-4 md:grid-cols-3">
                    <Card className="border-indigo-500/30">
                        <CardHeader>
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-md bg-indigo-600/15 p-2 text-indigo-500">
                                        <BookOpen className="size-5" />
                                    </div>
                                    <CardTitle>Modules</CardTitle>
                                </div>
                            </div>
                            <CardDescription>
                                Create, toggle availability and manage module
                                capacity.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-3">
                                <Badge className="bg-indigo-600 text-white hover:bg-indigo-600/90">
                                    Active
                                </Badge>
                                <Link href="/admin/modules">
                                    <Button size="sm">Open</Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-emerald-500/30">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="rounded-md bg-emerald-600/15 p-2 text-emerald-600">
                                    <UserPlus className="size-5" />
                                </div>
                                <CardTitle>Teachers</CardTitle>
                            </div>
                            <CardDescription>
                                Create or remove teacher accounts, attach
                                teachers to modules.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-3">
                                <Badge
                                    variant="secondary"
                                    className="bg-emerald-600 text-white hover:bg-emerald-600/90"
                                >
                                    Staff
                                </Badge>
                                <Button variant="outline" size="sm">
                                    Manage
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-amber-500/30">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="rounded-md bg-amber-500/20 p-2 text-amber-600">
                                    <Users className="size-5" />
                                </div>
                                <CardTitle>Students</CardTitle>
                            </div>
                            <CardDescription>
                                Change user roles and remove students from
                                modules.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-3">
                                <Badge
                                    variant="secondary"
                                    className="bg-amber-500 text-black hover:bg-amber-500/90"
                                >
                                    Cohorts
                                </Badge>
                                <Button variant="outline" size="sm">
                                    Manage
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card className="mt-2">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Overview & Activity</CardTitle>
                                <CardDescription>
                                    Recent changes and quick stats.
                                </CardDescription>
                            </div>
                            <div className="hidden items-center gap-2 md:flex">
                                <Badge variant="outline" className="gap-1">
                                    <Palette className="size-3" /> Theme
                                </Badge>
                                <Badge variant="outline" className="gap-1">
                                    <ShieldCheck className="size-3" /> Secure
                                </Badge>
                                <Badge variant="outline" className="gap-1">
                                    <Activity className="size-3" /> Live
                                </Badge>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="relative min-h-[40vh] overflow-hidden rounded-md border border-dashed">
                            <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/10 dark:stroke-neutral-100/10" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
