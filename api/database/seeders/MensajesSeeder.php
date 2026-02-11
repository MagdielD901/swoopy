<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MensajesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $mensajes = [
            [
                'id_usuario' => 1,
                'id_sticker' => 1, // sticker "Sonrisa"
                'id_marketplace' => null,
                'mensaje' => 'Hola a todos, bienvenidos a la app!',
                'fotos' => null,
                'fecha_envio' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_usuario' => 2,
                'id_sticker' => 2,
                'id_marketplace' => 1, // mensaje relacionado con producto iPhone
                'mensaje' => '¿Alguien ha comprado este iPhone?',
                'fotos' => '/images/mensajes/iphone_chat.png',
                'fecha_envio' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_usuario' => 1,
                'id_sticker' => 2, // sticker "Corazón"
                'id_marketplace' => null,
                'mensaje' => 'Me encanta esta función de stickers!',
                'fotos' => null,
                'fecha_envio' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_usuario' => 2,
                'id_sticker' => 1,
                'id_marketplace' => null,
                'mensaje' => '¡Aquí va un mensaje normal sin sticker ni producto!',
                'fotos' => null,
                'fecha_envio' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('mensajes')->insert($mensajes);
    }
}
