<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GruposSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $grupos = [
            [
                'nombre' => 'Grupo de Música',
                'descripcion' => 'Comparte tus canciones favoritas y playlists.',
                'contenido' => 'Bienvenidos a todos los amantes de la música!',
                'stickers' => true,
                'fotos' => '/images/grupos/musica.png',
                'fecha_creacion' => now(),
                'id_usuario' => 1, // Admin
                'rol' => 'admin',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Amigos del Deporte',
                'descripcion' => 'Discute partidos y organiza encuentros deportivos.',
                'contenido' => '¡Entrenamientos y torneos cada semana!',
                'stickers' => false,
                'fotos' => '/images/grupos/deporte.png',
                'fecha_creacion' => now(),
                'id_usuario' => 2, // Usuario normal
                'rol' => 'admin',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Cocina Creativa',
                'descripcion' => 'Comparte recetas y tips de cocina.',
                'contenido' => '¡A cocinar se ha dicho!',
                'stickers' => true,
                'fotos' => '/images/grupos/cocina.png',
                'fecha_creacion' => now(),
                'id_usuario' => 1,
                'rol' => 'admin',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('grupos')->insert($grupos);
    }
}
