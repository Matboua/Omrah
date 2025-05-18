<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PackageController extends Controller
{

    public function index()
    {
        return Package::with('classes.flights')->get();
    }
    
}
