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
        Schema::create('marketplace', function (Blueprint $table) {
    $table->id('id_marketplace');

    $table->foreignId('id_usuario')
          ->constrained('users')
          ->onDelete('cascade');

    $table->string('titulo', 150);
    $table->string('descripcion', 500)->nullable();
    $table->string('imagen', 100)->nullable();

    $table->enum('tipo', ['celular', 'comida', 'ropa', 'otro']);

    $table->decimal('precio', 10, 2)->nullable();

    $table->boolean('da_diamantes')->default(false);
    $table->integer('diamantes_otorgados')->default(0);

    $table->dateTime('fecha_publicacion')->useCurrent();

    $table->timestamps();
});

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
