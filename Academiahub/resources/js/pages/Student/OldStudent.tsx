import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { CheckCircle2, GraduationCap, XCircle } from 'lucide-react';

interface Module {
    id: number;
    title: string;
    code: string;
    pivot?: {
        created_at?: string | null;
        status?: 'pass' | 'fail' | null;
        completed_at?: string | null;
    };
}

export default function OldStudent({
    completedModules = [],
}: {
    completedModules: Module[];
}) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Dashboard', href: '/student' }]}>
            <Head title="Old Student - Transcript" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                {/* Header */}
                <div>
                    <div className="mb-2 flex items-center gap-2">
                        <GraduationCap className="size-8 text-purple-500" />
                        <h1 className="text-3xl font-bold">Your Transcript</h1>
                    </div>
                    <p className="text-muted-foreground">
                        View your completed modules and final grades
                    </p>
                </div>

                {/* Completed Modules */}
                <div className="space-y-3">
                    <h2 className="text-xl font-semibold">
                        Completed Modules ({completedModules.length})
                    </h2>
                    {completedModules.length === 0 ? (
                        <Card className="border-dashed border-purple-400/30 bg-purple-500/5">
                            <CardContent className="p-6 text-center text-muted-foreground">
                                <p>
                                    No completed modules in your transcript yet.
                                </p>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="space-y-2">
                            {completedModules.map((m) => (
                                <Card
                                    key={m.id}
                                    className="border-purple-400/30"
                                >
                                    <CardContent className="flex items-center justify-between p-4">
                                        <div>
                                            <div className="text-lg font-semibold">
                                                {m.title}
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                Module Code: {m.code}
                                            </div>
                                            {m.pivot?.created_at && (
                                                <div className="mt-1 text-xs text-muted-foreground">
                                                    Enrolled:{' '}
                                                    {new Date(
                                                        m.pivot.created_at,
                                                    ).toLocaleDateString(
                                                        'en-US',
                                                        {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric',
                                                        },
                                                    )}
                                                </div>
                                            )}
                                            {m.pivot?.completed_at && (
                                                <div className="mt-1 text-xs text-muted-foreground">
                                                    Completed:{' '}
                                                    {new Date(
                                                        m.pivot.completed_at,
                                                    ).toLocaleDateString(
                                                        'en-US',
                                                        {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric',
                                                        },
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            {m.pivot?.status === 'pass' ? (
                                                <Badge className="flex items-center gap-2 bg-emerald-600 px-4 py-2 text-base">
                                                    <CheckCircle2 className="size-4" />{' '}
                                                    PASS
                                                </Badge>
                                            ) : (
                                                <Badge className="flex items-center gap-2 bg-red-600 px-4 py-2 text-base">
                                                    <XCircle className="size-4" />{' '}
                                                    FAIL
                                                </Badge>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>

                {/* Summary */}
                <Card className="border-purple-400/30 bg-purple-500/5">
                    <CardContent className="p-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <div className="text-sm text-muted-foreground">
                                    Total Modules
                                </div>
                                <div className="text-2xl font-bold">
                                    {completedModules.length}
                                </div>
                            </div>
                            <div>
                                <div className="text-sm text-muted-foreground">
                                    Pass Rate
                                </div>
                                <div className="text-2xl font-bold text-emerald-500">
                                    {completedModules.length > 0
                                        ? `${Math.round(
                                              (completedModules.filter(
                                                  (m) =>
                                                      m.pivot?.status ===
                                                      'pass',
                                              ).length /
                                                  completedModules.length) *
                                                  100,
                                          )}%`
                                        : '—'}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
