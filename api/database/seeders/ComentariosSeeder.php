<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ComentariosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $comentarios = [
            [
                'id_usuario' => 2, 
                'id_feed' => null,
                'id_estado' => null,
                'id_mensaje' => null,
                'contenido' => '¡Gran publicación!',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_usuario' => 2,
                'id_feed' => null,
                'id_estado' => 1,
                'id_mensaje' => null,
                'contenido' => 'Me encanta este estado 😄',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_usuario' => 2,
                'id_feed' => null,
                'id_estado' => null,
                'id_mensaje' => 1,
                'contenido' => 'Gracias por compartir este mensaje!',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_usuario' => 2,
                'id_feed' => null,
                'id_estado' => null,
                'id_mensaje' => null,
                'contenido' => 'Interesante contenido en el feed.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('comentarios')->insert($comentarios);
    }
}
