<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // --- Usuario Administrador ---
        DB::table('users')->insert([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'email_verified_at' => now(),
            'password' => Hash::make('password123'),
            'telefono' => '1234567890',
            'nivel' => 10,
            'remember_token' => Str::random(10),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // --- Usuario Normal ---
        DB::table('users')->insert([
            'name' => 'Juan Pérez',
            'email' => 'juanperez@example.com',
            'email_verified_at' => now(),
            'password' => Hash::make('123456'),
            'telefono' => '9876543210',
            'nivel' => 1,
            'remember_token' => Str::random(10),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}

