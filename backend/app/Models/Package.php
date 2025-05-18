<?php

namespace App\Models;

use App\Models\PackageClass;
use Illuminate\Database\Eloquent\Model;

class Package extends Model
{
    protected $fillable = ['name', 'description', 'start_date', 'end_date'];

    public function classes()
    {
        return $this->hasMany(PackageClass::class);
    }
}
