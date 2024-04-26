<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupère les valeurs des champs du formulaire
    $name = strip_tags(trim($_POST["name"]));
    $name = str_replace(array("\r","\n"),array(" "," "),$name);
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $subject = trim($_POST["subject"]);
    $message = trim($_POST["message"]);

    // Vérifie que les champs ne sont pas vides
    if (empty($name) || empty($subject) || empty($email) || empty($message)) {
        // Si un champ est vide, redirige vers la page du formulaire avec un message d'erreur
        http_response_code(400);
        echo "Please fill out all fields.";
        exit;
    }

    // Configure l'adresse e-mail de destination
    $recipient = "adrien.pago@gmail.com";

    // Construit le corps du message
    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Subject: $subject\n";
    $email_content .= "Message:\n$message\n";

    // Configure l'en-tête de l'e-mail
    $email_headers = "From: $name <$email>";

    // Envoie l'e-mail
    if (mail($recipient, $subject, $email_content, $email_headers)) {
        // Si l'e-mail est envoyé avec succès, renvoie un message de succès
        http_response_code(200);
        echo "Thank You! Your message has been sent.";
    } else {
        // Si l'envoi d'e-mail échoue, renvoie un message d'erreur
        http_response_code(500);
        echo "Oops! Something went wrong and we couldn't send your message.";
    }
} else {
    // Si la méthode de requête n'est pas POST, renvoie une erreur 403 (forbidden)
    http_response_code(403);
    echo "There was a problem with your submission, please try again.";
}
?>
