<?php

namespace App\Http\Controllers;

use App\Http\Resources\RequestResource;
use App\Models\Request;
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
        // Load thông tin sinh viên khi lấy tất cả các request
        $requests = Request::with('student')->get();
        return response()->json($requests);
    }

    /**
     * Lấy một request cụ thể theo id
     */
    public function show($id)
    {
        // Tìm request theo id
        $request = Request::with('student')->find($id);

        if (!$request) {
            return response()->json(['message' => 'Request not found'], 404);
        }

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
            'student_notes' => 'nullable|string',
            'faculty_notes' => 'nullable|string',
            'exam_department_notes' => 'nullable|string',
            'selected_courses' => 'nullable|array',
            'selected_courses.*' => 'array',
            'approved_by' => 'nullable|string',
            'khoa_checked' => 'nullable|boolean',
            'khaothi_checked' => 'nullable|boolean',

        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        // Xử lý tệp chứng cứ
        $evidence = [];
        if ($httpRequest->hasFile('evidence')) {
            foreach ($httpRequest->file('evidence') as $image) {
                $path = $image->store('images', 'public');
                $evidence[] = Storage::url($path);
            }
        }

        // Lưu dữ liệu đã xác thực
        $validatedData = $validator->validated();
        $validatedData['evidence'] = json_encode($evidence);
        $validatedData['submission_date'] = Carbon::now();
        $validatedData['selected_courses'] = $httpRequest->has('selected_courses') ? json_encode($httpRequest->input('selected_courses')) : null;

        $request = Request::create($validatedData);
        return response()->json($request, 201);
    }

    /**
     * Cập nhật một request
     */
    public function update(HttpRequest $httpRequest, $id)
    {
        $request = Request::find($id);

        if (!$request) {
            return response()->json(['message' => 'Request not found'], 404);
        }

        $validator = Validator::make($httpRequest->all(), [
            'status' => 'required|boolean',
            'student_notes' => 'nullable|string',
            'faculty_notes' => 'nullable|string',
            'exam_department_notes' => 'nullable|string',
            'selected_courses' => 'nullable|array',
            'selected_courses.*' => 'array',
            'approved_by' => 'nullable|string',
            'khoa_checked' => 'required|boolean',
            'khaothi_checked' => 'required|boolean',


        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        // Cập nhật dữ liệu
        $validatedData = $validator->validated();
        $validatedData['selected_courses'] = $httpRequest->has('selected_courses') ? json_encode($httpRequest->input('selected_courses')) : null;

        $request->update($validatedData);

        return new RequestResource($request);
    }

    /**
     * Xóa một request
     */
    public function destroy($id)
    {
        $request = Request::find($id);

        if (!$request) {
            return response()->json(['message' => 'Request not found'], 404);
        }

        $request->delete();
        return response()->json(null, 204);
    }
}
