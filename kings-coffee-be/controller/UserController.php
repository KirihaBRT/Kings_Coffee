<?php
/**
 * UserController class representing the controller for user-related actions.
 */
class UserController {

  /**
   * Constructor for UserController class.
   * @param User $user - An instance of the User class.
   */
  public function __construct(private User $user) {}
  
  /**
   * Action to list all users by returning JSON-encoded data.
   */
  public function listAction() {
    echo json_encode($this->user->getAll());
  }

  /**
   * Action to create a new user based on JSON data received in the request body.
   * Responds with a 201 (Created) HTTP status code upon success.
   */
  public function createAction() {
    $data = json_decode(file_get_contents("php://input"), true);
    $this->user->create($data);
    http_response_code(201);
  }

  /**
   * Action to update an existing user based on JSON data received in the request body.
   * Responds with a 201 (Created) HTTP status code upon success.
   */
  public function updateAction() {
    $data = json_decode(file_get_contents("php://input"), true);
    $this->user->update($data);
    http_response_code(201);
  }

  /**
   * Action to delete a user (to be implemented).
   */
  public function deleteAction() {
    // To be implemented
  }

   /**
   * Action to check if user is logged in.
   */
  public function checkLoggedInAction() {
    echo isset($_SESSION['authorized']) ? "true" : "false";
  }


  public function getRoleAction() {
    echo json_encode($this->user->getRole($_SESSION['userID']));
  }

  /**
   * Action to login user.
   */
  public function loginAction() {
    $data = json_decode(file_get_contents("php://input"), true);
    $userData = $this->user->login($data);
    if ($userData) {
      $_SESSION['authorized'] = true;
      $_SESSION['userID'] = $userData[0]["userID"];
      http_response_code(201); 
    } else {
      http_response_code(401); 
    }
  }
  
  /**
   * Action to logout user.
   */
  public function logoutAction() {
    session_destroy();
  }
}

?>