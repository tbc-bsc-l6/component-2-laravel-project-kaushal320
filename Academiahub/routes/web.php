<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use Illuminate\Http\Request;
use App\Http\Controllers\Admin\ModuleController;
use App\Http\Controllers\Admin\TeacherController;
use App\Http\Controllers\Admin\StudentController;
use App\Models\Module;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function (Request $request) {
        $user = $request->user();

        if ($user && isset($user->role) && $user->role === 'admin') {
            return Inertia::render('Admin/Dashboard', [
                'modules' => Module::all(),
            ]);
        }

        return Inertia::render('dashboard');
    })->name('dashboard');
});



Route::middleware(['auth', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', function () {
        return Inertia::render('Admin/Dashboard', [
            'modules' => Module::all(),
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
