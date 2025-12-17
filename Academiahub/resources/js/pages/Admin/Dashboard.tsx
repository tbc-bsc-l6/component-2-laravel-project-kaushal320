import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import {
    Activity,
    BookOpen,
    Calendar,
    Eye,
    Palette,
    ShieldCheck,
    Sparkles,
    TrendingUp,
    UserPlus,
    Users,
} from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin',
        href: '/admin',
    },
];

interface Module {
    id: number;
    title: string;
    code: string;
    capacity: number;
    available: boolean;
    teachers?: Array<{
        id: number;
        name: string;
        email: string;
    }>;
}

export default function AdminDashboard({
    modules = [],
}: {
    modules?: Module[];
}) {
    const [selectedModule, setSelectedModule] = useState<Module | null>(null);

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
                <Card className="group overflow-hidden border-0 shadow-lg shadow-purple-500/50 transition-shadow duration-300 hover:shadow-2xl hover:shadow-purple-500/60">
                    <div className="relative isolate rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-8 text-white">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                        <div className="absolute top-0 right-0 size-64 translate-x-32 translate-y-[-50%] rounded-full bg-white/20 blur-3xl"></div>
                        <div className="relative z-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                            <div>
                                <div className="mb-2 flex items-center gap-2">
                                    <Sparkles className="size-5 animate-pulse text-yellow-400 drop-shadow-lg" />
                                    <span className="text-sm font-medium text-white">
                                        Welcome Back
                                    </span>
                                </div>
                                <h2 className="text-3xl font-bold tracking-tight">
                                    Admin Dashboard
                                </h2>
                                <p className="mt-2 text-base text-white/90">
                                    Manage modules, teachers, and students.
                                    Quick actions and recent activity below.
                                </p>
                                <div className="mt-4 flex flex-wrap items-center gap-2">
                                    <Badge className="bg-white/30 text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-white/40">
                                        <Sparkles className="mr-1 size-3" />
                                        AcademiaHub
                                    </Badge>
                                    <Badge
                                        variant="secondary"
                                        className="bg-slate-800/60 text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-slate-700/60"
                                    >
                                        <ShieldCheck className="mr-1 size-3" />
                                        Admin
                                    </Badge>
                                    <Badge className="bg-emerald-400/40 text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-emerald-400/50">
                                        <TrendingUp className="mr-1 size-3" />
                                        {modules.length} Modules
                                    </Badge>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Link href="/admin/modules">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="border-white/50 bg-white/10 text-white backdrop-blur-sm transition-all hover:scale-105 hover:bg-white/20"
                                    >
                                        Manage Modules
                                    </Button>
                                </Link>
                                <Link href="/admin/modules">
                                    <Button
                                        size="sm"
                                        className="bg-white text-indigo-600 shadow-lg transition-all hover:scale-105 hover:bg-white/90"
                                    >
                                        <BookOpen className="mr-1.5 size-4" />
                                        New Module
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </Card>

                <div className="grid gap-4 md:grid-cols-3">
                    <Link href="/admin/modules" className="h-full">
                        <Card className="group h-full cursor-pointer border-indigo-400/50 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400 hover:shadow-xl hover:shadow-indigo-400/40">
                            <CardHeader>
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-lg bg-gradient-to-br from-indigo-500 to-blue-400 p-3 shadow-lg shadow-indigo-500/50 transition-transform group-hover:scale-110 group-hover:rotate-3">
                                            <BookOpen className="size-5 text-white" />
                                        </div>
                                        <CardTitle className="text-lg">
                                            Modules
                                        </CardTitle>
                                    </div>
                                </div>
                                <CardDescription className="mt-2">
                                    Create, toggle availability and manage
                                    module capacity.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-3">
                                    <Badge className="animate-pulse bg-indigo-500 text-white shadow-lg hover:bg-indigo-500/90">
                                        {modules.length} Active
                                    </Badge>
                                    <Button
                                        size="sm"
                                        className="transition-all hover:scale-105"
                                    >
                                        Open
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>

                    <Link href="/admin/teachers" className="h-full">
                        <Card className="group h-full cursor-pointer border-emerald-400/50 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400 hover:shadow-xl hover:shadow-emerald-400/40">
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <div className="rounded-lg bg-gradient-to-br from-emerald-500 to-teal-400 p-3 shadow-lg shadow-emerald-500/50 transition-transform group-hover:scale-110 group-hover:rotate-3">
                                        <UserPlus className="size-5 text-white" />
                                    </div>
                                    <CardTitle className="text-lg">
                                        Teachers
                                    </CardTitle>
                                </div>
                                <CardDescription className="mt-2">
                                    Create or remove teacher accounts, attach
                                    teachers to modules.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-3">
                                    <Badge
                                        variant="secondary"
                                        className="bg-emerald-500 text-white shadow-md hover:bg-emerald-500/90"
                                    >
                                        Staff
                                    </Badge>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="transition-all hover:scale-105"
                                    >
                                        Manage
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>

                    <Link href="/admin/students" className="h-full">
                        <Card className="group h-full cursor-pointer border-amber-400/50 transition-all duration-300 hover:-translate-y-1 hover:border-amber-400 hover:shadow-xl hover:shadow-amber-400/40">
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <div className="rounded-lg bg-gradient-to-br from-amber-400 to-orange-400 p-3 shadow-lg shadow-amber-500/50 transition-transform group-hover:scale-110 group-hover:rotate-3">
                                        <Users className="size-5 text-white" />
                                    </div>
                                    <CardTitle className="text-lg">
                                        Students
                                    </CardTitle>
                                </div>
                                <CardDescription className="mt-2">
                                    Change user roles and remove students from
                                    modules.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-3">
                                    <Badge
                                        variant="secondary"
                                        className="bg-amber-400 text-black shadow-md hover:bg-amber-400/90"
                                    >
                                        Cohorts
                                    </Badge>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="transition-all hover:scale-105"
                                    >
                                        Manage
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                </div>

                {/* Modules Section */}
                <Card className="border-purple-400/50 shadow-lg shadow-purple-500/30">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="rounded-lg bg-gradient-to-br from-purple-500 to-fuchsia-400 p-3 shadow-lg shadow-purple-500/50">
                                    <BookOpen className="size-6 text-white" />
                                </div>
                                <div>
                                    <CardTitle className="text-xl">
                                        All Modules
                                    </CardTitle>
                                    <CardDescription>
                                        Click any module to view details
                                    </CardDescription>
                                </div>
                            </div>
                            <Link href="/admin/modules">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="transition-all hover:scale-105"
                                >
                                    Manage All
                                </Button>
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {modules.length === 0 ? (
                            <div className="flex min-h-[200px] items-center justify-center rounded-lg border border-dashed bg-muted/30 transition-all hover:bg-muted/50">
                                <div className="text-center">
                                    <BookOpen className="mx-auto mb-2 size-8 animate-bounce text-muted-foreground" />
                                    <p className="text-sm text-muted-foreground">
                                        No modules available yet
                                    </p>
                                    <Link href="/admin/modules">
                                        <Button
                                            size="sm"
                                            variant="link"
                                            className="mt-2"
                                        >
                                            Create your first module
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <div className="grid gap-3">
                                {modules.map((module) => (
                                    <Dialog key={module.id}>
                                        <DialogTrigger asChild>
                                            <div className="group flex cursor-pointer items-center justify-between rounded-lg border border-purple-500/20 bg-gradient-to-r from-card to-purple-500/5 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.01] hover:border-purple-400/70 hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-fuchsia-500/10 hover:shadow-lg hover:shadow-purple-400/40">
                                                <div className="flex items-start gap-3">
                                                    <div className="rounded-lg bg-gradient-to-br from-purple-500/30 to-indigo-500/30 p-3 shadow-md transition-all group-hover:scale-110 group-hover:from-purple-400/40 group-hover:to-indigo-400/40 group-hover:shadow-lg group-hover:shadow-purple-500/50">
                                                        <BookOpen className="size-5 text-purple-400 transition-transform group-hover:rotate-12 group-hover:text-purple-300" />
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <h3 className="text-lg font-semibold transition-colors group-hover:text-purple-400">
                                                                {module.title}
                                                            </h3>
                                                            {module.code && (
                                                                <Badge
                                                                    variant="outline"
                                                                    className="border-purple-400/70 font-mono text-xs text-purple-400"
                                                                >
                                                                    {
                                                                        module.code
                                                                    }
                                                                </Badge>
                                                            )}
                                                        </div>
                                                        <div className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
                                                            <span className="flex items-center gap-1.5 transition-colors group-hover:text-purple-400">
                                                                <Users className="size-4" />
                                                                <span className="font-medium">
                                                                    {
                                                                        module.capacity
                                                                    }
                                                                </span>{' '}
                                                                students
                                                            </span>
                                                            <span className="text-muted-foreground/50">
                                                                •
                                                            </span>
                                                            <span>
                                                                {module.available ? (
                                                                    <Badge className="bg-emerald-500 text-white shadow-md hover:bg-emerald-500/90">
                                                                        ✓
                                                                        Available
                                                                    </Badge>
                                                                ) : (
                                                                    <Badge
                                                                        variant="secondary"
                                                                        className="bg-gray-500 text-white"
                                                                    >
                                                                        ✕
                                                                        Unavailable
                                                                    </Badge>
                                                                )}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                                                    <Eye className="size-5 text-purple-400" />
                                                    <span className="text-sm font-medium text-purple-400">
                                                        View Details
                                                    </span>
                                                </div>
                                            </div>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[500px]">
                                            <DialogHeader>
                                                <div className="mb-2 flex items-center gap-3">
                                                    <div className="rounded-lg bg-gradient-to-br from-purple-500 to-fuchsia-500 p-3 shadow-lg shadow-purple-500/50">
                                                        <BookOpen className="size-6 text-white" />
                                                    </div>
                                                    <div>
                                                        <DialogTitle className="text-2xl">
                                                            {module.title}
                                                        </DialogTitle>
                                                        {module.code && (
                                                            <Badge
                                                                variant="outline"
                                                                className="mt-1 font-mono"
                                                            >
                                                                {module.code}
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </div>
                                                <DialogDescription>
                                                    Detailed information about
                                                    this module
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="space-y-4 py-4">
                                                <div className="space-y-3 rounded-lg border border-purple-500/30 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 p-4">
                                                    <div className="flex items-center justify-between">
                                                        <span className="flex items-center gap-2 text-sm font-medium">
                                                            <Users className="size-4 text-purple-400" />
                                                            Student Capacity
                                                        </span>
                                                        <Badge className="bg-purple-500 text-white shadow-md">
                                                            {module.capacity}{' '}
                                                            Students
                                                        </Badge>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <span className="flex items-center gap-2 text-sm font-medium">
                                                            <Activity className="size-4 text-purple-400" />
                                                            Availability Status
                                                        </span>
                                                        {module.available ? (
                                                            <Badge className="bg-emerald-500 text-white shadow-md">
                                                                ✓ Available for
                                                                Enrollment
                                                            </Badge>
                                                        ) : (
                                                            <Badge
                                                                variant="secondary"
                                                                className="bg-gray-500 text-white"
                                                            >
                                                                ✕ Currently
                                                                Unavailable
                                                            </Badge>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <span className="flex items-center gap-2 text-sm font-medium">
                                                            <Calendar className="size-4 text-purple-400" />
                                                            Module ID
                                                        </span>
                                                        <Badge variant="outline">
                                                            #{module.id}
                                                        </Badge>
                                                    </div>
                                                    <div className="space-y-2 border-t border-purple-500/20 pt-3">
                                                        <span className="flex items-center gap-2 text-sm font-medium">
                                                            <Users className="size-4 text-purple-400" />
                                                            Teachers Assigned
                                                        </span>
                                                        {module.teachers &&
                                                        module.teachers.length >
                                                            0 ? (
                                                            <div className="flex flex-wrap gap-2">
                                                                {module.teachers.map(
                                                                    (
                                                                        teacher,
                                                                    ) => (
                                                                        <Badge
                                                                            key={
                                                                                teacher.id
                                                                            }
                                                                            className="bg-emerald-500 text-white shadow-md"
                                                                        >
                                                                            {
                                                                                teacher.name
                                                                            }
                                                                        </Badge>
                                                                    ),
                                                                )}
                                                            </div>
                                                        ) : (
                                                            <p className="text-xs text-muted-foreground italic">
                                                                No teachers
                                                                assigned yet
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex gap-2 pt-2">
                                                    <Link
                                                        href={`/admin/modules`}
                                                        className="flex-1"
                                                    >
                                                        <Button className="w-full bg-gradient-to-r from-purple-500 to-fuchsia-500 shadow-lg shadow-purple-500/50 hover:from-purple-600 hover:to-fuchsia-600">
                                                            <BookOpen className="mr-2 size-4" />
                                                            Manage Module
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card className="mt-2 border-slate-400/30 shadow-lg shadow-slate-500/20">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-xl">
                                    Overview & Activity
                                </CardTitle>
                                <CardDescription>
                                    Recent changes and quick stats.
                                </CardDescription>
                            </div>
                            <div className="hidden items-center gap-2 md:flex">
                                <Badge
                                    variant="outline"
                                    className="gap-1 border-purple-500/50 text-purple-400 transition-all hover:border-purple-400 hover:text-purple-400"
                                >
                                    <Palette className="size-3" /> Theme
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className="gap-1 border-emerald-500/50 text-emerald-400 transition-all hover:border-emerald-400 hover:text-emerald-400"
                                >
                                    <ShieldCheck className="size-3" /> Secure
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className="animate-pulse gap-1 border-green-400 text-green-400 shadow-sm shadow-green-400/50"
                                >
                                    <Activity className="size-3" /> Live
                                </Badge>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="relative min-h-[40vh] overflow-hidden rounded-lg border border-dashed bg-gradient-to-br from-slate-50 to-purple-50 transition-all hover:border-purple-500/50 dark:from-slate-950 dark:to-purple-950/20">
                            <PlaceholderPattern className="absolute inset-0 size-full stroke-purple-900/10 dark:stroke-purple-100/10" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="space-y-3 text-center">
                                    <TrendingUp className="mx-auto size-12 animate-pulse text-purple-400" />
                                    <p className="font-medium text-muted-foreground">
                                        Activity feed coming soon
                                    </p>
                                    <p className="text-sm text-muted-foreground/70">
                                        Track module changes and user activities
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
