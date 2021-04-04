<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Muscle extends Model
{
    use HasFactory;
    public function exercises()
    {
        return $this->belongsToMany(Exercise::class)
            ->withPivot(['prime_mover']);
    }

    public function muscleGroup()
    {
        return $this->hasOne(MuscleGroup::class);
    }
}
