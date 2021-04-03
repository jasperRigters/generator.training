<?php

namespace Tests\Feature;

use App\Models\Muscle;
use App\Models\Tool;
use Tests\TestCase;

class WorkoutGeneratorTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */

    /** @test */
    public function get_request_with_muscles_and_tools_returns_workout()
    {
        $this->withoutExceptionHandling();

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

        $response = $this->get('/api/workout', ['muscles' => $muscles, 'tools' => $tools]);
        $response->assertOk();

    }
}
