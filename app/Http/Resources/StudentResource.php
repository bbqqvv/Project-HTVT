<?php
// app/Http/Resources/StudentResource.php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StudentResource extends JsonResource
{
    public function toArray(Request $request)
    {
        return [
            'student_id' => $this->student_id,
            'student_name' => $this->student_name,
            'faculty_id' => $this->faculty_id,
            'major' => $this->major,
            'class_name' => $this->class_name,
            'phone_number' => $this->phone_number,
            'email' => $this->email,
            'user_id' => $this->user_id,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
