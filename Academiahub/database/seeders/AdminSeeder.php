<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Create admin role if it doesn't exist
        $adminRole = DB::table('user_roles')->where('role', 'admin')->first();

        if (!$adminRole) {
            $adminRoleId = DB::table('user_roles')->insertGetId([
                'role' => 'admin',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
            $adminRole = (object)['id' => $adminRoleId];
        }

        // Create admin user
        User::firstOrCreate(
            ['email' => 'admin@academiahub.com'],
            [
                'name' => 'Admin',
                'password' => Hash::make('password'),
                'user_role_id' => $adminRole->id,
            ]
        );
    }
}
