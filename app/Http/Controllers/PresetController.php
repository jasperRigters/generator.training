<?php

namespace App\Http\Controllers;

use App\Models\Preset;
use Illuminate\Http\Request;

class PresetController extends Controller
{

    public function store(Request $request)
    {

        $preset = new Preset;
        $preset->name = $request->name;

        if ($request->type == 'muscles') {
            $preset->presetCategory()->associate(1);
            $preset->user()->associate($request->user);
            $preset->save();
            $preset->muscles()->attach($request->items);

        }
        if ($request->type == 'tools') {
            $preset->presetCategory()->associate(2);
            $preset->user()->associate($request->user);
            $preset->save();
            $preset->tools()->attach($request->items);

        }
        return ['message' => 'Preset saved'];
    }

    public function index(Request $request)
    {

        $presets = ['muscles' => [], 'tools' => []];
        $allPresets = Preset::where('user_id', 0)->orWhere('user_id', $request->user)->get();
        foreach ($allPresets as $preset) {
            $arr = ['name' => $preset->name];
            if ($preset->user_id != 0) {
                $arr['custom'] = true;
            }

            if ($preset->preset_category_id == 1) {
                $presetMuscles = $this->getPresetMuscles($preset);
                $arr['muscles'] = $presetMuscles;
                array_push($presets['muscles'], $arr);

            }
            if ($preset->preset_category_id == 2) {
                $presetTools = $this->getPresetTools($preset);
                $arr['tools'] = $presetTools;
                array_push($presets['tools'], $arr);

            }

        }

        return $presets;
    }
    public function delete(Request $request)
    {
        $type = '';
        if ($request->type === 'muscles') {
            $type = 1;
        }
        if ($request->type === 'tools') {
            $type = 2;
        }

        $preset = Preset::where(
            'user_id', '=', $request->user()->id)
            ->where('name', '=', $request->name)
            ->where('preset_category_id', '=', $type)->first();

        return $preset->delete();

    }
    public function getPresetMuscles($preset)
    {
        $arr = [];
        foreach ($preset->muscles as $muscle) {
            array_push($arr, $muscle['name']);
        }
        return $arr;
    }

    public function getPresetTools($preset)
    {
        $arr = [];

        foreach ($preset->tools as $tool) {
            array_push($arr, $tool['name']);
        }
        return $arr;
    }
}
