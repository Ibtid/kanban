<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller {
    // User Sign-Up
    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6|confirmed'
        ]);
    
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
    
        $user = User::create([
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);
    
        // Generate JWT Token for the new user
        $token = JWTAuth::fromUser($user);
    
        return response()->json([
            'message' => 'User created successfully',
            'token' => $token
        ], 201);
    }

    // User Sign-In
    public function login(Request $request) {
        $credentials = $request->only('email', 'password');

        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return response()->json(['token' => $token]);
    }

    // Get Authenticated User
    public function me() {
        return response()->json(auth()->user());
    }
}
