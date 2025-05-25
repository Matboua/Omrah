<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\PackageClass;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    // store booking
    /**
     * Store a new booking.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
{
    $request->validate([
        'package_class_id' => 'required|exists:package_classes,id',
        'package_id' => 'required|exists:packages,id'
    ]);

    $user = auth()->user();


    // Get the package class
    $packageClass = PackageClass::findOrFail($request->package_class_id);

    // Check for available seats
    if ($packageClass->seats <= 0) {
        return response()->json(['message' => 'No available seats for this class.'], 400);
    }

    // Check if the user already booked this class
    $alreadyBooked = Booking::where('user_id', $user->id)
        ->where('package_class_id', $packageClass->id)
        ->exists();

    if ($alreadyBooked) {
        return response()->json(['message' => 'You have already booked this class.'], 400);
    }

    // Create the booking
    $booking = Booking::create([
        'user_id' => $user->id,
        'package_id' => $request->package_id,
        'package_class_id' => $packageClass->id,
        'total_price' => $packageClass->price,
        'status' => 'pending',
    ]);

    // Optionally decrement seats
    $packageClass->decrement('seats');

    return response()->json([
        'message' => 'Booking successful.',
        'booking' => $booking
    ], 201);
}


}
