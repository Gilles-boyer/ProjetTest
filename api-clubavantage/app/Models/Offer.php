<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Offer extends Model
{
    /** @use HasFactory<\Database\Factories\OfferFactory> */
        use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'category_id',
    ];

    /**
     * Une offre appartient à une catégorie.
     */
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Une offre peut être attribuée à plusieurs comités.
     */
    public function committees()
    {
        //return $this->belongsToMany(Committee::class, 'committee_offer')->withTimestamps();
    }
}
