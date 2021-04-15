<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Preset extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'presetCategory', 'muscles', 'tools'];
    public function muscles()
    {
        return $this->belongsToMany(Muscle::class);
    }

    public function tools()
    {
        return $this->belongsToMany(Tool::class);
    }
    public function presetCategory()
    {
        return $this->belongsTo(presetCategory::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
