// CAMBIO DE COLOR BOTONES

$(document).ready(function(){
  $('.color-btn').click(function(){
    // Quitar clase activa del resto
    $('.color-btn').removeClass('active');
    $(this).addClass('active');

    // Obtener las nuevas imágenes del botón pulsado
    const img1 = $(this).data('img1');
    const img2 = $(this).data('img2');

    // Animar el cambio con transición suave
    $('.color-img-1').fadeOut(200, function(){
      $(this).attr('src', img1).fadeIn(200);
    });
    $('.color-img-2').fadeOut(200, function(){
      $(this).attr('src', img2).fadeIn(200);
    });
  });
});



// ----------ANIMACIÓN CAMBIO DE IMAGEN COLOR----------


document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".color-btn");
  const img1 = document.getElementById("img1");
  const img2 = document.getElementById("img2");

  const images = {
    yellow: ["yellow1.jpg", "yellow2.jpg"],
    green: ["green1.jpg", "green2.jpg"],
    blue: ["blue1.jpg", "blue2.jpg"],
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const color = button.getAttribute("data-color");

      // ✨ Animación de desvanecer
      img1.classList.add("fade-out");
      img2.classList.add("fade-out");

      setTimeout(() => {
        img1.src = images[color][0];
        img2.src = images[color][1];
        img1.classList.remove("fade-out");
        img2.classList.remove("fade-out");
      }, 500); // Espera que termine el fade antes de cambiar
    });
  });
});


// --------SLIDER---------

document.addEventListener("DOMContentLoaded", function() {
  const swiper = new Swiper(".mySwiper", {
    slidesPerView: "auto",  // ancho de cada slide según CSS
    spaceBetween: 20,
    freeMode: true,          // permite drag natural
    grabCursor: true,
    loop: false,             // sin loop
    autoplay: false,
    centeredSlides: false,
    watchOverflow: true
  });
});


// ---------input newsletter----------
$(document).ready(function() {
  $('#newsletterForm').on('submit', function(e) {
    e.preventDefault();
    const email = $('#email').val().trim();
    const message = $('#subscribeMessage');

    if (email === '' || !email.includes('@')) {
      message
        .text('Please enter a valid email.')
        .css('color', 'red')
        .addClass('visible');
    } else {
      message
        .text('Subscribed successfully!')
        .css('color', 'green')
        .addClass('visible');
      $('#newsletterForm')[0].reset();
    }
  });
});
