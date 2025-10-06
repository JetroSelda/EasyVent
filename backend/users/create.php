<?php

  require "../db.php";

  $email = $_POST["email"];
  $password = $_POST["password"];
  $role = $_POST["role"];

  $hash = password_hash($password, PASSWORD_DEFAULT);

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
    (`email`, `password`, `status`, `role`)
    VALUES ('$email','$hash','Active','$role')
  ";

  $statement = $connect->prepare($mutate);
  $statement->execute();

  $lastId = $connect->lastInsertId();

  $response->data = new stdClass();
  $response->data->message = "Successfully created new user.";
  $response->data->id = $lastId;

  print_r(json_encode($response));
?>