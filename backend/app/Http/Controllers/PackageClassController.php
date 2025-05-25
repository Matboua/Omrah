<?php

namespace App\Http\Controllers;

use App\Models\PackageClass;
use Illuminate\Http\Request;

class PackageClassController extends Controller
{
    // GET /api/package-classes
    public function index()
    {
        return PackageClass::with('package')->get();
    }

    // GET /api/packages/{id}
    public function show($id)
    {
        return PackageClass::with('package')->findOrFail($id);
    }

    // POST /api/package-classes
    public function store(Request $request)
    {
        $validated = $request->validate([
            'package_id' => 'required|exists:packages,id',
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'seats' => 'required|integer|min:0',
            'features' => 'nullable|array',
        ]);

        $packageClass = PackageClass::create($validated);

        return response()->json($packageClass, 201);
    }

    // PUT /api/package-classes/{id}
    public function update(Request $request, $id)
    {
        $packageClass = PackageClass::findOrFail($id);

        $validated = $request->validate([
            'package_id' => 'sometimes|exists:packages,id',
            'name' => 'sometimes|string|max:255',
            'price' => 'sometimes|numeric',
            'seats' => 'sometimes|integer|min:0',
            'features' => 'nullable|array',
        ]);

        $packageClass->update($validated);

        return response()->json($packageClass);
    }

    // DELETE /api/package-classes/{id}
    public function destroy($id)
    {
        $packageClass = PackageClass::findOrFail($id);
        $packageClass->delete();

        return response()->json(['message' => 'Deleted successfully']);
    }
}
