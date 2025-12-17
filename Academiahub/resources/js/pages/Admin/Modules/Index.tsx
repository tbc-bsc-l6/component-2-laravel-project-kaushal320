import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import {
    AlertCircle,
    BookOpen,
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    Plus,
    ToggleLeft,
    ToggleRight,
    Users,
} from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin', href: '/admin' },
    { title: 'Modules', href: '/admin/modules' },
];

interface Module {
    id: number;
    title: string;
    code: string;
    capacity: number;
    available: boolean;
}

export default function Index({ modules }: { modules: Module[] }) {
    const csrf =
        (typeof document !== 'undefined'
            ? document
                  .querySelector('meta[name="csrf-token"]')
                  ?.getAttribute('content')
            : '') || '';

    const [expandedForm, setExpandedForm] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 5;
    const totalPages = Math.ceil(modules.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedModules = modules.slice(startIndex, endIndex);

    const { data, setData, post, processing, reset } = useForm({
        title: '',
        code: '',
        capacity: 10,
        _token: csrf,
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        post('/admin/modules', {
            onSuccess: () => {
                reset();
                setExpandedForm(false);
            },
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Modules" />

            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                {/* Header */}
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold">
                            Modules Management
                        </h1>
                        <p className="mt-1 text-muted-foreground">
                            Create and manage academic modules for your
                            institution
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge className="bg-purple-600 text-white shadow-lg">
                            <BookOpen className="mr-1 size-3" />
                            {modules.length} Total
                        </Badge>
                        <Link href="/admin">
                            <Button variant="outline" size="sm">
                                Back to Dashboard
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Create Module Form Card */}
                <Card className="border-blue-400/50 shadow-lg shadow-blue-500/20">
                    <CardHeader
                        className="cursor-pointer transition-colors hover:bg-muted/50"
                        onClick={() => setExpandedForm(!expandedForm)}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 p-3 shadow-lg shadow-blue-500/50">
                                    <Plus className="size-5 text-white" />
                                </div>
                                <div>
                                    <CardTitle className="text-lg">
                                        Create New Module
                                    </CardTitle>
                                    <CardDescription>
                                        Add a new module to your institution
                                    </CardDescription>
                                </div>
                            </div>
                            <div
                                className={`transform transition-transform ${expandedForm ? 'rotate-180' : ''}`}
                            >
                                <svg
                                    className="size-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                                    />
                                </svg>
                            </div>
                        </div>
                    </CardHeader>

                    {expandedForm && (
                        <CardContent className="border-t pt-6">
                            <form onSubmit={submit} className="space-y-4">
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">
                                            Module Title
                                        </label>
                                        <Input
                                            placeholder="e.g., Mathematics 101"
                                            value={data.title}
                                            onChange={(e) =>
                                                setData('title', e.target.value)
                                            }
                                            className="border-purple-500/30 transition-colors focus:border-purple-400"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">
                                            Module Code
                                        </label>
                                        <Input
                                            placeholder="e.g., MATH101"
                                            value={data.code}
                                            onChange={(e) =>
                                                setData('code', e.target.value)
                                            }
                                            className="border-purple-500/30 transition-colors focus:border-purple-400"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">
                                        Student Capacity
                                    </label>
                                    <Input
                                        type="number"
                                        min="1"
                                        placeholder="Enter capacity"
                                        value={data.capacity}
                                        onChange={(e) =>
                                            setData(
                                                'capacity',
                                                Number(e.target.value),
                                            )
                                        }
                                        className="border-purple-500/30 transition-colors focus:border-purple-400"
                                    />
                                </div>

                                <div className="flex gap-2 pt-4">
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/50 hover:from-blue-600 hover:to-cyan-600"
                                    >
                                        <Plus className="mr-2 size-4" />
                                        {processing
                                            ? 'Creating...'
                                            : 'Create Module'}
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => {
                                            setExpandedForm(false);
                                            reset();
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    )}
                </Card>

                {/* Modules List */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold">
                            {modules.length === 0
                                ? 'No modules yet'
                                : `${modules.length} Module${modules.length !== 1 ? 's' : ''}`}
                        </h2>
                    </div>

                    {modules.length === 0 ? (
                        <Card className="border-dashed border-purple-400/30 bg-purple-500/5">
                            <CardContent className="flex min-h-[300px] items-center justify-center">
                                <div className="space-y-4 text-center">
                                    <div className="inline-block rounded-full bg-purple-500/20 p-4">
                                        <BookOpen className="size-8 text-purple-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold">
                                            No modules yet
                                        </h3>
                                        <p className="mt-1 text-muted-foreground">
                                            Create your first module to get
                                            started
                                        </p>
                                    </div>
                                    <Button
                                        onClick={() => setExpandedForm(true)}
                                        className="mt-4 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700"
                                    >
                                        <Plus className="mr-2 size-4" />
                                        Create First Module
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ) : (
                        <>
                            <div className="grid gap-4">
                                {paginatedModules.map((module) => (
                                    <Card
                                        key={module.id}
                                        className="group border-purple-400/30 transition-all duration-300 hover:-translate-y-0.5 hover:border-purple-400/70 hover:shadow-lg hover:shadow-purple-500/30"
                                    >
                                        <CardContent className="p-6">
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex flex-1 gap-4">
                                                    {/* Icon */}
                                                    <div className="h-fit rounded-lg bg-gradient-to-br from-purple-500/20 to-fuchsia-500/20 p-3 shadow-md transition-all group-hover:from-purple-500/30 group-hover:to-fuchsia-500/30 group-hover:shadow-lg group-hover:shadow-purple-500/50">
                                                        <BookOpen className="size-6 text-purple-400 transition-transform group-hover:scale-110 group-hover:rotate-6" />
                                                    </div>

                                                    {/* Content */}
                                                    <div className="flex-1">
                                                        <div className="mb-2 flex items-start justify-between gap-2">
                                                            <div>
                                                                <h3 className="text-lg font-semibold transition-colors group-hover:text-purple-400">
                                                                    {
                                                                        module.title
                                                                    }
                                                                </h3>
                                                                {module.code && (
                                                                    <p className="font-mono text-sm text-muted-foreground">
                                                                        {
                                                                            module.code
                                                                        }
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </div>

                                                        {/* Details */}
                                                        <div className="mt-3 flex flex-wrap items-center gap-4">
                                                            <div className="flex items-center gap-1.5 text-sm">
                                                                <Users className="size-4 text-purple-400" />
                                                                <span className="font-medium">
                                                                    {
                                                                        module.capacity
                                                                    }
                                                                </span>
                                                                <span className="text-muted-foreground">
                                                                    students
                                                                    capacity
                                                                </span>
                                                            </div>
                                                            <span className="text-muted-foreground/50">
                                                                •
                                                            </span>
                                                            <div className="flex items-center gap-2">
                                                                {module.available ? (
                                                                    <div className="flex items-center gap-1.5 text-emerald-500">
                                                                        <CheckCircle2 className="size-4" />
                                                                        <span className="text-sm font-medium">
                                                                            Available
                                                                        </span>
                                                                    </div>
                                                                ) : (
                                                                    <div className="flex items-center gap-1.5 text-amber-500">
                                                                        <AlertCircle className="size-4" />
                                                                        <span className="text-sm font-medium">
                                                                            Unavailable
                                                                        </span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Actions */}
                                                <div className="flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                                                    <form
                                                        method="post"
                                                        action={`/admin/modules/${module.id}/toggle`}
                                                        className="inline"
                                                    >
                                                        <input
                                                            type="hidden"
                                                            name="_token"
                                                            value={csrf}
                                                        />
                                                        <Button
                                                            type="submit"
                                                            className={`flex items-center gap-2 rounded-lg px-4 py-2 font-semibold transition-all hover:scale-110 hover:shadow-lg ${
                                                                module.available
                                                                    ? 'border border-emerald-500/50 bg-emerald-500/20 text-emerald-400 shadow-lg shadow-emerald-500/20 hover:bg-emerald-500/30'
                                                                    : 'border border-gray-500/50 bg-gray-500/20 text-gray-400 shadow-lg shadow-gray-500/20 hover:bg-gray-500/30'
                                                            }`}
                                                            title={
                                                                module.available
                                                                    ? 'Disable module'
                                                                    : 'Enable module'
                                                            }
                                                        >
                                                            {module.available ? (
                                                                <>
                                                                    <ToggleRight className="size-6" />
                                                                    <span>
                                                                        Disable
                                                                    </span>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <ToggleLeft className="size-6" />
                                                                    <span>
                                                                        Enable
                                                                    </span>
                                                                </>
                                                            )}
                                                        </Button>
                                                    </form>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="mt-6 flex items-center justify-between rounded-lg border border-purple-400/30 bg-purple-500/5 p-4">
                                    <div className="text-sm text-muted-foreground">
                                        Page{' '}
                                        <span className="font-semibold text-purple-400">
                                            {currentPage}
                                        </span>{' '}
                                        of{' '}
                                        <span className="font-semibold text-purple-400">
                                            {totalPages}
                                        </span>{' '}
                                        • Showing{' '}
                                        <span className="font-semibold">
                                            {paginatedModules.length}
                                        </span>{' '}
                                        of{' '}
                                        <span className="font-semibold">
                                            {modules.length}
                                        </span>{' '}
                                        modules
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                setCurrentPage(
                                                    Math.max(
                                                        1,
                                                        currentPage - 1,
                                                    ),
                                                )
                                            }
                                            disabled={currentPage === 1}
                                            className="border-purple-400/50 hover:border-purple-400 hover:text-purple-400 disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            <ChevronLeft className="mr-1 size-4" />
                                            Previous
                                        </Button>

                                        <div className="flex items-center gap-1">
                                            {Array.from(
                                                { length: totalPages },
                                                (_, i) => i + 1,
                                            ).map((page) => (
                                                <Button
                                                    key={page}
                                                    variant={
                                                        currentPage === page
                                                            ? 'default'
                                                            : 'outline'
                                                    }
                                                    size="sm"
                                                    onClick={() =>
                                                        setCurrentPage(page)
                                                    }
                                                    className={`h-9 w-9 p-0 transition-all ${
                                                        currentPage === page
                                                            ? 'border-purple-500 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white shadow-lg shadow-purple-500/50 hover:from-purple-600 hover:to-fuchsia-600'
                                                            : 'border-purple-400/50 hover:border-purple-400 hover:text-purple-400'
                                                    }`}
                                                >
                                                    {page}
                                                </Button>
                                            ))}
                                        </div>

                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                setCurrentPage(
                                                    Math.min(
                                                        totalPages,
                                                        currentPage + 1,
                                                    ),
                                                )
                                            }
                                            disabled={
                                                currentPage === totalPages
                                            }
                                            className="border-purple-400/50 hover:border-purple-400 hover:text-purple-400 disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            Next
                                            <ChevronRight className="ml-1 size-4" />
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
