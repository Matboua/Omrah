<?php

namespace Database\Seeders;

use App\Models\Package;
use App\Models\PackageClass;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class PackageClassSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $classes = [
            'Economic' => [
                "3-star hotel accommodation",
                "Group transport by bus",
                "Standard meals",
                "Shared room"
            ],
            'Business' => [
                "4-star hotel accommodation near Haram",
                "Private A/C transport",
                "Buffet meals",
                "Double occupancy room"
            ],
            'VIP' => [
                "5-star hotel facing the Kaaba",
                "Private limousine transfers",
                "Gourmet meals",
                "Private suite with full amenities",
                "Dedicated guide"
            ]
        ];

        $packages = Package::all();

        foreach ($packages as $package) {
            foreach ($classes as $name => $features) {
                PackageClass::create([
                    'package_id' => $package->id,
                    'name' => $name,
                    'price' => match($name) {
                        'Economic' => 1200,
                        'Business' => 2500,
                        'VIP' => 5000,
                    },
                    'seats' => match($name) {
                        'Economic' => 40,
                        'Business' => 20,
                        'VIP' => 10,
                    },
                    'features' => $features, // stored as JSON array
                ]);
            }
        }
    }
}
