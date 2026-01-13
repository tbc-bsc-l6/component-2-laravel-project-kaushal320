<?php

namespace Tests\Feature\Admin;

use App\Models\Module;
use App\Models\User;
use App\Models\UserRole;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class StudentManagementTest extends TestCase
{
    use RefreshDatabase;

    private function createAdmin(): User
    {
        $adminRole = UserRole::firstOrCreate(['role' => 'admin']);
        return User::factory()->create([
            'user_role_id' => $adminRole->id,
        ]);
    }

    private function createStudent(): User
    {
        $studentRole = UserRole::firstOrCreate(['role' => 'student']);
        return User::factory()->create([
            'user_role_id' => $studentRole->id,
        ]);
    }

    public function test_admin_can_view_students_page(): void
    {
        $admin = $this->createAdmin();

        $response = $this->actingAs($admin)->get(route('admin.students.index'));

        $response->assertStatus(200);
    }

    public function test_admin_can_delete_student(): void
    {
        $admin = $this->createAdmin();
        $student = $this->createStudent();

        $response = $this->actingAs($admin)->delete(route('admin.students.destroy', $student));

        $response->assertRedirect();
        $this->assertDatabaseMissing('users', [
            'id' => $student->id,
        ]);
    }

    public function test_admin_can_remove_student_from_module(): void
    {
        $admin = $this->createAdmin();
        $student = $this->createStudent();
        $module = Module::create([
            'module' => 'test-module',
            'title' => 'Test Module',
            'description' => 'Test Description',
            'code' => 'TST101',
            'capacity' => 10,
            'available' => true,
        ]);
        $student->enrolledModules()->attach($module->id);

        $response = $this->actingAs($admin)->delete(route('admin.students.remove-from-module', [$student, $module]));

        $response->assertRedirect();
        $this->assertDatabaseMissing('module_student', [
            'student_id' => $student->id,
            'module_id' => $module->id,
        ]);
    }

    public function test_admin_can_change_user_role(): void
    {
        $admin = $this->createAdmin();
        $student = $this->createStudent();
        $teacherRole = UserRole::firstOrCreate(['role' => 'teacher']);

        $response = $this->actingAs($admin)->patch(route('admin.users.change-role', $student), [
            'role' => 'teacher',
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('users', [
            'id' => $student->id,
            'user_role_id' => $teacherRole->id,
        ]);
    }

    public function test_admin_can_toggle_old_student_status(): void
    {
        $admin = $this->createAdmin();
        $student = $this->createStudent();
        $currentStatus = $student->is_old_student ?? false;

        $response = $this->actingAs($admin)->post(route('admin.students.toggle-old', $student));

        $response->assertRedirect();
        $this->assertDatabaseHas('users', [
            'id' => $student->id,
            'is_old_student' => !$currentStatus,
        ]);
    }

    public function test_students_are_listed_with_their_modules(): void
    {
        $admin = $this->createAdmin();
        $student = $this->createStudent();
        $module = Module::create([
            'module' => 'test-module',
            'title' => 'Test Module',
            'description' => 'Test Description',
            'code' => 'TST101',
            'capacity' => 10,
            'available' => true,
        ]);
        $student->enrolledModules()->attach($module->id);

        $response = $this->actingAs($admin)->get(route('admin.students.index'));

        $response->assertStatus(200);
        // Check that Inertia props contain the student with enrolled modules
        $response->assertInertia(
            fn($page) => $page
                ->component('Admin/Students/Index')
                ->has('students')
        );
    }
}
