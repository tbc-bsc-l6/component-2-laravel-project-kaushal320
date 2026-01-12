<?php

namespace Tests\Feature;

use App\Models\Module;
use App\Models\User;
use App\Models\UserRole;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ModuleTest extends TestCase
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

    public function test_guest_can_view_module_detail(): void
    {
        $module = Module::create([
            'module' => 'test-module',
            'title' => 'Test Module',
            'description' => 'Test Description',
            'code' => 'TST101',
            'capacity' => 10,
            'available' => true,
        ]);

        $response = $this->get(route('modules.show', $module));

        $response->assertStatus(200);
    }

    public function test_module_shows_enrolled_student_count(): void
    {
        $module = Module::create([
            'module' => 'test-module',
            'title' => 'Test Module',
            'description' => 'Test Description',
            'code' => 'TST101',
            'capacity' => 10,
            'available' => true,
        ]);
        $student1 = $this->createStudent();
        $student2 = $this->createStudent();
        $module->students()->attach([$student1->id, $student2->id]);

        $response = $this->get(route('modules.show', $module));

        $response->assertStatus(200);
        $response->assertInertia(
            fn($page) => $page
                ->component('ModuleDetail')
                ->where('enrolledCount', 2)
        );
    }

    public function test_authenticated_student_sees_enrollment_status(): void
    {
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

        $response = $this->actingAs($student)->get(route('modules.show', $module));

        $response->assertStatus(200);
        $response->assertInertia(
            fn($page) => $page
                ->component('ModuleDetail')
                ->where('isEnrolled', true)
        );
    }

    public function test_module_relationships_load_correctly(): void
    {
        $module = Module::create([
            'module' => 'test-module',
            'title' => 'Test Module',
            'description' => 'Test Description',
            'code' => 'TST101',
            'capacity' => 10,
            'available' => true,
        ]);
        $teacher = $this->createTeacher();
        $student = $this->createStudent();
        $module->teachers()->attach($teacher->id);
        $module->students()->attach($student->id);

        $loadedModule = Module::with(['teachers', 'students'])->find($module->id);

        $this->assertEquals(1, $loadedModule->teachers->count());
        $this->assertEquals(1, $loadedModule->students->count());
    }

    public function test_only_available_modules_show_on_homepage(): void
    {
        Module::create([
            'module' => 'available-module',
            'title' => 'Available Module',
            'description' => 'Test Description',
            'code' => 'AVL101',
            'capacity' => 10,
            'available' => true,
        ]);
        Module::create([
            'module' => 'unavailable-module',
            'title' => 'Unavailable Module',
            'description' => 'Test Description',
            'code' => 'UNA101',
            'capacity' => 10,
            'available' => false,
        ]);

        $response = $this->get(route('home'));

        $response->assertStatus(200);
        $response->assertInertia(
            fn($page) => $page
                ->has('modules', 1)
                ->where('modules.0.title', 'Available Module')
        );
    }
}
