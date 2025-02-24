<?php
use App\Http\Controllers\MenuFoodController;


Route::apiResource('menu-food', MenuFoodController::class);
Route::post('menu-food/upload', [MenuFoodController::class, 'store']);

