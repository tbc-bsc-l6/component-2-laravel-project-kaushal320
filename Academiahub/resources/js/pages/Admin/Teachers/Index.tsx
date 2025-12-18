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
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { BookOpen, Mail, Plus, Trash2, Users } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin', href: '/admin' },
    { title: 'Teachers', href: '/admin/teachers' },
];

interface Teacher {
    id: number;
    name: string;
    email: string;
    modules: Module[];
}

interface Module {
    id: number;
    title: string;
    code: string;
}

export default function TeachersIndex({
    teachers = [],
    modules = [],
}: {
    teachers: Teacher[];
    modules: Module[];
}) {
    const [expandedForm, setExpandedForm] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(
        null,
    );
    const [selectedModuleForAttach, setSelectedModuleForAttach] =
        useState<Module | null>(null);

    const { data, setData, post, processing, reset, errors } = useForm({
        name: '',
        email: '',
        password: '',
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();

        // Validate form data
        if (!data.name || !data.email || !data.password) {
            alert('Please fill in all fields');
            return;
        }

        post('/admin/teachers', {
            onSuccess: () => {
                reset();
                setExpandedForm(false);
            },
            onError: (errors) => {
                console.error('Validation errors:', errors);
            },
        });
    }

    function attachTeacherToModule(teacher: Teacher, moduleId: number) {
        console.log('Attaching module', moduleId, 'to teacher', teacher.id);
        console.log('Available modules:', modules);

        router.post(
            `/admin/teachers/${teacher.id}/attach-module`,
            { module_id: moduleId },
            {
                onSuccess: () => {
                    console.log('Successfully attached module');
                    setSelectedTeacher(null);
                },
                onError: (error) => {
                    console.error('Attach error - module_id sent:', moduleId);
                    console.error('Full error:', error);
                    alert('Failed to attach module: ' + JSON.stringify(error));
                },
            },
        );
    }

    function deleteTeacher(teacherId: number) {
        if (confirm('Are you sure you want to remove this teacher?')) {
            router.delete(`/admin/teachers/${teacherId}`);
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Teachers" />

            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                {/* Header */}
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold">
                            Teachers Management
                        </h1>
                        <p className="mt-1 text-muted-foreground">
                            Create, manage, and attach teachers to modules
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge className="bg-emerald-600 text-white shadow-lg">
                            <Users className="mr-1 size-3" />
                            {teachers.length} Teachers
                        </Badge>
                        <Link href="/admin">
                            <Button variant="outline" size="sm">
                                Back to Dashboard
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Create Teacher Form */}
                <Card className="border-emerald-400/50 shadow-lg shadow-emerald-500/20">
                    <CardHeader
                        className="cursor-pointer transition-colors hover:bg-muted/50"
                        onClick={() => setExpandedForm(!expandedForm)}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="rounded-lg bg-gradient-to-br from-emerald-500 to-teal-400 p-3 shadow-lg shadow-emerald-500/50">
                                    <Plus className="size-5 text-white" />
                                </div>
                                <div>
                                    <CardTitle className="text-lg">
                                        Create New Teacher
                                    </CardTitle>
                                    <CardDescription>
                                        Add a new teacher to your institution
                                    </CardDescription>
                                </div>
                            </div>
                            <div
                                className={`transform transition-transform ${
                                    expandedForm ? 'rotate-180' : ''
                                }`}
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
                                {/* Error messages */}
                                {Object.keys(errors).length > 0 && (
                                    <div className="rounded-lg border border-red-500/50 bg-red-500/10 p-3">
                                        <ul className="space-y-1 text-sm text-red-400">
                                            {Object.entries(errors).map(
                                                ([field, message]) => (
                                                    <li key={field}>
                                                        <strong>
                                                            {field}:
                                                        </strong>{' '}
                                                        {String(message)}
                                                    </li>
                                                ),
                                            )}
                                        </ul>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">
                                            Full Name
                                        </label>
                                        <Input
                                            placeholder="e.g., Dr. John Smith"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData('name', e.target.value)
                                            }
                                            className={`border-emerald-500/30 transition-colors focus:border-emerald-400 ${
                                                errors.name
                                                    ? 'border-red-500 focus:border-red-500'
                                                    : ''
                                            }`}
                                        />
                                        {errors.name && (
                                            <p className="text-xs text-red-400">
                                                {String(errors.name)}
                                            </p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">
                                            Email
                                        </label>
                                        <Input
                                            type="email"
                                            placeholder="teacher@example.com"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData('email', e.target.value)
                                            }
                                            className={`border-emerald-500/30 transition-colors focus:border-emerald-400 ${
                                                errors.email
                                                    ? 'border-red-500 focus:border-red-500'
                                                    : ''
                                            }`}
                                        />
                                        {errors.email && (
                                            <p className="text-xs text-red-400">
                                                {String(errors.email)}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">
                                        Password
                                    </label>
                                    <Input
                                        type="password"
                                        placeholder="Minimum 8 characters"
                                        value={data.password}
                                        onChange={(e) =>
                                            setData('password', e.target.value)
                                        }
                                        className={`border-emerald-500/30 transition-colors focus:border-emerald-400 ${
                                            errors.password
                                                ? 'border-red-500 focus:border-red-500'
                                                : ''
                                        }`}
                                    />
                                    {errors.password && (
                                        <p className="text-xs text-red-400">
                                            {String(errors.password)}
                                        </p>
                                    )}
                                </div>

                                <div className="flex gap-2 pt-4">
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/50 hover:from-emerald-600 hover:to-teal-600"
                                    >
                                        <Plus className="mr-2 size-4" />
                                        {processing
                                            ? 'Creating...'
                                            : 'Create Teacher'}
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

                {/* Teachers List */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold">
                            {teachers.length === 0
                                ? 'No teachers yet'
                                : `${teachers.length} Teacher${
                                      teachers.length !== 1 ? 's' : ''
                                  }`}
                        </h2>
                    </div>

                    {teachers.length === 0 ? (
                        <Card className="border-dashed border-emerald-400/30 bg-emerald-500/5">
                            <CardContent className="flex min-h-[300px] items-center justify-center">
                                <div className="space-y-4 text-center">
                                    <div className="inline-block rounded-full bg-emerald-500/20 p-4">
                                        <Users className="size-8 text-emerald-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold">
                                            No teachers yet
                                        </h3>
                                        <p className="mt-1 text-muted-foreground">
                                            Create your first teacher to get
                                            started
                                        </p>
                                    </div>
                                    <Button
                                        onClick={() => setExpandedForm(true)}
                                        className="mt-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                                    >
                                        <Plus className="mr-2 size-4" />
                                        Create First Teacher
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid gap-4">
                            {teachers.map((teacher) => (
                                <Card
                                    key={teacher.id}
                                    className="group border-emerald-400/30 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-400/70 hover:shadow-lg hover:shadow-emerald-500/30"
                                >
                                    <CardContent className="p-6">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex flex-1 gap-4">
                                                <div className="h-fit rounded-lg bg-gradient-to-br from-emerald-500/20 to-teal-500/20 p-3 shadow-md transition-all group-hover:from-emerald-500/30 group-hover:to-teal-500/30 group-hover:shadow-lg group-hover:shadow-emerald-500/50">
                                                    <Users className="size-6 text-emerald-400 transition-transform group-hover:scale-110 group-hover:rotate-6" />
                                                </div>

                                                <div className="flex-1">
                                                    <h3 className="text-lg font-semibold transition-colors group-hover:text-emerald-400">
                                                        {teacher.name}
                                                    </h3>
                                                    <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                                                        <Mail className="size-3" />
                                                        {teacher.email}
                                                    </p>

                                                    {/* Module Count Badge */}
                                                    <div className="mt-2 flex items-center gap-2">
                                                        <Badge className="border border-emerald-500/50 bg-emerald-500/30 text-emerald-400">
                                                            <BookOpen className="mr-1 size-3" />
                                                            {
                                                                teacher.modules
                                                                    .length
                                                            }{' '}
                                                            Module
                                                            {teacher.modules
                                                                .length !== 1
                                                                ? 's'
                                                                : ''}
                                                        </Badge>
                                                    </div>

                                                    {/* Assigned Modules */}
                                                    {teacher.modules.length >
                                                        0 && (
                                                        <div className="mt-3 space-y-2">
                                                            <p className="text-xs font-medium text-muted-foreground">
                                                                📚 Teaching
                                                                (Modules
                                                                assigned):
                                                            </p>
                                                            <div className="flex flex-wrap gap-2">
                                                                {teacher.modules.map(
                                                                    (
                                                                        module,
                                                                    ) => (
                                                                        <Badge
                                                                            key={
                                                                                module.id
                                                                            }
                                                                            variant="outline"
                                                                            className="border-emerald-500/50 text-emerald-400"
                                                                        >
                                                                            {
                                                                                module.title
                                                                            }
                                                                        </Badge>
                                                                    ),
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="text-emerald-400 hover:text-emerald-300"
                                                        >
                                                            <BookOpen className="mr-1 size-4" />
                                                            Attach
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>
                                                                Attach Module to{' '}
                                                                {teacher.name}
                                                            </DialogTitle>
                                                            <DialogDescription>
                                                                Select a module
                                                                to attach to
                                                                this teacher
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <div className="space-y-3">
                                                            {modules.map(
                                                                (module) => (
                                                                    <Button
                                                                        key={
                                                                            module.id
                                                                        }
                                                                        onClick={() =>
                                                                            attachTeacherToModule(
                                                                                teacher,
                                                                                module.id,
                                                                            )
                                                                        }
                                                                        variant="outline"
                                                                        className="w-full justify-start border-emerald-500/50 hover:border-emerald-400 hover:text-emerald-400"
                                                                        disabled={teacher.modules.some(
                                                                            (
                                                                                m,
                                                                            ) =>
                                                                                m.id ===
                                                                                module.id,
                                                                        )}
                                                                    >
                                                                        <BookOpen className="mr-2 size-4" />
                                                                        {
                                                                            module.title
                                                                        }
                                                                        {teacher.modules.some(
                                                                            (
                                                                                m,
                                                                            ) =>
                                                                                m.id ===
                                                                                module.id,
                                                                        ) && (
                                                                            <Badge className="ml-auto bg-emerald-600">
                                                                                Attached
                                                                            </Badge>
                                                                        )}
                                                                    </Button>
                                                                ),
                                                            )}
                                                        </div>
                                                    </DialogContent>
                                                </Dialog>

                                                <Button
                                                    onClick={() =>
                                                        deleteTeacher(
                                                            teacher.id,
                                                        )
                                                    }
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-red-400 hover:text-red-300"
                                                >
                                                    <Trash2 className="size-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
