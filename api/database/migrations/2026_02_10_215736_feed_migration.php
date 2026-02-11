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
        Schema::create('feed', function (Blueprint $table) {
            $table->id('id_feed');

            // FK a users
            $table->foreignId('id_usuario')
                  ->constrained('users')
                  ->onDelete('cascade');

            // FK a publicidad opcional
            $table->foreignId('id_publicidad')
                  ->nullable()
                  ->constrained('publicidad', 'id_publicidad')
                  ->nullOnDelete();

            $table->string('contenido', 500)->nullable();

            $table->enum('tipo', ['mensaje', 'estado', 'publicidad']);

            $table->dateTime('fecha')->useCurrent();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('feed');
    }
};
