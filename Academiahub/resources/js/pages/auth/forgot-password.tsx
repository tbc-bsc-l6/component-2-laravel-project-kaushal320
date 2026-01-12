// Components
import { email } from '@/routes/password';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

import InputError from '@/components/input-error';
import SiteNavbar from '@/components/site-navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ForgotPassword({ status }: { status?: string }) {
    return (
        <div className="flex min-h-screen w-full flex-col bg-black dark:bg-black">
            {/* Navbar */}
            <header className="border-b border-zinc-800">
                <SiteNavbar />
            </header>

            {/* Main Content */}
            <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
                <Head title="Forgot password" />

                {/* Main Container */}
                <div className="w-full max-w-md">
                    {/* Card */}
                    <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 shadow-xl">
                        {/* Header with gradient */}
                        <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-8 pt-8 pb-6">
                            <div className="mb-2 flex items-center gap-3 text-white">
                                <span className="text-lg font-bold">
                                    Forgot Password
                                </span>
                            </div>
                            <p className="text-sm text-white/90">
                                Enter your email to receive a reset link
                            </p>
                        </div>

                        {/* Form Content */}
                        <div className="px-8 py-8">
                            {status && (
                                <div className="mb-4 text-center text-sm font-medium text-green-600">
                                    {status}
                                </div>
                            )}

                            <Form
                                {...email.form()}
                                className="flex flex-col gap-6"
                            >
                                {({ processing, errors }) => (
                                    <>
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
                                                autoComplete="off"
                                                autoFocus
                                                placeholder="email@example.com"
                                                className="rounded-xl border-2 border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder-gray-500 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                            />
                                            <InputError
                                                message={errors.email}
                                            />
                                        </div>

                                        <Button
                                            className="mt-6 w-full transform rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 py-3 text-lg font-bold text-white transition-all duration-300 hover:from-purple-600 hover:to-purple-700 hover:shadow-xl active:scale-95"
                                            disabled={processing}
                                            data-test="email-password-reset-link-button"
                                        >
                                            {processing ? (
                                                <div className="flex items-center justify-center gap-2">
                                                    <LoaderCircle className="h-4 w-4 animate-spin" />
                                                    <span>Sending...</span>
                                                </div>
                                            ) : (
                                                'Send reset link'
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
