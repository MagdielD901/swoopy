<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PublicidadSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Insertar publicidad de prueba
        $publicidades = [
            [
                'id_usuario' => 1, // Admin o usuario creador
                'titulo' => 'Promo de Primavera',
                'descripcion' => 'Aprovecha nuestra oferta de primavera en todos los productos.',
                'url_imagen' => '/images/publicidad/primavera.png',
                'fecha_inicio' => now(),
                'fecha_fin' => now()->addDays(30),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_usuario' => 2,
                'titulo' => 'Descuento Especial',
                'descripcion' => 'Descuento del 20% en compras seleccionadas este mes.',
                'url_imagen' => '/images/publicidad/descuento.png',
                'fecha_inicio' => now(),
                'fecha_fin' => now()->addDays(15),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_usuario' => 2,
                'titulo' => 'Nuevo Producto',
                'descripcion' => 'Lanzamiento del nuevo gadget tecnológico que estabas esperando.',
                'url_imagen' => '/images/publicidad/nuevo_producto.png',
                'fecha_inicio' => now(),
                'fecha_fin' => now()->addDays(20),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('publicidad')->insert($publicidades);
    }
}
