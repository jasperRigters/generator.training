<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Workout extends Model
{
    use HasFactory;
    public function exercises()
    {
        return $this->belongsToMany(Exercise::class)
            ->withPivot(['sets']);

    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
