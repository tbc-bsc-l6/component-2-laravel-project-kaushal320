<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle($request, Closure $next, $role)
    {
        $user = $request->user();

        // If there's no authenticated user, abort early.
        if (!$user) {
            abort(403);
        }

        // Fast path: if the user's role string matches, allow.
        if (isset($user->role) && $user->role === $role) {
            return $next($request);
        }

        // Otherwise attempt to check via Gate; if Gate isn't available or denies, abort.
        try {
            if (! Gate::forUser($user)->check('has-role', $role)) {
                abort(403);
            }
        } catch (\Throwable $e) {
            // If Gate throws for any reason, fall back to forbidding access.
            abort(403);
        }
        return $next($request);
    }
}
