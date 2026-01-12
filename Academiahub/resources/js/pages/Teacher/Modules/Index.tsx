import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import {
    BookOpen,
    CheckCircle2,
    GraduationCap,
    User as UserIcon,
    XCircle,
} from 'lucide-react';
import { useState } from 'react';

interface Student {
    id: number;
    name: string;
    email: string;
    pivot?: {
        status?: 'pass' | 'fail' | null;
        started_at?: string | null;
        completed_at?: string | null;
    };
}

interface ModuleItem {
    id: number;
    title: string;
    code: string;
    available: boolean;
    students?: Student[];
}

export default function TeacherModulesIndex({
    modules = [],
}: {
    modules: ModuleItem[];
}) {
    const [openModuleId, setOpenModuleId] = useState<number | null>(null);

    function setStatus(
        moduleId: number,
        studentId: number,
        status: 'pass' | 'fail',
    ) {
        router.patch(
            `/teacher/modules/${moduleId}/students/${studentId}/status`,
            { status },
        );
    }

    return (
        <AppLayout breadcrumbs={[{ title: 'Teacher', href: '/teacher' }]}>
            <Head title="My Modules" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div>
                    <h1 className="text-3xl font-bold">Assigned Modules</h1>
                    <p className="mt-1 text-muted-foreground">
                        View your modules and grade students
                    </p>
                </div>

                {modules.length === 0 ? (
                    <Card className="border-dashed border-emerald-500/30 bg-emerald-500/5">
                        <CardContent className="p-6">
                            <p className="text-muted-foreground">
                                No modules assigned yet.
                            </p>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Ask an administrator to assign modules to your
                                account.
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-4">
                        {modules.map((m) => (
                            <Card key={m.id} className="group">
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="flex items-center gap-2">
                                            <GraduationCap className="size-5 text-emerald-500" />
                                            {m.title}
                                            <Badge
                                                variant="outline"
                                                className="ml-2"
                                            >
                                                {m.code}
                                            </Badge>
                                        </CardTitle>
                                        <div className="flex items-center gap-2">
                                            <Badge
                                                variant="outline"
                                                className="border-emerald-500/40 text-emerald-400"
                                            >
                                                {m.students?.filter(
                                                    (s) =>
                                                        s.pivot?.status ===
                                                        'pass',
                                                ).length ?? 0}{' '}
                                                Pass
                                            </Badge>
                                            <Badge
                                                variant="outline"
                                                className="border-red-500/40 text-red-400"
                                            >
                                                {m.students?.filter(
                                                    (s) =>
                                                        s.pivot?.status ===
                                                        'fail',
                                                ).length ?? 0}{' '}
                                                Fail
                                            </Badge>
                                            <Badge
                                                className={
                                                    m.available
                                                        ? 'bg-emerald-600'
                                                        : 'bg-gray-500'
                                                }
                                            >
                                                {m.available
                                                    ? 'Available'
                                                    : 'Unavailable'}
                                            </Badge>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-6 pt-0">
                                    <div className="flex items-center justify-between">
                                        <div className="text-sm text-muted-foreground">
                                            {m.students?.length || 0} Student
                                            {(m.students?.length || 0) !== 1
                                                ? 's'
                                                : ''}
                                        </div>
                                        <Dialog
                                            open={openModuleId === m.id}
                                            onOpenChange={(o) =>
                                                setOpenModuleId(o ? m.id : null)
                                            }
                                        >
                                            <DialogTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    <BookOpen className="mr-2 size-4" />{' '}
                                                    Manage Students
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>
                                                        Students in {m.title}
                                                    </DialogTitle>
                                                </DialogHeader>
                                                {!m.students ||
                                                m.students.length === 0 ? (
                                                    <p className="text-muted-foreground">
                                                        No students enrolled.
                                                    </p>
                                                ) : (
                                                    <div className="space-y-2">
                                                        {m.students.map((s) => (
                                                            <div
                                                                key={s.id}
                                                                className="flex items-center justify-between rounded-md border p-3"
                                                            >
                                                                <div>
                                                                    <div className="flex items-center gap-2">
                                                                        <UserIcon className="size-4 text-muted-foreground" />
                                                                        <span className="font-medium">
                                                                            {
                                                                                s.name
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                    <div className="text-xs text-muted-foreground">
                                                                        {
                                                                            s.email
                                                                        }
                                                                    </div>
                                                                    <div className="mt-1 text-xs">
                                                                        {s.pivot
                                                                            ?.started_at && (
                                                                            <div className="text-muted-foreground">
                                                                                Started:{' '}
                                                                                {new Date(
                                                                                    s.pivot.started_at,
                                                                                ).toLocaleDateString()}
                                                                            </div>
                                                                        )}
                                                                        Status:{' '}
                                                                        {s.pivot
                                                                            ?.status
                                                                            ? s.pivot.status.toUpperCase()
                                                                            : '—'}
                                                                        {s.pivot
                                                                            ?.completed_at && (
                                                                            <span className="ml-2 text-muted-foreground">
                                                                                (Completed:
                                                                                {new Date(
                                                                                    s.pivot.completed_at,
                                                                                ).toLocaleDateString()}

                                                                                )
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                    <Button
                                                                        size="sm"
                                                                        variant={
                                                                            s
                                                                                .pivot
                                                                                ?.status ===
                                                                            'pass'
                                                                                ? 'default'
                                                                                : 'outline'
                                                                        }
                                                                        onClick={() =>
                                                                            setStatus(
                                                                                m.id,
                                                                                s.id,
                                                                                'pass',
                                                                            )
                                                                        }
                                                                        className={
                                                                            s
                                                                                .pivot
                                                                                ?.status ===
                                                                            'pass'
                                                                                ? 'bg-emerald-600'
                                                                                : ''
                                                                        }
                                                                    >
                                                                        <CheckCircle2 className="mr-2 size-4" />{' '}
                                                                        Pass
                                                                    </Button>
                                                                    <Button
                                                                        size="sm"
                                                                        variant={
                                                                            s
                                                                                .pivot
                                                                                ?.status ===
                                                                            'fail'
                                                                                ? 'default'
                                                                                : 'outline'
                                                                        }
                                                                        onClick={() =>
                                                                            setStatus(
                                                                                m.id,
                                                                                s.id,
                                                                                'fail',
                                                                            )
                                                                        }
                                                                        className={
                                                                            s
                                                                                .pivot
                                                                                ?.status ===
                                                                            'fail'
                                                                                ? 'bg-red-600'
                                                                                : ''
                                                                        }
                                                                    >
                                                                        <XCircle className="mr-2 size-4" />{' '}
                                                                        Fail
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
