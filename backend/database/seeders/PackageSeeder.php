<?php

namespace Database\Seeders;

use App\Models\Package;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class PackageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $packages = [
            ['name' => 'Silver Umrah', 'description' => 'Affordable Umrah package with essential services.', 'start_date' => '2025-07-01', 'end_date' => '2025-07-15'],
            ['name' => 'Gold Umrah', 'description' => 'Balanced package with more comfort and service.', 'start_date' => '2025-08-01', 'end_date' => '2025-08-15'],
            ['name' => 'Platinum Umrah', 'description' => 'Luxury Umrah with premium features.', 'start_date' => '2025-09-01', 'end_date' => '2025-09-15'],
        ];

        foreach ($packages as $package) {
            Package::create($package);
        }
    }
}
