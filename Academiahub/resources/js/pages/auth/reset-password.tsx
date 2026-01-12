import { update } from '@/routes/password';
import { Form, Head } from '@inertiajs/react';

import InputError from '@/components/input-error';
import SiteNavbar from '@/components/site-navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';

interface ResetPasswordProps {
    token: string;
    email: string;
}

export default function ResetPassword({ token, email }: ResetPasswordProps) {
    return (
        <div className="flex min-h-screen w-full flex-col bg-black dark:bg-black">
            <header className="border-b border-zinc-800">
                <SiteNavbar />
            </header>

            <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
                <Head title="Reset password" />

                <div className="w-full max-w-md">
                    <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 shadow-xl">
                        <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-8 pt-8 pb-6">
                            <div className="mb-2 flex items-center gap-3 text-white">
                                <span className="text-lg font-bold">
                                    Reset password
                                </span>
                            </div>
                            <p className="text-sm text-white/90">
                                Please enter your new password below
                            </p>
                        </div>

                        <div className="px-8 py-8">
                            <Form
                                {...update.form()}
                                transform={(data) => ({
                                    ...data,
                                    token,
                                    email,
                                })}
                                resetOnSuccess={[
                                    'password',
                                    'password_confirmation',
                                ]}
                                className="flex flex-col gap-6"
                            >
                                {({ processing, errors }) => (
                                    <>
                                        <div className="grid gap-2">
                                            <Label
                                                htmlFor="email"
                                                className="text-sm font-semibold text-gray-200"
                                            >
                                                Email
                                            </Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                name="email"
                                                autoComplete="email"
                                                value={email}
                                                readOnly
                                                className="rounded-xl border-2 border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder-gray-500"
                                            />
                                            <InputError
                                                message={errors.email}
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
                                                autoComplete="new-password"
                                                autoFocus
                                                placeholder="Password"
                                                className="rounded-xl border-2 border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder-gray-500 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                            />
                                            <InputError
                                                message={errors.password}
                                            />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label
                                                htmlFor="password_confirmation"
                                                className="text-sm font-semibold text-gray-200"
                                            >
                                                Confirm password
                                            </Label>
                                            <Input
                                                id="password_confirmation"
                                                type="password"
                                                name="password_confirmation"
                                                autoComplete="new-password"
                                                placeholder="Confirm password"
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
                                            className="mt-4 w-full transform rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 py-3 text-lg font-bold text-white transition-all duration-300 hover:from-purple-600 hover:to-purple-700 hover:shadow-xl active:scale-95"
                                            disabled={processing}
                                            data-test="reset-password-button"
                                        >
                                            {processing ? (
                                                <div className="flex items-center justify-center gap-2">
                                                    <Spinner />
                                                    <span>Resetting...</span>
                                                </div>
                                            ) : (
                                                'Reset password'
                                            )}
                                        </Button>
                                    </>
                                )}
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
