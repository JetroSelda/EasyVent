<?php

  require "../db.php";

  require '../PHPMailer/src/Exception.php';
  require '../PHPMailer/src/PHPMailer.php';
  require '../PHPMailer/src/SMTP.php';

  use PHPMailer\PHPMailer\PHPMailer;
  use PHPMailer\PHPMailer\Exception;
  use PHPMailer\PHPMailer\SMTP;

  $email = $_POST["email"];

  // Check if email existing already
  $query = "
    SELECT * FROM users_tbl WHERE email = '$email'
  ";

  $statement = $connect->prepare($query);
  $statement->execute();

  $row = $statement->fetch(PDO::FETCH_ASSOC);

  $response = new stdClass();

  if ($row !== false) {
    if ($row["status"] === "Blocked") {
      $response->error = new stdClass();
      $response->error->title = "Authorization Error";
      $response->error->message = "Your account has been blocked.";
    
      print_r(json_encode($response));

      die;
    }

    // Initiate forgot password
    $otp = substr(bin2hex(random_bytes(3)), 0, 6);

    $currentOTP = $otp;

    $mail = new PHPMailer(true);

  try {
      //Server settings
      $mail->isSMTP();                                            //Send using SMTP
      $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
      $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
      $mail->Username   = 'alicred08@gmail.com';                     //SMTP username
      $mail->Password   = 'fuca jfts pgzr dlif';                               //SMTP password
      $mail->SMTPSecure = 'tls';            //Enable implicit TLS encryption
      $mail->Port       = 587;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

      //Recipients
      $mail->setFrom('alicred08@gmail.com', 'EasyVent Platform');
      $mail->addAddress($email, "");

      // //Content
      $mail->isHTML(true);                                  //Set email format to HTML
      $mail->Subject = "Forgot Password";
      $mail->Body    = '
        <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>OTP Verification Code</title>
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

                    .otp-code {
                        display: inline-block;
                        background-color: #183B4E;
                        color: #ffffff;
                        padding: 12px 20px;
                        font-size: 24px;
                        text-decoration: none;
                        border-radius: 4px;
                        text-align: center;
                        margin-top: 10px;
                    }

                    .otp-code:hover {
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
                        <p>We received a request to verify your email address for EasyVent. To complete your verification process, please enter the following One-Time Password (OTP) on the verification page:</p>
                        
                        <!-- OTP Code -->
                        <p class="otp-code">'.$currentOTP.'</p>

                        <p>If you did not request this, please ignore this email.</p>
                    </div>

                    <!-- Footer -->
                    <div class="footer">
                        <p>If you have any questions or need assistance, feel free to reach out to our support team at <a href="mailto:support@easyvent.com">support@easyvent.com</a>.</p>
                    </div>
                </div>
            </body>
            </html>
      ';
      $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

      $mail->send();

      $response->data = new stdClass();
      $response->data->code = $currentOTP;
      $response->data->id = $row["id"];
      print_r(json_encode($response));
  } catch (Exception $e) {
      echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
  }

  } else {
    $response->error = new stdClass();
    $response->error->title = "Authorization Error";
    $response->error->message = "Email Account entered doesn't exist";
    
    print_r(json_encode($response));
    die;
  }

?>