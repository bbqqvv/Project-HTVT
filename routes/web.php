<?php

use Illuminate\Support\Facades\Route;
// routes/api.php
use App\Http\Controllers\UserController;
use App\Http\Controllers\SinhVienController;
use App\Http\Controllers\KhoaController;
use App\Http\Controllers\KhaoThiController;


Route::get('/', function () {
    return view('welcome');
});

// Route::middleware('auth')->group(function () {
//     Route::get('/sinhvien/dashboard', [SinhVienController::class, 'index'])->name('sinhvien.dashboard');
//     Route::get('/khoa/dashboard', [KhoaController::class, 'index'])->name('khoa.dashboard');
//     Route::get('/khaothi/dashboard', [KhaoThiController::class, 'index'])->name('khaothi.dashboard');
// });
