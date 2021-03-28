<?php

namespace Tests\Feature;

use App\Models\Exercise;
use App\Models\ExerciseMuscle;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class WorkoutGeneratorTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    
     /** @test */
     public function exercises_can_be_accessed_by_id()
     {
        $this->withoutExceptionHandling();
        $response = $this->get('/api/exercises');

        $response->assertOk();
       var_dump($response);
     
        //$this->assertEquals($response, Exercise::first());
     }
}

