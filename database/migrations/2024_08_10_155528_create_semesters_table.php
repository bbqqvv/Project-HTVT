<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('semesters', function (Blueprint $table) {
            $table->string('semester_id')->primary(); 
            $table->string('name');     // Tên kỳ học, ví dụ: "Học kỳ 1"
            $table->string('academic_year'); // Năm học, ví dụ: "2023 - 2024"
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('semesters');
    }
};
