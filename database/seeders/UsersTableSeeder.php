<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Tạo tài khoản cho Khoa
        DB::table('users')->insert([
            'id' => 'KKHMT',

            'name' => 'Khoa Khoa Học Máy Tính',
            'email' => 'khoakhmt@vku.udn.vn',
            'password' => Hash::make('password'),
            'role' => 'faculty',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Tạo tài khoản cho Khoa Thương Mại Điện Tử
        DB::table('users')->insert([
            'id' => 'KTMDT',

            'name' => 'Khoa Thương Mại Điện Tử',
            'email' => 'khoatmdt@vku.udn.vn',
            'password' => Hash::make('password'),
            'role' => 'faculty',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Tạo tài khoản cho Phòng Khảo Thí
        DB::table('users')->insert([
            'id' => 'PKT',
            'name' => 'Phòng Khảo Thí',
            'email' => 'examdept@example.com',
            'password' => Hash::make('password'),
            'role' => 'examDept',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Tạo tài khoản cho Sinh viên
        $students = [
            ['id' => '22IT.B239', 'name' => 'Bùi Quốc Văn', 'email' => 'vanbq.22itb@vku.udn.vn', 'password' => Hash::make('password'), 'role' => 'student'],
            ['id' => '22IT.B238', 'name' => 'Văn Quốc Bùi', 'email' => 'luclq.22ce@vku.udn.vn', 'password' => Hash::make('password'), 'role' => 'student'],
            ['id' => '22IT.B237', 'name' => 'Lê Văn Lực', 'email' => 'student@vku.udn.vn', 'password' => Hash::make('password'), 'role' => 'student'],
        ];

        foreach ($students as $student) {
            DB::table('users')->insert([
                'id' => $student['id'],
                'name' => $student['name'],
                'email' => $student['email'],
                'password' => $student['password'],
                'role' => $student['role'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
