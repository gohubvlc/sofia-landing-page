<?php
    //Email information
    $admin_email = "joseluisgj@gmail.com";

    $name = $_POST['nameInput'];
    $surnames = $_POST['surnamesInput'];
    $email = $_POST['emailInput'];
    $phone = $_POST['phoneInput'];
    $address = $_POST['addressInput'];
    $reason = $_POST['reasonRadios'];
    $comments = $_POST['commentsArea'];

    $message = '<html><body>';
    $message .= '<h1>AXIS IDE - CONTACT FORM</h1>';
    $message .= '<b>Nombre: </b>'. $name .'<br/>';
    $message .= '<b>Apellidos: </b>'. $surnames .'<br/>';
    $message .= '<b>Email: </b>'. $email .'<br/>';
    $message .= '<b>Teléfono: </b>'. $phone .'<br/>';
    $message .= '<b>Dirección: </b>'. $address .'<br/>';
    $message .= '<b>Razón: </b>'. $reason .'<br/>';
    $message .= '<b>Comentarios: </b>'. $comments .'<br/>';
    $message .= '</body></html>';

    $subject = "AXIS IDE - Contacto Web";

    // Always set content-type when sending HTML email
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

    // More headers
    $headers .= 'From: <'.$admin_email.'>' . "\r\n";
    // $headers .= 'Cc: myboss@example.com' . "\r\n";
  
    //send email
   

    if ( mail($admin_email, "$subject", $message, $headers)) {
        // Set a 200 (okay) response code.
        http_response_code(200);
        echo "Gracias, su mensaje ha sido enviado.";
    } else {
        // Set a 500 (internal server error) response code.
        http_response_code(500);
        echo "Oops! Parece que ha habido algún tipo de error. Inténtelo de nuevo más tarde.";
    }
?>