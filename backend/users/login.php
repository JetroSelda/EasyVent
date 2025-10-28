<?php

  require "../db.php";

  $email = $_POST["email"];
  $password = $_POST["password"];

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
      $response->error->title = "Login Error";
      $response->error->message = "Your account has been blocked.";
    
      print_r(json_encode($response));

      die;
    }

    $hashedPassword = $row["password"];
   if (password_verify($password, $hashedPassword)) {
    $response->data = new stdClass();

    $response->data->id = $row["id"];
    $response->data->personal_name = $row["personal_name"];
    $response->data->last_name = $row["last_name"];
    $response->data->role = $row["role"];
    $response->data->contacts = $row["contacts"];
    $response->data->display_picture = $row["display_picture"];
    $response->data->bio = $row["bio"];
    $response->data->email = $row["email"];
    $response->data->date_of_birth = $row["date_of_birth"];
    $response->data->status = $row["status"];
    $response->data->payments = $row["payments"];

    print_r(json_encode($response));
    die;
   }

    $response->error = new stdClass();
    $response->error->title = "Login Error";
    $response->error->message = "Incorrect Password";
    
    print_r(json_encode($response));
    die;
  } else {
    $response->error = new stdClass();
    $response->error->title = "Login Error";
    $response->error->message = "Email Account entered doesn't exist";
    
    print_r(json_encode($response));
    die;
  }

?>