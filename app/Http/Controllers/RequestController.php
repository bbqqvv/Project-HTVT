<?php

namespace App\Http\Controllers;

use App\Models\Request as RequestModel;
use Illuminate\Http\Request as HttpRequest;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class RequestController extends Controller
{
    /**
     * Lấy tất cả các request
     */
    public function index()
    {
        $requests = RequestModel::all();
        return response()->json($requests);
    }

    /**
     * Lấy một request cụ thể theo id
     */
    public function show(RequestModel $request)
    {
        return response()->json($request);
    }

    /**
     * Tạo một request mới
     */
    public function store(HttpRequest $httpRequest)
    {
        $validator = Validator::make($httpRequest->all(), [
            'request_id' => 'required|string|unique:requests,request_id',
            'student_id' => 'required|string|exists:students,student_id',
            'request_type' => 'required|string',
            'status' => 'nullable|boolean',
            'evidence' => 'nullable|array|max:2',
            'evidence.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'student_notes' => 'nullable|string', // Ghi chú của sinh viên
            'faculty_notes' => 'nullable|string',  // Ghi chú của khoa
            'exam_department_notes' => 'nullable|string', // Ghi chú của khảo thi
            'selected_courses' => 'nullable|array',
            'selected_courses.*' => 'array', // Mỗi phần tử trong 'selected_courses' phải là một mảng
            'approved_by' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        // Handle evidence file uploads
        $evidence = [];
        if ($httpRequest->hasFile('evidence')) {
            foreach ($httpRequest->file('evidence') as $image) {
                $path = $image->store('images', 'public');
                $evidence[] = Storage::url($path);
            }
        }

        // Save validated data
        $validatedData = $validator->validated();
        $validatedData['evidence'] = json_encode($evidence);
        $validatedData['submission_date'] = Carbon::now();
        $validatedData['selected_courses'] = $httpRequest->has('selected_courses') ? json_encode($httpRequest->input('selected_courses')) : null;

        $request = RequestModel::create($validatedData);
        return response()->json($request, 201);
    }

    /**
     * Cập nhật một request
     */
    public function update(HttpRequest $httpRequest, RequestModel $request)
    {
        $validator = Validator::make($httpRequest->all(), [
            'request_id' => 'required|string|unique:requests,request_id,' . $request->request_id,
            'student_id' => 'required|string|exists:students,student_id',
            'request_type' => 'required|string',
            'status' => 'required|boolean',
            'evidence' => 'nullable|array|max:2',
            'evidence.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'student_notes' => 'nullable|string',
            'faculty_notes' => 'nullable|string',
            'exam_department_notes' => 'nullable|string',
            'selected_courses' => 'nullable|array',
            'selected_courses.*' => 'array',
            'approved_by' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        // Handle evidence file uploads
        $evidence = json_decode($request->evidence, true) ?? [];
        if ($httpRequest->hasFile('evidence')) {
            foreach ($httpRequest->file('evidence') as $image) {
                $path = $image->store('images', 'public');
                $evidence[] = Storage::url($path);
            }
        }

        // Update validated data
        $validatedData = $validator->validated();
        $validatedData['evidence'] = json_encode($evidence);
        $validatedData['submission_date'] = $httpRequest->has('submission_date') ? $httpRequest->input('submission_date') : $request->submission_date;
        $validatedData['selected_courses'] = $httpRequest->has('selected_courses') ? json_encode($httpRequest->input('selected_courses')) : $request->selected_courses;

        $request->update($validatedData);
        return response()->json($request);
    }

    /**
     * Xóa một request
     */
    public function destroy(RequestModel $request)
    {
        $request->delete();
        return response()->json(null, 204);
    }
}
