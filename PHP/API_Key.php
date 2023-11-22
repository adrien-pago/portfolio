<?php
$api_key = "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";

// Vérifiez que la requête est bien une requête POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Récupérez le contenu du corps de la requête
    $request_body = file_get_contents('php://input');

    // Initialisez une session cURL
    $ch = curl_init();

    // Configurez les options cURL
    curl_setopt($ch, CURLOPT_URL, "https://api.openai.com/v1/chat/completions");
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $request_body);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        "Content-Type: application/json",
        "Authorization: Bearer $api_key"
    ));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

	// Exécutez la requête cURL et récupérez la réponse
	$response = curl_exec($ch);
	
	// Fermez la session cURL
	curl_close($ch);

    // Retournez la réponse à l'interface utilisateur
    echo $response;
} else {
    // Si la requête n'est pas une requête POST, renvoyez une erreur
    http_response_code(405);
    echo json_encode(array("error" => "Method not allowed"));
}
?>
