<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('reservation_id')->constrained()->onDelete('cascade'); // เชื่อมกับการจองโต๊ะ
            $table->decimal('amount', 10, 2); // จำนวนเงินที่ชำระ
            $table->enum('status', ['pending', 'completed', 'failed'])->default('pending'); // สถานะการชำระเงิน
            $table->string('payment_method'); // วิธีการชำระเงิน (เช่น cash, credit card, QR code)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
