<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    // Display a listing of the students
    public function index()
    {
        $students = Student::all();
        return response()->json($students);
    }

    // Store a newly created student in storage
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'student_id' => 'required|string|unique:students',
            'student_name' => 'required|string',
            'faculty_id' => 'required|string|exists:faculties,faculty_id',
            'major' => 'required|string',
            'class_name' => 'required|string',
            'phone_number' => 'required|string',
            'email' => 'required|string|email',
            'user_id' => 'required|string|exists:users,id',
        ]);

        $student = Student::create($validatedData);
        return response()->json($student, 201);
    }

    // Display the specified student
    public function show($student_id)
    {
        $student = Student::findOrFail($student_id);
        return response()->json($student);
    }

    // Update the specified student in storage
    public function update(Request $request, $student_id)
    {
        $student = Student::findOrFail($student_id);

        $validatedData = $request->validate([
            'student_name' => 'string',
            'faculty_id' => 'string|exists:faculties,faculty_id',
            'major' => 'string',
            'class_name' => 'string',
            'phone_number' => 'string',
            'email' => 'string|email',
            'user_id' => 'string|exists:users,id',
        ]);

        $student->update($validatedData);
        return response()->json($student);
    }

    // Remove the specified student from storage
    public function destroy($student_id)
    {
        $student = Student::findOrFail($student_id);
        $student->delete();
        return response()->json(null, 204);
    }
}
