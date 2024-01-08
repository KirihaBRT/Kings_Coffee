<?php
/**
 * ProductCategories class representing the model for product categories.
 */
class ProductCategories
{
  /** @var mysqli The database connection object. */
  private $conn;

  /**
   * Constructor for ProductCategories class.
   * @param Database $db - An instance of the Database class providing the database connection.
   */
  public function __construct(Database $db) {
    $this->conn = $db->getConnection();
  }

  /**
   * Retrieves all product categories from the database and returns them as an array.
   * @return array - An array containing all product categories.
   */
  public function getAll()
  {
    $sql = "SELECT * FROM productcategories";
    $stmt = $this->conn->query($sql);
    $data = [];
    while($row = $stmt->fetch_assoc()) {
      $data[] = $row;
    }

    return $data;
  }

}

?>