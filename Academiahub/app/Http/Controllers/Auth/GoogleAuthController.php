<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserRole;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class GoogleAuthController extends Controller
{
    /**
     * Test endpoint to verify Google config is loaded
     */
    public function testConfig()
    {
        return response()->json([
            'google_client_id' => config('services.google.client_id') ? 'SET' : 'NOT SET',
            'google_redirect' => config('services.google.redirect'),
            'app_url' => config('app.url'),
            'auth_user' => Auth::check() ? Auth::user()->email : 'Not authenticated',
        ]);
    }

    /**
     * Redirect to Google OAuth page
     */
    public function redirectToGoogle(Request $request)
    {
        $source = $request->query('source', 'register');
        session(['oauth_source' => $source]);

        Log::info('Redirecting to Google OAuth', ['source' => $source]);
        return Socialite::driver('google')->redirect();
    }

    /**
     * Handle Google OAuth callback
     */
    public function handleGoogleCallback()
    {
        try {
            Log::info('=== Google OAuth callback initiated ===');

            Log::info('Attempting to get Google user via Socialite');

            // For local development, disable SSL verification by configuring Guzzle directly
            $googleUser = null;
            if (app()->environment('local')) {
                Log::info('Running in local environment, disabling SSL verification');

                try {
                    // Create a Guzzle client with SSL verification disabled
                    $guzzleClient = new \GuzzleHttp\Client([
                        'verify' => false,
                        'timeout' => 30,
                    ]);

                    // Get the Socialite driver and inject our custom Guzzle client
                    $driver = Socialite::driver('google');

                    // Use reflection to set the HTTP client
                    $reflection = new \ReflectionClass($driver);
                    $property = $reflection->getProperty('httpClient');
                    $property->setAccessible(true);
                    $property->setValue($driver, $guzzleClient);

                    $googleUser = $driver->user();
                } catch (\Throwable $e) {
                    Log::error('Failed with SSL disabled, trying standard method', [
                        'error' => $e->getMessage(),
                    ]);
                    $googleUser = Socialite::driver('google')->user();
                }
            } else {
                $googleUser = Socialite::driver('google')->user();
            }

            Log::info('Successfully retrieved Google user', [
                'email' => $googleUser->getEmail(),
                'name' => $googleUser->getName(),
                'id' => $googleUser->getId(),
            ]);

            Log::info('Google user data received', [
                'email' => $googleUser->getEmail(),
                'name' => $googleUser->getName(),
                'id' => $googleUser->getId(),
            ]);

            // Check if user already exists
            $user = User::where('email', $googleUser->getEmail())->first();
            $oauthSource = session('oauth_source', 'register');

            if ($user) {
                Log::info('Existing user found', ['user_id' => $user->id, 'email' => $user->email]);
                $isNewUser = false;
            } else {
                // User doesn't exist
                if ($oauthSource === 'login') {
                    // Came from login page but user doesn't exist - redirect to register
                    Log::info('User tried to login but account does not exist. Redirecting to register.');
                    return redirect('/register')
                        ->with('toast', [
                            'type' => 'error',
                            'message' => 'Please register first, then sign in.',
                        ])
                        ->with('google_email', $googleUser->getEmail())
                        ->with('google_name', $googleUser->getName());
                }

                // Came from register page - check if email already exists
                Log::info('Creating new user from Google OAuth');

                // Get or create student role
                $studentRole = UserRole::where('name', 'student')->first();

                if (!$studentRole) {
                    Log::info('Student role not found, creating it');
                    $studentRole = UserRole::create([
                        'name' => 'student',
                        'display_name' => 'Student',
                    ]);
                }

                // Create new user
                $user = User::create([
                    'name' => $googleUser->getName() ?? 'Google User',
                    'email' => $googleUser->getEmail(),
                    'password' => Hash::make(Str::random(24)),
                    'email_verified_at' => now(),
                    'user_role_id' => $studentRole->id,
                    'role' => 'student',
                    'is_old_student' => false,
                ]);

                Log::info('New user created', ['user_id' => $user->id, 'email' => $user->email]);
                $isNewUser = true;
            }

            // Login the user
            Auth::login($user, remember: true);

            // Regenerate session to prevent session fixation attacks
            request()->session()->regenerate();

            Log::info('User authenticated', [
                'user_id' => $user->id,
                'is_authenticated' => Auth::check(),
            ]);

            // Verify user is authenticated
            if (!Auth::check()) {
                Log::error('Authentication failed after login attempt', ['user_id' => $user->id]);
                throw new \Exception('Failed to authenticate user');
            }

            // Determine redirect based on role
            $redirectPath = match ($user->role) {
                'admin' => '/admin/dashboard',
                'teacher' => '/teacher/dashboard',
                'student' => '/student/dashboard',
                default => '/dashboard',
            };

            // Prepare toast message
            $toastMessage = $isNewUser
                ? 'Account created successfully! Welcome to AcademiaHub.'
                : 'Logged in successfully!';

            Log::info('Redirecting authenticated user', [
                'user_id' => $user->id,
                'role' => $user->role,
                'redirect_path' => $redirectPath,
                'is_new_user' => $isNewUser,
            ]);

            return redirect($redirectPath)
                ->with('toast', [
                    'type' => 'success',
                    'message' => $toastMessage,
                ]);
        } catch (\Throwable $e) {
            Log::error('=== Google OAuth error (Throwable) ===', [
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect('/login')
                ->with('toast', [
                    'type' => 'error',
                    'message' => 'Google authentication failed: ' . $e->getMessage(),
                ]);
        }
    }
}
