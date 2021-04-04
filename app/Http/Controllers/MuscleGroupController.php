<?php

namespace App\Http\Controllers;

use App\Models\MuscleGroup;

class MuscleGroupController extends Controller
{
    public function index()
    {
        return MuscleGroup::all();
    }
}
