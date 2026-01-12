<?php

namespace Tests\Feature\Admin;

use App\Models\Module;
use App\Models\User;
use App\Models\UserRole;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TeacherManagementTest extends TestCase
{
    use RefreshDatabase;

    private function createAdmin(): User
    {
        $adminRole = UserRole::firstOrCreate(['role' => 'admin']);
        return User::factory()->create([
            'user_role_id' => $adminRole->id,
        ]);
    }

    private function createTeacher(): User
    {
        $teacherRole = UserRole::firstOrCreate(['role' => 'teacher']);
        return User::factory()->create([
            'user_role_id' => $teacherRole->id,
        ]);
    }

    public function test_admin_can_view_teachers_page(): void
    {
        $admin = $this->createAdmin();

        $response = $this->actingAs($admin)->get(route('admin.teachers.index'));

        $response->assertStatus(200);
    }

    public function test_admin_can_create_teacher(): void
    {
        $admin = $this->createAdmin();

        $response = $this->actingAs($admin)->post(route('admin.teachers.store'), [
            'name' => 'Test Teacher',
            'email' => 'teacher@test.com',
            'password' => 'password123',
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('users', [
            'email' => 'teacher@test.com',
        ]);
    }

    public function test_admin_can_delete_teacher(): void
    {
        $admin = $this->createAdmin();
        $teacher = $this->createTeacher();

        $response = $this->actingAs($admin)->delete(route('admin.teachers.destroy', $teacher));

        $response->assertRedirect();
        $this->assertDatabaseMissing('users', [
            'id' => $teacher->id,
        ]);
    }

    public function test_admin_can_attach_module_to_teacher(): void
    {
        $admin = $this->createAdmin();
        $teacher = $this->createTeacher();
        $module = Module::create([
            'module' => 'test-module',
            'title' => 'Test Module',
            'description' => 'Test Description',
            'code' => 'TST101',
            'capacity' => 10,
            'available' => true,
        ]);

        $response = $this->actingAs($admin)->post(route('admin.teachers.attach-module', $teacher), [
            'module_id' => $module->id,
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('module_teacher', [
            'teacher_id' => $teacher->id,
            'module_id' => $module->id,
        ]);
    }

    public function test_admin_can_detach_module_from_teacher(): void
    {
        $admin = $this->createAdmin();
        $teacher = $this->createTeacher();
        $module = Module::create([
            'module' => 'test-module',
            'title' => 'Test Module',
            'description' => 'Test Description',
            'code' => 'TST101',
            'capacity' => 10,
            'available' => true,
        ]);
        $teacher->modules()->attach($module->id);

        $response = $this->actingAs($admin)->delete(route('admin.teachers.detach-module', [$teacher, $module]));

        $response->assertRedirect();
        $this->assertDatabaseMissing('module_teacher', [
            'teacher_id' => $teacher->id,
            'module_id' => $module->id,
        ]);
    }

    public function test_teacher_email_must_be_unique(): void
    {
        $admin = $this->createAdmin();
        $existingTeacher = $this->createTeacher();

        $response = $this->actingAs($admin)->post(route('admin.teachers.store'), [
            'name' => 'Another Teacher',
            'email' => $existingTeacher->email,
            'password' => 'password123',
        ]);

        $response->assertSessionHasErrors('email');
    }
}
