<?php

// app/Models/User.php
namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\Hash;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory; // Thêm dòng này

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $primaryKey = 'id'; // Xác định cột khóa chính
    public $incrementing = false; // Không tự động tăng
    protected $keyType = 'string'; // Loại của khóa chính là string

    protected $fillable = [
        'id',
        'name',
        'email',
        'password',
        'role'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    // Hàm để tự động mã hóa mật khẩu khi lưu người dùng
    public static function boot()
    {
        parent::boot();

        static::creating(function ($user) {
            if ($user->isDirty('password')) {

                $user->password = Hash::make($user->password);
            }
        });
    }
}
