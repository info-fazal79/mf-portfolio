<?php
/**
 * Muhammad Fazal Portfolio - Admin Account Creator
 * Run this script once to create the main administrator user.
 */

header("Content-Type: application/json; charset=UTF-8");

require_once __DIR__ . '/config/db.php';
$db = getDatabaseConnection();

$username = 'admin';
$email = 'admin@muhammadfazal.com';
$password = 'fazal123';

try {
    // Check if the user already exists
    $checkStmt = $db->prepare("SELECT COUNT(*) FROM admin_users WHERE username = :user OR email = :email");
    $checkStmt->execute([':user' => $username, ':email' => $email]);
    $exists = $checkStmt->fetchColumn();

    if ($exists > 0) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Admin user already exists."]);
        exit();
    }

    // Securely hash the password using BCRYPT
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

    $stmt = $db->prepare("INSERT INTO admin_users (username, password, email) VALUES (:username, :password, :email)");
    $stmt->execute([
        ':username' => $username,
        ':password' => $hashedPassword,
        ':email' => $email
    ]);

    echo json_encode([
        "success" => true,
        "message" => "Admin account created successfully!",
        "credentials" => [
            "username" => $username,
            "email" => $email,
            "password" => $password
        ]
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Error creating admin account: " . $e->getMessage()]);
}
