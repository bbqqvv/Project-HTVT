<?php

use App\Http\Controllers\SinhVienController;
use App\Http\Controllers\KhaoThiController;
use App\Http\Controllers\KhoaController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\RequestController;


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
Route::get('/courses', [CourseController::class, 'index']);
Route::get('requests', [RequestController::class, 'index']);
Route::get('requests/{id}', [RequestController::class, 'show']);
Route::post('requests', [RequestController::class, 'store']);
Route::put('requests/{id}', [RequestController::class, 'update']);
Route::delete('requests/{id}', [RequestController::class, 'destroy']);
