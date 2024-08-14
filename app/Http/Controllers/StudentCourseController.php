<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\StudentCourse;
use App\Http\Resources\StudentCourseResource;
use App\Http\Resources\StudentCourseCollection;

class StudentCourseController extends Controller
{
    // Lấy danh sách môn học của sinh viên
    public function index($student_id)
    {
        $courses = StudentCourse::where('student_id', $student_id)->get();

        // Sử dụng StudentCourseResource để ánh xạ từng bản ghi
        return response()->json($courses->map(function ($course) {
            return new StudentCourseResource($course);
        }));
    }


    // Thêm môn học cho sinh viên
    public function store(Request $request)
    {
        $validated = $request->validate([
            'student_id' => 'required|string',
            'course_id' => 'required|string',
        ]);

        $studentCourse = StudentCourse::create($validated);

        return new StudentCourseResource($studentCourse);
    }


    // Xóa môn học của sinh viên
    public function destroy($student_id, $course_id)
    {
        $studentCourse = StudentCourse::where('student_id', $student_id)
            ->where('course_id', $course_id)
            ->first();

        if (!$studentCourse) {
            return response()->json(['message' => 'Record not found'], 404);
        }

        $studentCourse->delete();
        return response()->json(['message' => 'Record deleted successfully']);
    }
}
