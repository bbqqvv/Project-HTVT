<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            // $token = $user->createToken('auth_token')->plainTextToken;
            $redirectUrl = $this->getDashboardUrl($user->role);

            return response()->json([
                // 'access_token' => $token,
                'token_type' => 'Bearer',
                'user' => new UserResource($user),  // Sử dụng UserResource để định dạng dữ liệu người dùng
                'redirect_url' => $redirectUrl
            ]);
        }

        return response()->json(['message' => 'Invalid login details'], 401);
    }

    public function currentUser(Request $request)
    {
        return response()->json(new UserResource($request->user()));  // Trả về thông tin người dùng hiện tại qua UserResource
    }

    public function getAllUsers()
    {
        $users = User::all();
        return UserResource::collection($users);  // Trả về danh sách tất cả người dùng qua UserResource
    }

    private function getDashboardUrl($role)
    {
        switch ($role) {
            case 'student':
                return '/sinhvien/dashboard';
            case 'faculty':
                return '/khoa/dashboard';
            case 'examDept':
                return '/khaothi/dashboard';
            default:
                return '/login';
        }
    }
}
