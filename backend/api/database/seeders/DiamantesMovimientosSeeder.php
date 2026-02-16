<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DiamantesMovimientosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $movimientos = [
            [
                'id_usuario' => 1, // Admin
                'id_tarea' => 1,   // Completar perfil
                'tipo' => 'ganado',
                'cantidad' => 50,
                'descripcion' => 'Diamantes por completar el perfil',
                'fecha' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_usuario' => 2,
                'id_tarea' => 2, // Publicar primer estado
                'tipo' => 'ganado',
                'cantidad' => 30,
                'descripcion' => 'Diamantes por publicar primer estado',
                'fecha' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_usuario' => 2,
                'id_tarea' => 3, // Invitar a un amigo
                'tipo' => 'ganado',
                'cantidad' => 100,
                'descripcion' => 'Diamantes por invitar a un amigo',
                'fecha' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_usuario' => 2,
                'id_tarea' => 4, // movimiento de gasto
                'tipo' => 'gastado',
                'cantidad' => 20,
                'descripcion' => 'Diamantes gastados en stickers',
                'fecha' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('diamantes_movimientos')->insert($movimientos);
    }
}
