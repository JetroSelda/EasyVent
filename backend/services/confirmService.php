<?php

  require "../db.php";

  require '../PHPMailer/src/Exception.php';
  require '../PHPMailer/src/PHPMailer.php';
  require '../PHPMailer/src/SMTP.php';

  use PHPMailer\PHPMailer\PHPMailer;
  use PHPMailer\PHPMailer\Exception;
  use PHPMailer\PHPMailer\SMTP;

  $id = $_POST["id"];
  $name = $_POST["name"];
  $email = $_POST["email"];

  $mutate = "
    UPDATE `services_tbl`
    SET
      `status`='Published'
    WHERE id = $id
  ";

  $statement = $connect->prepare($mutate);
  $statement->execute();

  $response = new stdClass();
  $response->data = new stdClass();
  $response->data->message = "Successfully updated service.";
  $response->data->id = $id;

  /* Creating Notif */

  $query = "
    SELECT userptbl.id_user, servctbl.property_name
    FROM services_tbl servctbl, user_providers_tbl userptbl
    WHERE servctbl.id = $id AND servctbl.id = userptbl.id_service
  ";

  $statement = $connect->prepare($query);
  $statement->execute();

  $row = $statement->fetch(PDO::FETCH_ASSOC);

  $providerId = $row["id_user"];
  $providerProperty = addslashes($row["property_name"]);

  $mutate = "
    INSERT INTO `notifications_tbl`
    (`id_user`, `id_ref`, `title`, `description`, `status`)
    VALUES ($providerId, $id, 'Approved Listing', '$providerProperty has been approved.', 'Unread')
  ";

  $statement = $connect->prepare($mutate);
  $statement->execute();

  $mutate = "
    UPDATE users_tbl
    SET `status`='Active'
    WHERE id = $providerId
  ";

  $statement = $connect->prepare($mutate);
  $statement->execute();

  /* Creating Notif [END] */

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
      $mail->Subject = "Service Verification";
      $mail->Body    = '
        <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Service Verification Confirmed</title>
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
                      <p>We\'re happy to inform you that your request for <strong>'.$name.'</strong> service verification has been successfully confirmed. Your service will now be visible to the public.</p>
                      <p>To access your dashboard and manage your services, please click the button below:</p>
                      
                      <!-- Action Button -->
                      <p>
                          <a style="color: white" href="https://easyvent.iceiy.com/dashboard" class="button" target="_blank">Go to Dashboard</a>
                      </p>
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
  } catch (Exception $e) {
      echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
  }

  print_r(json_encode($response));

?>