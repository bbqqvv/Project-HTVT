<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FacultiesTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('faculties')->insert([
            [
                'faculty_id' => 'KKHMT',
                'faculty_name' => 'Khoa Khoa học Máy tính',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'faculty_id' => 'KTMDT',
                'faculty_name' => 'Khoa Thương Mại Điện Tử',
                'created_at' => now(),
                'updated_at' => now(),
            ],
         
        ]);
    }
}
