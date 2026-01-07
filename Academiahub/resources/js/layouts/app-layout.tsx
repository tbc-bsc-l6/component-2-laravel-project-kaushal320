import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import ChatWidget from '@/components/ChatWidget';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';
import { usePage } from '@inertiajs/react';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => {
    const { auth } = usePage().props as any;
    
    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            {children}
            <ChatWidget user={auth?.user} />
        </AppLayoutTemplate>
    );
};
