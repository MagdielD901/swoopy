<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MarketplaceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $productos = [
            [
                'id_usuario' => 1,
                'titulo' => 'iPhone 14 Pro',
                'descripcion' => 'Último modelo de iPhone, completamente nuevo.',
                'imagen' => '/images/marketplace/iphone14.png',
                'tipo' => 'celular',
                'precio' => 1200.00,
                'da_diamantes' => true,
                'diamantes_otorgados' => 50,
                'fecha_publicacion' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_usuario' => 2,
                'titulo' => 'Pizza Familiar',
                'descripcion' => 'Pizza grande con extra queso y pepperoni.',
                'imagen' => '/images/marketplace/pizza.png',
                'tipo' => 'comida',
                'precio' => 15.50,
                'da_diamantes' => false,
                'diamantes_otorgados' => 0,
                'fecha_publicacion' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_usuario' => 1,
                'titulo' => 'Camiseta Deportiva',
                'descripcion' => 'Camiseta transpirable para entrenamiento.',
                'imagen' => '/images/marketplace/camiseta.png',
                'tipo' => 'ropa',
                'precio' => 25.00,
                'da_diamantes' => false,
                'diamantes_otorgados' => 0,
                'fecha_publicacion' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_usuario' => 2,
                'titulo' => 'Libro de Cocina',
                'descripcion' => 'Recetas fáciles y rápidas para todos.',
                'imagen' => '/images/marketplace/libro_cocina.png',
                'tipo' => 'otro',
                'precio' => 12.99,
                'da_diamantes' => true,
                'diamantes_otorgados' => 10,
                'fecha_publicacion' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('marketplace')->insert($productos);
    }
}
