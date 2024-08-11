<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StudentCoursesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('student_courses')->insert([
            ['student_id' => '22IT.B239', 'course_id' => 'COURSE001'],
            ['student_id' => '22IT.B239', 'course_id' => 'COURSE002'],
            ['student_id' => '22IT.B239', 'course_id' => 'COURSE003'],
            ['student_id' => '22IT.B239', 'course_id' => 'COURSE004'],
            ['student_id' => '22IT.B239', 'course_id' => 'COURSE005'],
            ['student_id' => '22IT.B239', 'course_id' => 'COURSE006'],
            ['student_id' => '22IT.B239', 'course_id' => 'COURSE007'],
            ['student_id' => '22IT.B239', 'course_id' => 'COURSE008'],
            ['student_id' => '22IT.B239', 'course_id' => 'COURSE009'],
            ['student_id' => '22IT.B239', 'course_id' => 'COURSE010'],
          
            // Thêm dữ liệu mẫu khác nếu cần
        ]);
    }
}
