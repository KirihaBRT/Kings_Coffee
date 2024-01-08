<?php
  // Include required controller and model files
  require __DIR__ ."/controller/UserController.php";
  require __DIR__ ."/controller/PosController.php";
  require __DIR__ ."/model/User.php";
  require __DIR__ ."/model/ProductCategories.php";
  require __DIR__ ."/model/Products.php";
  require __DIR__ ."/helper/Database.php";

  // Start session
  session_start();
  // Set the content type to JSON
  header("Content-Type: application/json");

  // Extract URI and action from the request
  $parts = explode("/", $_SERVER["REQUEST_URI"]);
  $uri = $parts[2] ?? null;
  $action = explode("?", $parts[3]);
  $methodName =  $action[0] . 'Action';

  // Establish a connection to the database
  $dbConn = new Database("localhost", "dbkc", "root", "");

  // Create instances of models and controllers
  $user = new User($dbConn);
  $productCategories = new ProductCategories($dbConn);
  $products = new Products($dbConn);
  $userController = new UserController($user);
  $posController = new PosController($productCategories, $products);

  // Route the request based on the URI
  switch($uri) {
    case "user":
      // Invoke the appropriate method in UserController
      $userController->{$methodName}();
      break;
    case "pos":
      // Invoke the appropriate method in PosController
      $posController->{$methodName}();
      break;
    default:
      // Return a 404 status code for unknown URIs
      http_response_code(404);
  }
?>