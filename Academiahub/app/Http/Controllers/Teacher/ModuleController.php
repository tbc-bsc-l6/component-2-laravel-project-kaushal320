<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\Module;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Carbon;

class ModuleController extends Controller
{
    public function index(Request $request)
    {
        $teacher = $request->user();

        $modules = $teacher->modules()
            ->with(['students' => function ($q) {
                $q->select('users.id', 'users.name', 'users.email');
            }])
            ->get(['modules.id', 'modules.title', 'modules.code', 'modules.available']);

        return Inertia::render('Teacher/Modules/Index', [
            'modules' => $modules,
        ]);
    }

    public function updateStudentStatus(Request $request, Module $module, User $student)
    {
        $request->validate([
            'status' => 'required|in:pass,fail',
        ]);

        $teacher = $request->user();
        // Authorize: ensure this teacher is assigned to the module
        $isAssigned = $teacher->modules()->where('modules.id', $module->id)->exists();
        abort_unless($isAssigned, 403);

        // Ensure the student is enrolled in the module
        $isEnrolled = $module->students()->where('users.id', $student->id)->exists();
        abort_unless($isEnrolled, 404);

        $module->students()->updateExistingPivot($student->id, [
            'status' => $request->string('status'),
            'completed_at' => now(),
        ]);

        return back()->with('success', 'Status updated');
    }
}
