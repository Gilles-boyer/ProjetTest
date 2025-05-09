<?php

use App\Http\Controllers\CategoryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OfferController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('categories')->group(function () {
    Route::get('/', [CategoryController::class, 'index']);
    Route::post('/', [CategoryController::class, 'store']);
    Route::get('/{category}', [CategoryController::class, 'show']);
    Route::put('/{category}', [CategoryController::class, 'update']);
    Route::delete('/{category}', [CategoryController::class, 'destroy']);
});



Route::prefix('offers')->group(function () {
    Route::get('/', [OfferController::class, 'index']);
    Route::post('/', [OfferController::class, 'store']);
    Route::get('/{offer}', [OfferController::class, 'show']);
    Route::put('/{offer}', [OfferController::class, 'update']);
    Route::delete('/{offer}', [OfferController::class, 'destroy']);
});

