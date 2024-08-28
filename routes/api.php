<?php

use App\Http\Controllers\SinhVienController;
use App\Http\Controllers\KhaoThiController;
use App\Http\Controllers\KhoaController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\RequestController;
use App\Http\Controllers\StudentCourseController;
use App\Http\Controllers\StudentController;


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




Route::get('/student_courses/{student_id}', [StudentCourseController::class, 'index']);
Route::post('/student_courses', [StudentCourseController::class, 'store']);
Route::delete('/student_courses/{student_id}/{course_id}', [StudentCourseController::class, 'destroy']);

// Route::get('courses/{id}', [CourseController::class, 'show']);
// Route::post('courses', [CourseController::class, 'store']);
// Route::put('courses/{id}', [CourseController::class, 'update']);
// Route::delete('courses/{id}', [CourseController::class, 'destroy']);
Route::post('/courses', [CourseController::class, 'getCoursesByIds']);


Route::apiResource('students', StudentController::class);
