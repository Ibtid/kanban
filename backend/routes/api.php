<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\AuthController;

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:api')->group(function () {
    Route::get('me', [AuthController::class, 'me']);

    // Standard CRUD routes
    Route::apiResource('tasks', TaskController::class);

    // Custom routes for filtering & sorting
    Route::get('filter', [TaskController::class, 'filterTasks']);
    Route::get('sort', [TaskController::class, 'sortTasks']);
    Route::get('search', [TaskController::class, 'searchTasks']);
});
