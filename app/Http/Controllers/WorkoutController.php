<?php

namespace App\Http\Controllers;

use App\Models\Workout;
use Illuminate\Http\Request;

class WorkoutController extends Controller
{
    public function store(Request $request)
    {

        $workout = new Workout();

        $workout->user()->associate($request->user);
        $workout->save();

        foreach ($request->exercises as $exercise) {
            $workout->exercises()->attach($exercise['id'], ['sets' => $exercise['sets']]);
        }
        return ['message' => 'Workout saved'];
    }

}
