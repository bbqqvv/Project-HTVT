<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class RequestSeeder extends Seeder
{
    public function run()
    {
        // Dữ liệu mẫu cho bảng requests
        $requests = [
            [
                'request_id' => Str::uuid()->toString(), // UUID làm request_id
                'student_id' => '22IT.B239', // Sử dụng một student_id hợp lệ từ bảng students
                'request_type' => 'Hoãn thi',
                'status' => true,
                'submission_date' => now(),
                'evidence' => json_encode([
                    'path/to/evidence1.jpg',
                    'path/to/evidence2.png'
                ]),
                'notes' => 'Request for postponement due to health issues.',
                'approved_by' => "KHMT",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'request_id' => Str::uuid()->toString(), // UUID làm request_id
                'student_id' => '22IT.B239', // Sử dụng một student_id hợp lệ từ bảng students
                'request_type' => 'Absence',
                'status' => true,
                'submission_date' => now(),
                'evidence' => json_encode([
                    'path/to/evidence3.jpg'
                ]),
                'notes' => 'Absence due to personal reasons.',
                'approved_by' => 'Admin',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Thêm nhiều dữ liệu mẫu khác nếu cần
        ];

        DB::table('requests')->insert($requests);
    }
}
