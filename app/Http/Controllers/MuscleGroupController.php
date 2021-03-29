<?php

namespace App\Http\Controllers;

use App\Models\MuscleGroup;
use Illuminate\Http\Request;

class MuscleGroupController extends Controller
{
    public function index()
    {
        return MuscleGroup::all();
    }
    public function show($id)
    {
        return MuscleGroup::find($id);
    }

}
