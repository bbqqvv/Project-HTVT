<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('courses', function (Blueprint $table) {
            $table->string('course_id')->primary(); // Khóa chính, sử dụng chuỗi
            $table->string('course_name'); // Tên môn học
            $table->string('instructor'); // Giảng viên
            $table->integer('credits'); // Số tín chỉ
            $table->string('exam_format'); // Hình thức thi
            $table->date('exam_date'); // Ngày thi
            $table->time('exam_time'); // Giờ thi
            $table->string('exam_room'); // Phòng thi
            $table->string('semester_id'); // Khóa ngoại liên kết với bảng semesters
            $table->timestamps();

            // Khóa ngoại       

            $table->foreign('semester_id')->references('semester_id')->on('semesters')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('courses');
    }
};
