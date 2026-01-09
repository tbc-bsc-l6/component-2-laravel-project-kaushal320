<?php

namespace App\Http\Controllers;

use App\Models\ChatMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ChatController extends Controller
{
    private function getSystemPrompt(): string
    {
        return "You are a helpful AI assistant for Academiahub, an educational platform for managing modules and tracking student progress. \n\nKey features of Academiahub:\n- **Module Management**: Browse and enroll in available modules/courses\n- **Student Enrollment**: Students can enroll in modules and track their progress\n- **Teacher Assignment**: Admins assign teachers to modules; teachers manage student progress\n- **Progress Tracking**: Students have statuses (Pending, In Progress, Completed, Certified)\n- **User Roles**: Three roles - Admin, Teacher, and Student\n\nIMPORTANT: Only mention these features. Do NOT suggest features that don't exist (like blogs, webinars, resources library, or community forums).\n\nWhen answering:\n- Be concise and friendly\n- Focus on actual platform capabilities\n- Guide users to sign up, view modules, or enroll\n- Keep responses brief (2-4 points maximum)";
    }

    public function chat(Request $request)
    {
        $request->validate([
            'message' => 'required|string',
        ]);

        $userMessage = $request->input('message');
        $user = $request->user();

        // Save user message if authenticated
        if ($user) {
            ChatMessage::create([
                'user_id' => $user->id,
                'role' => 'user',
                'content' => $userMessage
            ]);
        }

        try {
            $systemPrompt = $this->getSystemPrompt();

            $response = Http::timeout(60)->post('http://localhost:11434/api/chat', [
                'model' => 'llama3', 
                'messages' => [
                    [
                        'role' => 'system',
                        'content' => $systemPrompt
                    ],
                    [
                        'role' => 'user',
                        'content' => $userMessage
                    ]
                ],
                'stream' => false,
            ]);

            if ($response->successful()) {
                $data = $response->json();
                $botResponse = $data['message']['content'] ?? 'Sorry, I could not understand that.';
                
                // Save bot response if authenticated
                if ($user) {
                    ChatMessage::create([
                        'user_id' => $user->id,
                        'role' => 'assistant',
                        'content' => $botResponse
                    ]);
                }
                
                return response()->json([
                    'response' => $botResponse
                ]);
            } else {
                return response()->json([
                    'response' => 'Sorry, I am having trouble connecting to my brain right now.'
                ], 500);
            }

        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
                'response' => 'An error occurred while communicating with the AI.'
            ], 500);
        }
    }

    public function stream(Request $request)
    {
        $request->validate([
            'message' => 'required|string',
        ]);

        $userMessage = $request->input('message');
        $user = $request->user();

        if ($user) {
            ChatMessage::create([
                'user_id' => $user->id,
                'role' => 'user',
                'content' => $userMessage,
            ]);
        }

        $payload = [
            'model' => 'llama3',
            'messages' => [
                [
                    'role' => 'system',
                    'content' => $this->getSystemPrompt(),
                ],
                [
                    'role' => 'user',
                    'content' => $userMessage,
                ],
            ],
            'stream' => true,
        ];

        try {
            $aiResponse = Http::timeout(0)
                ->withOptions(['stream' => true])
                ->post('http://localhost:11434/api/chat', $payload);

            if ($aiResponse->failed()) {
                return response()->json([
                    'response' => 'Sorry, I am having trouble connecting to my brain right now.',
                ], 500);
            }

            $assistantContent = '';

            return response()->stream(function () use ($aiResponse, $user, &$assistantContent) {
                $bodyStream = $aiResponse->toPsrResponse()->getBody();
                $buffer = '';

                while (!$bodyStream->eof()) {
                    $chunkContent = $bodyStream->read(1024);

                    if ($chunkContent === '' || $chunkContent === false) {
                        continue;
                    }

                    $buffer .= $chunkContent;

                    while (($newlinePos = strpos($buffer, "\n")) !== false) {
                        $line = substr($buffer, 0, $newlinePos);
                        $buffer = substr($buffer, $newlinePos + 1);

                        $line = trim($line);
                        if ($line === '') {
                            continue;
                        }

                        $data = json_decode($line, true);
                        if (json_last_error() !== JSON_ERROR_NONE) {
                            continue;
                        }

                        if (isset($data['message']['content'])) {
                            $delta = $data['message']['content'];
                            $assistantContent .= $delta;
                            echo $delta;
                            if (function_exists('ob_flush')) {
                                @ob_flush();
                            }
                            flush();
                        }

                        if (($data['done'] ?? false) === true) {
                            break 2; // exit both loops
                        }
                    }
                }

                // Process any remaining buffered data
                $remaining = trim($buffer);
                if ($remaining !== '') {
                    $data = json_decode($remaining, true);
                    if (json_last_error() === JSON_ERROR_NONE && isset($data['message']['content'])) {
                        $delta = $data['message']['content'];
                        $assistantContent .= $delta;
                        echo $delta;
                        if (function_exists('ob_flush')) {
                            @ob_flush();
                        }
                        flush();
                    }
                }

                if ($assistantContent !== '' && $user) {
                    ChatMessage::create([
                        'user_id' => $user->id,
                        'role' => 'assistant',
                        'content' => $assistantContent,
                    ]);
                }
            }, 200, [
                'Content-Type' => 'text/plain; charset=utf-8',
                'Cache-Control' => 'no-cache, no-transform',
                'X-Accel-Buffering' => 'no',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
                'response' => 'An error occurred while communicating with the AI.',
            ], 500);
        }
    }

    public function history(Request $request)
    {
        $user = $request->user();
        
        if (!$user) {
            return response()->json(['messages' => []]);
        }

        $messages = ChatMessage::where('user_id', $user->id)
            ->orderBy('created_at', 'asc')
            ->get(['role', 'content', 'id'])
            ->map(function ($msg) {
                return [
                    'id' => (string) $msg->id,
                    'role' => $msg->role,
                    'content' => $msg->content
                ];
            });

        return response()->json(['messages' => $messages]);
    }
}
