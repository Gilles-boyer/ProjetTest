<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Http\Resources\CategoryResource;
use Illuminate\Http\JsonResponse;

class CategoryController extends Controller
{
    public function index(): JsonResponse
    {
        $categories = Category::latest()->get();
        return response()->json(CategoryResource::collection($categories));
    }

    public function store(StoreCategoryRequest $request): JsonResponse
    {
        try {
            $category = Category::create($request->validated());
            return response()->json(new CategoryResource($category), 201);
        } catch (\Throwable $e) {
            return response()->json(['message' => 'Erreur lors de la création de la catégorie.'], 500);
        }
    }

    public function show(Category $category): JsonResponse
    {
        return response()->json(new CategoryResource($category));
    }

    public function update(UpdateCategoryRequest $request, Category $category): JsonResponse
    {
        try {
            $category->update($request->validated());
            return response()->json(new CategoryResource($category));
        } catch (\Throwable $e) {
            return response()->json(['message' => 'Erreur lors de la mise à jour de la catégorie.'], 500);
        }
    }

    public function destroy(Category $category): JsonResponse
    {
        try {
            $category->delete();
            return response()->json(['message' => 'Catégorie supprimée avec succès.'], 200);
        } catch (\Throwable $e) {
            return response()->json(['message' => 'Erreur lors de la suppression de la catégorie.'], 500);
        }
    }
}

