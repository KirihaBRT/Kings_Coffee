<?php
/**
 * PosController class representing the controller for Point of Sale (POS) actions.
 */
class PosController {

  /**
   * Constructor for PosController class.
   * @param ProductCategories $productCategories - An instance of the ProductCategories class.
   * @param Products $products - An instance of the Products class.
   */
  public function __construct(private ProductCategories $productCategories, private Products $products) {}

  /**
   * Action to list all menu items by returning JSON-encoded data.
   */
  public function listMenuAction() {
    echo json_encode($this->productCategories->getAll());
  }

  /**
   * Action to list products based on a specified category ID by returning JSON-encoded data.
   * Expects the category ID as a parameter in the GET request.
   */
  public function listProductAction() {
    echo json_encode($this->products->getProduct($_GET['category-id']));
  }
}
?>