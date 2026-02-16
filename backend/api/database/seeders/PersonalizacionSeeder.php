<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PersonalizacionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $personalizaciones = [
            [
                'id_usuario' => 1, // Admin
                'tema' => 'oscuro',
                'fuente' => 'Arial',
                'color_principal' => '#1E90FF',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_usuario' => 2, // Usuario normal
                'tema' => 'claro',
                'fuente' => 'Roboto',
                'color_principal' => '#FF6347',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('personalizacion')->insert($personalizaciones);
    }
}
