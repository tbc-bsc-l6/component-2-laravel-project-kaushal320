<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Module;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ModuleController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth', 'role:admin']);
    }

    public function index()
    {
        $modules = Module::orderBy('created_at', 'desc')->get();
        return Inertia::render('Admin/Modules/Index', [
            'modules' => $modules,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'code' => ['nullable', 'string', 'max:50'],
            'capacity' => ['required', 'integer', 'min:1'],
        ]);

        Module::create($data + ['available' => true]);

        return redirect()->back()->with('success', 'Module created');
    }

    public function update(Request $request, Module $module)
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'code' => ['nullable', 'string', 'max:50'],
            'capacity' => ['required', 'integer', 'min:1'],
        ]);

        $module->update($data);

        return redirect()->back()->with('success', 'Module updated');
    }

    public function destroy(Module $module)
    {
        $module->delete();
        return redirect()->back()->with('success', 'Module removed');
    }

    public function toggle(Module $module)
    {
        $module->available = ! $module->available;
        $module->save();
        return redirect()->back()->with('success', 'Module availability toggled');
    }
}
