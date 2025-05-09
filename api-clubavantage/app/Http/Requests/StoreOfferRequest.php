<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOfferRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'category_id' => 'required|exists:categories,id',
            // Optionnel : validation pour l'association avec des comités
            'committees'   => 'sometimes|array',
            'committees.*' => 'exists:committees,id',
        ];
    }
}

