
function main() {

  (function () {
    'use strict';

    $('a.page-scroll').click(function () {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top - 50
          }, 900);
          return false;
        }
      }
    });


    $('body').scrollspy({
      target: '.navbar-default',
      offset: 80
    });



    // Retrieve properties from localStorage and render them on the front page
    let properties = JSON.parse(localStorage.getItem("properties")) || [];

    // Render Properties in Public View
    function renderPublicProperties() {
      const propertyGrid = document.getElementById('property-grid');
      propertyGrid.innerHTML = ''; // Clear the existing properties
      properties.forEach((property) => {
        const card = document.createElement('div');
        card.className = 'property-card';
        card.innerHTML = `
            <img src="${property.image}" alt="${property.title}">
            <h3>${property.title}</h3>
            <p>${property.price}</p>
        `;
        propertyGrid.appendChild(card);
      });
    }

    // Initially render properties on page load
    renderPublicProperties();


    // Initially render properties on page load
    renderPublicProperties();
    // Hide nav on click
    $(".navbar-nav li a").click(function (event) {
      // check if window is small enough so dropdown is created
      var toggle = $(".navbar-toggle").is(":visible");
      if (toggle) {
        $(".navbar-collapse").collapse('hide');
      }
    });


    // Nivo Lightbox 
    $('.portfolio-item a').nivoLightbox({
      effect: 'slideDown',
      keyboardNav: true,
    });

  }());


}
main();