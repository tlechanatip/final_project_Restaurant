<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use App\Models\Payment;
use App\Models\Table;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class TableController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tables = Table::all();
        $reservations = Reservation::all();
        $payments = Payment::all();

        return inertia('Table/index', [
            'tables' => $tables,
            'reservations' => $reservations,
            'payments' => $payments
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

    $validated = $request->validate([
        'table_id' => 'required|exists:tables,id',
        'customer_name' => 'required|string|max:255',
        'customer_phone' => 'required|string|max:15',
        'reservation_time' => 'required|date',
        'amount' => 'required|numeric',
        'payment_method' => 'required|string',
    ]);


        log::info($validated);

        $reservation = Reservation::create([
            'table_id' => $validated['table_id'],
            'customer_name' => $validated['customer_name'],
            'customer_phone' => $validated['customer_phone'],
            'reservation_time' => $validated['reservation_time'],
            'status' => 'confirmed',
        ]);


        // Create the payment record
        Payment::create([
            'reservation_id' => $reservation->id,
            'amount' => $validated['amount'],
            'payment_method' => $validated['payment_method'],
            'status' => 'completed',
        ]);

        Table::where('id', $validated['table_id'])->update(['status' => 'reserved']);
        
        // Redirect back with a success message (using Inertia)
        return redirect()->route('tables.index')->with('success', 'Table reserved successfully!');
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
    public function edit($id)
    {
        return Inertia::render('TableCRUD/EditTable', [
            'tableId' => $id,  // ส่งข้อมูล ID ของโต๊ะเพื่อใช้ในหน้าแก้ไข
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:pending,confirmed,cancelled',
        ]);

        $reservation = Reservation::findOrFail($id);
        $reservation->update(['status' => $request->status]);

        return redirect()->route('tables.index')->with('success', 'Reservation updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $reservation = Reservation::findOrFail($id);
        $reservation->delete();

        return redirect()->route('tables.index')->with('success', 'Reservation cancelled successfully!');
    }
}
