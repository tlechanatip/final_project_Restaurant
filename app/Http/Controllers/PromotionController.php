<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Promotion;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

class PromotionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $promotions = Promotion::all();

        return Inertia::render('Admin/Promotion/promotion', [
            'promotions' => $promotions,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Promotion/PromotionCreate');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif',
        ]);

        $promotion = new Promotion();
        $promotion->title = $request->input('title');

        // Handle Image Upload
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('image_promotion', 'public');
            $promotion->image = $imagePath;
        }

        // Save Promotion
        $promotion->save();

        return redirect()->route('promotions.index');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $promotion = Promotion::findOrFail($id);
        return Inertia::render('Admin/Promotion/PromotionEdit', [
            'promotion' => $promotion
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
{
    $validated = $request->validate([
        'title' => 'required|string|max:255',
        'image' => 'nullable|image|mimes:jpeg,png,jpg,gif',
    ]);

    try {
        // ดึงข้อมูลโปรโมชั่นที่ต้องการแก้ไข
        $promotion = Promotion::findOrFail($id);

        // ใช้ transaction เพื่ออัปเดตข้อมูล
        DB::transaction(function () use ($validated, $request, $promotion) {
            // ตรวจสอบการอัปโหลดรูปภาพ
            if ($request->hasFile('image')) {
                $imagePath = $request->file('image')->store('image_promotion', 'public');
            } else {
                $imagePath = $promotion->image; // ใช้ค่าเดิมถ้าไม่มีการอัปโหลดภาพใหม่
            }

            // อัปเดตข้อมูลโปรโมชั่น
            $promotion->update([
                'title' => $validated['title'],
                'image' => $imagePath, // อัปเดตรูปภาพ
            ]);
        });

        return redirect()->route('promotions.index')->with('success', 'Updated successfully.');
    } catch (\Exception $e) {
        Log::error('Update failed: ' . $e->getMessage());
        return redirect()->route('promotions.index')->with('error', 'Update failed. Please try again.');
    }
}




    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $promotion = Promotion::findOrFail($id);
        $promotion->delete();

        return redirect()->route('promotions.index');
    }
}
