<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use App\Models\User;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // 'App\\Models\\Model' => 'App\\Policies\\ModelPolicy',
    ];

    public function boot()
    {
        $this->registerPolicies();

        // Gate to check a specific role
        Gate::define('has-role', fn(User $user, string $role) => $user->role === $role);

        // Convenience gate for admin (optional, but handy)
        Gate::define('access-admin', fn(User $user) => $user->role === 'admin');

        // Optional: allow a super-admin to bypass checks
        Gate::before(function (User $user, $ability) {
            return $user->role === 'super-admin' ? true : null;
        });
    }
}
