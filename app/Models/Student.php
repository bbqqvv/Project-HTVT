<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    // Đặt tên bảng
    protected $table = 'students';

    // Đặt khóa chính
    protected $primaryKey = 'student_id';

    // Tắt tự động quản lý timestamps nếu không sử dụng
    public $incrementing = false; // Đặt thành false vì khóa chính là kiểu chuỗi
    protected $keyType = 'string'; // Đặt kiểu khóa chính là chuỗi
    public $timestamps = true;

    // Các thuộc tính có thể được gán hàng loạt
    protected $fillable = [
        'student_id',
        'student_name',
        'faculty_id',
        'major',
        'class_name',
        'phone_number',
        'email',
        'user_id'
    ];

    // Các thuộc tính kiểu JSON hoặc kiểu dữ liệu đặc biệt
    // Nếu không có thuộc tính kiểu JSON, bạn có thể bỏ qua phần này

    // Mối quan hệ với bảng faculties
    public function faculty()
    {
        return $this->belongsTo(Faculty::class, 'faculty_id', 'faculty_id');
    }

    // Mối quan hệ với bảng users
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
