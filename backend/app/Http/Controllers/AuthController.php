<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name'  => 'required|string|max:255',
            'cin'        => 'required|string|max:20|unique:users,cin',
            'city'       => 'required|string|max:100',
            'phone'      => 'required|string|max:20',
            'email'      => 'required|email|unique:users,email',
            'password'   => 'required|confirmed|min:6',
        ]);

        $user = User::create([
            'first_name' => $request->first_name,
            'last_name'  => $request->last_name,
            'cin'        => $request->cin,
            'city'       => $request->city,
            'phone'      => $request->phone,
            'email'      => $request->email,
            'password'   => Hash::make($request->password),
        ]);

       // Auto-login the user
        Auth::login($user);

        return response()->json(['message' => 'Registered and logged in successfully', 'user' => $user], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $user = Auth::user();

        return response()->json([
            'message' => 'Logged in successfully',
            'user' => $user
        ]);
    }

    public function logout(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate(); // 🔥 kills the current session
        $request->session()->regenerateToken(); // 🔄 gives a new CSRF toke 

        return response()->json(['message' => 'Logged out successfully']);
    }
    
    public function user(Request $request)
    {
    return response()->json(Auth::user());
    }
}
