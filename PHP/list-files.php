<?php
$directory = __DIR__ . '/../assets/Epreuve-E5'; 
$files = array_diff(scandir($directory), array('..', '.'));

$result = [];
foreach ($files as $file) {
    if (preg_match('/\.(pdf|docx?|xlsx)$/i', $file)) {
        $result[] = $file;
    }
}

echo json_encode($result);
?>