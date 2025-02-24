<?php

namespace App\Http\Controllers;

use App\Models\Tables;
use App\Models\Payment;
use App\Models\Reservation;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;


class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $customers = DB::table('reservations')
            ->join('tables', 'reservations.table_id', '=', 'tables.id')
            ->join('payments', 'reservations.id', '=', 'payments.reservation_id')
            ->select('tables.name','reservations.customer_name',
            'reservations.customer_phone', 'reservations.reservation_time', 'payments.status','reservations.id')
            ->get();

        log::info($customers);

        return Inertia::render('Admin/Payment/index', [
            'customers' => $customers,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
{
    try {
        Log::info("กำลังลบ Reservation ID: " . json_encode($id));

        DB::beginTransaction();

        // ตรวจสอบว่า id มีอยู่จริง
        $reservation = Reservation::find($id);
        if (!$reservation) {
            Log::error("ไม่พบการจอง ID: " . $id);
            return response()->json(['error' => 'ไม่พบข้อมูลการจอง'], 404);
        }

        // ลบการชำระเงินก่อน
        DB::table('payments')->where('reservation_id', $id)->delete();

        // เปลี่ยนสถานะโต๊ะกลับเป็น available
        DB::table('tables')->where('id', $reservation->table_id)->update([
            'status' => 'available'
        ]);

        // ลบการจอง
        $reservation->delete();

        DB::commit();

        return redirect()->route('reservations.index')->with('success', 'Reservation delete successfully!');
    } catch (\Exception $e) {
        DB::rollBack();
        Log::error("เกิดข้อผิดพลาดในการลบข้อมูล: " . $e->getMessage());
        return response()->json(['error' => 'เกิดข้อผิดพลาดในการลบข้อมูล'], 500);
    }
}



}
