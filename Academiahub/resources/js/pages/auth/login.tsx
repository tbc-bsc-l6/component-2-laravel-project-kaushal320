import InputError from '@/components/input-error';
import SiteNavbar from '@/components/site-navbar';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import { Form, Head } from '@inertiajs/react';
import { BookOpen, ShieldCheck, Users } from 'lucide-react';
import { useState } from 'react';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
}

export default function Login({
    status,
    canResetPassword,
    canRegister,
}: LoginProps) {
    const [selectedRole, setSelectedRole] = useState<
        'teacher' | 'student' | 'admin' | null
    >(null);

    const roleOptions = [
        {
            id: 'teacher',
            label: 'Teacher',
            description: 'Access the teacher dashboard',
            icon: Users,
            color: 'bg-gradient-to-br from-blue-400 to-blue-600',
            darkColor: 'from-blue-500 to-blue-700',
            lightBg: 'bg-blue-50',
            textColor: 'text-blue-700',
            borderColor: 'border-blue-300',
            hoverColor: 'hover:shadow-2xl hover:scale-105',
        },
        {
            id: 'student',
            label: 'Student',
            description: 'Access your courses',
            icon: BookOpen,
            color: 'bg-gradient-to-br from-purple-400 to-purple-600',
            darkColor: 'from-purple-500 to-purple-700',
            lightBg: 'bg-purple-50',
            textColor: 'text-purple-700',
            borderColor: 'border-purple-300',
            hoverColor: 'hover:shadow-2xl hover:scale-105',
        },
        {
            id: 'admin',
            label: 'Admin',
            description: 'Manage modules, teachers, and students',
            icon: ShieldCheck,
            color: 'bg-gradient-to-br from-amber-500 to-red-600',
            darkColor: 'from-amber-600 to-red-700',
            lightBg: 'bg-amber-50',
            textColor: 'text-amber-700',
            borderColor: 'border-amber-300',
            hoverColor: 'hover:shadow-2xl hover:scale-105',
        },
    ];

    return (
        <div className="flex min-h-screen w-full flex-col bg-black dark:bg-black">
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
                            <h1 className="mb-3 text-4xl font-bold text-white md:text-5xl">
                                Welcome to AcademiaHub
                            </h1>
                            <p className="mx-auto max-w-md text-lg text-gray-300">
                                Choose your role to continue with your learning
                                journey.
                            </p>
                        </div>

                        {/* Role Selection Cards */}
                        <div className="grid w-full max-w-2xl grid-cols-1 gap-6 md:grid-cols-2">
                            {roleOptions.map((role) => {
                                const Icon = role.icon;
                                return (
                                    <button
                                        key={role.id}
                                        onClick={() =>
                                            setSelectedRole(
                                                role.id as
                                                    | 'teacher'
                                                    | 'student',
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
                                                    size={36}
                                                    strokeWidth={1.5}
                                                />
                                            </div>

                                            {/* Text */}
                                            <h3 className="mb-2 text-2xl font-bold text-white">
                                                {role.label}
                                            </h3>
                                            <p className="mb-6 text-gray-400">
                                                {role.description}
                                            </p>

                                            {/* Arrow indicator */}
                                            <div className="flex items-center text-sm font-semibold text-gray-300 transition-all duration-300 group-hover:translate-x-2">
                                                <span>Continue</span>
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
                                New to AcademiaHub?
                            </p>
                            {canRegister && (
                                <TextLink
                                    href={register()}
                                    className="text-lg font-semibold text-blue-400 hover:text-blue-300"
                                >
                                    Create an account
                                </TextLink>
                            )}
                        </div>
                    </>
                ) : (
                    <>
                        <Head title="Log in" />

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
                                                        'teacher' && (
                                                        <Users size={20} />
                                                    )}
                                                    {selectedRole ===
                                                        'student' && (
                                                        <BookOpen size={20} />
                                                    )}
                                                    {selectedRole ===
                                                        'admin' && (
                                                        <ShieldCheck
                                                            size={20}
                                                        />
                                                    )}
                                                </div>
                                                <span className="text-lg font-bold">
                                                    {selectedRole ===
                                                        'teacher' &&
                                                        'Teacher Login'}
                                                    {selectedRole ===
                                                        'student' &&
                                                        'Student Login'}
                                                    {selectedRole === 'admin' &&
                                                        'Admin Login'}
                                                </span>
                                            </>
                                        )}
                                    </div>
                                    <p className="text-sm text-white/90">
                                        Enter your credentials to access your
                                        account
                                    </p>
                                </div>

                                {/* Form Content */}
                                <div className="px-8 py-8">
                                    <Form
                                        {...store.form()}
                                        resetOnSuccess={['password']}
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
                                                            autoFocus
                                                            tabIndex={1}
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
                                                        <div className="flex items-center justify-between">
                                                            <Label
                                                                htmlFor="password"
                                                                className="text-sm font-semibold text-gray-200"
                                                            >
                                                                Password
                                                            </Label>
                                                            {canResetPassword && (
                                                                <TextLink
                                                                    href={request()}
                                                                    className="text-xs font-semibold text-blue-400 hover:text-blue-300"
                                                                    tabIndex={5}
                                                                >
                                                                    Forgot?
                                                                </TextLink>
                                                            )}
                                                        </div>
                                                        <Input
                                                            id="password"
                                                            type="password"
                                                            name="password"
                                                            required
                                                            tabIndex={2}
                                                            autoComplete="current-password"
                                                            placeholder="••••••••"
                                                            className="rounded-xl border-2 border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder-gray-500 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.password
                                                            }
                                                        />
                                                    </div>

                                                    <div className="flex items-center space-x-3 pt-2">
                                                        <Checkbox
                                                            id="remember"
                                                            name="remember"
                                                            tabIndex={3}
                                                            className="h-5 w-5 rounded border-zinc-600"
                                                        />
                                                        <Label
                                                            htmlFor="remember"
                                                            className="cursor-pointer text-sm font-medium text-gray-300"
                                                        >
                                                            Remember me
                                                        </Label>
                                                    </div>

                                                    <Button
                                                        type="submit"
                                                        className={`mt-6 w-full transform rounded-xl py-3 text-lg font-bold text-white transition-all duration-300 hover:scale-105 active:scale-95 ${
                                                            selectedRole ===
                                                            'teacher'
                                                                ? 'bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg hover:from-blue-600 hover:to-blue-700 hover:shadow-xl'
                                                                : 'bg-gradient-to-r from-purple-500 to-purple-600 shadow-lg hover:from-purple-600 hover:to-purple-700 hover:shadow-xl'
                                                        }`}
                                                        tabIndex={4}
                                                        disabled={processing}
                                                        data-test="login-button"
                                                    >
                                                        {processing ? (
                                                            <div className="flex items-center justify-center gap-2">
                                                                <Spinner />
                                                                <span>
                                                                    Signing
                                                                    in...
                                                                </span>
                                                            </div>
                                                        ) : (
                                                            'Sign In'
                                                        )}
                                                    </Button>
                                                </div>

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

                                                {/* Register Link */}
                                                {canRegister && (
                                                    <div className="border-t border-zinc-700 pt-4 text-center">
                                                        <p className="mb-2 text-sm text-gray-400">
                                                            Don't have an
                                                            account?
                                                        </p>
                                                        <TextLink
                                                            href={register()}
                                                            className="font-semibold text-blue-400 hover:text-blue-300"
                                                            tabIndex={5}
                                                        >
                                                            Sign up now
                                                        </TextLink>
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </Form>
                                </div>
                            </div>

                            {/* Status Message */}
                            {status && (
                                <div className="mt-6 rounded-2xl border-2 border-green-700 bg-green-950 p-4 text-center">
                                    <p className="text-sm font-semibold text-green-400">
                                        {status}
                                    </p>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
