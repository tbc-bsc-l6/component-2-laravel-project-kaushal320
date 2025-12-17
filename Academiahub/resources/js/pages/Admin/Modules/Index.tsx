import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin', href: '/admin' },
    { title: 'Modules', href: '/admin/modules' },
];

export default function Index({ modules }: { modules: Array<any> }) {
    const csrf =
        (typeof document !== 'undefined'
            ? document
                  .querySelector('meta[name="csrf-token"]')
                  ?.getAttribute('content')
            : '') || '';

    const { data, setData, post, processing, reset } = useForm({
        title: '',
        code: '',
        capacity: 10,
        _token: csrf,
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        post('/admin/modules', {
            onSuccess: () => reset(),
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Modules" />

            <div className="p-4">
                <h1 className="mb-4 text-2xl font-semibold">Modules</h1>

                <form
                    onSubmit={submit}
                    className="mb-6 grid grid-cols-1 gap-2 md:grid-cols-4"
                >
                    <input
                        placeholder="Title"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        className="border p-2"
                    />
                    <input
                        placeholder="Code"
                        value={data.code}
                        onChange={(e) => setData('code', e.target.value)}
                        className="border p-2"
                    />
                    <input
                        type="number"
                        placeholder="Capacity"
                        value={data.capacity}
                        onChange={(e) =>
                            setData('capacity', Number(e.target.value))
                        }
                        className="border p-2"
                    />
                    <button disabled={processing} className="btn-primary p-2">
                        Create
                    </button>
                </form>

                <div className="grid gap-3">
                    {modules.map((m: any) => (
                        <div
                            key={m.id}
                            className="flex items-center justify-between rounded border p-3"
                        >
                            <div>
                                <div className="font-medium">
                                    {m.title} {m.code ? `(${m.code})` : ''}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    Capacity: {m.capacity} —{' '}
                                    {m.available ? 'Available' : 'Unavailable'}
                                </div>
                            </div>
                            <div className="space-x-2">
                                <form
                                    method="post"
                                    action={`/admin/modules/${m.id}/toggle`}
                                >
                                    <input
                                        type="hidden"
                                        name="_token"
                                        value={csrf}
                                    />
                                    <button className="btn-sm">Toggle</button>
                                </form>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
