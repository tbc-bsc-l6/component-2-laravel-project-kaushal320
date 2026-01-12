import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
import { Head, Link, router } from '@inertiajs/react';
import {
    AlertCircle,
    BookOpen,
    CheckCircle2,
    Filter,
    Mail,
    Search,
    Shield,
    Trash2,
    Users,
    X,
} from 'lucide-react';
import { useMemo, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin', href: '/admin' },
    { title: 'Students', href: '/admin/students' },
];

interface Student {
    id: number;
    name: string;
    email: string;
    is_old_student: boolean;
    userRole?: {
        id: number;
        role: string;
    };
    enrolledModules?: Module[];
}

interface Module {
    id: number;
    title: string;
    code: string;
}

export default function StudentsIndex({
    students = [],
    modules = [],
}: {
    students: Student[];
    modules: Module[];
}) {
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(
        null,
    );
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<'all' | 'current' | 'old'>(
        'all',
    );

    const filteredStudents = useMemo(() => {
        return students.filter((student) => {
            // Search filter
            const matchesSearch =
                searchTerm === '' ||
                student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                student.email.toLowerCase().includes(searchTerm.toLowerCase());

            // Status filter
            const matchesStatus =
                filterStatus === 'all' ||
                (filterStatus === 'current' && !student.is_old_student) ||
                (filterStatus === 'old' && student.is_old_student);

            return matchesSearch && matchesStatus;
        });
    }, [students, searchTerm, filterStatus]);

    function changeStudentRole(studentId: number, role: string) {
        router.patch(`/admin/users/${studentId}/role`, { role });
    }

    function removeStudentFromModule(studentId: number, moduleId: number) {
        if (confirm('Remove this student from the module?')) {
            router.delete(`/admin/students/${studentId}/modules/${moduleId}`);
        }
    }

    function deleteStudent(studentId: number) {
        if (confirm('Are you sure you want to delete this student?')) {
            router.delete(`/admin/students/${studentId}`);
        }
    }

    function toggleOldStudent(studentId: number) {
        router.post(`/admin/students/${studentId}/toggle-old`);
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Students" />

            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                {/* Header */}
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold">
                            Students Management
                        </h1>
                        <p className="mt-1 text-muted-foreground">
                            Manage students, their enrollments, and roles
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge className="bg-blue-600 text-white shadow-lg">
                            <Users className="mr-1 size-3" />
                            {students.length} Students
                        </Badge>
                        <Link href="/admin">
                            <Button variant="outline" size="sm">
                                Back to Dashboard
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Search and Filter */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="relative max-w-md flex-1">
                        <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            type="text"
                            placeholder="Search by name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pr-10 pl-10"
                        />
                        {searchTerm && (
                            <Button
                                variant="ghost"
                                size="sm"
                                className="absolute top-1/2 right-1 size-6 -translate-y-1/2 p-0"
                                onClick={() => setSearchTerm('')}
                            >
                                <X className="size-4" />
                            </Button>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <Filter className="size-4 text-muted-foreground" />
                        <Button
                            variant={
                                filterStatus === 'all' ? 'default' : 'outline'
                            }
                            size="sm"
                            onClick={() => setFilterStatus('all')}
                        >
                            All ({students.length})
                        </Button>
                        <Button
                            variant={
                                filterStatus === 'current'
                                    ? 'default'
                                    : 'outline'
                            }
                            size="sm"
                            onClick={() => setFilterStatus('current')}
                        >
                            Current (
                            {students.filter((s) => !s.is_old_student).length})
                        </Button>
                        <Button
                            variant={
                                filterStatus === 'old' ? 'default' : 'outline'
                            }
                            size="sm"
                            onClick={() => setFilterStatus('old')}
                        >
                            Old (
                            {students.filter((s) => s.is_old_student).length})
                        </Button>
                    </div>
                </div>

                {/* Students List */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold">
                            {filteredStudents.length === 0
                                ? 'No students found'
                                : `${filteredStudents.length} Student${
                                      filteredStudents.length !== 1 ? 's' : ''
                                  }`}
                        </h2>
                    </div>

                    {filteredStudents.length === 0 ? (
                        <Card className="border-dashed border-blue-400/30 bg-blue-500/5">
                            <CardContent className="flex min-h-[300px] items-center justify-center">
                                <div className="space-y-4 text-center">
                                    <div className="inline-block rounded-full bg-blue-500/20 p-4">
                                        <Users className="size-8 text-blue-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold">
                                            No students yet
                                        </h3>
                                        <p className="mt-1 text-muted-foreground">
                                            Students will appear here once they
                                            register
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid gap-4">
                            {filteredStudents.map((student) => (
                                <Card
                                    key={student.id}
                                    className="group border-blue-400/30 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400/70 hover:shadow-lg hover:shadow-blue-500/30"
                                >
                                    <CardContent className="p-6">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex flex-1 gap-4">
                                                <div className="h-fit rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-3 shadow-md transition-all group-hover:from-blue-500/30 group-hover:to-cyan-500/30 group-hover:shadow-lg group-hover:shadow-blue-500/50">
                                                    <Users className="size-6 text-blue-400 transition-transform group-hover:scale-110 group-hover:rotate-6" />
                                                </div>

                                                <div className="flex-1">
                                                    <h3 className="text-lg font-semibold transition-colors group-hover:text-blue-400">
                                                        {student.name}
                                                    </h3>
                                                    <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                                                        <Mail className="size-3" />
                                                        {student.email}
                                                    </p>

                                                    {/* Role */}
                                                    <div className="mt-2">
                                                        <Dialog>
                                                            <DialogTrigger
                                                                asChild
                                                            >
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    className={`cursor-pointer transition-all hover:scale-105 ${
                                                                        student
                                                                            .userRole
                                                                            ?.role ===
                                                                        'student'
                                                                            ? 'border-blue-500/50 bg-blue-500/10 hover:bg-blue-500/20'
                                                                            : student
                                                                                    .userRole
                                                                                    ?.role ===
                                                                                'teacher'
                                                                              ? 'border-emerald-500/50 bg-emerald-500/10 hover:bg-emerald-500/20'
                                                                              : 'border-purple-500/50 bg-purple-500/10 hover:bg-purple-500/20'
                                                                    }`}
                                                                >
                                                                    <Shield className="mr-2 size-4" />
                                                                    Change Role
                                                                </Button>
                                                            </DialogTrigger>
                                                            <DialogContent>
                                                                <DialogHeader>
                                                                    <DialogTitle>
                                                                        Change
                                                                        Role
                                                                    </DialogTitle>
                                                                    <DialogDescription>
                                                                        Select a
                                                                        new role
                                                                        for{' '}
                                                                        {
                                                                            student.name
                                                                        }
                                                                    </DialogDescription>
                                                                </DialogHeader>
                                                                <div className="space-y-2">
                                                                    {[
                                                                        'student',
                                                                        'teacher',
                                                                    ].map(
                                                                        (
                                                                            role,
                                                                        ) => (
                                                                            <Button
                                                                                key={
                                                                                    role
                                                                                }
                                                                                onClick={() =>
                                                                                    changeStudentRole(
                                                                                        student.id,
                                                                                        role,
                                                                                    )
                                                                                }
                                                                                variant={
                                                                                    student
                                                                                        .userRole
                                                                                        ?.role ===
                                                                                    role
                                                                                        ? 'default'
                                                                                        : 'outline'
                                                                                }
                                                                                className={`w-full justify-start ${
                                                                                    student
                                                                                        .userRole
                                                                                        ?.role ===
                                                                                    role
                                                                                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500'
                                                                                        : ''
                                                                                }`}
                                                                            >
                                                                                <Shield className="mr-2 size-4" />
                                                                                Make{' '}
                                                                                {role
                                                                                    .charAt(
                                                                                        0,
                                                                                    )
                                                                                    .toUpperCase() +
                                                                                    role.slice(
                                                                                        1,
                                                                                    )}
                                                                                {student
                                                                                    .userRole
                                                                                    ?.role ===
                                                                                    role && (
                                                                                    <CheckCircle2 className="ml-auto size-4" />
                                                                                )}
                                                                            </Button>
                                                                        ),
                                                                    )}
                                                                </div>
                                                            </DialogContent>
                                                        </Dialog>
                                                    </div>

                                                    {/* Old Student Badge & Toggle */}
                                                    <div className="mt-2">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() =>
                                                                toggleOldStudent(
                                                                    student.id,
                                                                )
                                                            }
                                                            className={`transition-all ${
                                                                student.is_old_student
                                                                    ? 'border-amber-500/50 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20'
                                                                    : 'border-gray-500/50 bg-gray-500/10 hover:bg-gray-500/20'
                                                            }`}
                                                        >
                                                            {student.is_old_student
                                                                ? '👴 Old Student'
                                                                : '👨‍🎓 Current Student'}
                                                        </Button>
                                                    </div>

                                                    {/* Enrolled Modules */}
                                                    {student.enrolledModules &&
                                                        student.enrolledModules
                                                            .length > 0 && (
                                                            <div className="mt-3 space-y-2">
                                                                <p className="text-xs font-medium text-muted-foreground">
                                                                    🎓 Enrolled
                                                                    Modules
                                                                    (courses):
                                                                </p>
                                                                <div className="flex flex-wrap gap-2">
                                                                    {(
                                                                        student.enrolledModules ??
                                                                        []
                                                                    ).map(
                                                                        (
                                                                            module,
                                                                        ) => (
                                                                            <Badge
                                                                                key={
                                                                                    module.id
                                                                                }
                                                                                variant="outline"
                                                                                className="border-blue-500/50 text-blue-400"
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
                                                            className="text-amber-400 hover:text-amber-300"
                                                        >
                                                            <BookOpen className="mr-1 size-4" />
                                                            Remove
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>
                                                                Remove from
                                                                Module
                                                            </DialogTitle>
                                                            <DialogDescription>
                                                                Select a module
                                                                to remove{' '}
                                                                {student.name}{' '}
                                                                from
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        {!student.enrolledModules ||
                                                        student.enrolledModules
                                                            .length === 0 ? (
                                                            <p className="text-muted-foreground">
                                                                Student is not
                                                                enrolled in any
                                                                modules
                                                            </p>
                                                        ) : (
                                                            <div className="space-y-2">
                                                                {(
                                                                    student.enrolledModules ??
                                                                    []
                                                                ).map(
                                                                    (
                                                                        module,
                                                                    ) => (
                                                                        <div
                                                                            key={
                                                                                module.id
                                                                            }
                                                                        >
                                                                            <Button
                                                                                onClick={() =>
                                                                                    removeStudentFromModule(
                                                                                        student.id,
                                                                                        module.id,
                                                                                    )
                                                                                }
                                                                                variant="outline"
                                                                                className="w-full justify-start border-red-500/50 hover:border-red-400 hover:text-red-400"
                                                                            >
                                                                                <Trash2 className="mr-2 size-4" />
                                                                                {
                                                                                    module.title
                                                                                }
                                                                            </Button>
                                                                        </div>
                                                                    ),
                                                                )}
                                                            </div>
                                                        )}
                                                    </DialogContent>
                                                </Dialog>

                                                <Button
                                                    onClick={() =>
                                                        deleteStudent(
                                                            student.id,
                                                        )
                                                    }
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-red-400 hover:text-red-300"
                                                    title="Permanently delete student"
                                                >
                                                    <AlertCircle className="size-4" />
                                                </Button>
                                            </div>
                                        </div>
                                        {/* Click to open details dialog */}
                                        <div
                                            className="mt-3 cursor-pointer text-xs text-muted-foreground"
                                            onClick={() =>
                                                setSelectedStudent(student)
                                            }
                                        >
                                            Click to view details and actions
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
                {/* Selected Student Details Dialog */}
                {selectedStudent && (
                    <Dialog
                        open={!!selectedStudent}
                        onOpenChange={(open) => {
                            if (!open) setSelectedStudent(null);
                        }}
                    >
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    {selectedStudent.name}
                                </DialogTitle>
                                <DialogDescription>
                                    {selectedStudent.email}
                                </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                                {/* Role change */}
                                <div>
                                    <p className="text-sm font-medium">Role</p>
                                    <div className="mt-2 space-y-2">
                                        {['student', 'teacher'].map((role) => (
                                            <Button
                                                key={role}
                                                onClick={() =>
                                                    changeStudentRole(
                                                        selectedStudent.id,
                                                        role,
                                                    )
                                                }
                                                variant={
                                                    selectedStudent.userRole
                                                        ?.role === role
                                                        ? 'default'
                                                        : 'outline'
                                                }
                                                className={
                                                    selectedStudent.userRole
                                                        ?.role === role
                                                        ? 'w-full justify-start bg-gradient-to-r from-blue-500 to-cyan-500'
                                                        : 'w-full justify-start'
                                                }
                                            >
                                                <Shield className="mr-2 size-4" />
                                                Make{' '}
                                                {role.charAt(0).toUpperCase() +
                                                    role.slice(1)}
                                                {selectedStudent.userRole
                                                    ?.role === role && (
                                                    <CheckCircle2 className="ml-auto size-4" />
                                                )}
                                            </Button>
                                        ))}
                                    </div>
                                </div>

                                {/* Enrolled modules with remove */}
                                <div>
                                    <p className="text-sm font-medium">
                                        Enrolled Modules (courses)
                                    </p>
                                    {(selectedStudent.enrolledModules ?? [])
                                        .length === 0 ? (
                                        <p className="text-sm text-muted-foreground">
                                            Not enrolled in any modules
                                        </p>
                                    ) : (
                                        <div className="mt-2 space-y-2">
                                            {(
                                                selectedStudent.enrolledModules ??
                                                []
                                            ).map((module) => (
                                                <div
                                                    key={module.id}
                                                    className="flex items-center gap-2"
                                                >
                                                    <Badge
                                                        variant="outline"
                                                        className="border-blue-500/50 text-blue-400"
                                                    >
                                                        {module.title}
                                                    </Badge>
                                                    <Button
                                                        onClick={() =>
                                                            removeStudentFromModule(
                                                                selectedStudent.id,
                                                                module.id,
                                                            )
                                                        }
                                                        variant="outline"
                                                        className="border-red-500/50 hover:border-red-400 hover:text-red-400"
                                                    >
                                                        <Trash2 className="mr-2 size-4" />
                                                        Remove
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Danger zone */}
                                <div>
                                    <Button
                                        onClick={() =>
                                            deleteStudent(selectedStudent.id)
                                        }
                                        variant="ghost"
                                        className="text-red-400 hover:text-red-300"
                                    >
                                        <AlertCircle className="mr-2 size-4" />
                                        Delete Student
                                    </Button>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                )}
            </div>
        </AppLayout>
    );
}
