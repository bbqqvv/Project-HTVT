<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Student;

class Request extends Model
{
    use HasFactory;

    protected $table = 'requests';
    protected $primaryKey = 'request_id';
    public $incrementing = false; // Nếu request_id là UUID, đặt false
    public $timestamps = true;

    protected $fillable = [
        'request_id',
        'student_id',
        'request_type',
        'status',
        'submission_date',
        'evidence',
        'notes',
        'approved_by'
    ];

    protected $casts = [
        'evidence' => 'array',
        'submission_date' => 'date'
    ];

    public function student()
    {
        return $this->belongsTo(Student::class, 'student_id', 'student_id');
    }
}
