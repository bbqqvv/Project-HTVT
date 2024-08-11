<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Semester extends Model
{
    use HasFactory;

    // Đặt tên bảng
    protected $table = 'semesters';

    // Đặt khóa chính
    protected $primaryKey = 'semester_id'; // Khóa chính là semester_id

    // Tự động tăng cho khóa chính, không cần thiết đặt vì mặc định là true
    public $incrementing = true; // Khóa chính tự động tăng

    // Tắt tự động quản lý timestamps nếu không sử dụng
    public $timestamps = true; // Nếu có cột timestamps

    // Các thuộc tính có thể được gán hàng loạt
    protected $fillable = [
        'semester_id',
        'name',
        'academic_year',
    ];

    // Mối quan hệ với bảng courses
    public function courses()
    {
        return $this->hasMany(Course::class, 'semester_id', 'semester_id');
    }
}
