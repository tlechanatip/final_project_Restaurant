<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;


class MenuController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $menufood = Menu::all() ;

        //return response()->json(['data' => $menufood]);
        return inertia('Menu/index', [
            'menufood' => $menufood
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $menufood = Menu::all();
        return inertia('Admin/index', [
            'menufood' => $menufood
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required',
            'description' => 'required',
            'price' => 'required',
            'category' => 'required',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|',
        ]);

        try {
            // ใช้ Transaction เพื่อความปลอดภัย
            DB::transaction(function () use ($validated, $request) {
                // 1. หาค่า emp_no ล่าสุด
                $latestid = DB::table('menus')->max('id') ?? 0; // ถ้าไม่มีข้อมูลให้เป็น 0
                $newid = $latestid + 1; // ค่าล่าสุด + 1

                if ($request->hasFile('image')) {
                    $photoPath = $request->file('image')->store('menu_images', 'public');
                } else {
                    $photoPath = null;
                }

                // 2. เพิ่มข้อมูลลงในตาราง employees
                DB::table('menus')->insert([
                    'id' => $newid,
                    'name' => $validated['name'],
                    'description' => $validated['description'],
                    'price' => $validated['price'],
                    'category' => $validated['category'],
                    'image' => $photoPath,
                ]);
            });

            return redirect()->route('menu.index')
                            ->with('success','created successfully.');
        } catch (\Exception $e) {
            // เขียน Log ข้อผิดพลาด
            Log::error('creation failed: ' . $e->getMessage());
            Log::error('Trace: ' . $e->getTraceAsString());
            // ส่ง Flash Message เมื่อเกิดข้อผิดพลาด
            return redirect()
                ->route('admin.index')
                ->with('error', 'creation failed. Please try again.');
        }

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
{
    // ดึงข้อมูลเมนูที่มี id ตรงกับที่ส่งมา
    $menu = Menu::findOrFail($id);

    return inertia('Admin/edit', [  // เปลี่ยนหน้าเป็น Edit แทน index
        'menu' => $menu
    ]);
}


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
{
    $validated = $request->validate([
        'name' => 'required',
        'description' => 'required',
        'price' => 'required',
        'category' => 'required',
        'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|',
    ]);

    try {
        // ดึงข้อมูลเมนูที่ต้องการแก้ไข
        $menu = Menu::findOrFail($id);

        // ใช้ transaction เพื่ออัปเดตข้อมูล
        DB::transaction(function () use ($validated, $request, $menu) {
            if ($request->hasFile('image')) {
                $photoPath = $request->file('image')->store('menu_images', 'public');
            } else {
                $photoPath = $menu->image; // ใช้ค่าเดิมถ้าไม่มีการอัพโหลดภาพใหม่
            }

            // อัปเดตข้อมูล
            $menu->update([
                'name' => $validated['name'],
                'description' => $validated['description'],
                'price' => $validated['price'],
                'category' => $validated['category'],
                'image' => $photoPath,
            ]);
        });

        return redirect()->route('admin.index')
                         ->with('success', 'Updated successfully.');
    } catch (\Exception $e) {
        Log::error('Update failed: ' . $e->getMessage());
        return redirect()
            ->route('menu.index')
            ->with('error', 'Update failed. Please try again.');
    }
}


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try{
            $delmenu = Menu::findOrFail($id); // ค้นหาข้อมูลจาก ID
            $delmenu->delete(); // ลบข้อมูล
        }catch(\Exception $e){
            Log::error($e->getMessage());
            return redirect()
                    ->route('admin.index')
                    ->with('error', 'deleted failed');
        }
        return redirect()
                ->route('admin.index')
                ->with('success', 'deleted successfully');
    }
}
