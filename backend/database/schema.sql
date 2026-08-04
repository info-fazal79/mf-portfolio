-- Modern SQL Schema for Muhammad Fazal Portfolio
-- Optimized for MySQL 8.x/PHP 8.x cPanel hosting

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `admin_users`;
DROP TABLE IF EXISTS `site_settings`;
DROP TABLE IF EXISTS `projects`;
DROP TABLE IF EXISTS `testimonials`;
DROP TABLE IF EXISTS `tools`;
DROP TABLE IF EXISTS `blogs`;
DROP TABLE IF EXISTS `ebooks`;
DROP TABLE IF EXISTS `orders`;
DROP TABLE IF EXISTS `consultations`;
SET FOREIGN_KEY_CHECKS = 1;

-- 1. Admin Users Table
CREATE TABLE `admin_users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. General Settings / SEO / Hero Config Table
CREATE TABLE `site_settings` (
  `key_name` VARCHAR(50) PRIMARY KEY,
  `key_value` TEXT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert initial configuration seeds
INSERT INTO `site_settings` (`key_name`, `key_value`) VALUES
('site_logo', '/uploads/logo.png'),
('logo_width', '150'),
('logo_height', '40'),
('social_linkedin', 'https://linkedin.com/in/muhammad-fazal'),
('social_github', 'https://github.com/muhammad-fazal'),
('seo_title', 'Muhammad Fazal | Senior Full-Stack Architect'),
('seo_description', 'Bespoke high-performance web applications built with Next.js, PHP, and MySQL.'),
('hero_typing_text', '["Senior Full-Stack Architect", "Next.js & PHP Expert", "MySQL Performance Specialist"]'),
('hero_cv_path', '/uploads/cv.pdf'),
('whatsapp_free_redirect', 'https://chat.whatsapp.com/example-group-link');

-- 3. Projects Table
CREATE TABLE `projects` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `description` TEXT NOT NULL,
  `content` LONGTEXT NOT NULL,
  `screenshots` TEXT NULL, -- JSON array of image URLs
  `tech_stack` VARCHAR(255) NOT NULL, -- Comma-separated values
  `live_link` VARCHAR(255) NULL,
  `github_link` VARCHAR(255) NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. E-Books Table
CREATE TABLE `ebooks` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `image` VARCHAR(255) NULL,
  `status` ENUM('free', 'paid') DEFAULT 'paid',
  `regular_price` DECIMAL(10,2) DEFAULT 0.00,
  `offer_price` DECIMAL(10,2) DEFAULT 0.00,
  `download_file_path` VARCHAR(255) NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Testimonials Table
CREATE TABLE `testimonials` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `photo` VARCHAR(255) NULL,
  `feedback` TEXT NOT NULL,
  `company_role` VARCHAR(150) NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Tools/Technologies Table
CREATE TABLE `tools` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `icon_svg` TEXT NULL, -- Raw SVG path or svg string for display
  `category` VARCHAR(50) DEFAULT 'Backend',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. Blogs/Tutorials Table
CREATE TABLE `blogs` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `content` LONGTEXT NOT NULL,
  `featured_image` VARCHAR(255) NULL,
  `category` VARCHAR(100) NOT NULL,
  `author_name` VARCHAR(100) DEFAULT 'Muhammad Fazal',
  `status` ENUM('draft', 'published') DEFAULT 'draft',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. Orders Table
CREATE TABLE `orders` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `customer_name` VARCHAR(100) NOT NULL,
  `customer_email` VARCHAR(100) NOT NULL,
  `customer_phone` VARCHAR(30) NULL,
  `order_total` DECIMAL(10,2) NOT NULL,
  `status` ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
  `order_details` TEXT NOT NULL, -- JSON detailed breakdown
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. Consultations Table
CREATE TABLE `consultations` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `message` TEXT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
