var currentContent = '';
var currentCategory = '';

// Function to open the modal
function openModal(modalId) {
  $(`#${modalId}`).show();
}

// Function to close the modal
function closeModal(modalId) {
  $(`#${modalId}`).hide();
}

// Event delegation for closing modals
$(document).on('click', '.modal .close-modal', function () {
  const modalId = $(this).closest('.modal').attr('id');
  closeModal(modalId);
});
  
// Show loading container
function showLoading() {
  $('.loading-container').show();
}

// Hide loading container
function hideLoading() {
  $('.loading-container').hide();
}

// Function to handle pushing and pulling of content
function toggleContent(contentType) {
  // Show loading container
  showLoading();

  // Hide the current visible content
  $('.page-content').load(`src/${contentType.toLowerCase()}/${contentType.toLowerCase()}.html`);
  $(`.page-content > div.${currentContent.toLowerCase()}-content`).hide().removeClass('content-pulled');

  // Show loading container for 0.8 seconds
  setTimeout(function () {
    hideLoading(); // Hide loading container after 0.8 seconds

    // Simulate a short delay (3 seconds for loading animation)
    setTimeout(function () {
      // Show the clicked content
      $(`.page-content > div.${contentType.toLowerCase()}-content`).show().addClass('content-pulled');
      // Update the current visible content
      currentContent = contentType;
    }); 
  }, 800); // 800 milliseconds = 0.8 seconds
}

function appendMenu(response) {
  var sidemenu = '';
  response.forEach(menu => {
    sidemenu += `
      <div class="item">
        <a href="#" class="content-link" data-content="Pos" category-id=${menu.ID}>${menu.Product_Name}</a>
      </div>
    `;
  });
  $(".sidemenu").append(sidemenu);
}

function getRole(roleAccess) {
  var sidemenu = '';

  if (roleAccess == "Admin") {
    sidemenu = `
      <div class="item">
        <a href="#" class="content-link" data-content="Dashboard"><i class="fas fa-desktop"></i>Dashboard</a>
      </div>
      <div class="item">
        <a href="#" class="content-link" data-content="Employee"><i class="fas fa-user"></i>User Management</a>
      </div>
      <div class="item">
        <a href="#" class="content-link" data-content="Menu"><i class="fas fa-table"></i>Menu Management</a>
      </div>
      <div class="item">
        <a href="#" class="content-link" data-content="Transaction"><i class="fas fa-business-time"></i>Transactions</a>
      </div>
      <div class="item">
        <a href="#" class="content-link" data-content="Settings"><i class="fas fa-cogs"></i>Settings</a>
      </div>
      <div class="item">
        <a href="#" class="content-link" data-content="About"><i class="fas fa-info-circle"></i>About</a>
      </div>
    `;
    $(".sidemenu").append(sidemenu);
  } else if (roleAccess == "Cashier") {
    requestCall('pos', 'GET', 'listMenu', null, null, appendMenu);
  }
}

$(document).ready(function () {
 
  requestCall('user', 'GET', 'checkLoggedIn', null, null, function(res) {
    if (!res) {
      window.location = "login.html";
    }
  }); 

  requestCall('user', 'GET', 'getRole', null, null, function(res) {
    getRole(res[0].role);
  }); 
  
  // Toggle sub-menus
  $('.sub-btn').click(function () {
    $(this).next('.sub-menu').slideToggle();
    $(this).find('.dropdown').toggleClass('rotate');
  });

  // Handle content clicks
  $(document).on('click', '.content-link', function (e) {
      e.preventDefault();
      currentCategory = $(this).attr("category-id");
      const contentType = $(this).data('content');
      toggleContent(contentType); 
  });

  // Initial hide for loading container
  $('.loading-container').hide();

  // Toggle sidebar and content visibility
  $('.menu-btn').click(function () {
    $('.side-bar').addClass('active');
    $('.menu-btn').css("visibility", "hidden");
    $('.page-content > div').addClass('content-pulled');
    $('.table-container').css("width", "100%"); // Adjust the width when the sidebar is open
  });

  $('.close-btn').click(function () {
    $('.side-bar').removeClass('active');
    $('.menu-btn').css("visibility", "visible");
    $('.page-content > div').removeClass('content-pulled');
    $('.table-container').css("width", "100%"); // Set back to the default width when closing the sidebar
    currentContent = ''; // Reset the current visible content when closing the sidebar
  });

  $(".logout-btn").click(function() {
    requestCall('user', 'POST', 'logout', null, null, function() {
      window.location = "login.html";
    });
    
  })

});