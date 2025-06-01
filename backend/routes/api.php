<?php

use Illuminate\Http\Request;
use App\Http\Middleware\IsAdmin;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\PackageController;
use App\Http\Controllers\PackageClassController;
use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\UserManagementController;

// public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/packages', [PackageController::class, 'index']);
Route::get('/packages/{id}', [PackageController::class, 'show']);

// Authenticated User
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // book package
    Route::post('/bookings', [BookingController::class, 'store']);

    Route::get('/mybookings', [BookingController::class, 'index']);


});

// Admin Only Routes
Route::middleware(['auth:sanctum', IsAdmin::class])->group(function () {
    // clients
    Route::get('/clients', [UserManagementController::class, 'index']);
    Route::post('/clients', [UserManagementController::class, 'store']);
    Route::put('/clients/{id}', [UserManagementController::class, 'update']);
    Route::delete('/clients/{id}', [UserManagementController::class, 'destroy']);

    // packages
    Route::post('/packages', [PackageController::class, 'store']);
    Route::put('/packages/{id}', [PackageController::class, 'update']);
    Route::delete('/packages/{id}', [PackageController::class, 'destroy']);

    // package classes
    Route::post('/packages/{package}/classes', [PackageClassController::class, 'store']);
    Route::put('/classes/{id}', [PackageClassController::class, 'update']);
    Route::delete('/classes/{id}', [PackageClassController::class, 'destroy']);

    // Bookings
    // Route::post('/bookings', [BookingController::class, 'store']);
    Route::put('/bookings/{id}', [BookingController::class, 'updateStatus']);
    Route::get('/bookings', [BookingController::class, 'index']);
    Route::delete('/bookings/{id}', [BookingController::class, 'destroy']);

    // dashboard
    Route::get('/admin/dashboard', [AdminDashboardController::class, 'overview']);
    Route::get('/admin/dashboard/bookings-monthly', [AdminDashboardController::class, 'bookingsPerMonth']);
});
