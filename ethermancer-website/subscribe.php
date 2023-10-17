<?php
// subscribe.php

// CORS-Header setzen
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

// POST-Anfrage abfangen
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // JSON-Daten aus der POST-Anfrage lesen
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    // E-Mail-Details
    $to = "osman.bilgin@web.de";
    $subject = "Subscribe von " . $data['email'];
    $message .= "E-Mail: " . $data['email'] . "\n";


    $headers = "From: subscribe@skyDrohnen";

    // E-Mail senden
    if (mail($to, $subject, $message, $headers)) {
        echo json_encode(["message" => "Formular erfolgreich verarbeitet und E-Mail gesendet."]);
    } else {
        echo json_encode(["message" => "Fehler beim Senden der E-Mail."]);
    }

} else {
    // Fehlermeldung, falls keine POST-Anfrage vorliegt
    echo json_encode(["message" => "Nur POST-Anfragen werden akzeptiert"]);
}
?>
