<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TareasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tareas = [
            [
                'nombre' => 'Completar perfil',
                'descripcion' => 'Llena todos los campos de tu perfil para obtener diamantes.',
                'diamantes_ganados' => 50,
                'activa' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Publicar primer estado',
                'descripcion' => 'Comparte tu primer estado con la comunidad.',
                'diamantes_ganados' => 30,
                'activa' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Invitar a un amigo',
                'descripcion' => 'Invita a un amigo y ambos recibirán diamantes.',
                'diamantes_ganados' => 100,
                'activa' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Subir foto de perfil',
                'descripcion' => 'Agrega una foto a tu perfil.',
                'diamantes_ganados' => 20,
                'activa' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('tareas')->insert($tareas);
    }
}
