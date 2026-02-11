<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RecompensasNivelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $recompensas = [
            ['nivel' => 1, 'id_sticker' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['nivel' => 2, 'id_sticker' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['nivel' => 3, 'id_sticker' => 3, 'created_at' => now(), 'updated_at' => now()],
            ['nivel' => 4, 'id_sticker' => 4, 'created_at' => now(), 'updated_at' => now()],
            ['nivel' => 5, 'id_sticker' => 5, 'created_at' => now(), 'updated_at' => now()],
            ['nivel' => 6, 'id_sticker' => 6, 'created_at' => now(), 'updated_at' => now()],
            ['nivel' => 7, 'id_sticker' => 7, 'created_at' => now(), 'updated_at' => now()],
            ['nivel' => 8, 'id_sticker' => 8, 'created_at' => now(), 'updated_at' => now()],
            ['nivel' => 9, 'id_sticker' => 9, 'created_at' => now(), 'updated_at' => now()],
            ['nivel' => 10, 'id_sticker' => 10, 'created_at' => now(), 'updated_at' => now()],
        ];

        DB::table('recompensas_nivel')->insert($recompensas);
    }
}
