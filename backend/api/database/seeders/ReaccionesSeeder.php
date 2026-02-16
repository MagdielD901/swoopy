<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ReaccionesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $reacciones = [
            [
                'id_usuario' => 2,
                'tipo' => 'like',
                'id_feed' => null,
                'id_estado' => null,
                'id_mensaje' => null,
                'id_comentario' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_usuario' => 2,
                'tipo' => 'love',
                'id_feed' => null,
                'id_estado' => 1,
                'id_mensaje' => null,
                'id_comentario' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_usuario' => 2,
                'tipo' => 'haha',
                'id_feed' => null,
                'id_estado' => null,
                'id_mensaje' => 1,
                'id_comentario' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_usuario' => 2,
                'tipo' => 'wow',
                'id_feed' => null,
                'id_estado' => null,
                'id_mensaje' => null,
                'id_comentario' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('reacciones')->insert($reacciones);
    }
}
