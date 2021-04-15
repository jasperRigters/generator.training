<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class presetCategory extends Model
{
    protected $fillable = ['id'];
    use HasFactory;
    public function presets()
    {
        return $this->hasMany(Preset::class);
    }
}
