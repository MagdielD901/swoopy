<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FeedSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $feeds = [
            [
                'id_usuario' => 1,
                'id_publicidad' => null, // Publicidad del admin
                'contenido' => 'No te pierdas nuestra promo de primavera!',
                'tipo' => 'publicidad',
                'fecha' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_usuario' => 2,
                'id_publicidad' => null,
                'contenido' => 'Hola a todos, este es mi primer mensaje en el feed.',
                'tipo' => 'mensaje',
                'fecha' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_usuario' => 1,
                'id_publicidad' => null,
                'contenido' => '¡Acabo de publicar un nuevo estado!',
                'tipo' => 'estado',
                'fecha' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_usuario' => 1,
                'id_publicidad' => null, // Otra publicidad de usuario 2
                'contenido' => 'Descuento especial disponible por tiempo limitado.',
                'tipo' => 'publicidad',
                'fecha' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('feed')->insert($feeds);
    }
}
