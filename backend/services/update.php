<?php

  require "../db.php";

  $id = $_POST["id"];
  $status = $_POST["status"];
  $property_name = addslashes($_POST["property_name"]);
  $property_description = addslashes($_POST["property_description"]);
  $images_url = addslashes($_POST["images_url"]);
  $highlights = addslashes($_POST["highlights"]);
  $amenities = addslashes($_POST["amenities"]);
  $location = addslashes($_POST["location"]);
  $packages_list = addslashes($_POST["packages_list"]);
  $required_documents = addslashes($_POST["required_documents"]);
  
  $skills = addslashes($_POST["skills"]);
  $experiences = addslashes($_POST["experiences"]);
  $independent_locations = addslashes($_POST["independent_locations"]);

  $mutate = "
    UPDATE `services_tbl`
    SET
        `property_name`='$property_name',
        `property_description`='$property_description',
        `images_url`='$images_url',
        `highlights`='$highlights',
        `amenities`='$amenities',
        `location`='$location',
        `packages_list`='$packages_list',
        `status`='$status',
        `skills`='$skills',
        `experiences`='$experiences',
        `independent_locations`='$independent_locations',
        `required_documents`='$required_documents'
    WHERE id = $id
  ";

  $statement = $connect->prepare($mutate);
  $statement->execute();

  $response = new stdClass();
  $response->data = new stdClass();
  $response->data->message = "Successfully updated service.";
  $response->data->id = $id;

  print_r(json_encode($response));

?>