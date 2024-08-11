<?php

namespace App\Http\Controllers;

use App\Models\Request as RequestModel;
use Illuminate\Http\Request as HttpRequest;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon; // Thêm Carbon để làm việc với ngày giờ

class RequestController extends Controller
{
    // Get all requests
    public function index()
    {
        $requests = RequestModel::all();
        return response()->json($requests);
    }

    // Get a single request by id
    public function show(RequestModel $request)
    {
        return response()->json($request);
    }

    // Create a new request
    public function store(HttpRequest $httpRequest)
    {
        $validator = Validator::make($httpRequest->all(), [
            'request_id' => 'required|string|unique:requests,request_id',
            'student_id' => 'required|string|exists:students,student_id',
            'request_type' => 'required|string',
            'status' => 'required|boolean',
            'evidence' => 'nullable|array|max:2', // Allow array of up to 2 images
            'evidence.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048', // Validation for each image
            'notes' => 'nullable|string',
            'approved_by' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        // Handle image upload
        $evidence = [];
        if ($httpRequest->hasFile('evidence')) {
            foreach ($httpRequest->file('evidence') as $image) {
                $path = $image->store('images', 'public');
                $evidence[] = Storage::url($path);
            }
        }

        // Add images to the validated data
        $validatedData = $validator->validated();
        $validatedData['evidence'] = json_encode($evidence);
        $validatedData['submission_date'] = Carbon::now(); // Cập nhật ngày hiện tại

        $request = RequestModel::create($validatedData);
        return response()->json($request, 201);
    }

    // Update a request
    public function update(HttpRequest $httpRequest, RequestModel $request)
    {
        $validator = Validator::make($httpRequest->all(), [
            'request_id' => 'required|string|unique:requests,request_id,' . $request->id,
            'student_id' => 'required|string|exists:students,student_id',
            'request_type' => 'required|string',
            'status' => 'required|boolean',
            'evidence' => 'nullable|array|max:2', // Allow array of up to 2 images
            'evidence.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'notes' => 'nullable|string',
            'approved_by' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        // Handle image upload
        $evidence = $request->evidence ? json_decode($request->evidence, true) : [];
        if ($httpRequest->hasFile('evidence')) {
            foreach ($httpRequest->file('evidence') as $image) {
                $path = $image->store('images', 'public');
                $evidence[] = Storage::url($path);
            }
        }

        // Add images to the validated data
        $validatedData = $validator->validated();
        $validatedData['evidence'] = json_encode($evidence);
        $validatedData['submission_date'] = $request->submission_date ?: Carbon::now(); // Cập nhật ngày hiện tại nếu chưa có

        $request->update($validatedData);
        return response()->json($request);
    }

    // Delete a request
    public function destroy(RequestModel $request)
    {
        $request->delete();
        return response()->json(null, 204);
    }
}
