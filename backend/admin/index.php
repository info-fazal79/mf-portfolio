<?php
/**
 * Muhammad Fazal Portfolio - Modern Admin Dashboard
 * Handles simple settings updates, file uploads, and lists catalog items.
 */

require_once __DIR__ . '/../config/db.php';
$db = getDatabaseConnection();

$message = '';
$error = '';

// Handle CV / Hero Image File Uploads
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['file_upload'])) {
    $type = $_POST['upload_type'] ?? '';
    $targetDir = __DIR__ . '/../uploads/';
    
    if (!is_dir($targetDir)) {
        mkdir($targetDir, 0755, true);
    }
    
    $file = $_FILES['file_upload'];
    $fileName = basename($file['name']);
    $targetFilePath = $targetDir . $fileName;
    $fileType = strtolower(pathinfo($targetFilePath, PATHINFO_EXTENSION));
    
    // Simple validation
    if ($type === 'cv' && $fileType !== 'pdf') {
        $error = "CV must be a PDF file.";
    } elseif ($type === 'hero' && !in_array($fileType, ['jpg', 'jpeg', 'png', 'webp'])) {
        $error = "Hero image must be a JPG, PNG, or WEBP file.";
    } else {
        if (move_uploaded_file($file['tmp_name'], $targetFilePath)) {
            $webPath = '/api/uploads/' . $fileName;
            $settingKey = ($type === 'cv') ? 'hero_cv_path' : 'site_logo'; // simplified config path updating
            
            // Save to settings db
            $stmt = $db->prepare("INSERT INTO site_settings (key_name, key_value) VALUES (:key, :val) ON DUPLICATE KEY UPDATE key_value = :val");
            $stmt->execute([':key' => $settingKey, ':val' => $webPath]);
            $message = "File uploaded and updated successfully!";
        } else {
            $error = "Failed to upload file.";
        }
    }
}

// Handle Settings Updates
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['update_settings'])) {
    try {
        $settings = [
            'seo_title' => $_POST['seo_title'] ?? '',
            'seo_description' => $_POST['seo_description'] ?? '',
            'whatsapp_free_redirect' => $_POST['whatsapp_free_redirect'] ?? '',
        ];
        
        foreach ($settings as $key => $val) {
            $stmt = $db->prepare("INSERT INTO site_settings (key_name, key_value) VALUES (:key, :val) ON DUPLICATE KEY UPDATE key_value = :val");
            $stmt->execute([':key' => $key, ':val' => $val]);
        }
        $message = "Settings updated successfully!";
    } catch (Exception $e) {
        $error = "Error updating settings: " . $e->getMessage();
    }
}

// Fetch stats and lists for UI displaying
try {
    $projectCount = $db->query("SELECT COUNT(*) FROM projects")->fetchColumn();
    $ebookCount = $db->query("SELECT COUNT(*) FROM ebooks")->fetchColumn();
    $consultCount = $db->query("SELECT COUNT(*) FROM consultations")->fetchColumn();
    
    // Get settings
    $settingsRaw = $db->query("SELECT * FROM site_settings")->fetchAll(PDO::FETCH_KEY_PAIR);
    $seoTitle = $settingsRaw['seo_title'] ?? 'Muhammad Fazal | Senior Full-Stack Architect';
    $seoDesc = $settingsRaw['seo_description'] ?? '';
    $waLink = $settingsRaw['whatsapp_free_redirect'] ?? '';
} catch (Exception $e) {
    // Suppress error or fallback if install.php has not run yet
    $projectCount = 0;
    $ebookCount = 0;
    $consultCount = 0;
    $seoTitle = '';
    $seoDesc = '';
    $waLink = '';
}
?>
<!DOCTYPE html>
<html lang="en" class="h-full bg-slate-950">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fazal CMS - Admin Dashboard</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>body { font-family: 'Inter', sans-serif; }</style>
</head>
<body class="h-full text-slate-100 flex overflow-hidden">

    <!-- Sidebar -->
    <aside class="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between hidden md:flex">
        <div>
            <div class="h-16 flex items-center px-6 border-b border-slate-800 bg-slate-950/40">
                <span class="text-lg font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                    Fazal CMS v1.0
                </span>
            </div>
            <nav class="mt-6 px-4 space-y-1">
                <a href="#dashboard" class="flex items-center space-x-3 px-4 py-2.5 rounded-lg bg-blue-600/10 text-blue-400 font-medium transition">
                    <span>Dashboard</span>
                </a>
                <a href="#settings" class="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800/50 hover:text-white transition">
                    <span>General Settings</span>
                </a>
            </nav>
        </div>
        <div class="p-4 border-t border-slate-800 bg-slate-950/40">
            <span class="text-xs text-slate-500">Connected to database</span>
        </div>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-hidden">
        <header class="h-16 border-b border-slate-800 bg-slate-900/60 backdrop-blur-md px-8 flex items-center justify-between">
            <h2 class="text-xl font-semibold">Dashboard Control Center</h2>
        </header>

        <main class="flex-1 overflow-y-auto p-8 space-y-8 bg-slate-950">
            
            <?php if (!empty($message)): ?>
                <div class="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm"><?= htmlspecialchars($message) ?></div>
            <?php endif; ?>

            <?php if (!empty($error)): ?>
                <div class="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm"><?= htmlspecialchars($error) ?></div>
            <?php endif; ?>

            <!-- Stats Grid -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="bg-slate-900 border border-slate-850 p-6 rounded-2xl">
                    <div class="text-slate-500 text-xs uppercase tracking-wider font-semibold">Total Projects</div>
                    <div class="text-3xl font-bold mt-2 text-blue-400"><?= $projectCount ?></div>
                </div>
                <div class="bg-slate-900 border border-slate-850 p-6 rounded-2xl">
                    <div class="text-slate-500 text-xs uppercase tracking-wider font-semibold">E-Books Catalog</div>
                    <div class="text-3xl font-bold mt-2 text-indigo-400"><?= $ebookCount ?></div>
                </div>
                <div class="bg-slate-900 border border-slate-850 p-6 rounded-2xl">
                    <div class="text-slate-500 text-xs uppercase tracking-wider font-semibold">Consultations Received</div>
                    <div class="text-3xl font-bold mt-2 text-purple-400"><?= $consultCount ?></div>
                </div>
            </div>

            <!-- Dashboard Control Sections -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                <!-- Settings Form -->
                <div class="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6">
                    <h3 class="font-semibold text-lg border-b border-slate-800 pb-4">General Settings & SEO</h3>
                    <form method="POST" class="space-y-4">
                        <input type="hidden" name="update_settings" value="1">
                        <div>
                            <label class="block text-xs font-semibold text-slate-400 mb-1">SEO TITLE</label>
                            <input type="text" name="seo_title" value="<?= htmlspecialchars($seoTitle) ?>" class="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-slate-100">
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-slate-400 mb-1">SEO DESCRIPTION</label>
                            <textarea name="seo_description" rows="3" class="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-slate-100"><?= htmlspecialchars($seoDesc) ?></textarea>
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-slate-400 mb-1">WHATSAPP FREE REDIRECT LINK</label>
                            <input type="url" name="whatsapp_free_redirect" value="<?= htmlspecialchars($waLink) ?>" class="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-slate-100">
                        </div>
                        <button type="submit" class="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-semibold transition">Save Settings</button>
                    </form>
                </div>

                <!-- Asset Upload Form -->
                <div class="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6 flex flex-col justify-between">
                    <div>
                        <h3 class="font-semibold text-lg border-b border-slate-800 pb-4 font-medium">Assets Management</h3>
                        
                        <!-- Upload CV -->
                        <form method="POST" enctype="multipart/form-data" class="space-y-2 mt-4">
                            <input type="hidden" name="upload_type" value="cv">
                            <label class="block text-xs font-medium text-slate-400">Replace CV File (PDF only)</label>
                            <div class="flex items-center space-x-2">
                                <input type="file" name="file_upload" accept="application/pdf" class="block w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-blue-600/10 file:text-blue-400 hover:file:bg-blue-600/20 border border-slate-800 bg-slate-950 p-1.5 rounded-lg" required>
                                <button type="submit" class="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-medium transition">Upload</button>
                            </div>
                        </form>

                        <!-- Upload Logo -->
                        <form method="POST" enctype="multipart/form-data" class="space-y-2 mt-6">
                            <input type="hidden" name="upload_type" value="hero">
                            <label class="block text-xs font-medium text-slate-400">Replace Site Logo / Hero Image</label>
                            <div class="flex items-center space-x-2">
                                <input type="file" name="file_upload" accept="image/*" class="block w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-indigo-600/10 file:text-indigo-400 hover:file:bg-indigo-600/20 border border-slate-800 bg-slate-950 p-1.5 rounded-lg" required>
                                <button type="submit" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-medium transition">Upload</button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </main>
    </div>
</body>
</html>
