<?php

namespace App\Actions\Fortify;

use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     */
    public function create(array $input): User
    {
        Validator::make($input, [
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique(User::class),
            ],
            // Restrict self-registration to students only
            // Teachers and admins are created by admin only
            'role' => ['required', 'string', Rule::in(['student'])],
            'password' => $this->passwordRules(),
        ])->validate();

        // Get or create student role
        $studentRoleId = \Illuminate\Support\Facades\DB::table('user_roles')
            ->where('role', 'student')
            ->value('id');

        if (!$studentRoleId) {
            $studentRoleId = \Illuminate\Support\Facades\DB::table('user_roles')->insertGetId([
                'role' => 'student',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        return User::create([
            'name' => $input['name'],
            'email' => $input['email'],
            'password' => $input['password'],
            'user_role_id' => $studentRoleId,
        ]);
    }
}
