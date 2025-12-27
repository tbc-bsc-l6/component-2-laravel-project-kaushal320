<?php

namespace Database\Seeders;

use App\Models\Module;
use Illuminate\Database\Seeder;

class ModuleDescriptionSeeder extends Seeder
{
    public function run(): void
    {
        $descriptions = [
            'This comprehensive module introduces students to fundamental programming concepts, data structures, and algorithms. You will learn problem-solving techniques and develop practical coding skills through hands-on projects and exercises.',
            'Explore the world of databases and learn how to design, implement, and manage efficient database systems. This module covers SQL, normalization, and modern database technologies used in real-world applications.',
            'Dive into web development and learn to create dynamic, responsive websites. This module covers HTML, CSS, JavaScript, and modern frameworks, preparing you for a career in web development.',
            'Master the art of software engineering with this module covering design patterns, testing methodologies, and best practices. Learn how to build scalable, maintainable applications.',
            'Understand computer networks, protocols, and security principles. This module prepares you to design and manage network infrastructure in modern organizations.',
            'Learn data analysis techniques, statistical methods, and visualization tools. This module equips you with skills to extract insights from data and make data-driven decisions.',
            'Discover the principles of artificial intelligence and machine learning. This module covers algorithms, neural networks, and practical applications of AI in various domains.',
            'Study the fundamentals of cybersecurity and learn to protect systems from threats. This module covers encryption, security protocols, and ethical hacking techniques.',
        ];

        Module::whereNull('description')->get()->each(function ($module) use ($descriptions) {
            $module->update([
                'description' => $descriptions[array_rand($descriptions)]
            ]);
        });

        $this->command->info('Module descriptions updated successfully!');
    }
}
