<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CourseResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'course_id' => $this->course_id,
            'course_name' => $this->course_name,
            'instructor' => $this->instructor,
            'credits' => $this->credits,
            'exam_format' => $this->exam_format,
            'exam_date' => $this->exam_date,
            'exam_time' => $this->exam_time,
            'exam_room' => $this->exam_room,
            'semester_id' => $this->semester_id,
        ];
    }
}
