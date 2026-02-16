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
        Schema::create('comentarios', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_usuario')->constrained('usuarios')->onDelete('cascade');
            $table->foreignId('id_feed')->nullable()->constrained('feed')->onDelete('cascade');
            $table->foreignId('id_estado')->nullable()->constrained('estados')->onDelete('cascade');
            $table->foreignId('id_mensaje')->nullable()->constrained('mensajes')->onDelete('cascade');
            $table->string('contenido', 500);
            $table->timestamps(); // created_at será la fecha del comentario
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('comentarios');
    }
};
