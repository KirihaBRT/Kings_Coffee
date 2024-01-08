function getProduct() {
  showLoading();
  var products = '';
  requestCall('pos', 'GET', 'listProduct', null, `category-id=${currentCategory}`, function(response) {
    response.forEach(productList => {
      products += `
          <div class="tile">
              <img src="utils/images/images__1_-removebg-preview.png" alt="${productList.Product_Name}">
              <p class="product-name">${productList.Product_Name}</p>
          </div>
      `;        
    });
    $('#productsSection').append(products);
    hideLoading();
  });
}

$(document).ready(function() {
  getProduct();
});

$(document).on('click', '.modal-title',function() {
  $('#exampleModalCenter').modal('show');
});
