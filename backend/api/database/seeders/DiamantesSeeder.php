<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PuntosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $puntos = [
            [
                'id_usuario' => 2, 
                'diamantes' => 1000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_usuario' => 2, 
                'diamantes' => 150,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_usuario' => 2,
                'diamantes' => 200,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('puntos')->insert($puntos);
    }
}
