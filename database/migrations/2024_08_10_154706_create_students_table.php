<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('students', function (Blueprint $table) {
            $table->string('student_id')->primary(); // Student ID
            $table->string('student_name');
            $table->string('faculty_id'); // Foreign key to faculties table
            $table->string('major');
            $table->string('class_name');
            $table->string('phone_number');
            $table->string('email');
            $table->string('user_id'); // Foreign key to users table
            $table->timestamps();

            // Foreign key constraints
            $table->foreign('faculty_id')->references('faculty_id')->on('faculties')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('students');
    }
};
