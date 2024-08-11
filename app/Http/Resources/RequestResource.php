<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class RequestResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'request_id' => $this->request_id,
            'student_id' => $this->student_id,
            'request_type' => $this->request_type,
            'status' => $this->status,
            'submission_date' => $this->submission_date,
            'evidence' => $this->evidence ? json_decode($this->evidence, true) : [],
            'notes' => $this->notes,
            'approved_by' => $this->approved_by,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
