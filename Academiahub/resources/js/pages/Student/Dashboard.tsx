import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { BookOpen, CheckCircle2, Lock, Plus, XCircle } from 'lucide-react';

interface Module {
    id: number;
    title: string;
    code: string;
    capacity?: number;
    pivot?: {
        created_at?: string;
        completed_at?: string | null;
        status?: 'pass' | 'fail' | null;
    };
}

export default function StudentDashboard({
    currentModules = [],
    completedModules = [],
    availableModules = [],
    canEnroll = true,
}: {
    currentModules: Module[];
    completedModules: Module[];
    availableModules: Module[];
    canEnroll: boolean;
}) {
    function handleEnroll(moduleId: number) {
        router.post(`/student/enroll/${moduleId}`);
    }

    return (
        <AppLayout breadcrumbs={[{ title: 'Dashboard', href: '/student' }]}>
            <Head title="Student Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold">My Learning Journey</h1>
                    <p className="mt-1 text-muted-foreground">
                        {currentModules.length}/4 current modules |{' '}
                        {completedModules.length} completed
                    </p>
                </div>

                {/* Current Modules */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <h2 className="flex items-center gap-2 text-xl font-semibold">
                            <BookOpen className="size-5 text-blue-500" />
                            Current Modules ({currentModules.length}/4)
                        </h2>
                    </div>
                    {currentModules.length === 0 ? (
                        <Card className="border-dashed border-blue-400/30 bg-blue-500/5">
                            <CardContent className="p-6 text-muted-foreground">
                                Not enrolled in any modules yet. Browse
                                available modules to get started!
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid gap-3">
                            {currentModules.map((m) => (
                                <Card key={m.id} className="border-blue-400/30">
                                    <CardContent className="flex items-center justify-between p-4">
                                        <div>
                                            <div className="font-semibold">
                                                {m.title}
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                Code: {m.code}
                                            </div>
                                            {m.pivot?.created_at && (
                                                <div className="text-xs text-muted-foreground">
                                                    Enrolled on:{' '}
                                                    {new Date(
                                                        m.pivot.created_at,
                                                    ).toLocaleDateString()}
                                                </div>
                                            )}
                                        </div>
                                        <Badge className="bg-blue-600">
                                            Active
                                        </Badge>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>

                {/* Available Modules */}
                {canEnroll && (
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <h2 className="flex items-center gap-2 text-xl font-semibold">
                                <Plus className="size-5 text-emerald-500" />
                                Available Modules to Enroll
                            </h2>
                        </div>
                        {availableModules.length === 0 ? (
                            <Card className="border-dashed border-emerald-400/30 bg-emerald-500/5">
                                <CardContent className="p-6 text-muted-foreground">
                                    No new modules available right now.
                                </CardContent>
                            </Card>
                        ) : (
                            <div className="grid gap-3">
                                {availableModules.map((m) => (
                                    <Card
                                        key={m.id}
                                        className="group border-emerald-400/30 hover:border-emerald-400/70"
                                    >
                                        <CardContent className="flex items-center justify-between p-4">
                                            <div>
                                                <div className="font-semibold">
                                                    {m.title}
                                                </div>
                                                <div className="text-sm text-muted-foreground">
                                                    Code: {m.code}
                                                </div>
                                            </div>
                                            <Button
                                                size="sm"
                                                onClick={() =>
                                                    handleEnroll(m.id)
                                                }
                                                className="bg-emerald-600 hover:bg-emerald-700"
                                            >
                                                <Plus className="mr-1 size-4" />{' '}
                                                Enroll
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {!canEnroll && (
                    <Card className="border-amber-400/30 bg-amber-500/5">
                        <CardContent className="flex items-center gap-2 p-4 text-amber-600">
                            <Lock className="size-4" />
                            <span>
                                You've reached the maximum of 4 current modules.
                                Complete some to enroll in more.
                            </span>
                        </CardContent>
                    </Card>
                )}

                {/* Completed Modules */}
                <div className="space-y-3">
                    <h2 className="flex items-center gap-2 text-xl font-semibold">
                        <CheckCircle2 className="size-5 text-purple-500" />
                        Completion History ({completedModules.length})
                    </h2>
                    {completedModules.length === 0 ? (
                        <Card className="border-dashed border-purple-400/30 bg-purple-500/5">
                            <CardContent className="p-6 text-muted-foreground">
                                You haven't completed any modules yet.
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid gap-3">
                            {completedModules.map((m) => (
                                <Card
                                    key={m.id}
                                    className="border-purple-400/30"
                                >
                                    <CardContent className="flex items-center justify-between p-4">
                                        <div>
                                            <div className="font-semibold">
                                                {m.title}
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                Code: {m.code}
                                            </div>
                                            {m.pivot?.created_at && (
                                                <div className="text-xs text-muted-foreground">
                                                    Enrolled on:{' '}
                                                    {new Date(
                                                        m.pivot.created_at,
                                                    ).toLocaleDateString()}
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {m.pivot?.status === 'pass' ? (
                                                <Badge className="flex items-center gap-1 bg-emerald-600">
                                                    <CheckCircle2 className="size-3" />{' '}
                                                    PASS
                                                </Badge>
                                            ) : (
                                                <Badge className="flex items-center gap-1 bg-red-600">
                                                    <XCircle className="size-3" />{' '}
                                                    FAIL
                                                </Badge>
                                            )}
                                            {m.pivot?.completed_at && (
                                                <span className="text-xs text-muted-foreground">
                                                    {new Date(
                                                        m.pivot.completed_at,
                                                    ).toLocaleDateString()}
                                                </span>
                                            )}
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
