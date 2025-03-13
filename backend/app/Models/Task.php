<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'status', 'due_date'];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($task) {
            if (!$task->status) {
                $task->status = 'To Do';
            }
        });
    }
}