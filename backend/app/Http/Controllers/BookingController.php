<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\PackageClass;
use Illuminate\Http\Request;
use App\Mail\BookingConfirmedMail;
use Illuminate\Support\Facades\Mail;

class BookingController extends Controller
{


    public function index(Request $request)
{
    $user = auth()->user();

    $query = Booking::with(['user', 'packageClass.package']);

    // If the user is not an admin, only show their own bookings
    if ($user->role !== 'admin') {
        $query->where('user_id', $user->id);
    }

    // Optionally filter by status (if you pass ?status=pending for example)
    if ($request->has('status')) {
        $query->where('status', $request->status);
    }

    $bookings = $query->latest()->get();

    return response()->json($bookings);
}
    // store booking
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

    // update booking status
    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:pending,confirmed,cancelled',
        ]);

        $booking = Booking::findOrFail($id);

        // Prevent changing status if it's already confirmed or cancelled
        if (in_array($booking->status, ['confirmed', 'cancelled'])) {
            return response()->json([
                'message' => 'This booking status cannot be changed.',
            ], 403);
        }

        $booking->status = $request->status;
        $booking->save();

        if ($booking->status === 'confirmed') {
       // Load user and room relationships if needed
       $booking->load('user', 'packageClass.package');

       // Send email
       Mail::to($booking->user->email)->send(new BookingConfirmedMail($booking));
        }

        return response()->json([
            'message' => 'Booking status updated successfully.',
            'booking' => $booking,
        ]);
    }

}
