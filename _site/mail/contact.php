<?php

/**
 * This is a simple procedural mailer for pinecode.ca
 * It does bare-minimum validation for emails and sends it to daniel.
 */

// Check for empty fields
$postFields = ['name', 'email', 'phone', 'message'];
$emptyFields = [];
$errorMessage = null;

// Build an array of any missing fields.
foreach ($postFields as $field) {
    if (empty($_POST[$field])) {
        $emptyFields[] = $field;
    }
}

// If we have empty fields, list them out for the user.
if (count($emptyFields > 0)) {
    $errorMessage = 'Empty field';
    $errorMessage .= (count($emptyFields) == 1) ? 's: ' : ': ';
    $errorMessage .= implode(', ', $emptyFields);
    $errorMessage .= '. ';
}

// Assert that the email is valid
if (!$errorMessage && !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
    $errorMessage = "The email address {$POST['email']} appears to be invalid.";
}

// If anything went wrong, return here and notify the user.
if ($errorMessage) {
    echo $errorMessage;
    return;
}

// Set the contact form's data to more accessible variables.
$name = $_POST['name'];
$email_address = $_POST['email'];
$phone = $_POST['phone'];
$message = $_POST['message'];

// Create the email and send the message
$to = 'daniel@pinecode.ca';
$email_subject = "Contact from Pinecode.ca: $name";

$email_body = <<<EOF
It's a new message from Pinecode.ca!

Name: $name
Email: $email_address
Phone: $phone
Message:

$message
EOF;

$headers = <<<EOF
From: noreply@ypinecode.ca
Reply-To: $email_address
EOF;

mail($to, $email_subject, $email_body, $headers);

return true;
