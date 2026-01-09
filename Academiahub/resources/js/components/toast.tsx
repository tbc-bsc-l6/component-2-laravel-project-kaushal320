import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ToastProps {
    type: 'success' | 'error' | 'info' | 'warning';
    message: string;
    duration?: number;
    onClose?: () => void;
}

export default function Toast({
    type = 'info',
    message,
    duration = 5000,
    onClose,
}: ToastProps) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            onClose?.();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    if (!isVisible) return null;

    const baseClasses =
        'fixed top-4 right-4 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg animation-fadeIn z-50';

    const typeClasses = {
        success: 'bg-green-900 border border-green-700 text-green-100',
        error: 'bg-red-900 border border-red-700 text-red-100',
        info: 'bg-blue-900 border border-blue-700 text-blue-100',
        warning: 'bg-yellow-900 border border-yellow-700 text-yellow-100',
    };

    const icons = {
        success: <CheckCircle className="h-5 w-5 flex-shrink-0" />,
        error: <XCircle className="h-5 w-5 flex-shrink-0" />,
        info: <AlertCircle className="h-5 w-5 flex-shrink-0" />,
        warning: <AlertCircle className="h-5 w-5 flex-shrink-0" />,
    };

    return (
        <div className={`${baseClasses} ${typeClasses[type]}`}>
            {icons[type]}
            <p className="text-sm font-medium">{message}</p>
        </div>
    );
}
