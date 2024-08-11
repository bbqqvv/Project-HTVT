<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentCourse extends Model
{
    use HasFactory;

    // Đặt tên bảng
    protected $table = 'student_courses';

    // Đặt khóa chính
    protected $primaryKey = ['student_id', 'course_id']; // Khóa chính kết hợp

    public $incrementing = false; // Đặt thành false vì khóa chính là một mảng
    protected $keyType = 'string'; // Đặt kiểu khóa chính là chuỗi

    // Tắt tự động quản lý timestamps nếu không sử dụng
    public $timestamps = false; // Nếu không có cột timestamps

    // Các thuộc tính có thể được gán hàng loạt
    protected $fillable = [
        'student_id',
        'course_id'
    ];

    // Mối quan hệ với bảng students
    public function student()
    {
        return $this->belongsTo(Student::class, 'student_id', 'student_id');
    }

    // Mối quan hệ với bảng courses
    public function course()
    {
        return $this->belongsTo(Course::class, 'course_id', 'course_id');
    }
}
