<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EstadosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Insertar estados fijos para los usuarios existentes
        // Asegúrate que los usuarios con estos IDs existan en la tabla 'users'
        $estados = [
            [
                'id_usuario' => 1, // Admin
                'contenido' => 'Bienvenido a la plataforma, soy el admin.',
                'fecha_publicacion' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_usuario' => 2, // Usuario de prueba
                'contenido' => 'Hola a todos, este es mi primer estado.',
                'fecha_publicacion' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('estados')->insert($estados);
    }
}
