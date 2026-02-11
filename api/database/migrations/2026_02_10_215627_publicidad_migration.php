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
        Schema::create('publicidad', function (Blueprint $table) {
    $table->id('id_publicidad');

    $table->foreignId('id_usuario')
          ->constrained('users')
          ->onDelete('cascade');

    $table->string('titulo', 150);
    $table->string('descripcion', 300);
    $table->string('url_imagen', 255);
    $table->date('fecha_inicio');
    $table->date('fecha_fin');

    $table->timestamps();
});

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('publicidad');
    }
};
