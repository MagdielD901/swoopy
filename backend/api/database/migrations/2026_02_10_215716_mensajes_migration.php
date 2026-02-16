<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('mensajes', function (Blueprint $table) {
            $table->id('id_mensaje');

            // FK a users (tu tabla real)
            $table->foreignId('id_usuario')
                  ->constrained('users') // referencia a users.id
                  ->onDelete('cascade');

            // FK a stickers (PK personalizada)
            $table->foreignId('id_sticker')
                  ->nullable()
                  ->constrained('stickers', 'id_sticker')
                  ->nullOnDelete();

            // FK a marketplace (PK personalizada)
            $table->foreignId('id_marketplace')
                  ->nullable()
                  ->constrained('marketplace', 'id_marketplace')
                  ->nullOnDelete();

            $table->string('mensaje', 500)->nullable();
            $table->string('fotos', 255)->nullable();

            $table->dateTime('fecha_envio')->useCurrent();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('mensajes');
    }
};
