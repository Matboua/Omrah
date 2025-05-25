<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class UserSeeder extends Seeder
{
    public function run()
    {
        $users = [
            [
                'cin' => 'jb524739',
                'first_name' => 'Othman',
                'last_name' => 'Elhyane',
                'phone' => '0603231600',
                'email' => 'othman@gmail.com',
                'city' => 'Inezgane',
                'role' => 'admin'
            ],
            [
                'cin' => 'jb520110',
                'first_name' => 'Oussama',
                'last_name' => 'Matboua',
                'phone' => '0605776853',
                'email' => 'matboua@gmail.com',
                'city' => 'Inezgane',
                'role' => 'admin'
            ],
            [
                'cin' => 'jb100223',
                'first_name' => 'Amine',
                'last_name' => 'Jamali',
                'phone' => '0502302255',
                'email' => 'oussamalolo@gmail.com',
                'city' => 'Souira',
                'role' => 'client'
            ],
            [
                'cin' => 'jc100223',
                'first_name' => 'Othman',
                'last_name' => 'Elhyane',
                'phone' => '0601022331',
                'email' => 'elhyane@gmail.com',
                'city' => 'Agadir',
                'role' => 'client'
            ],
            [
                'cin' => 'cb100223',
                'first_name' => 'Yassine',
                'last_name' => 'Bennani',
                'phone' => '0654789652',
                'email' => 'ybennani@hotmail.com',
                'city' => 'Casablanca',
                'role' => 'client'
            ],
            [
                'cin' => 'ec155563',
                'first_name' => 'Fatima',
                'last_name' => 'El Amrani',
                'phone' => '0701122334',
                'email' => 'fatima.elamrani@yahoo.com',
                'city' => 'Marrakech',
                'role' => 'client'
            ],
            [
                'cin' => 'ks202300',
                'first_name' => 'Khalid',
                'last_name' => 'Saidi',
                'phone' => '0623344556',
                'email' => 'ksaidi@gmail.com',
                'city' => 'Rabat',
                'role' => 'client'
            ],
            [
                'cin' => 'so202301',
                'first_name' => 'Siham',
                'last_name' => 'Ouchrif',
                'phone' => '0612345678',
                'email' => 'siham.ouchrif@mail.com',
                'city' => 'Tanger',
                'role' => 'client'
            ],
            [
                'cin' => 'he202302',
                'first_name' => 'Hamza',
                'last_name' => 'El Fassi',
                'phone' => '0667891234',
                'email' => 'hamza.fassi@outlook.com',
                'city' => 'Fes',
                'role' => 'client'
            ],
            [
                'cin' => 'nb202303',
                'first_name' => 'Nour',
                'last_name' => 'Belkacem',
                'phone' => '0609988776',
                'email' => 'nour.belkacem@gmail.com',
                'city' => 'Tetouan',
                'role' => 'client'
            ],
            [
                'cin' => 'mt202304',
                'first_name' => 'Mohamed',
                'last_name' => 'Tazi',
                'phone' => '0687452369',
                'email' => 'mohamed.tazi@protonmail.com',
                'city' => 'Oujda',
                'role' => 'client'
            ],
            [
                'cin' => 'rm202305',
                'first_name' => 'Reda',
                'last_name' => 'Moulay',
                'phone' => '0603456789',
                'email' => 'reda.moulay@gmail.com',
                'city' => 'Casablanca',
                'role' => 'client'
            ],
            [
                'cin' => 'sb202306',
                'first_name' => 'Salma',
                'last_name' => 'Boukili',
                'phone' => '0654321987',
                'email' => 'salma.boukili@hotmail.com',
                'city' => 'Meknes',
                'role' => 'client'
            ],
            [
                'cin' => 'zb202307',
                'first_name' => 'Zakaria',
                'last_name' => 'Benali',
                'phone' => '0623456789',
                'email' => 'zakaria.benali@mail.com',
                'city' => 'Essaouira',
                'role' => 'client'
            ],
            [
                'cin' => 'ic202308',
                'first_name' => 'Imane',
                'last_name' => 'Chafai',
                'phone' => '0676543210',
                'email' => 'imane.chafai@outlook.com',
                'city' => 'El Jadida',
                'role' => 'client'
            ],
            [
                'cin' => 'me202309',
                'first_name' => 'Mehdi',
                'last_name' => 'El Idrissi',
                'phone' => '0612349087',
                'email' => 'mehdi.idrissi@gmail.com',
                'city' => 'Kenitra',
                'role' => 'client'
            ],
            [
                'cin' => 'ad202310',
                'first_name' => 'Amina',
                'last_name' => 'Derkaoui',
                'phone' => '0698765432',
                'email' => 'amina.derkaoui@yahoo.com',
                'city' => 'Taza',
                'role' => 'client'
            ],
            [
                'cin' => 'af202311',
                'first_name' => 'Anas',
                'last_name' => 'Fakiri',
                'phone' => '0609876543',
                'email' => 'anas.fakiri@mail.com',
                'city' => 'Nador',
                'role' => 'client'
            ],
            [
                'cin' => 'ly202312',
                'first_name' => 'Lina',
                'last_name' => 'El Yamani',
                'phone' => '0687654321',
                'email' => 'lina.yamani@protonmail.com',
                'city' => 'Dakhla',
                'role' => 'client'
            ],
            [
                'cin' => 'hb202313',
                'first_name' => 'Hassan',
                'last_name' => 'Belhaj',
                'phone' => '0632109876',
                'email' => 'hassan.belhaj@gmail.com',
                'city' => 'Settat',
                'role' => 'client'
            ],
            [
                'cin' => 'so202314',
                'first_name' => 'Sara',
                'last_name' => 'Ouazzani',
                'phone' => '0611223344',
                'email' => 'sara.ouazzani@hotmail.com',
                'city' => 'Beni Mellal',
                'role' => 'client'
            ]
        ];

        foreach ($users as $user) {
            User::create([
                'cin' => $user['cin'],
                'first_name' => $user['first_name'],
                'last_name' => $user['last_name'],
                'phone' => $user['phone'],
                'email' => $user['email'],
                'city' => $user['city'],
                'role' => $user['role'],
                'password' => Hash::make('password'), // Default password for all users
                'email_verified_at' => Carbon::now() // Mark all emails as verified
            ]);
        }
    }
}