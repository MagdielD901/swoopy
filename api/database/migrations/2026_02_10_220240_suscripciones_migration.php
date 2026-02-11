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
        Schema::create('suscripciones', function (Blueprint $table) {
            $table->id('id_suscripcion');

            // FK a users
            $table->foreignId('id_usuario')
                  ->constrained('users') // referencia a users.id
                  ->onDelete('cascade');

            $table->enum('tipo', ['gratis','premium','pro'])->default('gratis');

            $table->boolean('stickers_premium')->default(false);
            $table->boolean('contenido_educativo')->default(false);
            $table->boolean('quitar_anuncios')->default(false);
            $table->boolean('tema_personalizado')->default(false);
            $table->boolean('badge_pro')->default(false);

            $table->integer('precio_diamantes')->default(0);

            $table->date('fecha_inicio')->nullable();
            $table->date('fecha_fin')->nullable();

            $table->timestamps(); // opcional pero recomendable
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('suscripciones');
    }
};
