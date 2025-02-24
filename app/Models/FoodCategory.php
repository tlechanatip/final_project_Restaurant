<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FoodCategory extends Model
{
    use HasFactory;

    protected $table = 'food_categories'; // ชื่อตารางในฐานข้อมูล

    protected $fillable = [
        'name',
    ];

    /**
     * ความสัมพันธ์ระหว่าง FoodCategory กับ Menu
     * หมายถึง 1 หมวดหมู่มีหลายเมนู
     */
    public function menus()
    {
        return $this->hasMany(Menu::class, 'category');
    }
}
