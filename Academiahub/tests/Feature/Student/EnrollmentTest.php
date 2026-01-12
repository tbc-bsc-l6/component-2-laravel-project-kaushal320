<?php

namespace Tests\Feature\Student;

use App\Models\Module;
use App\Models\User;
use App\Models\UserRole;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class EnrollmentTest extends TestCase
{
    use RefreshDatabase;

    private function createStudent(): User
    {
        $studentRole = UserRole::firstOrCreate(['role' => 'student']);
        return User::factory()->create([
            'user_role_id' => $studentRole->id,
        ]);
    }

    private function createTeacher(): User
    {
        $teacherRole = UserRole::firstOrCreate(['role' => 'teacher']);
        return User::factory()->create([
            'user_role_id' => $teacherRole->id,
        ]);
    }

    public function test_student_can_access_dashboard(): void
    {
        $student = $this->createStudent();

        $response = $this->actingAs($student)->get(route('student.dashboard'));

        $response->assertStatus(200);
    }

    public function test_non_student_cannot_access_student_dashboard(): void
    {
        $teacher = $this->createTeacher();

        $response = $this->actingAs($teacher)->get(route('student.dashboard'));

        $response->assertStatus(403);
    }

    public function test_student_can_enroll_in_available_module(): void
    {
        $student = $this->createStudent();
        $module = Module::create([
            'module' => 'test-module',
            'title' => 'Test Module',
            'code' => 'TST101',
            'capacity' => 10,
            'available' => true,
        ]);

        $response = $this->actingAs($student)->post(route('student.enroll', $module));

        $response->assertRedirect();
        $this->assertDatabaseHas('module_student', [
            'student_id' => $student->id,
            'module_id' => $module->id,
        ]);
    }

    public function test_student_cannot_enroll_in_unavailable_module(): void
    {
        $student = $this->createStudent();
        $module = Module::create([
            'module' => 'test-module',
            'title' => 'Test Module',
            'code' => 'TST101',
            'capacity' => 10,
            'available' => false,
        ]);

        $response = $this->actingAs($student)->post(route('student.enroll', $module));

        $response->assertSessionHasErrors();
        $this->assertDatabaseMissing('module_student', [
            'student_id' => $student->id,
            'module_id' => $module->id,
        ]);
    }

    public function test_student_cannot_enroll_in_same_module_twice(): void
    {
        $student = $this->createStudent();
        $module = Module::create([
            'module' => 'test-module',
            'title' => 'Test Module',
            'code' => 'TST101',
            'capacity' => 10,
            'available' => true,
        ]);
        $student->enrolledModules()->attach($module->id);

        $response = $this->actingAs($student)->post(route('student.enroll', $module));

        $response->assertSessionHasErrors();
    }

    public function test_student_dashboard_shows_enrolled_modules(): void
    {
        $student = $this->createStudent();
        $module = Module::create([
            'module' => 'test-module',
            'title' => 'Test Module',
            'code' => 'TST101',
            'capacity' => 10,
            'available' => true,
        ]);
        $student->enrolledModules()->attach($module->id);

        $response = $this->actingAs($student)->get(route('student.dashboard'));

        $response->assertStatus(200);
        $response->assertInertia(
            fn($page) => $page
                ->component('Student/Dashboard')
                ->has('currentModules', 1)
        );
    }

    public function test_student_sees_module_enrollment_status(): void
    {
        $student = $this->createStudent();
        $module = Module::create([
            'module' => 'test-module',
            'title' => 'Test Module',
            'code' => 'TST101',
            'capacity' => 10,
            'available' => true,
        ]);
        $student->enrolledModules()->attach($module->id, ['status' => 'pass']);

        $response = $this->actingAs($student)->get(route('student.dashboard'));

        $response->assertStatus(200);
        $response->assertInertia(
            fn($page) => $page
                ->component('Student/Dashboard')
                ->has('completedModules', 1)
        );
    }

    public function test_unenrolled_student_can_view_available_modules(): void
    {
        $student = $this->createStudent();
        Module::create([
            'module' => 'available-module',
            'title' => 'Available Module',
            'code' => 'AVL101',
            'capacity' => 10,
            'available' => true,
        ]);
        Module::create([
            'module' => 'unavailable-module',
            'title' => 'Unavailable Module',
            'code' => 'UNA101',
            'capacity' => 10,
            'available' => false,
        ]);

        $response = $this->actingAs($student)->get(route('student.dashboard'));

        $response->assertStatus(200);
        $response->assertInertia(
            fn($page) => $page
                ->component('Student/Dashboard')
                ->has('availableModules', 1)
        );
    }
}
