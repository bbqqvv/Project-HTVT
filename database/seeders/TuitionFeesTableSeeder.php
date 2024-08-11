<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TuitionFeesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Tạo dữ liệu mẫu cho bảng tuition_fees
        $tuitionFees = [
            ['student_id' => '22IT.B239', 'status' => false],
            ['student_id' => '22IT.B238', 'status' => true],
            ['student_id' => '22IT.B237', 'status' => false],
        ];

        foreach ($tuitionFees as $fee) {
            DB::table('tuition_fees')->insert([
                'student_id' => $fee['student_id'],
                'status' => $fee['status'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
