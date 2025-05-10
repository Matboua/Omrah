<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserManagementController extends Controller
{
    public function index()
    {
        $clients = User::where('role', 'client')->get();
        return response()->json($clients);
    }

    // Store new client
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'cin' => 'required|unique:users',
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'city' => 'required|string',
            'phone' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $client = User::create([
            'cin' => $request->cin,
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'city' => $request->city,
            'phone' => $request->phone,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'role' => 'client',
        ]);

        return response()->json($client, 201);
    }

    // Update client
    public function update(Request $request, $id)
    {
        $client = User::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'cin' => 'required|unique:users,cin,' . $client->id,
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'city' => 'required|string',
            'phone' => 'required|string',
            'email' => 'required|email|unique:users,email,' . $client->id,
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $client->update($request->only([
            'cin', 'first_name', 'last_name', 'city', 'phone', 'email'
        ]));

        return response()->json($client);
    }

    // Delete client
    public function destroy($id)
    {
        $client = User::findOrFail($id);
        $client->delete();

        return response()->json(['message' => 'Client '. $client->first_name .' deleted successfully.']);
    }
}
