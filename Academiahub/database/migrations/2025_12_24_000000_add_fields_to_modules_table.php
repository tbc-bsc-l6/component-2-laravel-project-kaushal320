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
        // Add description if it doesn't exist (2025_12_23 adds other fields)
        if (!Schema::hasColumn('modules', 'description')) {
            Schema::table('modules', function (Blueprint $table) {
                $table->text('description')->nullable()->after('code');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('modules', function (Blueprint $table) {
            if (Schema::hasColumn('modules', 'description')) {
                $table->dropColumn('description');
            }
        });
    }
};
