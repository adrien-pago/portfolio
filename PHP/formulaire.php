<?php
session_start();

require 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if(isset($_POST['submit'])) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    $to = 'adrien.pago@gmail.com'; // Remplacez par votre email
    $subject = 'Nouveau message de votre portfolio';
    $body = "Nom: $name\nEmail: $email\nMessage:\n$message";

    $mail = new PHPMailer(true);

    try {
        //Server settings
        $mail->SMTPDebug = 2;                                 
        $mail->isSMTP();                                      
        $mail->Host = 'smtp.gmail.com';  
        $mail->SMTPAuth = true;                               
        $mail->Username = 'adrien.pago@gmail.com';                 
        $mail->Password = 'xgpkycrgxsozbtbq';                           
        $mail->SMTPSecure = 'tls';                            
        $mail->Port = 587;                                      

        //Recipients
        $mail->setFrom('from@example.com', 'Mailer');
        $mail->addAddress($to, 'Joe User');     

        //Content
        $mail->isHTML(true);                                  
        $mail->Subject = $subject;
        $mail->Body    = $body;

        $mail->send();
        echo 'Message envoyé avec succès !';

        // Stockez un message dans la session
        $_SESSION['message'] = 'Votre message a été envoyé avec succès !';

        // Redirigez l'utilisateur vers la page d'accueil
        header('Location: /index.php');
        exit;
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
}
?>
