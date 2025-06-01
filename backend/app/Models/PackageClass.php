<?php

namespace App\Models;

use App\Models\Package;
use App\Models\Flight;
use App\Models\Booking;
use Illuminate\Database\Eloquent\Model;

class PackageClass extends Model
{
    protected $fillable = ['package_id', 'name', 'price', 'seats', 'features'];

    protected $casts = [
    'features' => 'array',
    'departure_date' => 'date'
    ];

    public function package()
    {
        return $this->belongsTo(Package::class);
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}
