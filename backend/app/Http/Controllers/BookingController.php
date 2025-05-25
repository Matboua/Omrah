<?php

namespace App\Http\Controllers;

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
            'package_id' => 'required|exists:packages,id',
            'package_class_id' => 'required|exists:package_classes,id',
            'seats_booked' => 'required|integer|min:1'
        ]);

        $packageClass = PackageClass::where('package_id', $request->package_id)
            ->findOrFail($request->package_class_id);

        if ($packageClass->seats < $request->seats_booked) {
            return response()->json(['message' => 'Not enough available seats'], 400);
        }

        $totalPrice = $packageClass->price * $request->seats_booked;

        $booking = Booking::create([
            'user_id' => auth()->id(),
            'package_id' => $request->package_id,
            'package_class_id' => $request->package_class_id,
            'seats_booked' => $request->seats_booked,
            'total_price' => $totalPrice,
        ]);

        // Reduce available seats
        $packageClass->decrement('seats', $request->seats_booked);

        return response()->json([
            'message' => 'Booking successful',
            'booking' => $booking,
            'departure_date' => $packageClass->departure_date
        ]);
    }

    
}
