<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateOfferRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title'       => 'sometimes|required|string|max:255',
            'description' => 'sometimes|nullable|string',
            'category_id' => 'sometimes|required|exists:categories,id',
            // Optionnel : validation pour l'association avec des comités
            'committees'   => 'sometimes|array',
            'committees.*' => 'exists:committees,id',
        ];
    }
}

