<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StudentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Tạo dữ liệu cho bảng students
        $students = [
            [
                'student_id' => '22IT.B239',
                'student_name' => 'Bùi Quốc Văn',
                'faculty_id' => 'KKHMT', // Tương ứng với faculty_id trong bảng faculties
                'major' => 'Công Nghệ Thông Tin',
                'class_name' => 'IT01',
                'phone_number' => '0123456789',
                'email' => 'vanbq.22itb@vku.udn.vn',
                'user_id' => '22IT.B239', // Liên kết với id trong bảng users
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'student_id' => '22IT.B238',
                'student_name' => 'Văn Quốc Bùi',
                'faculty_id' => 'KKHMT',
                'major' => 'Công Nghệ Thông Tin',
                'class_name' => 'IT01',
                'phone_number' => '0987654321',
                'email' => 'luclq.22ce@vku.udn.vn',
                'user_id' => '22IT.B238',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'student_id' => '22IT.B237',
                'student_name' => 'Lê Văn Lực',
                'faculty_id' => 'KTMDT',
                'major' => 'Kinh Tế',
                'class_name' => 'KT01',
                'phone_number' => '0123456789',
                'email' => 'student@vku.udn.vn',
                'user_id' => '22IT.B237',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        foreach ($students as $student) {
            DB::table('students')->insert($student);
        }
    }
}
