<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log; // Đảm bảo dòng này có mặt để ghi log lỗi
use App\Models\Course;
use App\Http\Resources\CourseResource;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class CourseController extends Controller
{
    // Phương thức đã có
    public function index(Request $request)
    {
        try {
            $semesterId = $request->query('semester_id');
            $courses = Course::where('semester_id', $semesterId)->get();

            if ($courses->isEmpty()) {
                return response()->json(['message' => 'No courses found for the given semester_id.'], 404);
            }

            return CourseResource::collection($courses);
        } catch (\Exception $e) {
            Log::error('Error fetching courses: ' . $e->getMessage());
            return response()->json(['message' => 'Server error'], 500);
        }
    }

    // Phương thức mới
    public function getCoursesByIds(Request $request)
    {
        try {
            $courseIds = $request->input('courseIds');

            if (empty($courseIds)) {
                return response()->json(['message' => 'No course IDs provided.'], 400);
            }

            $courses = Course::whereIn('course_id', $courseIds)->get();

            if ($courses->isEmpty()) {
                return response()->json(['message' => 'No courses found for the given IDs.'], 404);
            }

            return CourseResource::collection($courses);
        } catch (\Exception $e) {
            Log::error('Error fetching courses by IDs: ' . $e->getMessage());
            return response()->json(['message' => 'Server error'], 500);
        }
    }
}
