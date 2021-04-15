<?php

use App\Http\Controllers\ExerciseController;
use App\Http\Controllers\GeneratedWorkoutController;
use App\Http\Controllers\MuscleController;
use App\Http\Controllers\MuscleGroupController;
use App\Http\Controllers\PresetController;
use App\Http\Controllers\ToolController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
 */

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('/presets', [PresetController::class, 'store']);
    Route::post('/logout', [UserController::class, 'logout']);
});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/exercises', [ExerciseController::class, 'index']);
Route::get('/exercises/{id}', [ExerciseController::class, 'show']);

Route::get('/muscles', [MuscleController::class, 'index']);
Route::get('/muscles/{id}', [MuscleController::class, 'show']);

Route::get('/tools', [ToolController::class, 'index']);
Route::get('/tools/{id}', [ToolController::class, 'show']);

Route::get('/musclegroups', [MuscleGroupController::class, 'index']);
Route::get('/musclegroups/{id}', [MuscleGroupController::class, 'show']);

Route::get('/workout', [GeneratedWorkoutController::class, 'generate']);

Route::get('/presets', [PresetController::class, 'index']);

Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);
