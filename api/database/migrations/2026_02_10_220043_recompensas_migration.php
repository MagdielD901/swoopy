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
        Schema::create('recompensas_nivel', function (Blueprint $table) {
            $table->id('id_recompensa');

            // FK a niveles
            $table->unsignedTinyInteger('nivel');
            $table->foreign('nivel')
                  ->references('nivel')
                  ->on('niveles')
                  ->onDelete('cascade');

            // FK a stickers
            $table->foreignId('id_sticker')
                  ->constrained('stickers', 'id_sticker')
                  ->onDelete('cascade');

            $table->timestamps(); // opcional pero recomendable
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('recompensas_nivel');
    }
};
