<?php

use App\Http\Controllers\EngineerController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\AssignmentController;

Route::prefix('engineers')->group(function () {
    Route::post('/', [EngineerController::class, 'store']);
    Route::get('/', [EngineerController::class, 'index']);
    Route::put('/{id}', [EngineerController::class, 'update']);
    Route::delete('/{id}', [EngineerController::class, 'destroy']);
});

Route::prefix('tasks')->group(function () {
    Route::post('/', [TaskController::class, 'store']);
    Route::get('/', [TaskController::class, 'index']);
    Route::put('/{id}', [TaskController::class, 'update']);
    Route::delete('/{id}', [TaskController::class, 'destroy']);
});

Route::prefix('assignments')->group(function () {
    Route::post('/allocate', [AssignmentController::class, 'allocateTasks']);
    Route::post('/start/{id}', [AssignmentController::class, 'startTask']);
    Route::post('/complete/{id}', [AssignmentController::class, 'completeTask']);
    Route::get('/report', [AssignmentController::class, 'report']);
});