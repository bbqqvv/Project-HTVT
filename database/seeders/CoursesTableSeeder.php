<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CoursesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('courses')->insert([
            [
                'course_id' => 'COURSE001',
                'course_name' => 'Tiếng Anh nâng cao 1 (4)',
                'instructor' => 'TS.Trần Thị Thùy Liên',
                'credits' => 2,
                'exam_format' => 'Trắc nghiệm máy',
                'exam_date' => '2024-06-12',
                'exam_time' => '08:00',
                'exam_room' => 'K.B202',
                'semester_id' => 'HK1-2024',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'course_id' => 'COURSE002',
                'course_name' => 'Thiết kế bộ ấn phẩm văn phòng (1)',
                'instructor' => 'ThS.Trần Thị Thúy Ngọc',
                'credits' => 2,
                'exam_format' => 'Vấn đáp (ĐAMH)',
                'exam_date' => '2024-06-14',
                'exam_time' => '13:00',
                'exam_room' => 'K.C107',
                'semester_id' => 'HK1-2024',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'course_id' => 'COURSE003',
                'course_name' => 'Trực quan hóa dữ liệu (1)',
                'instructor' => 'TS.Nguyễn Thanh',
                'credits' => 2,
                'exam_format' => 'Vấn đáp (ĐAMH)',
                'exam_date' => '2024-06-14',
                'exam_time' => '13:00',
                'exam_room' => 'K.A101',
                'semester_id' => 'HK1-2024',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'course_id' => 'COURSE004',
                'course_name' => 'Vi điều khiển (12)_TA',
                'instructor' => 'ThS.Nguyễn Thị Huyền Trang',
                'credits' => 3,
                'exam_format' => 'Vấn đáp (BTL)',
                'exam_date' => '2024-06-14',
                'exam_time' => '13:00',
                'exam_room' => 'K.A111',
                'semester_id' => 'HK1-2024',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'course_id' => 'COURSE005',
                'course_name' => 'Phân tích và thiết kế hệ thống thông tin (BA) (1)',
                'instructor' => 'ThS.Lê Viết Trương',
                'credits' => 2,
                'exam_format' => 'Vấn đáp (ĐAMH)',
                'exam_date' => '2024-05-25',
                'exam_time' => '07:30',
                'exam_room' => 'K.A203',
                'semester_id' => 'HK1-2024',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'course_id' => 'COURSE006',
                'course_name' => 'Phát triển ứng dụng di động đa nền tảng (1)_GIT',
                'instructor' => 'ThS.Nguyễn Thanh Tuấn',
                'credits' => 2,
                'exam_format' => 'Vấn đáp (ĐAMH)',
                'exam_date' => '2024-05-25',
                'exam_time' => '07:30',
                'exam_room' => 'K.A211',
                'semester_id' => 'HK1-2024',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'course_id' => 'COURSE007',
                'course_name' => 'Xử lý ảnh cơ bản (1)',
                'instructor' => 'ThS.Trần Thị Hạ Quyên',
                'credits' => 2,
                'exam_format' => 'Vấn đáp (BTL)',
                'exam_date' => '2024-05-25',
                'exam_time' => '07:30',
                'exam_room' => 'K.C107',
                'semester_id' => 'HK1-2024',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'course_id' => 'COURSE008',
                'course_name' => 'Chuyên đề 2 (IT) (9)_AD_Khoa học dữ liệu trong kinh doanh',
                'instructor' => 'ThS.Nguyễn Văn Chức',
                'credits' => 2,
                'exam_format' => 'Vấn đáp (ĐAMH)',
                'exam_date' => '2024-05-25',
                'exam_time' => '07:30',
                'exam_room' => 'K.A213',
                'semester_id' => 'HK1-2024',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'course_id' => 'COURSE009',
                'course_name' => 'Thiết kế dàn trang báo chí (1)',
                'instructor' => 'ThS.Nguyễn Thị Thanh Thúy',
                'credits' => 2,
                'exam_format' => 'Vấn đáp (BTL)',
                'exam_date' => '2024-05-25',
                'exam_time' => '07:30',
                'exam_room' => 'K.A214',
                'semester_id' => 'HK2-2024',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'course_id' => 'COURSE010',
                'course_name' => 'Quản trị tổ chức sự kiện du lịch (1)',
                'instructor' => 'ThS.Nguyễn Lê Ngọc Trâm',
                'credits' => 3,
                'exam_format' => 'Vấn đáp (BTL)',
                'exam_date' => '2024-05-25',
                'exam_time' => '07:30',
                'exam_room' => 'Tầng 3. TTSV',
                'semester_id' => 'HK2-2024',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
