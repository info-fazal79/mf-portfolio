<?php
/**
 * Muhammad Fazal Portfolio - Zero-Config Database Setup
 * Run this script via web browser to automatically create database tables
 */

header("Content-Type: application/json; charset=UTF-8");

require_once __DIR__ . '/config/db.php';
$schemaFile = __DIR__ . '/database/schema.sql';

if (!file_exists($schemaFile)) {
    http_response_code(500);
    echo json_encode(["success" => false, "error" => "Schema file not found at " . $schemaFile]);
    exit();
}

try {
    $db = getDatabaseConnection();
    $sql = file_get_contents($schemaFile);

    // Execute multi-statement SQL query
    $db->exec($sql);

    echo json_encode([
        "success" => true,
        "message" => "Database installation completed successfully! All tables and initial settings have been created."
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "error" => "Database Setup Failed: " . $e->getMessage()
    ]);
}
