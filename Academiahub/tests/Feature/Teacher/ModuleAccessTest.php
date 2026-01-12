<?php

namespace Tests\Feature\Teacher;

use App\Models\Module;
use App\Models\User;
use App\Models\UserRole;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ModuleAccessTest extends TestCase
{
    use RefreshDatabase;

    private function createTeacher(): User
    {
        $teacherRole = UserRole::firstOrCreate(['role' => 'teacher']);
        return User::factory()->create([
            'user_role_id' => $teacherRole->id,
        ]);
    }

    private function createStudent(): User
    {
        $studentRole = UserRole::firstOrCreate(['role' => 'student']);
        return User::factory()->create([
            'user_role_id' => $studentRole->id,
        ]);
    }

    public function test_teacher_can_access_modules_page(): void
    {
        $teacher = $this->createTeacher();

        $response = $this->actingAs($teacher)->get(route('teacher.modules.index'));

        $response->assertStatus(200);
    }

    public function test_non_teacher_cannot_access_teacher_modules_page(): void
    {
        $student = $this->createStudent();

        $response = $this->actingAs($student)->get(route('teacher.modules.index'));

        $response->assertStatus(403);
    }

    public function test_teacher_sees_only_their_assigned_modules(): void
    {
        $teacher = $this->createTeacher();
        $module1 = Module::create([
            'module' => 'assigned-module',
            'title' => 'Assigned Module',
            'code' => 'ASG101',
            'capacity' => 10,
        ]);
        $module2 = Module::create([
            'module' => 'unassigned-module',
            'title' => 'Unassigned Module',
            'code' => 'UNA101',
            'capacity' => 10,
        ]);
        $teacher->modules()->attach($module1->id);

        $response = $this->actingAs($teacher)->get(route('teacher.modules.index'));

        $response->assertStatus(200);
        $response->assertInertia(
            fn($page) => $page
                ->component('Teacher/Modules/Index')
                ->has('modules', 1)
        );
    }

    public function test_teacher_can_update_student_status(): void
    {
        $teacher = $this->createTeacher();
        $student = $this->createStudent();
        $module = Module::create([
            'module' => 'test-module',
            'title' => 'Test Module',
            'code' => 'TST101',
            'capacity' => 10,
        ]);
        $teacher->modules()->attach($module->id);
        $student->enrolledModules()->attach($module->id);

        $response = $this->actingAs($teacher)->patch(
            route('teacher.modules.students.status', [$module, $student]),
            ['status' => 'pass']
        );

        $response->assertRedirect();
        $this->assertDatabaseHas('module_student', [
            'student_id' => $student->id,
            'module_id' => $module->id,
            'status' => 'pass',
        ]);
    }

    public function test_teacher_can_mark_student_as_failed(): void
    {
        $teacher = $this->createTeacher();
        $student = $this->createStudent();
        $module = Module::create([
            'module' => 'test-module',
            'title' => 'Test Module',
            'code' => 'TST101',
            'capacity' => 10,
        ]);
        $teacher->modules()->attach($module->id);
        $student->enrolledModules()->attach($module->id);

        $response = $this->actingAs($teacher)->patch(
            route('teacher.modules.students.status', [$module, $student]),
            ['status' => 'fail']
        );

        $response->assertRedirect();
        $this->assertDatabaseHas('module_student', [
            'student_id' => $student->id,
            'module_id' => $module->id,
            'status' => 'fail',
        ]);
    }

    public function test_teacher_cannot_update_status_for_unassigned_module(): void
    {
        $teacher = $this->createTeacher();
        $student = $this->createStudent();
        $module = Module::create([
            'module' => 'test-module',
            'title' => 'Test Module',
            'code' => 'TST101',
            'capacity' => 10,
        ]);
        $student->enrolledModules()->attach($module->id);

        $response = $this->actingAs($teacher)->patch(
            route('teacher.modules.students.status', [$module, $student]),
            ['status' => 'pass']
        );

        $response->assertStatus(403);
    }
}
