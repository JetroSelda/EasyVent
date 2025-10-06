<?php

  require "../db.php";

  require '../PHPMailer/src/Exception.php';
  require '../PHPMailer/src/PHPMailer.php';
  require '../PHPMailer/src/SMTP.php';

  use PHPMailer\PHPMailer\PHPMailer;
  use PHPMailer\PHPMailer\Exception;
  use PHPMailer\PHPMailer\SMTP;

  date_default_timezone_set('Asia/Manila');

  $email = $_POST["email"];
  $role = $_POST["role"];
  $reference = hash('sha256', $email);

  // Check if email existing already
  $query = "
    SELECT * FROM users_tbl WHERE email = '$email'
  ";

  $statement = $connect->prepare($query);
  $statement->execute();

  $row = $statement->fetch(PDO::FETCH_ASSOC);

  $response = new stdClass();

  if ($row !== false) {
    $response->error = new stdClass();
    $response->error->title = "Validation Error";
    $response->error->message = "Email has already been used.";
    
    print_r(json_encode($response));
    die;
  }

  $mutate = "
    INSERT INTO `users_tbl`
    (`email`, `status`, `role`)
    VALUES ('$email', 'Active', '$role')
  ";

  $statement = $connect->prepare($mutate);
  $statement->execute();

  $lastId = $connect->lastInsertId();

  $tomorrow = new DateTime('tomorrow');
  $today = new DateTime();
  $expiration = $tomorrow->format('Y-m-d');

  $mutate = "
    INSERT INTO `user_invitations_tbl`
    (`id_user`, `expiration_date`, `reference`)
    VALUES ($lastId, '$expiration', '$reference')
  ";

  $statement = $connect->prepare($mutate);
  $statement->execute();

  $response->data = new stdClass();
  $response->data->message = "You have successfully invited a user.";

  $mail = new PHPMailer(true);

  try {
      //Server settings
      $mail->isSMTP();                                            //Send using SMTP
      $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
      $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
      $mail->Username   = 'alicred08@gmail.com';                     //SMTP username
      $mail->Password   = '';                               //SMTP password
      $mail->SMTPSecure = 'tls';            //Enable implicit TLS encryption
      $mail->Port       = 587;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

      //Recipients
      $mail->setFrom('alicred08@gmail.com', 'EasyVent Platform');
      $mail->addAddress($email, "");

      // //Content
      $mail->isHTML(true);                                  //Set email format to HTML
      $mail->Subject = "EasyVent Invitation";
      $mail->Body    = '
        <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Invitation from EasyVent</title>
              <style>
                  body {
                      font-family: Arial, sans-serif;
                      margin: 0;
                      padding: 0;
                      background-color: #f4f4f4;
                  }

                  .email-container {
                      width: 100%;
                      max-width: 600px;
                      margin: 0 auto;
                      background-color: #ffffff;
                      border-radius: 8px;
                      overflow: hidden;
                      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                  }

                  .header {
                      background-color: #183B4E;
                      padding: 20px;
                      color: #ffffff;
                      text-align: center;
                  }

                  .header h1 {
                      margin: 0;
                      font-size: 24px;
                  }

                  .content {
                      padding: 20px;
                      font-size: 16px;
                      line-height: 1.5;
                      color: #333333;
                  }

                  .content p {
                      margin-bottom: 20px;
                  }

                  .button {
                      display: inline-block;
                      background-color: #183B4E;
                      color: #ffffff;
                      padding: 12px 20px;
                      font-size: 16px;
                      text-decoration: none;
                      border-radius: 4px;
                      text-align: center;
                      transition: background-color 0.3s ease;
                  }

                  .button:hover {
                      background-color: #144051;
                  }

                  .footer {
                      padding: 20px;
                      text-align: center;
                      font-size: 14px;
                      color: #888888;
                      background-color: #f4f4f4;
                  }
              </style>
          </head>
          <body>
              <div class="email-container">
                  <!-- Header -->
                  <div class="header">
                      <h1>EasyVent</h1>
                  </div>
                  
                  <!-- Body Content -->
                  <div class="content">
                      <p>Hi there,</p>
                      <p>We’re excited to invite you to be a part of our team at EasyVent! You have been selected to join us as a <strong>'.$role.'</strong> member. We believe you’ll bring great value to the team, and we can’t wait to work with you.</p>
                      <p>To get started, please click the button below to complete your registration:</p>
                      
                      <!-- Action Button -->
                      <p>
                          <a style="color: white" href="http://localhost:5173/invitation?ref='.$reference.'" class="button" target="_blank">Join the Team</a>
                      </p>
                  </div>

                  <!-- Footer -->
                  <div class="footer">
                      <p>If you have any questions, feel free to reach out to us at <a href="mailto:support@easyvent.com">support@easyvent.com</a>.</p>
                  </div>
              </div>
          </body>
          </html>
      ';
      $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

      $mail->send();
  } catch (Exception $e) {
      echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
  }

  print_r(json_encode($response));
?>