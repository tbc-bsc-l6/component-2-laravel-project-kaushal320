<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Module extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'code',
        'description',
        'capacity',
        'available',
        'teacher_id',
    ];

    public function teacher()
    {
        return $this->belongsTo(User::class, 'teacher_id');
    }

    public function teachers()
    {
        return $this->belongsToMany(User::class, 'module_teacher', 'module_id', 'teacher_id');
    }

    public function students()
    {
        return $this->belongsToMany(User::class, 'module_student', 'module_id', 'student_id')
            ->withPivot(['status', 'completed_at'])
            ->withTimestamps();
    }
}
