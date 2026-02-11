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
        Schema::create('puntos', function (Blueprint $table) {
            $table->id('id_puntos');

            // FK a users
            $table->foreignId('id_usuario')
                  ->constrained('users') // referencia a users.id
                  ->onDelete('cascade');

            $table->integer('diamantes')->default(0);

            $table->timestamps(); // opcional pero recomendable
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('puntos');
    }
};
