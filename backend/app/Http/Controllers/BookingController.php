<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BookingController extends Controller
{
    
    public function store(Request $request)
    {
        $validated = $request->validate([
            'package_class_id' => 'required|exists:package_classes,id',
            'flight_id' => 'required|exists:flights,id',
        ]);

        $booking = Booking::create([
            'user_id' => auth()->id(),
            ...$validated,
            'status' => 'pending',
        ]);

        return response()->json($booking, 201);
    }

}
