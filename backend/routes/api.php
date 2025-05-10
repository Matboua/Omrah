<?php

use Illuminate\Http\Request;
use App\Http\Middleware\IsAdmin;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserManagementController;


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

// admin routes
Route::middleware(['auth:sanctum', IsAdmin::class])->group(function () {
    Route::get('/clients', [UserManagementController::class, 'index']);
    Route::post('/clients', [UserManagementController::class, 'store']);
    Route::put('/clients/{id}', [UserManagementController::class, 'update']);
    Route::delete('/clients/{id}', [UserManagementController::class, 'destroy']);
});
