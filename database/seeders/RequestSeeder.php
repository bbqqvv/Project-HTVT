<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Request;
use Carbon\Carbon;

class RequestSeeder extends Seeder
{
    public function run()
    {
        $requests = [
            [
                'request_id' => 'REQ001',
                'student_id' => '22IT.B239',
                'request_type' => 'Hoãn thi',
                'status' => true,
                'evidence' => json_encode([
                    'images/evidence1.jpg',
                    'images/evidence2.jpg',
                ]),
                'student_notes' => 'Gặp vấn đề sức khỏe. Có giấy xác nhận từ bệnh viện.',
                'faculty_notes' => 'Đã nhận giấy xác nhận từ bệnh viện. Đang chờ phê duyệt.',
                'exam_department_notes' => 'Cần xác nhận từ khoa trước khi phê duyệt.',
                'selected_courses' => json_encode([
                    [
                        'course_id' => 'COURSE001',
                        'subject' => 'Tiếng Anh nâng cao 1 (4)',
                        'lecturer' => 'TS. Trần Thị Thùy Liên',
                        'credits' => 2,
                        'examDate' => '2024-06-12',
                        'examRoom' => 'K.B202',
                        'examTime' => '08:00:00',
                        'examType' => 'Trắc nghiệm máy',
                        'status' => 'Chưa diễn ra',
                    ],
                    [
                        'course_id' => 'COURSE002',
                        'subject' => 'Thiết kế bộ ấn phẩm văn phòng (1)',
                        'lecturer' => 'ThS. Trần Thị Thúy Ngọc',
                        'credits' => 2,
                        'examDate' => '2024-06-15',
                        'examRoom' => 'K.B204',
                        'examTime' => '10:00:00',
                        'examType' => 'Vấn đáp (ĐAMH)',
                        'status' => 'Chưa diễn ra',
                    ],
                ]),
                'submission_date' => Carbon::now(),
                'approved_by' => null,
            ],
            [
                'request_id' => 'REQ002',
                'student_id' => '22IT.B238',
                'request_type' => 'Vắng thi',
                'status' => false,
                'evidence' => json_encode([
                    'images/evidence3.jpg',
                ]),
                'student_notes' => 'Gia đình có việc gấp.',
                'faculty_notes' => 'Đã xét duyệt yêu cầu và đồng ý với lý do.',
                'exam_department_notes' => 'Đã phê duyệt yêu cầu.',
                'selected_courses' => json_encode([
                    [
                        'course_id' => 'COURSE003',
                        'subject' => 'Trực quan hóa dữ liệu (1)',
                        'lecturer' => 'TS. Nguyễn Thanh',
                        'credits' => 2,
                        'examDate' => '2024-07-12',
                        'examRoom' => 'K.B205',
                        'examTime' => '09:00:00',
                        'examType' => 'Vấn đáp (ĐAMH)',
                        'status' => 'Chưa diễn ra',
                    ],
                    [
                        'course_id' => 'COURSE004',
                        'subject' => 'Lập trình Web nâng cao (2)',
                        'lecturer' => 'ThS. Nguyễn Hoàng Nam',
                        'credits' => 3,
                        'examDate' => '2024-07-20',
                        'examRoom' => 'K.B206',
                        'examTime' => '11:00:00',
                        'examType' => 'Thi viết',
                        'status' => 'Chưa diễn ra',
                    ],
                ]),
                'submission_date' => Carbon::now(),
                'approved_by' => 'TS. Phạm Văn C',
            ],
        ];

        foreach ($requests as $request) {
            Request::create($request);
        }
    }
}
