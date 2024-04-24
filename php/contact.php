<?php
// Vérifier si le formulaire a été soumis
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Assigner les données du formulaire à des variables
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $subject = strip_tags(trim($_POST["subject"]));
    $message = trim($_POST["message"]);

    // Vérifier que les champs requis ne sont pas vides
    if (empty($name) OR empty($message) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // Si des champs sont vides ou l'email n'est pas valide, afficher une erreur
        http_response_code(400);
        echo "Oops! Il y a eu un problème avec votre soumission. Veuillez compléter le formulaire et réessayer.";
        exit;
    }

    // Destinataire de l'email
    $recipient = "adrien.pago@gmail.com";

    // Construire l'en-tête de l'email
    $headers = "From: $name <$email>";

    // Construire le corps de l'email
    $email_content = "Nom: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Sujet: $subject\n";
    $email_content .= "Message:\n$message\n";

    // Envoyer l'email
    if (mail($recipient, $subject, $email_content, $headers)) {
        // Code de réponse HTTP - succès
        http_response_code(200);
        echo "Merci! Votre message a été envoyé.";
    } else {
        // Code de réponse HTTP - erreur serveur
        http_response_code(500);
        echo "Oops! Quelque chose a mal tourné et nous n'avons pas pu envoyer votre message.";
    }

} else {
    // Code de réponse HTTP - non autorisé
    http_response_code(403);
    echo "Il y a eu un problème avec votre soumission, veuillez réessayer.";
}
?>
