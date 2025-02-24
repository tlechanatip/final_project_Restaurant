<?php

use App\Http\Controllers\PaymentController;
use App\Http\Controllers\PromotionController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\TableController;
use App\Models\Promotion; // เพิ่มการนำเข้า Promotion Model



Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'menufood' => Route::has('menu.index'),
        'promotions' => Promotion::all() // ส่งข้อมูลโปรโมชั่นไปยังหน้า Welcome
    ]);
});

// เส้นทางสำหรับการจัดการ Promotions (เพิ่ม แก้ไข ลบ)
Route::resource('promotions', PromotionController::class);


//Route::resource('/',PromotionController::class);

// แก้ไขเส้นทางให้แตกต่างกันระหว่าง admin และ menu
Route::middleware('auth')->group(function () {
    Route::get('/menuForadmin',[MenuController::class,'create'])->name('admin.index');
    Route::get('/menuForadmin/edit/{id}', [MenuController::class, 'edit'])->name('admin.edit');
    Route::put('/menuForadmin/update/{id}', [MenuController::class, 'update'])->name('admin.update');
    Route::delete('/menuForadmin/{id}', [MenuController::class, 'destroy'])->name('admin.destroy');
    Route::post('/promotions', [PromotionController::class, 'store'])->name('promotions.store');
    Route::get('/promotions/create', [PromotionController::class, 'create'])->name('promotions.create');
    Route::delete('/promotions/{id}', [PromotionController::class, 'destroy'])->name('promotions.destroy');
    Route::put('/menu/{id}', [MenuController::class, 'update'])->name('menu.update');
    Route::post('/menu', [MenuController::class, 'store'])->name('menu.store');
    Route::delete('/tables/{id}', [TableController::class, 'destroy'])->name('tables.destroy'); // ลบการจอง
    Route::get('/reservations', [PaymentController::class, 'index'])->name('reservations.index');
    Route::delete('/reservations/{id}', [PaymentController::class, 'destroy'])->name('reservations.destroy');
});


// สำหรับการจัดการเมนูในหน้าเมนู
Route::get('/menu', [MenuController::class, 'index'])->name('menu.index');

Route::get('/tables', [TableController::class, 'index'])->name('tables.index');
Route::put('/tables/{id}', [TableController::class, 'update'])->name('tables.update'); // อัปเดตการจอง
Route::post('/tables', [TableController::class, 'store'])->name('tables.store');
Route::get('/tables/{id}/edit', [TableController::class, 'edit'])->name('tables.edit'); // หน้าแก้ไขการจอง


Route::get('/admin', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    //Route::get('/employees',[EmployeesController::class,'index'])->name('employees.index');
});

require __DIR__.'/auth.php';
