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
        Schema::create('grupos', function (Blueprint $table) {
            $table->id('id_grupo');

            $table->string('nombre', 100);
            $table->string('descripcion', 300)->nullable();
            $table->string('contenido', 500)->nullable();

            $table->boolean('stickers')->default(false);
            $table->string('fotos', 255)->nullable();

            $table->dateTime('fecha_creacion')->useCurrent();

            // FK a users
            $table->foreignId('id_usuario')
                  ->constrained('users') // referencia a users.id
                  ->onDelete('cascade');

            // Rol en el grupo
            $table->enum('rol', ['admin', 'miembro'])->default('miembro');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('grupos');
    }
};
