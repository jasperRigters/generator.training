<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class WorkoutController extends Controller
{

    public function generate(request $request)
    {
        //     $getAvailableExercises = $this->getAvailableExercises($request->muscles, $request->tools);

        //     $generatedWorkout = new Workout();

        //     return $getAvailableExercises;
        // }

        // public function getAvailableExercises($muscles, $tools)
        // {
        //     $availableExercisesByMuscle = $this->getAvailableExercisesByMuscles($muscles);
        //     $availableExercisesByTools = $this->getAvailableExercisesByTools($tools);

        //     $availableExercises = array_intersect($availableExercisesByMuscle, $availableExercisesByTools);
        //     return $availableExercisesByTools;
        // }

        // public function getAvailableExercisesByMuscles($muscles)
        // {
        //     $availableExercises = [];

        //     // foreach ($muscles as $muscle) {
        //     //     $exercises = Exercise_muscle::where([
        //     //         ['muscle_id', $muscle],
        //     //         ['prime_mover', '>=', 0],
        //     //     ])->get();

        //     //     foreach ($exercises as $exercise) {
        //     //         array_push($availableExercises, $exercise->exercise_id);
        //     //     }

        //     // }
        //     return $availableExercises;
        // }

        // public function getAvailableExercisesByTools($tools)
        // {
        //     $availableExercises = [];

        //     $exercisesWithAllEssentialToolsAvailaible = $this->getExercisesWithAllEssentialToolsAvailable($tools);

        //     return $exercisesWithAllEssentialToolsAvailaible;
        // }

        // public function getExercisesWithAllEssentialToolsAvailable($tools)
        // {
        //     $exercisesWithEssentialTools = Exercise_tool::where([
        //         ['essential', 1],
        //     ])->get();

        //     return $exercisesWithEssentialTools;
        return 'hello';
    }
}
