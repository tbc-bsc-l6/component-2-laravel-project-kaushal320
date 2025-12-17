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
        $students = User::where('role', 'student')->with('enrolledModules')->get();
        $modules = Module::all();

        return Inertia::render('Admin/Students/Index', [
            'students' => $students,
            'modules' => $modules,
        ]);
    }

    public function destroy(User $student)
    {
        if ($student->role !== 'student') {
            return redirect()->back()->with('error', 'Invalid student');
        }

        $student->delete();

        return redirect()->back()->with('success', 'Student removed successfully');
    }

    public function removeFromModule(User $student, Module $module)
    {
        if ($student->role !== 'student') {
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

        $user->update(['role' => $validated['role']]);

        return redirect()->back()->with('success', 'User role updated successfully');
    }
}
