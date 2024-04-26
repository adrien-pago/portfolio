<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    // Envoi des données à FormKeep
    $url = 'https://formkeep.com/f/ton_formulaire'; // Remplace avec l'URL de ton formulaire sur FormKeep
    $data = array(
        'name' => $name,
        'email' => $email,
        'subject' => $subject,
        'message' => $message
    );
    $options = array(
        'http' => array(
            'method'  => 'POST',
            'header'  => 'Content-type: application/x-www-form-urlencoded',
            'content' => http_build_query($data)
        )
    );
    $context  = stream_context_create($options);
    $result = file_get_contents($url, false, $context);

    // Vérification du résultat de l'envoi
    if ($result !== false) {
        echo json_encode(['status' => 'success', 'message' => 'Votre message a été envoyé avec succès. Merci!']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer plus tard.']);
    }
} else {
    http_response_code(405);
    $response_array['status'] = 'error';
    echo json_encode($response_array);
}
?>
