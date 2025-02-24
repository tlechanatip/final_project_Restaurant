<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
            'role' => 'required|in:admin', // ✅ อนุญาตให้ user หรือ admin สมัคร
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password), // ✅ เข้ารหัสเฉพาะตอนสมัคร
            'role' => $request->role,
        ]);

        return response()->json([
            'message' => 'User registered successfully',
            'user' => $user
        ], 201);
    }
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // ✅ ค้นหาผู้ใช้จากอีเมล
        $user = User::where('email', $request->email)->first();

        // ✅ ตรวจสอบว่าผู้ใช้มีอยู่ และรหัสผ่านถูกต้อง
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'อีเมลหรือรหัสผ่านไม่ถูกต้อง'], 401);
        }

        // ✅ เคลียร์ Token เก่าก่อน
        $user->tokens()->delete();

        // ✅ สร้าง Token ใหม่
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'auth' => ['user' => $user], // ✅ ให้ Inertia รับค่า `auth.user`
            'token' => $token,
        ]);
    }


    // ออกจากระบบ
    public function logout(Request $request)
    {
        $user = Auth::user();
        if ($user) {
            $user->tokens()->delete(); // ลบ token ทั้งหมดของ user
        }

        Auth::logout(); // ลบ session ของ user
        return response()->json(['message' => 'Logged out successfully']);
    }
}
