<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log; // Thêm dòng này
use App\Models\Course;
use App\Http\Resources\CourseResource;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class CourseController extends Controller
{
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
}
