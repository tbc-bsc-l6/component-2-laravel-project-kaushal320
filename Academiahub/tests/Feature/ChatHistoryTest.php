<?php

namespace Tests\Feature;

use Tests\TestCase;

class ChatHistoryTest extends TestCase
{
    public function test_guest_sees_empty_chat_history(): void
    {
        $response = $this->get('/chat/history');

        $response->assertStatus(200)
            ->assertJson([
                'messages' => [],
            ]);
    }
}
