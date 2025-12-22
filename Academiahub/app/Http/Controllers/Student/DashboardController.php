<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Module;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $student = $request->user();

        // Check if old student
        if ($student->is_old_student) {
            // Old students see only completed modules
            $completedModules = $student->enrolledModules()
                ->wherePivot('status', '!=', null)
                ->get(['modules.id', 'modules.title', 'modules.code']);

            return Inertia::render('Student/OldStudent', [
                'completedModules' => $completedModules,
            ]);
        }

        // Current students
        $currentModules = $student->enrolledModules()
            ->wherePivot('status', null)
            ->get(['modules.id', 'modules.title', 'modules.code']);

        $completedModules = $student->enrolledModules()
            ->wherePivot('status', '!=', null)
            ->get(['modules.id', 'modules.title', 'modules.code']);

        $availableModules = Module::where('available', true)
            ->whereNotIn('id', $student->enrolledModules()->pluck('modules.id'))
            ->get(['modules.id', 'modules.title', 'modules.code', 'modules.capacity']);

        return Inertia::render('Student/Dashboard', [
            'currentModules' => $currentModules,
            'completedModules' => $completedModules,
            'availableModules' => $availableModules,
            'canEnroll' => $currentModules->count() < 4,
        ]);
    }

    public function enroll(Request $request, Module $module)
    {
        $student = $request->user();

        // Prevent old students from enrolling
        if ($student->is_old_student) {
            return back()->withErrors(['error' => 'Old students cannot enroll']);
        }

        // Check 4-module limit
        $currentCount = $student->enrolledModules()
            ->wherePivot('status', null)
            ->count();

        if ($currentCount >= 4) {
            return back()->withErrors(['error' => 'Maximum 4 current modules allowed']);
        }

        // Check if already enrolled
        if ($student->enrolledModules()->where('modules.id', $module->id)->exists()) {
            return back()->withErrors(['error' => 'Already enrolled in this module']);
        }

        // Enroll
        $student->enrolledModules()->attach($module->id);

        return back()->with('success', "Enrolled in {$module->title}");
    }
}
