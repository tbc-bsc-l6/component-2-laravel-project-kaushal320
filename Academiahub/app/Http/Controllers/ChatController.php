<?php

namespace App\Http\Controllers;

use App\Models\ChatMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ChatController extends Controller
{
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
            // Updated system prompt with accurate Academiahub information
            $systemPrompt = "You are a helpful AI assistant for Academiahub, an educational platform for managing modules and tracking student progress. 

Key features of Academiahub:
- **Module Management**: Browse and enroll in available modules/courses
- **Student Enrollment**: Students can enroll in modules and track their progress
- **Teacher Assignment**: Admins assign teachers to modules; teachers manage student progress
- **Progress Tracking**: Students have statuses (Pending, In Progress, Completed, Certified)
- **User Roles**: Three roles - Admin, Teacher, and Student

IMPORTANT: Only mention these features. Do NOT suggest features that don't exist (like blogs, webinars, resources library, or community forums).

When answering:
- Be concise and friendly
- Focus on actual platform capabilities
- Guide users to sign up, view modules, or enroll
- Keep responses brief (2-4 points maximum)";

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
