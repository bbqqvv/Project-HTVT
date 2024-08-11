<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('requests', function (Blueprint $table) {
            $table->string('request_id');
            $table->string('student_id'); // Foreign key to students table
            $table->string('request_type');
            $table->boolean('status')->default(false);
            $table->date('submission_date');
            $table->json('evidence')->nullable();
            $table->string('notes')->nullable();
            $table->string('approved_by')->nullable();
            $table->timestamps();

            // Foreign key constraints
            $table->foreign('student_id')->references('student_id')->on('students')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('requests');
    }
};
