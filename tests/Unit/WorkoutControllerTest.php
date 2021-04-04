<?php

namespace Tests\Feature;

use App\Http\Controllers\WorkoutController;
use App\Models\Muscle;
use App\Models\Tool;
use Tests\TestCase;

class WorkoutControllerTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */

    /** @test */
    public function getAvailableExercises()
    {
        $this->withoutExceptionHandling();
        $test = new WorkoutController();

        $allMuscles = Muscle::all();
        $muscles = [];
        foreach ($allMuscles as $muscle) {
            array_push($muscles, $muscle->id);
        }
        $allTools = Tool::all();

        $tools = [];
        foreach ($allTools as $tool) {

            array_push($tools, $tool->id);
        }

        $availableExercises = $test->getAvailableExercises($muscles, $tools);

        $this->AssertIsArray($availableExercises);
        $this->assertContainsOnly('integer', $availableExercises);

        $availableExercisesByMuscle = $test->getAvailableExercisesByMuscles($muscles);
    }

}
