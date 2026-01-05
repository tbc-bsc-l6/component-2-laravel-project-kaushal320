<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use Illuminate\Http\Request;
use App\Http\Controllers\Admin\ModuleController;
use App\Http\Controllers\Admin\TeacherController;
use App\Http\Controllers\Admin\StudentController;
use App\Http\Controllers\Teacher\ModuleController as TeacherModuleController;
use App\Http\Controllers\Student\DashboardController as StudentDashboardController;
use App\Http\Controllers\Auth\GoogleAuthController;
use App\Models\Module;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canRegister' => Features::enabled(Features::registration()),
        'modules' => Module::where('available', true)
            ->with('teachers')
            ->latest()
            ->take(6)
            ->get(),
    ]);
})->name('home');

// Google OAuth routes
Route::get('/auth/google/test', [GoogleAuthController::class, 'testConfig'])->name('auth.google.test');
Route::get('/auth/debug', function () {
    return response()->json([
        'authenticated' => \Illuminate\Support\Facades\Auth::check(),
        'user' => \Illuminate\Support\Facades\Auth::user(),
        'session_id' => session()->getId(),
    ]);
})->name('auth.debug');
Route::get('/auth/google', [GoogleAuthController::class, 'redirectToGoogle'])->name('auth.google');
Route::get('/auth/google/callback', [GoogleAuthController::class, 'handleGoogleCallback'])->name('auth.google.callback');

// Public informational pages
Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

Route::get('/features', function () {
    return Inertia::render('Features');
})->name('features');

// Module detail page
Route::get('/modules/{module}', function (Request $request, Module $module) {
    $user = $request->user();
    $enrolledCount = $module->students()->count();

    $isEnrolled = false;
    if ($user && $user->userRole && $user->userRole->role === 'student') {
        $isEnrolled = $user->enrolledModules()->where('modules.id', $module->id)->exists();
    }

    return Inertia::render('ModuleDetail', [
        'module' => $module->load(['teachers']),
        'enrolledCount' => $enrolledCount,
        'isEnrolled' => $isEnrolled,
        'isAuthenticated' => $user !== null,
    ]);
})->name('modules.show');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function (Request $request) {
        $user = $request->user();

        if ($user && $user->isAdmin()) {
            return Inertia::render('Admin/Dashboard', [
                'modules' => Module::all(),
            ]);
        }

        if ($user && $user->userRole && $user->userRole->role === 'teacher') {
            return redirect()->route('teacher.modules.index');
        }

        if ($user && $user->userRole && $user->userRole->role === 'student') {
            return redirect()->route('student.dashboard');
        }

        return Inertia::render('dashboard');
    })->name('dashboard');
});



Route::middleware(['auth', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', function () {
        return Inertia::render('Admin/Dashboard', [
            'modules' => Module::with('teachers')->get(),
        ]);
    })->name('dashboard');

    // Modules
    Route::get('modules', [ModuleController::class, 'index'])->name('modules.index');
    Route::post('modules', [ModuleController::class, 'store'])->name('modules.store');
    Route::put('modules/{module}', [ModuleController::class, 'update'])->name('modules.update');
    Route::delete('modules/{module}', [ModuleController::class, 'destroy'])->name('modules.destroy');
    Route::post('modules/{module}/toggle', [ModuleController::class, 'toggle'])->name('modules.toggle');

    // Teachers
    Route::get('teachers', [TeacherController::class, 'index'])->name('teachers.index');
    Route::post('teachers', [TeacherController::class, 'store'])->name('teachers.store');
    Route::delete('teachers/{teacher}', [TeacherController::class, 'destroy'])->name('teachers.destroy');
    Route::post('teachers/{teacher}/attach-module', [TeacherController::class, 'attachModule'])->name('teachers.attach-module');
    Route::delete('teachers/{teacher}/modules/{module}', [TeacherController::class, 'detachModule'])->name('teachers.detach-module');

    // Students
    Route::get('students', [StudentController::class, 'index'])->name('students.index');
    Route::delete('students/{student}', [StudentController::class, 'destroy'])->name('students.destroy');
    Route::delete('students/{student}/modules/{module}', [StudentController::class, 'removeFromModule'])->name('students.remove-from-module');
    Route::patch('users/{user}/role', [StudentController::class, 'changeRole'])->name('users.change-role');
});

require __DIR__ . '/settings.php';

// Teacher routes
Route::middleware(['auth', 'role:teacher'])->prefix('teacher')->name('teacher.')->group(function () {
    Route::get('/', [TeacherModuleController::class, 'index'])->name('modules.index');
    Route::patch('modules/{module}/students/{student}/status', [TeacherModuleController::class, 'updateStudentStatus'])->name('modules.students.status');
});

// Student routes
Route::middleware(['auth', 'role:student'])->prefix('student')->name('student.')->group(function () {
    Route::get('/', [StudentDashboardController::class, 'index'])->name('dashboard');
    Route::post('enroll/{module}', [StudentDashboardController::class, 'enroll'])->name('enroll');
});
