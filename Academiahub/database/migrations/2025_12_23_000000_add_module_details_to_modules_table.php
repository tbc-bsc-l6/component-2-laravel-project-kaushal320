<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('modules', function (Blueprint $table) {
            $table->string('title')->after('module');
            $table->string('code')->nullable()->after('title');
            $table->integer('capacity')->default(10)->after('code');
            $table->boolean('available')->default(true)->after('capacity');
            $table->foreignId('teacher_id')->nullable()->after('available')->constrained('users')->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('modules', function (Blueprint $table) {
            $table->dropForeign(['teacher_id']);
            $table->dropColumn(['title', 'code', 'capacity', 'available', 'teacher_id']);
        });
    }
};
