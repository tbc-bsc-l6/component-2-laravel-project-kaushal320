<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, TwoFactorAuthenticatable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'user_role_id',
        'is_old_student',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
        ];
    }

    // Relationships
    public function userRole()
    {
        return $this->belongsTo(UserRole::class, 'user_role_id');
    }

    public function modules()
    {
        return $this->belongsToMany(Module::class, 'module_teacher', 'teacher_id', 'module_id');
    }

    public function enrolledModules()
    {
        return $this->belongsToMany(Module::class, 'module_student', 'student_id', 'module_id')
            ->withPivot(['status', 'completed_at'])
            ->withTimestamps();
    }

    // Helper method to check if user is admin
    public function isAdmin()
    {
        return $this->userRole && $this->userRole->role === 'admin';
    }
}
