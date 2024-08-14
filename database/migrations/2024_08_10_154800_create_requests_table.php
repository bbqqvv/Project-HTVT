<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('requests', function (Blueprint $table) {
            $table->string('request_id')->unique();
            $table->string('student_id'); // Foreign key to students table
            $table->string('request_type');
            $table->boolean('status')->default(false); // Cập nhật kiểu dữ liệu cột status
            $table->date('submission_date');
            $table->string('approved_by')->nullable();
            $table->json('evidence')->nullable();
            $table->text('student_notes')->nullable(); // Cập nhật thành cột riêng
            $table->text('faculty_notes')->nullable(); // Thêm cột mới cho faculty_notes
            $table->text('exam_department_notes')->nullable(); // Thêm cột mới cho exam_department_notes
            $table->json('selected_courses')->nullable(); // Cột JSON có thể nhận giá trị null
            $table->timestamps();

            // Foreign key constraints
            $table->foreign('student_id')->references('student_id')->on('students')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('requests');
    }
};
