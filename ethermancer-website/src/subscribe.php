<?php
// subscribe.php

// Set CORS-Header
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

// Intercept POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Read JSON data from POST request
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    // E-Mail-Details
    $to = "osman.bilgin@web.de";
    $subject = "Subscribe von " . $data['email'];
    $message .= "E-Mail: " . $data['email'] . "\n";


    $headers = "From: subscribe@ethermancer.de";

    // send E-Mail
    if (mail($to, $subject, $message, $headers)) {
        echo json_encode(["message" => "Formular erfolgreich verarbeitet und E-Mail gesendet."]);
    } else {
        echo json_encode(["message" => "Fehler beim Senden der E-Mail."]);
    }

} else {
    // Error message if there is no POST request
    echo json_encode(["message" => "Nur POST-Anfragen werden akzeptiert"]);
}
?>
