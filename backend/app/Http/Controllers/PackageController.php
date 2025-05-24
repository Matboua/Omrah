<?php

namespace App\Http\Controllers;

use App\Models\Package;
use Illuminate\Http\Request;

class PackageController extends Controller
{

     // GET /api/packages
    public function index()
    {
        return Package::with('classes')->get(); // Include classes
    }

    // POST /api/packages
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);

        $package = Package::create($validated);

        return response()->json($package, 201);
    }

    // GET /api/packages/{id}
    public function show($id)
    {
        $package = Package::with('classes')->findOrFail($id);
        return response()->json($package);
    }

    // PUT /api/packages/{id}
    public function update(Request $request, $id)
    {
        $package = Package::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);

        $package->update($validated);

        return response()->json($package);
    }

    // DELETE /api/packages/{id}
    public function destroy($id)
    {
        $package = Package::findOrFail($id);
        $package->delete();

        return response()->json(['message' => 'Package deleted successfully']);
    }
    
}
