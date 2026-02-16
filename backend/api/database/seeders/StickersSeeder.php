<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StickersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Insertar stickers de prueba
        $stickers = [
            [
                'nombre' => 'Sonrisa',
                'url_imagen' => '/images/stickers/sonrisa.png',
                'es_premium' => false,
                'exclusivo_nivel' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Corazón',
                'url_imagen' => '/images/stickers/corazon.png',
                'es_premium' => true,
                'exclusivo_nivel' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Fuego',
                'url_imagen' => '/images/stickers/fuego.png',
                'es_premium' => true,
                'exclusivo_nivel' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Aplauso',
                'url_imagen' => '/images/stickers/aplauso.png',
                'es_premium' => false,
                'exclusivo_nivel' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('stickers')->insert($stickers);
    }
}
