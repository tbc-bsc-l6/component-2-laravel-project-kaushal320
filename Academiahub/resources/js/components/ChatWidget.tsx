import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Loader2, MessageCircle, Send, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
}

// Simple markdown formatter for chat messages
function formatMessage(text: string) {
    // Split by lines
    const lines = text.split('\n');
    const formatted: React.ReactNode[] = [];

    lines.forEach((line, index) => {
        // Handle numbered lists (1. , 2. , etc.)
        const numberedListMatch = line.match(
            /^(\d+)\.\s+\*\*(.+?)\*\*:\s*(.+)$/,
        );
        if (numberedListMatch) {
            formatted.push(
                <div key={index} className="mb-2 flex gap-2">
                    <span className="font-semibold text-primary">
                        {numberedListMatch[1]}.
                    </span>
                    <div>
                        <span className="font-semibold">
                            {numberedListMatch[2]}:
                        </span>
                        <span className="ml-1">{numberedListMatch[3]}</span>
                    </div>
                </div>,
            );
            return;
        }

        // Handle simple numbered lists
        const simpleNumberMatch = line.match(/^(\d+)\.\s+(.+)$/);
        if (simpleNumberMatch) {
            formatted.push(
                <div key={index} className="mb-1.5 flex gap-2">
                    <span className="font-semibold text-primary">
                        {simpleNumberMatch[1]}.
                    </span>
                    <span>{formatInlineMarkdown(simpleNumberMatch[2])}</span>
                </div>,
            );
            return;
        }

        // Handle bold headings or regular text
        if (line.trim()) {
            formatted.push(
                <div key={index} className="mb-1">
                    {formatInlineMarkdown(line)}
                </div>,
            );
        }
    });

    return <div className="space-y-1">{formatted}</div>;
}

// Format inline markdown (bold text)
function formatInlineMarkdown(text: string): React.ReactNode {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i}>{part.slice(2, -2)}</strong>;
        }
        return <span key={i}>{part}</span>;
    });
}

export default function ChatWidget({
    user,
}: {
    user?: { id: number; name: string } | null;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [historyLoaded, setHistoryLoaded] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    // Load history when component mounts or user changes
    useEffect(() => {
        const loadHistory = async () => {
            if (user && !historyLoaded) {
                try {
                    const response = await fetch('/chat/history');
                    if (response.ok) {
                        const data = await response.json();
                        if (data.messages && data.messages.length > 0) {
                            setMessages(data.messages);
                        } else {
                            // No history, show personalized welcome
                            setMessages([
                                {
                                    id: 'welcome',
                                    role: 'assistant',
                                    content: `Hello ${user.name}! Welcome back to Academiahub. How can I help you today?`,
                                },
                            ]);
                        }
                    } else {
                        // Fallback welcome
                        setMessages([
                            {
                                id: 'welcome',
                                role: 'assistant',
                                content: `Hello ${user.name}! How can I help you with Academiahub?`,
                            },
                        ]);
                    }
                } catch (error) {
                    console.error('Failed to load chat history:', error);
                    setMessages([
                        {
                            id: 'welcome',
                            role: 'assistant',
                            content: `Hello ${user.name}! How can I help you today?`,
                        },
                    ]);
                }
                setHistoryLoaded(true);
            } else if (!user && !historyLoaded) {
                // Guest user
                setMessages([
                    {
                        id: 'welcome',
                        role: 'assistant',
                        content:
                            'Hello! How can I help you with Academiahub today?',
                    },
                ]);
                setHistoryLoaded(true);
            }
        };

        loadHistory();
    }, [user, historyLoaded]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input.trim(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        let assistantMessageId: string | null = null;

        try {
            // Get CSRF token from cookie or meta tag
            const getCsrfToken = () => {
                // Try to get from cookie first (Laravel sets XSRF-TOKEN cookie)
                const cookies = document.cookie.split(';');
                for (const cookie of cookies) {
                    const [name, value] = cookie.trim().split('=');
                    if (name === 'XSRF-TOKEN') {
                        return decodeURIComponent(value);
                    }
                }
                // Fallback to meta tag
                return (
                    document
                        .querySelector('meta[name="csrf-token"]')
                        ?.getAttribute('content') || ''
                );
            };

            const csrfToken = getCsrfToken();

            const response = await fetch('/chat/stream', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                    'X-XSRF-TOKEN': csrfToken,
                },
                credentials: 'same-origin',
                body: JSON.stringify({ message: userMessage.content }),
            });

            if (!response.ok || !response.body) {
                throw new Error('Network response was not ok');
            }

            assistantMessageId = crypto.randomUUID
                ? crypto.randomUUID()
                : `assistant-${Date.now()}`;

            const placeholderMessage: Message = {
                id: assistantMessageId,
                role: 'assistant',
                content: '',
            };

            setMessages((prev) => [...prev, placeholderMessage]);

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let assistantText = '';

            while (true) {
                const { done, value } = await reader.read();

                if (done) {
                    break;
                }

                const chunk = decoder.decode(value, { stream: true });
                assistantText += chunk;

                const updatedContent = assistantText;
                setMessages((prev) =>
                    prev.map((msg) =>
                        msg.id === assistantMessageId
                            ? { ...msg, content: updatedContent }
                            : msg,
                    ),
                );
            }

            // Flush any remaining decoded text
            const finalChunk = decoder.decode();
            if (finalChunk) {
                assistantText += finalChunk;
            }

            if (assistantText) {
                const updatedContent = assistantText;
                setMessages((prev) =>
                    prev.map((msg) =>
                        msg.id === assistantMessageId
                            ? { ...msg, content: updatedContent }
                            : msg,
                    ),
                );
            }
        } catch (error) {
            console.error('Chat error:', error);
            const fallbackId = assistantMessageId ?? `assistant-${Date.now()}`;
            const errorMessage: Message = {
                id: fallbackId,
                role: 'assistant',
                content:
                    'Sorry, I encountered an error. Please try again later.',
            };

            setMessages((prev) => {
                const hasPlaceholder = prev.some(
                    (msg) => msg.id === fallbackId,
                );
                if (hasPlaceholder) {
                    return prev.map((msg) =>
                        msg.id === fallbackId
                            ? { ...msg, content: errorMessage.content }
                            : msg,
                    );
                }
                return [...prev, errorMessage];
            });
        } finally {
            setIsLoading(false);
        }
    };

    const hasPendingAssistant = messages.some(
        (msg) => msg.role === 'assistant' && msg.content === '',
    );

    return (
        <div className="fixed right-4 bottom-4 z-50 flex flex-col items-end">
            {isOpen && (
                <div className="mb-4 w-[350px] overflow-hidden rounded-lg border bg-white shadow-xl sm:w-[380px] dark:bg-zinc-900">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b bg-primary px-4 py-3 text-primary-foreground">
                        <div className="flex items-center gap-2">
                            <MessageCircle className="h-5 w-5" />
                            <span className="font-semibold">
                                Academia Assistant
                            </span>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
                            onClick={() => setIsOpen(false)}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* Messages */}
                    <div className="scrollbar-thin h-[400px] overflow-y-auto p-4">
                        <div className="flex flex-col gap-4">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={cn(
                                        'max-w-[85%] rounded-lg px-4 py-3 text-sm',
                                        msg.role === 'user'
                                            ? 'self-end bg-primary text-primary-foreground'
                                            : 'self-start bg-muted text-foreground',
                                    )}
                                >
                                    {msg.role === 'assistant'
                                        ? formatMessage(msg.content)
                                        : msg.content}
                                </div>
                            ))}
                            {isLoading && !hasPendingAssistant && (
                                <div className="self-start rounded-lg bg-muted px-3 py-2">
                                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSubmit} className="border-t p-4">
                        <div className="flex gap-2">
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask a question..."
                                className="flex-1"
                                disabled={isLoading}
                            />
                            <Button
                                type="submit"
                                size="icon"
                                disabled={isLoading || !input.trim()}
                            >
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>
                    </form>
                </div>
            )}

            {!isOpen && (
                <div className="relative flex items-center justify-end">
                    {/* Animated help text that slides in and merges */}
                    <div className="animate-slide-merge absolute right-14 whitespace-nowrap">
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-base font-bold text-transparent dark:from-blue-400 dark:to-purple-400">
                            Need help? Ask me! 💬
                        </span>
                    </div>
                </div>
            )}

            <Button
                size="icon"
                className="h-14 w-14 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? (
                    <X className="h-6 w-6" />
                ) : (
                    <MessageCircle className="h-6 w-6" />
                )}
            </Button>
        </div>
    );
}
