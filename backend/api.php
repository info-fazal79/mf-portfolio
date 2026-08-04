<?php
/**
 * Muhammad Fazal Portfolio - REST API Layer
 * Serves projects, ebooks, settings, and handles consultations
 * Optimized for cPanel hosting environment
 */

// 1. Enable CORS and JSON Response Headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// 2. Include database connection
require_once __DIR__ . '/config/db.php';

$db = getDatabaseConnection();
$endpoint = isset($_GET['endpoint']) ? trim($_GET['endpoint']) : '';

try {
    switch ($endpoint) {
        case 'projects':
            handleGetProjects($db);
            break;
        case 'ebooks':
            handleGetEbooks($db);
            break;
        case 'settings':
            handleGetSettings($db);
            break;
        case 'consultation':
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                handlePostConsultation($db);
            } else {
                sendError("Method Not Allowed", 405);
            }
            break;
        default:
            sendError("Endpoint Not Found", 404);
            break;
    }
} catch (Exception $e) {
    sendError("Internal Server Error: " . $e->getMessage(), 500);
}

/**
 * Fetch projects from the database
 */
function handleGetProjects($db) {
    $stmt = $db->prepare("SELECT id, title, slug, description, content, screenshots, tech_stack, live_link, github_link, created_at FROM projects ORDER BY created_at DESC");
    $stmt->execute();
    $projects = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Decode JSON screenshots and parse tech stack array
    foreach ($projects as &$project) {
        $project['screenshots'] = $project['screenshots'] ? json_decode($project['screenshots'], true) : [];
        $project['tech_stack'] = array_map('trim', explode(',', $project['tech_stack']));
    }

    echo json_encode(["success" => true, "data" => $projects]);
    exit();
}

/**
 * Fetch ebooks from the database
 */
function handleGetEbooks($db) {
    $stmt = $db->prepare("SELECT id, title, image, status, regular_price, offer_price, created_at FROM ebooks ORDER BY created_at DESC");
    $stmt->execute();
    $ebooks = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($ebooks as &$ebook) {
        $ebook['regular_price'] = (float)$ebook['regular_price'];
        $ebook['offer_price'] = (float)$ebook['offer_price'];
    }

    echo json_encode(["success" => true, "data" => $ebooks]);
    exit();
}

/**
 * Fetch general SEO and settings
 */
function handleGetSettings($db) {
    $stmt = $db->prepare("SELECT key_name, key_value FROM site_settings");
    $stmt->execute();
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $settings = [];
    foreach ($rows as $row) {
        // Try to decode values that are JSON (like typing strings)
        $decoded = json_decode($row['key_value'], true);
        $settings[$row['key_name']] = (json_last_error() === JSON_ERROR_NONE) ? $decoded : $row['key_value'];
    }

    echo json_encode(["success" => true, "data" => $settings]);
    exit();
}

/**
 * Handle new consultation submissions via AJAX POST
 */
function handlePostConsultation($db) {
    $input = json_decode(file_get_contents('php://input'), true);

    $name = isset($input['name']) ? strip_tags(trim($input['name'])) : '';
    $email = isset($input['email']) ? filter_var(trim($input['email']), FILTER_SANITIZE_EMAIL) : '';
    $message = isset($input['message']) ? strip_tags(trim($input['message'])) : '';

    if (empty($name) || empty($email) || empty($message)) {
        sendError("Validation Error: Please fill in all fields correctly.", 400);
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        sendError("Validation Error: Invalid email address format.", 400);
    }

    $stmt = $db->prepare("INSERT INTO consultations (name, email, message) VALUES (:name, :email, :message)");
    $stmt->execute([
        ':name' => $name,
        ':email' => $email,
        ':message' => $message
    ]);

    // Send confirmation email
    $to = "admin@example.com"; // Set admin email from site settings in a real application
    $subject = "New Portfolio Consultation Request from " . $name;
    $body = "Name: $name\nEmail: $email\n\nMessage:\n$message";
    $headers = "From: webmaster@yourdomain.com\r\nReply-To: $email";
    @mail($to, $subject, $body, $headers);

    echo json_encode(["success" => true, "message" => "Consultation request sent successfully!"]);
    exit();
}

/**
 * Utility helper to send dynamic errors
 */
function sendError($message, $code = 400) {
    http_response_code($code);
    echo json_encode(["success" => false, "error" => $message]);
    exit();
}
