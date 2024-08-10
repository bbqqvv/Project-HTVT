<?php

use App\Http\Controllers\SinhVienController;
use App\Http\Controllers\KhaoThiController;
use App\Http\Controllers\KhoaController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;


Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [UserController::class, 'currentUser']);

    // Phân quyền cho Sinh Viên
    Route::middleware('role:student')->group(function () {
        Route::get('/sinhvien/dashboard', [SinhVienController::class, 'index']);
    });

    // Phân quyền cho Khoa
    Route::middleware('role:faculty')->group(function () {
        Route::get('/khoa/dashboard', [KhoaController::class, 'index']);
    });

    // Phân quyền cho Phòng Khảo thí
    Route::middleware('role:examDept')->group(function () {
        Route::get('/khaothi/dashboard', [KhaoThiController::class, 'index']);
    });
});




// Route::get('/user/{id}', [UserController::class, 'show']);
