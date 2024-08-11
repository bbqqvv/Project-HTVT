<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SemestersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('semesters')->insert([
            [
                'semester_id' => 'HK1-2024',
                'name' => 'Học kỳ 1',
                'academic_year' => '2024-2025',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'semester_id' => 'HK2-2024',
                'name' => 'Học kỳ 2',
                'academic_year' => '2024-2025',
                'created_at' => now(),
                'updated_at' => now(),
            ],
         
            // Thêm các học kỳ khác nếu cần
        ]);
    }
}
