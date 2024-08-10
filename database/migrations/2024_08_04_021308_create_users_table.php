<?php

// database/migrations/xxxx_xx_xx_create_users_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->string('id')->primary(); // Sử dụng kiểu string cho khóa chính
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');
            $table->string('role'); // Vai trò người dùng
            $table->timestamps(); // Tạo các cột created_at và updated_at
        });
    }

    public function down()
    {
        Schema::dropIfExists('users');
    }
};
