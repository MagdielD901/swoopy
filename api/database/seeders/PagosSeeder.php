<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PagosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $pagos = [
            [
                'id_usuario' => 2, // Admin
                'monto' => 49.99,
                'metodo_pago' => 'tarjeta',
                'descripcion' => 'Pago de suscripción Pro',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_usuario' => 2, // Usuario normal
                'monto' => 19.99,
                'metodo_pago' => 'paypal',
                'descripcion' => 'Pago de suscripción Premium',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_usuario' => 2,
                'monto' => 1000,
                'metodo_pago' => 'diamantes',
                'descripcion' => 'Compra de diamantes para stickers',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_usuario' => 2,
                'monto' => 5.00,
                'metodo_pago' => 'otro',
                'descripcion' => 'Compra adicional de contenido',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('pagos')->insert($pagos);
    }
}
