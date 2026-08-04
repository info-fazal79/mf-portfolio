<?php
/**
 * Database connection setup using PDO
 * Supports environment variables or default fallbacks
 */

function getDatabaseConnection() {
    $host = getenv('DB_HOST') ?: 'localhost';
    $db   = getenv('DB_NAME') ?: 'portfolio_db';
    $user = getenv('DB_USER') ?: 'portfolio_user';
    $pass = getenv('DB_PASS') ?: 'secure_password_here';
    $charset = 'utf8mb4';

    $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];

    try {
         return new PDO($dsn, $user, $pass, $options);
    } catch (\PDOException $e) {
         // Output basic JSON error for headless frontend
         header('Content-Type: application/json');
         http_response_code(500);
         echo json_encode(["success" => false, "error" => "Database connection failure: " . $e->getMessage()]);
         exit;
    }
}
