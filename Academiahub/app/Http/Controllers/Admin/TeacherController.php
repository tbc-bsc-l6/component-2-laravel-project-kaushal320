<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Module;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TeacherController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth', 'role:admin']);
    }

    public function index()
    {
        // Get users with teacher role
        $teacherRoleId = \Illuminate\Support\Facades\DB::table('user_roles')->where('role', 'teacher')->value('id');
        $teachers = User::where('user_role_id', $teacherRoleId)->with('modules')->get();
        $modules = Module::all();

        return Inertia::render('Admin/Teachers/Index', [
            'teachers' => $teachers,
            'modules' => $modules,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:8',
        ]);

        // Get or create teacher role
        $teacherRoleId = \Illuminate\Support\Facades\DB::table('user_roles')->where('role', 'teacher')->value('id');
        if (!$teacherRoleId) {
            $teacherRoleId = \Illuminate\Support\Facades\DB::table('user_roles')->insertGetId([
                'role' => 'teacher',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        $teacher = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password']),
            'user_role_id' => $teacherRoleId,
        ]);

        return redirect()->back()->with('success', 'Teacher created successfully');
    }

    public function destroy(User $teacher)
    {
        if (!$teacher->userRole || $teacher->userRole->role !== 'teacher') {
            return redirect()->back()->with('error', 'Invalid teacher');
        }

        $teacher->delete();

        return redirect()->back()->with('success', 'Teacher removed successfully');
    }

    public function attachModule(Request $request, User $teacher)
    {
        if (!$teacher->userRole || $teacher->userRole->role !== 'teacher') {
            return redirect()->back()->with('error', 'Invalid teacher');
        }

        $validated = $request->validate([
            'module_id' => 'required|exists:modules,id',
        ]);

        $teacher->modules()->attach($validated['module_id']);

        return redirect()->back()->with('success', 'Teacher attached to module successfully');
    }

    public function detachModule(User $teacher, Module $module)
    {
        if (!$teacher->userRole || $teacher->userRole->role !== 'teacher') {
            return redirect()->back()->with('error', 'Invalid teacher');
        }

        $teacher->modules()->detach($module->id);

        return redirect()->back()->with('success', 'Teacher removed from module');
    }
}
