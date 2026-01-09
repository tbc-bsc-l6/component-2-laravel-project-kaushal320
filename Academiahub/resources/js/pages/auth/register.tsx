import { login } from '@/routes';
import { store } from '@/routes/register';
import { Form, Head } from '@inertiajs/react';
import { BookOpen, ShieldCheck, UserPlus, Users } from 'lucide-react';
import { useState } from 'react';

import InputError from '@/components/input-error';
import SiteNavbar from '@/components/site-navbar';
import TextLink from '@/components/text-link';
import Toast from '@/components/toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';

interface RegisterProps {
    toast?: {
        type: 'success' | 'error' | 'info' | 'warning';
        message: string;
    };
    google_email?: string;
    google_name?: string;
}

export default function Register({
    toast,
    google_email,
    google_name,
}: RegisterProps) {
    const [selectedRole, setSelectedRole] = useState<
        'student' | 'teacher' | 'admin' | null
    >(null);
    const [showToast, setShowToast] = useState(!!toast);

    const roleOptions = [
        {
            id: 'student',
            label: 'Student',
            description: 'Join courses and learn new skills',
            icon: BookOpen,
            color: 'bg-gradient-to-br from-purple-400 to-purple-600',
            borderColor: 'border-purple-300',
            hoverColor: 'hover:shadow-2xl hover:scale-105',
        },
        // Teacher registration disabled - teachers are created by admin only
        // {
        //     id: 'teacher',
        //     label: 'Teacher',
        //     description: 'Create and manage courses',
        //     icon: Users,
        //     color: 'bg-gradient-to-br from-blue-400 to-blue-600',
        //     borderColor: 'border-blue-300',
        //     hoverColor: 'hover:shadow-2xl hover:scale-105',
        // },
        // Admin registration disabled - admins are created by other admins only
        // {
        //     id: 'admin',
        //     label: 'Administrator',
        //     description: 'Manage the entire platform',
        //     icon: ShieldCheck,
        //     color: 'bg-gradient-to-br from-amber-500 to-red-600',
        //     borderColor: 'border-amber-300',
        //     hoverColor: 'hover:shadow-2xl hover:scale-105',
        // },
    ];

    return (
        <div className="flex min-h-screen w-full flex-col bg-black dark:bg-black">
            {/* Toast Notification */}
            {showToast && toast && (
                <Toast
                    type={toast.type}
                    message={toast.message}
                    onClose={() => setShowToast(false)}
                />
            )}

            {/* Navbar */}
            <header className="border-b border-zinc-800">
                <SiteNavbar />
            </header>

            {/* Main Content */}
            <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
                {!selectedRole ? (
                    <>
                        <Head title="Select Role" />

                        {/* Header */}
                        <div className="mb-12 text-center">
                            <div className="mb-4 flex justify-center">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-600">
                                    <UserPlus
                                        size={32}
                                        className="text-white"
                                    />
                                </div>
                            </div>
                            <h1 className="mb-3 text-4xl font-bold text-white md:text-5xl">
                                Join AcademiaHub
                            </h1>
                            <p className="mx-auto max-w-md text-lg text-gray-300">
                                Choose your role to get started with your
                                learning journey.
                            </p>
                        </div>

                        {/* Role Selection Cards */}
                        <div className="grid w-full max-w-3xl grid-cols-1 gap-6 md:grid-cols-3">
                            {roleOptions.map((role) => {
                                const Icon = role.icon;
                                return (
                                    <button
                                        key={role.id}
                                        onClick={() =>
                                            setSelectedRole(
                                                role.id as
                                                    | 'student'
                                                    | 'teacher'
                                                    | 'admin',
                                            )
                                        }
                                        className={`group relative transform cursor-pointer overflow-hidden rounded-2xl border-2 p-8 text-left transition-all duration-300 ${role.borderColor} ${role.hoverColor} hover:border-opacity-80 bg-zinc-900 shadow-lg`}
                                    >
                                        {/* Background gradient */}
                                        <div
                                            className={`absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-10 ${role.color}`}
                                        />

                                        {/* Content */}
                                        <div className="relative z-10">
                                            {/* Icon */}
                                            <div
                                                className={`mb-6 inline-flex rounded-2xl ${role.color} p-4 text-white shadow-lg`}
                                            >
                                                <Icon
                                                    size={32}
                                                    strokeWidth={1.5}
                                                />
                                            </div>

                                            {/* Text */}
                                            <h3 className="mb-2 text-xl font-bold text-white">
                                                {role.label}
                                            </h3>
                                            <p className="mb-6 text-sm text-gray-400">
                                                {role.description}
                                            </p>

                                            {/* Arrow indicator */}
                                            <div className="flex items-center text-sm font-semibold text-gray-300 transition-all duration-300 group-hover:translate-x-2">
                                                <span>Select</span>
                                                <svg
                                                    className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M9 5l7 7-7 7"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Footer */}
                        <div className="mt-12 text-center">
                            <p className="mb-2 text-gray-400">
                                Already have an account?
                            </p>
                            <TextLink
                                href={login()}
                                className="text-lg font-semibold text-blue-400 hover:text-blue-300"
                            >
                                Sign in instead
                            </TextLink>
                        </div>
                    </>
                ) : (
                    <>
                        <Head title="Register" />

                        {/* Main Container */}
                        <div className="w-full max-w-md">
                            {/* Card */}
                            <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 shadow-xl">
                                {/* Header with gradient */}
                                <div
                                    className={`${roleOptions.find((role) => role.id === selectedRole)?.color} px-8 pt-8 pb-6`}
                                >
                                    <div className="mb-2 flex items-center gap-3 text-white">
                                        {roleOptions.find(
                                            (role) => role.id === selectedRole,
                                        ) && (
                                            <>
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/30 backdrop-blur">
                                                    {selectedRole ===
                                                        'student' && (
                                                        <BookOpen size={20} />
                                                    )}
                                                    {selectedRole ===
                                                        'teacher' && (
                                                        <Users size={20} />
                                                    )}
                                                    {selectedRole ===
                                                        'admin' && (
                                                        <ShieldCheck
                                                            size={20}
                                                        />
                                                    )}
                                                </div>
                                                <span className="text-lg font-bold">
                                                    {
                                                        roleOptions.find(
                                                            (role) =>
                                                                role.id ===
                                                                selectedRole,
                                                        )?.label
                                                    }{' '}
                                                    Registration
                                                </span>
                                            </>
                                        )}
                                    </div>
                                    <p className="text-sm text-white/90">
                                        Create your account to get started
                                    </p>
                                </div>

                                {/* Form Content */}
                                <div className="px-8 py-8">
                                    <Form
                                        {...store.form()}
                                        resetOnSuccess={[
                                            'password',
                                            'password_confirmation',
                                        ]}
                                        disableWhileProcessing
                                        className="flex flex-col gap-6"
                                    >
                                        {({ processing, errors }) => (
                                            <>
                                                <input
                                                    type="hidden"
                                                    name="role"
                                                    value={selectedRole}
                                                />

                                                <div className="grid gap-5">
                                                    <div className="grid gap-2">
                                                        <Label
                                                            htmlFor="name"
                                                            className="text-sm font-semibold text-gray-200"
                                                        >
                                                            Full Name
                                                        </Label>
                                                        <Input
                                                            id="name"
                                                            type="text"
                                                            name="name"
                                                            required
                                                            autoFocus
                                                            tabIndex={1}
                                                            autoComplete="name"
                                                            placeholder="John Doe"
                                                            className="rounded-xl border-2 border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder-gray-500 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.name
                                                            }
                                                        />
                                                    </div>

                                                    <div className="grid gap-2">
                                                        <Label
                                                            htmlFor="email"
                                                            className="text-sm font-semibold text-gray-200"
                                                        >
                                                            Email Address
                                                        </Label>
                                                        <Input
                                                            id="email"
                                                            type="email"
                                                            name="email"
                                                            required
                                                            tabIndex={2}
                                                            autoComplete="email"
                                                            placeholder="you@example.com"
                                                            className="rounded-xl border-2 border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder-gray-500 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.email
                                                            }
                                                        />
                                                    </div>

                                                    <div className="grid gap-2">
                                                        <Label
                                                            htmlFor="password"
                                                            className="text-sm font-semibold text-gray-200"
                                                        >
                                                            Password
                                                        </Label>
                                                        <Input
                                                            id="password"
                                                            type="password"
                                                            name="password"
                                                            required
                                                            tabIndex={3}
                                                            autoComplete="new-password"
                                                            placeholder="••••••••"
                                                            className="rounded-xl border-2 border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder-gray-500 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.password
                                                            }
                                                        />
                                                    </div>

                                                    <div className="grid gap-2">
                                                        <Label
                                                            htmlFor="password_confirmation"
                                                            className="text-sm font-semibold text-gray-200"
                                                        >
                                                            Confirm Password
                                                        </Label>
                                                        <Input
                                                            id="password_confirmation"
                                                            type="password"
                                                            name="password_confirmation"
                                                            required
                                                            tabIndex={4}
                                                            autoComplete="new-password"
                                                            placeholder="••••••••"
                                                            className="rounded-xl border-2 border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder-gray-500 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.password_confirmation
                                                            }
                                                        />
                                                    </div>

                                                    <Button
                                                        type="submit"
                                                        className={`mt-6 w-full transform rounded-xl py-3 text-lg font-bold text-white transition-all duration-300 hover:scale-105 active:scale-95 ${
                                                            selectedRole ===
                                                            'student'
                                                                ? 'bg-gradient-to-r from-purple-500 to-purple-600 shadow-lg hover:from-purple-600 hover:to-purple-700 hover:shadow-xl'
                                                                : selectedRole ===
                                                                    'teacher'
                                                                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg hover:from-blue-600 hover:to-blue-700 hover:shadow-xl'
                                                                  : 'bg-gradient-to-r from-amber-500 to-red-600 shadow-lg hover:from-amber-600 hover:to-red-700 hover:shadow-xl'
                                                        }`}
                                                        tabIndex={5}
                                                        disabled={processing}
                                                        data-test="register-user-button"
                                                    >
                                                        {processing ? (
                                                            <div className="flex items-center justify-center gap-2">
                                                                <Spinner />
                                                                <span>
                                                                    Creating
                                                                    account...
                                                                </span>
                                                            </div>
                                                        ) : (
                                                            'Create Account'
                                                        )}
                                                    </Button>
                                                </div>

                                                {/* Divider */}
                                                <div className="relative my-4">
                                                    <div className="absolute inset-0 flex items-center">
                                                        <div className="w-full border-t border-zinc-700"></div>
                                                    </div>
                                                    <div className="relative flex justify-center text-sm">
                                                        <span className="bg-zinc-900 px-2 text-gray-400">
                                                            Or continue with
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Google Sign In Button */}
                                                <a
                                                    href="/auth/google?source=register"
                                                    className="flex w-full items-center justify-center gap-3 rounded-xl border-2 border-zinc-700 bg-white px-4 py-3 font-semibold text-gray-900 transition-all hover:border-zinc-600 hover:bg-gray-100 active:scale-95"
                                                >
                                                    <svg
                                                        className="h-5 w-5"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            fill="#4285F4"
                                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                                        />
                                                        <path
                                                            fill="#34A853"
                                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                                        />
                                                        <path
                                                            fill="#FBBC05"
                                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                                        />
                                                        <path
                                                            fill="#EA4335"
                                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                                        />
                                                    </svg>
                                                    Sign in with Google
                                                </a>

                                                {/* Change Role Button */}
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setSelectedRole(null)
                                                    }
                                                    className="mt-2 w-full rounded-xl py-2 font-medium text-gray-300 transition-colors hover:bg-zinc-800"
                                                >
                                                    ← Change Role
                                                </button>

                                                {/* Login Link */}
                                                <div className="border-t border-zinc-700 pt-4 text-center">
                                                    <p className="mb-2 text-sm text-gray-400">
                                                        Already have an account?
                                                    </p>
                                                    <TextLink
                                                        href={login()}
                                                        className="font-semibold text-blue-400 hover:text-blue-300"
                                                        tabIndex={6}
                                                    >
                                                        Sign in instead
                                                    </TextLink>
                                                </div>

                                                {selectedRole !== 'student' && (
                                                    <div className="rounded-lg border border-amber-700 bg-amber-900/30 px-4 py-3">
                                                        <p className="text-xs text-amber-300">
                                                            <strong>
                                                                Note:
                                                            </strong>{' '}
                                                            {selectedRole ===
                                                            'teacher'
                                                                ? 'Teacher'
                                                                : 'Administrator'}{' '}
                                                            accounts require
                                                            approval from an
                                                            administrator.
                                                        </p>
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
