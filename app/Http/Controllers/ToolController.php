<?php

namespace App\Http\Controllers;

use App\Models\Tool;
use Illuminate\Http\Request;

class ToolController extends Controller
{
    public function index()
    {
        return Tool::all();
    }

    public function show($id)
    {
        return Tool::find($id);
    }

}
