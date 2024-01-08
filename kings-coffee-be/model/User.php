<?php

/**
 * User class representing the model for user data.
 */
class User 
{
  /** @var mysqli The database connection object. */
  private $conn;

  /**
   * Constructor for User class.
   * @param Database $db - An instance of the Database class providing the database connection.
   */
  public function __construct(Database $db) {
    $this->conn = $db->getConnection();
  }

  /**
   * Retrieves all user data from the database and returns it as an array.
   * @return array - An array containing all user data.
   */
  public function getAll()
  {
    $sql = "SELECT * FROM users";
    $stmt = $this->conn->query($sql);
    $data = [];
    while($row = $stmt->fetch_assoc()) {
      $data[] = $row;
    }

    return $data;
  }

  /**
   * Creates a new user in the database based on the provided data.
   * @param array $data - An associative array containing user data (name, username, password, role).
   */
  public function create($data)
  {
    $stmt = $this->conn->prepare("INSERT INTO users (name, username, password, role) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $data["name"], $data["username"], $data["password"], $data["role"]);
    $stmt->execute();
    $stmt->close();
  }

  /**
   * Updates an existing user in the database based on the provided data.
   * @param array $data - An associative array containing user data (id, name, username, password, role).
   */
  public function update($data)
  {
    $stmt = $this->conn->prepare("UPDATE users SET name=?, username=?, password=?, role=? WHERE userId=?");
    $stmt->bind_param("ssssi", $data["name"], $data["username"], $data["password"], $data["role"], $data["id"]);
    $stmt->execute();
    $stmt->close();
  }

  public function login($data)
  {
    $sql = "SELECT * FROM users WHERE username = '" . $data["username"] . "' AND password = '" . $data["password"] . "'";
    $stmt = $this->conn->query($sql);
    $data = [];
    while($row = $stmt->fetch_assoc()) {
      $data[] = $row;
    }

    return $data;
  }

  public function getRole($id)
  {
    $sql = "SELECT role FROM users WHERE userID = " . $id;
    $stmt = $this->conn->query($sql);
    $data = [];
    while($row = $stmt->fetch_assoc()) {
      $data[] = $row;
    }

    return $data;
  }
}

?>