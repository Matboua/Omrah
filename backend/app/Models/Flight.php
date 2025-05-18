<?php

namespace App\Models;

use App\Models\PackageClass;
use Illuminate\Database\Eloquent\Model;

class Flight extends Model
{
    protected $fillable = ['package_class_id', 'departure_date', 'return_date', 'seats_available'];

    public function packageClass()
    {
        return $this->belongsTo(PackageClass::class);
    }
}
