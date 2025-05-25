<?php

namespace App\Models;

use App\Models\User;
use App\Models\Flight;
use App\Models\PackageClass;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $fillable = ['user_id', 'package_class_id', 'package_id', 'total_price', 'status'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function packageClass()
    {
        return $this->belongsTo(PackageClass::class);
    }

    public function flight()
    {
        return $this->belongsTo(Flight::class);
    }
}
