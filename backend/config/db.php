<?php
/**
 * Database connection setup using PDO
 */

function getDatabaseConnection() {
    $host = 'localhost';
    $db   = 'portfolio_db';
    $user = 'portfolio_user';
    $pass = 'secure_password_here';
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
