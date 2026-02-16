<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class NivelesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $niveles = [
            ['nivel' => 1, 'diamantes_requeridos' => 0, 'created_at' => now(), 'updated_at' => now()],
            ['nivel' => 2, 'diamantes_requeridos' => 1000, 'created_at' => now(), 'updated_at' => now()],
            ['nivel' => 3, 'diamantes_requeridos' => 2500, 'created_at' => now(), 'updated_at' => now()],
            ['nivel' => 4, 'diamantes_requeridos' => 5000, 'created_at' => now(), 'updated_at' => now()],
            ['nivel' => 5, 'diamantes_requeridos' => 10000, 'created_at' => now(), 'updated_at' => now()],
            ['nivel' => 6, 'diamantes_requeridos' => 20000, 'created_at' => now(), 'updated_at' => now()],
            ['nivel' => 7, 'diamantes_requeridos' => 35000, 'created_at' => now(), 'updated_at' => now()],
            ['nivel' => 8, 'diamantes_requeridos' => 50000, 'created_at' => now(), 'updated_at' => now()],
            ['nivel' => 9, 'diamantes_requeridos' => 75000, 'created_at' => now(), 'updated_at' => now()],
            ['nivel' => 10, 'diamantes_requeridos' => 100000, 'created_at' => now(), 'updated_at' => now()],
        ];

        DB::table('niveles')->insert($niveles);
    }
}
