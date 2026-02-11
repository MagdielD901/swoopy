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
        Schema::create('personalizacion', function (Blueprint $table) {
            $table->id('id_personalizacion');

            // FK a users
            $table->foreignId('id_usuario')
                  ->constrained('users') // referencia a users.id
                  ->onDelete('cascade');

            $table->string('tema', 50)->nullable();
            $table->string('fuente', 50)->nullable();
            $table->string('color_principal', 20)->nullable();

            $table->timestamps(); // opcional pero recomendable
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('personalizacion');
    }
};
