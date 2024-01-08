<?php

/**
 * Products class representing the model for products.
 */
class Products
{
  /** @var mysqli The database connection object. */
  private $conn;

  /**
   * Constructor for Products class.
   * @param Database $db - An instance of the Database class providing the database connection.
   */
  public function __construct(Database $db) {
    $this->conn = $db->getConnection();
  }

  /**
   * Retrieves all products for a given category from the database and returns them as an array.
   * @param int $categoryId - The ID of the product category.
   * @return array - An array containing all products for the specified category.
   */
  public function getProduct($categoryId)
  {
    $sql = "SELECT * FROM products WHERE category_id = " . $categoryId;
    $stmt = $this->conn->query($sql);
    $data = [];
    while($row = $stmt->fetch_assoc()) {
      $data[] = $row;
    }

    return $data;
  }

}

?>