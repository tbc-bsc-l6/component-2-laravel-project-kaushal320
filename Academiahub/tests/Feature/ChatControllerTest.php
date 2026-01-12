<?php

namespace Tests\Feature;

use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class ChatControllerTest extends TestCase
{
    public function test_chat_requires_message_field(): void
    {
        $response = $this->postJson('/chat', []);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['message']);
    }

    public function test_chat_responds_with_ai_message_when_http_is_faked(): void
    {
        Http::fake([
            'localhost:11434/api/chat' => Http::response([
                'message' => ['content' => 'Hello from test AI'],
            ], 200),
        ]);

        $response = $this->postJson('/chat', ['message' => 'Hi']);

        $response->assertStatus(200)
            ->assertJson([
                'response' => 'Hello from test AI',
            ]);
    }
}
