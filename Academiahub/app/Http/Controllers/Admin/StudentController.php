<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Module;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth', 'role:admin']);
    }

    public function index()
    {
        // Get users with student role
        $studentRoleId = \Illuminate\Support\Facades\DB::table('user_roles')->where('role', 'student')->value('id');
        $students = User::where('user_role_id', $studentRoleId)->with('enrolledModules')->get();
        $modules = Module::all();

        return Inertia::render('Admin/Students/Index', [
            'students' => $students,
            'modules' => $modules,
        ]);
    }

    public function destroy(User $student)
    {
        if (!$student->userRole || $student->userRole->role !== 'student') {
            return redirect()->back()->with('error', 'Invalid student');
        }

        $student->delete();

        return redirect()->back()->with('success', 'Student removed successfully');
    }

    public function removeFromModule(User $student, Module $module)
    {
        if (!$student->userRole || $student->userRole->role !== 'student') {
            return redirect()->back()->with('error', 'Invalid student');
        }

        $student->enrolledModules()->detach($module->id);

        return redirect()->back()->with('success', 'Student removed from module');
    }

    public function changeRole(Request $request, User $user)
    {
        $validated = $request->validate([
            'role' => 'required|in:admin,teacher,student',
        ]);

        // Prevent changing your own role away from admin
        if ($request->user()->id === $user->id && $validated['role'] !== 'admin') {
            return redirect()->back()->with('error', 'Cannot change your own role');
        }

        // Get the role ID from user_roles table
        $roleId = \Illuminate\Support\Facades\DB::table('user_roles')->where('role', $validated['role'])->value('id');
        if (!$roleId) {
            // Create role if it doesn't exist
            $roleId = \Illuminate\Support\Facades\DB::table('user_roles')->insertGetId([
                'role' => $validated['role'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
        $user->update(['user_role_id' => $roleId]);

        return redirect()->back()->with('success', 'User role updated successfully');
    }
}
