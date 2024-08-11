<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('student_courses', function (Blueprint $table) {
            $table->string('student_id'); // Khóa ngoại liên kết với bảng students
            $table->string('course_id'); // Khóa ngoại liên kết với bảng courses
            $table->primary(['student_id', 'course_id']); // Khóa chính kết hợp để đảm bảo không có bản ghi trùng lặp

            // Khóa ngoại
            $table->foreign('student_id')->references('student_id')->on('students')->onDelete('cascade');
            $table->foreign('course_id')->references('course_id')->on('courses')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('student_courses');
    }
};
