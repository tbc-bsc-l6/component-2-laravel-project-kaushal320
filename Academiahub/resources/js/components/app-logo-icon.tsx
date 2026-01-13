import { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            {...props}
        >
            <rect
                x="6"
                y="10"
                width="52"
                height="44"
                rx="4"
                fill="currentColor"
            />
            <path d="M12 16h40v6H12z" fill="rgba(255,255,255,0.12)" />
            <path
                d="M20 28c0-3.314 2.686-6 6-6s6 2.686 6 6v8h-4v-8c0-1.105-.895-2-2-2s-2 .895-2 2v8h-4v-8z"
                fill="#fff"
                opacity="0.95"
            />
            <path
                d="M36 28l8 0v12"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <circle cx="48" cy="20" r="2" fill="#fff" />
        </svg>
    );
}
