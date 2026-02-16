<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SuscripcionesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $suscripciones = [
            [
                'id_usuario' => 2, 
                'tipo' => 'gratis',
                'stickers_premium' => false,
                'contenido_educativo' => false,
                'quitar_anuncios' => false,
                'tema_personalizado' => false,
                'badge_pro' => false,
                'precio_diamantes' => 0,
                'fecha_inicio' => null,
                'fecha_fin' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('suscripciones')->insert($suscripciones);
    }
}
