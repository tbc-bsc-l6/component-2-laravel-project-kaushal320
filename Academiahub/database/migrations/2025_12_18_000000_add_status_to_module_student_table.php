<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('module_student', function (Blueprint $table) {
            $table->enum('status', ['pass', 'fail'])->nullable()->after('student_id');
            $table->timestamp('completed_at')->nullable()->after('status');
        });
    }

    public function down(): void
    {
        Schema::table('module_student', function (Blueprint $table) {
            $table->dropColumn(['status', 'completed_at']);
        });
    }
};
