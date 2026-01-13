<?php

namespace Tests\Feature\Admin;

use App\Models\Module;
use App\Models\User;
use App\Models\UserRole;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ModuleManagementTest extends TestCase
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

    public function test_admin_can_view_modules_page(): void
    {
        $admin = $this->createAdmin();

        $response = $this->actingAs($admin)->get(route('admin.modules.index'));

        $response->assertStatus(200);
    }

    public function test_non_admin_cannot_access_modules_page(): void
    {
        $student = $this->createStudent();

        $response = $this->actingAs($student)->get(route('admin.modules.index'));

        $response->assertStatus(403);
    }

    public function test_admin_can_create_module(): void
    {
        $admin = $this->createAdmin();

        $response = $this->actingAs($admin)->post(route('admin.modules.store'), [
            'title' => 'Test Module',
            'description' => 'Test Description',
            'code' => 'TST101',
            'capacity' => 10,
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('modules', [
            'title' => 'Test Module',
            'code' => 'TST101',
        ]);
    }

    public function test_admin_can_update_module(): void
    {
        $admin = $this->createAdmin();
        $module = Module::create([
            'module' => 'old-module',
            'title' => 'Old Module',
            'description' => 'Old Description',
            'code' => 'OLD101',
            'capacity' => 10,
            'available' => true,
        ]);

        $response = $this->actingAs($admin)->put(route('admin.modules.update', $module), [
            'title' => 'Updated Module',
            'description' => 'Updated Description',
            'code' => 'UPD101',
            'capacity' => 10,
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('modules', [
            'id' => $module->id,
            'title' => 'Updated Module',
            'code' => 'UPD101',
        ]);
    }

    public function test_admin_can_delete_module(): void
    {
        $admin = $this->createAdmin();
        $module = Module::create([
            'module' => 'test-module',
            'title' => 'Test Module',
            'description' => 'Test Description',
            'code' => 'TST101',
            'capacity' => 10,
            'available' => true,
        ]);

        $response = $this->actingAs($admin)->delete(route('admin.modules.destroy', $module));

        $response->assertRedirect();
        $this->assertDatabaseMissing('modules', [
            'id' => $module->id,
        ]);
    }

    public function test_admin_can_toggle_module_availability(): void
    {
        $admin = $this->createAdmin();
        $module = Module::create([
            'module' => 'test-module',
            'title' => 'Test Module',
            'description' => 'Test Description',
            'code' => 'TST101',
            'capacity' => 10,
            'available' => true,
        ]);

        $response = $this->actingAs($admin)->post(route('admin.modules.toggle', $module));

        $response->assertRedirect();
        $this->assertDatabaseHas('modules', [
            'id' => $module->id,
            'available' => false,
        ]);
    }

    public function test_module_title_is_required(): void
    {
        $admin = $this->createAdmin();

        $response = $this->actingAs($admin)->post(route('admin.modules.store'), [
            'description' => 'Test Description',
            'code' => 'TST101',
            'capacity' => 10,
        ]);

        $response->assertSessionHasErrors('title');
    }

    public function test_module_capacity_is_required(): void
    {
        $admin = $this->createAdmin();

        $response = $this->actingAs($admin)->post(route('admin.modules.store'), [
            'title' => 'Test Module',
            'description' => 'Test Description',
            'code' => 'TST101',
        ]);

        $response->assertSessionHasErrors('capacity');
    }
}
