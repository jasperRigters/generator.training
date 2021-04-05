<?php

namespace App\Http\Controllers;

use App\Models\GeneratedWorkout;
use Illuminate\Http\Request;

class GeneratedWorkoutController extends Controller
{
    public function generate(request $request)
    {
        $workout = new GeneratedWorkout(['muscles' => $request->muscles,
            'tools' => $request->tools, 'length' => $request->length]);

        return $workout;
    }

}
