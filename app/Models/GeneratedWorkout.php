<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GeneratedWorkout extends Model
{
    use HasFactory;
    protected $fillable = ['exercises', 'loadCounter'];

    public function __construct(array $attributes = array())
    {
        parent::__construct($attributes);

        $generatedWorkout = $this->generateWorkout($attributes);
        $this->exercises = $generatedWorkout['exercises'];
        $this->loadCounter = $generatedWorkout['loadCounter'];

    }

    public function generateWorkout($attributes)
    {
        $exercises = [];
        $loadCounter = [];

        $availableExercises = Exercise::find($this->getAvailableExercises($attributes['muscles'], $attributes['tools']));
        $exerciseMuscleLoads = $this->getExerciseMuscleLoads($availableExercises);

        for ($i = 1; $i <= $attributes['length']; $i++) {

            if ($i === 1) {

                $exerciseIds = array_values(array_keys($exerciseMuscleLoads));
                $nextExercise = $exerciseIds[random_int(0, count($exerciseIds) - 1)];

            }
            if ($i !== 1) {
                $nextExercise = $this->getNextExercise($exerciseMuscleLoads);

            }

            $loadCounter = $this->updateLoadCounter($loadCounter, $exerciseMuscleLoads[$nextExercise]);

            array_push($exercises, $nextExercise);

            if (isset($exerciseMuscleLoads['lastExercise'])) {
                $exerciseMuscleLoads['secondToLastExercise'] = $exerciseMuscleLoads['lastExercise'];
            }
            $lastExercise = $nextExercise;
            $exerciseMuscleLoads['lastExercise'] = $exerciseMuscleLoads[$nextExercise];
            unset($exerciseMuscleLoads[$lastExercise]);
        }

        foreach ($loadCounter as $key => $value) {
            $loadCounter[$key] = ($value / $attributes['length']) * 4;
        }
        return ['exercises' => $exercises, 'loadCounter' => $loadCounter];
    }

    // <getAvailableExercises>
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

    public function getExercisesWithAvailableTools($tools, $exerciseToolRequirements)
    {
        foreach ($exerciseToolRequirements as $id => $exercise) {
            foreach ($exercise as $tool => $essential) {
                if (in_array($tool, $tools) && $essential === 1) {
                    unset($exerciseToolRequirements[$id][$tool]);
                }
                if (in_array($tool, $tools) && $essential == 0) {
                    foreach (array_keys($exercise, 0) as $key) {
                        unset($exerciseToolRequirements[$id][$key]);
                    }
                }
            }
        }
        return $exerciseToolRequirements;
    }
// </getAvailableExercises>

    public function getExerciseMuscleLoads($exercises)
    {
        $exerciseMuscleLoads = [];

        foreach ($exercises as $exercise) {
            $arr = [];
            foreach ($exercise->muscles as $muscle) {
                if (is_null($muscle->pivot->prime_mover)) {
                    $arr[$muscle->id] = 1;
                }
                if ($muscle->pivot->prime_mover === 0) {
                    $arr[$muscle->id] = 2;
                }
                if ($muscle->pivot->prime_mover === 1) {
                    $arr[$muscle->id] = 3;
                }
            }
            $exerciseMuscleLoads[$exercise->id] = $arr;

        }

        return $exerciseMuscleLoads;
    }

    public function updateLoadCounter($loadCounter, $exercise)
    {

        foreach ($exercise as $muscle => $load) {
            if (!key_exists($muscle, $loadCounter)) {
                $loadCounter[$muscle] = $load;
            } else {
                $loadCounter[$muscle] += $load;
            }
        }

        return $loadCounter;
    }

    public function getNextExercise($exerciseMuscleLoads)
    {
        $fatiguedMuscles = $this->getFatiguedMuscles($exerciseMuscleLoads);
        $availableExercises = $this->getAvailableExercisesByFatiguedMuscles($exerciseMuscleLoads, $fatiguedMuscles);

        $exercises = array_values($availableExercises);

        return $exercises[random_int(0, count($availableExercises) - 1)];
    }

    public function getFatiguedMuscles($exerciseMuscleLoads)
    {
        $fatiguedMuscles = [];

        if (isset($exerciseMuscleLoads['secondToLastExercise'])) {
            foreach ($exerciseMuscleLoads['secondToLastExercise'] as $muscle => $load) {
                foreach ($exerciseMuscleLoads['lastExercise'] as $lastMuscle => $lastLoad) {
                    if (($muscle === $lastMuscle && $load + $lastLoad >= 5) || ($muscle === $lastMuscle && $load == 2 && $lastLoad = 2)) {
                        array_push($fatiguedMuscles, $muscle);
                    }
                }
            }
        }

        foreach ($exerciseMuscleLoads['lastExercise'] as $muscle => $load) {
            if ($load === 3) {
                array_push($fatiguedMuscles, $muscle);
            }
        }
        return array_unique($fatiguedMuscles);
    }

    public function getAvailableExercisesByFatiguedMuscles($exerciseMuscleLoads, $fatiguedMuscles)
    {
        $availableExercises = [];

        foreach ($exerciseMuscleLoads as $exercise => $muscles) {

            if (!is_int($exercise)) {
                unset($exerciseMuscleLoads[$exercise]);
                continue;
            }
            foreach ($muscles as $muscle => $load) {
                if (!in_array($muscle, $fatiguedMuscles)) {
                    array_push($availableExercises, $exercise);
                }
            }
        }
        if (empty($availableExercises)) {
            $exercises = array_values(array_keys($exerciseMuscleLoads));
            array_push($availableExercises, $exercises[random_int(0, count($exercises) - 1)]);

        }
        return array_unique($availableExercises);
    }
}
