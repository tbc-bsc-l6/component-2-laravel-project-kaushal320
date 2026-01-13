<?php

namespace Tests\Unit;

use App\Models\User;
use App\Models\UserRole;
use Tests\TestCase;

class UserModelTest extends TestCase
{
    public function test_is_admin_returns_true_when_user_role_is_admin(): void
    {
        $user = new User(['name' => 'Admin User']);
        $role = new UserRole(['role' => 'admin']);
        $user->setRelation('userRole', $role);

        $this->assertTrue($user->isAdmin());
    }

    public function test_is_admin_returns_false_when_user_role_is_not_admin(): void
    {
        $user = new User(['name' => 'Student User']);
        $role = new UserRole(['role' => 'student']);
        $user->setRelation('userRole', $role);

        $this->assertFalse($user->isAdmin());
    }

    public function test_is_admin_returns_false_when_no_role_attached(): void
    {
        $user = new User(['name' => 'No Role User']);

        $this->assertFalse($user->isAdmin());
    }
}
