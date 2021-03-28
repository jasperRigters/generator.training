<?php

namespace App\Http\Controllers;

use App\Models\Muscle;
use Illuminate\Http\Request;

class MuscleController extends Controller
{

    public function index()
    {
        return Muscle::all();
    }
    public function show($id)
    {
        return Muscle::find($id);
    }





}
