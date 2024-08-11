<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    // Đặt tên bảng
    protected $table = 'courses';

    // Đặt khóa chính
    protected $primaryKey = 'course_id'; // Khóa chính là course_id

    public $incrementing = false; // Đặt thành false vì khóa chính là chuỗi
    protected $keyType = 'string'; // Đặt kiểu khóa chính là chuỗi

    // Tắt tự động quản lý timestamps nếu không sử dụng
    public $timestamps = true; // Nếu có cột timestamps

    // Các thuộc tính có thể được gán hàng loạt
    protected $fillable = [
        'course_id',
        'course_name',
        'instructor',
        'credit_hours',
        'exam_format',
        'exam_date',
        'exam_time',
        'exam_room',
        'semester_id'
    ];

    // Mối quan hệ với bảng semesters
    public function semester()
    {
        return $this->belongsTo(Semester::class, 'semester_id', 'semester_id');
    }
}
