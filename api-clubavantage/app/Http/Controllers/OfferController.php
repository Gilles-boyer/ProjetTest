<?php

namespace App\Http\Controllers;

use App\Models\Offer;
use App\Http\Requests\StoreOfferRequest;
use App\Http\Requests\UpdateOfferRequest;
use App\Http\Resources\OfferResource;
use Illuminate\Http\JsonResponse;

class OfferController extends Controller
{
    /**
     * Affiche la liste des offres.
     */
    public function index(): JsonResponse
    {
        $offers = Offer::latest()->get();
        return response()->json(OfferResource::collection($offers));
    }

    /**
     * Crée une nouvelle offre.
     */
    public function store(StoreOfferRequest $request): JsonResponse
    {
        try {
            $offer = Offer::create($request->validated());

            // Si on souhaite gérer l'association avec des comités, on peut traiter un tableau 'committees'
            // if ($request->filled('committees')) {
            //     $offer->committees()->sync($request->input('committees'));
            // }

            return response()->json(new OfferResource($offer), 201);
        } catch (\Throwable $e) {
            return response()->json(['message' => 'Erreur lors de la création de l\'offre.'], 500);
        }
    }

    /**
     * Affiche une offre donnée.
     */
    public function show(Offer $offer): JsonResponse
    {
        return response()->json(new OfferResource($offer));
    }

    /**
     * Met à jour une offre.
     */
    public function update(UpdateOfferRequest $request, Offer $offer): JsonResponse
    {
        try {
            $offer->update($request->validated());

            // Mise à jour de l'association avec des comités si fourni
            // if ($request->has('committees')) {
            //     //$offer->committees()->sync($request->input('committees'));
            // }
            return response()->json(new OfferResource($offer));
        } catch (\Throwable $e) {
            return response()->json(['message' => 'Erreur lors de la mise à jour de l\'offre.'], 500);
        }
    }

    /**
     * Supprime une offre.
     */
    public function destroy(Offer $offer): JsonResponse
    {
        try {
            $offer->delete();
            return response()->json(['message' => 'Offre supprimée avec succès.'], 200);
        } catch (\Throwable $e) {
            return response()->json(['message' => 'Erreur lors de la suppression de l\'offre.'], 500);
        }
    }
}
