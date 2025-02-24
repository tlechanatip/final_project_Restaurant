<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::create('tables', function (Blueprint $table) {
        $table->id();
        $table->string('name'); // ชื่อโต๊ะ (เช่น "โต๊ะ 1", "โต๊ะ 2")
        $table->enum('status', ['available', 'reserved', 'occupied'])->default('available'); // สถานะของโต๊ะ
        $table->timestamps();
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tables');
    }
};
