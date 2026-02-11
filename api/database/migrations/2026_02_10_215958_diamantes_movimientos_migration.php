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
        Schema::create('diamantes_movimientos', function (Blueprint $table) {
            $table->id('id_movimiento');

            // FK a users
            $table->foreignId('id_usuario')
                  ->constrained('users') // referencia a users.id
                  ->onDelete('cascade');

            // FK a tareas (opcional)
            $table->foreignId('id_tarea')
                  ->nullable()
                  ->constrained('tareas', 'id_tarea')
                  ->nullOnDelete();

            $table->enum('tipo', ['ganado', 'gastado']);
            $table->integer('cantidad');
            $table->string('descripcion', 300)->nullable();

            $table->dateTime('fecha')->useCurrent();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('diamantes_movimientos');
    }
};
