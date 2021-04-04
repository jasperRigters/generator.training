<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Exercise extends Model
{
    use HasFactory;

    public function muscles()
    {
        return $this->belongsToMany(Muscle::class)
            ->withPivot(['prime_mover']);
    }

    public function tools()
    {
        return $this->belongsToMany(Tool::class)
            ->withPivot(['essential']);
    }
}
