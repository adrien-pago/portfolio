<?php
require_once __DIR__ . '/vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Paramètres de connexion à la base de données et configuration SMTP

// Vérification de la méthode de requête
if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    http_response_code(405);
    $response_array['status'] = 'error';
    echo json_encode($response_array);
    die();
}

header('Content-Type: application/json');

// Récupération des données du formulaire
$name = $_POST['name'];
$email = $_POST['email'];
$subject = $_POST['subject'];
$message = $_POST['message'];

// Création d'une nouvelle instance de PHPMailer
$mail = new PHPMailer(true);

try {
    // Configuration SMTP
    $mail->isSMTP();                                     
    $mail->Host = 'smtp.ionos.fr';                      
    $mail->SMTPAuth = true;                              
    $mail->Username = 'support-technique@vaca-meet.fr'; // Ton adresse e-mail
    $mail->Password = 'Support-AntiHackMessagerie489?'; // Ton mot de passe
    $mail->SMTPSecure = 'tls';                           
    $mail->Port = 587; 

    // Paramètres de l'e-mail
    $mail->setFrom($email, $name);
    $mail->addAddress('adrien.pago@gmail.com'); // Adresse e-mail où tu veux recevoir les messages
    $mail->isHTML(true);
    $mail->Subject = $subject;
    $mail->Body    = $message;

    // Envoi de l'e-mail
    $mail->send();

    // Réponse JSON
    echo json_encode(['status' => 'success', 'message' => 'Votre message a été envoyé avec succès. Merci!']);
} catch (Exception $e) {
    // En cas d'erreur
    echo json_encode(['status' => 'error', 'message' => 'Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer plus tard.']);
}

// $mail->Username = 'temail@adrien-pago-portfolio.fr'; // Ton adresse e-mail
//$mail->Password = 'asdJflg15@bnv12?dfHHND'; // Ton mot de passe

//    $mail->Username = 'support-technique@vaca-meet.fr'; 
//$mail->Password = 'Support-AntiHackMessagerie489?';   