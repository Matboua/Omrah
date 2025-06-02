<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Booking;
use App\Models\Package;
use App\Models\PackageClass;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminDashboardController extends Controller
{
    public function overview()
    {
        $totalBookings = Booking::count();
        $confirmedBookings = Booking::where('status', 'confirmed')->count();
        $pendingBookings = Booking::where('status', 'pending')->count();
        $cancelledBookings = Booking::where('status', 'cancelled')->count();

        $totalPackages = Package::count();
        $totalUsers = User::count();

        // $seatsData = PackageClass::select('name', 'seats')
        //     ->withCount(['bookings as booked_seats'])
        //     ->get()
        //     ->map(function ($class) {
        //         return [
        //             'class' => $class->name,
        //             'available_seats' => $class->seats - $class->booked_seats
        //         ];
        //     });
            $classes = PackageClass::with('package')->get();

            $seatsData = $classes->map(function ($class) {
                return [
                    'name' => $class->package->name . ' - ' . $class->name,
                    'class' => $class->name,
                    'seats' => $class->seats,
                    'package' => $class->package->name,
                ];
            });

        return response()->json([
            'total_bookings' => $totalBookings,
            'confirmed_bookings' => $confirmedBookings,
            'pending_bookings' => $pendingBookings,
            'cancelled_bookings' => $cancelledBookings,
            'total_packages' => $totalPackages,
            'total_users' => $totalUsers,
            'seats' => $seatsData
        ]);
    }

    public function bookingsPerMonth()
{
    $data = DB::table('bookings')
        ->select(DB::raw('MONTH(created_at) as month'), DB::raw('COUNT(*) as count'))
        ->groupBy('month')
        ->orderBy('month')
        ->get();

    // Optional: Map month numbers to names
    $months = [
        1 => 'Jan', 2 => 'Feb', 3 => 'Mar', 4 => 'Apr',
        5 => 'May', 6 => 'Jun', 7 => 'Jul', 8 => 'Aug',
        9 => 'Sep', 10 => 'Oct', 11 => 'Nov', 12 => 'Dec'
    ];

    $result = $data->map(function ($item) use ($months) {
        return [
            'month' => $months[$item->month] ?? 'Unknown',
            'count' => $item->count
        ];
    });

    return response()->json($result);
}
}
