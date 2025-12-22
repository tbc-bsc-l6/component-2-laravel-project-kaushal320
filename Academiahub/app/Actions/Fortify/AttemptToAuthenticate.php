<?php

namespace App\Actions\Fortify;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Laravel\Fortify\Fortify;

class AttemptToAuthenticate
{
    /**
     * Handle authentication attempt.
     */
    public function authenticate($request)
    {
        $username = Fortify::username();

        $this->validate($request);

        // Get the user
        $user = $this->getUser($request);

        if (
            !$user ||
            !Hash::check($request->password, $user->password)
        ) {
            throw ValidationException::withMessages([
                $username => __('auth.failed'),
            ]);
        }

        // Validate the role if provided
        if ($request->has('role')) {
            $selectedRole = $request->input('role');
            if ($user->role !== $selectedRole) {
                throw ValidationException::withMessages([
                    'role' => __('The selected role does not match your account role.'),
                ]);
            }
        }

        return $user;
    }

    /**
     * Validate the request inputs.
     */
    protected function validate($request)
    {
        $username = Fortify::username();

        $request->validate([
            $username => 'required|string|email',
            'password' => 'required|string',
            'role' => 'sometimes|string|in:teacher,student,admin',
        ]);
    }

    /**
     * Get the user from the request.
     */
    protected function getUser($request)
    {
        $username = Fortify::username();

        return User::where($username, $request->{$username})->first();
    }
}
