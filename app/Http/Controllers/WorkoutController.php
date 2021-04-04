<?php

namespace App\Http\Controllers;

use App\Models\Exercise;
use App\Models\Muscle;
use Illuminate\Http\Request;

class WorkoutController extends Controller
{
    public function generate(request $request)
    {
        $availableExercises = $this->getAvailableExercises($request->muscles, $request->tools);

        return $availableExercises;
    }

    public function getAvailableExercises($muscles, $tools)
    {
        $availableExercisesByMuscle = $this->getAvailableExercisesByMuscles($muscles);
        $availableExercisesByTools = $this->getAvailableExercisesByTools($tools);

        return array_intersect($availableExercisesByTools, $availableExercisesByMuscle);
    }

    public function getAvailableExercisesByMuscles($muscles)
    {
        $availableExercises = [];
        $muscles = Muscle::find($muscles);

        foreach ($muscles as $muscle) {

            foreach ($muscle->exercises as $exercise) {
                if ($exercise->pivot->prime_mover !== null) {
                    array_push($availableExercises, $exercise->id);
                }
            }
        }

        return array_unique($availableExercises);
    }

    public function getAvailableExercisesByTools($tools)
    {
        $availableExercises = [];

        //Create array containing all exercises in the format:
        //$exercises = [exercise_id => [tool_id => essential]]
        $exerciseToolRequirements = $this->getExerciseToolRequirements();

        $exercisesWithAvailableTools = $this->getExercisesWithAvailableTools($tools, $exerciseToolRequirements);

        foreach ($exercisesWithAvailableTools as $id => $exercise) {
            if (empty($exercise)) {
                array_push($availableExercises, $id);
            }
        }

        return $availableExercises;
    }

    public function getExerciseToolRequirements()
    {
        $exercises = [];

        $allExercises = Exercise::all();
        foreach ($allExercises as $exercise) {
            $result = [];
            foreach ($exercise->tools as $tool) {
                $result[$tool->id] = $tool->pivot->essential;
            }
            $exercises[$exercise->id] = $result;
        }
        return $exercises;
    }

    public function getExercisesWithAvailableTools($tools, $exercises)
    {
        $availableExercises = [];

        foreach ($exercises as $id => $exercise) {
            foreach ($exercise as $tool => $essential) {
                if (in_array($tool, $tools) && $essential === 1) {
                    unset($exercises[$id][$tool]);
                }
                if (in_array($tool, $tools) && $essential == 0) {
                    foreach (array_keys($exercise, 0) as $key) {
                        unset($exercises[$id][$key]);
                    }
                }
            }
        }

        return $exercises;
    }

}
