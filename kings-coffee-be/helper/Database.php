<?php
/**
 * Database class representing a simple database connection.
 */
class Database
{
  /**
   * Constructor for Database class.
   * @param string $host - The database host.
   * @param string $name - The database name.
   * @param string $user - The database username.
   * @param string $password - The database password.
   */
  public function __construct(private string $host, private string $name, private string $user, private string $password) {}

  /**
   * Establishes a database connection and returns the connection object.
   * @return mysqli - The MySQLi database connection object.
   */
  public function getConnection()
  {
    return new mysqli($this->host, $this->user, $this->password, $this->name);
  }
}
?>