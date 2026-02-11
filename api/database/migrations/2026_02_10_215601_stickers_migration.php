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
        Schema::create('stickers', function (Blueprint $table) {
            $table->id('id_sticker'); // INT AUTO_INCREMENT PRIMARY KEY
            $table->string('nombre', 100);
            $table->string('url_imagen', 255);
            $table->boolean('es_premium')->default(false);
            $table->boolean('exclusivo_nivel')->default(false);
            $table->timestamps(); // Opcional pero recomendado
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stickers');
    }
};
