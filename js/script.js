
// ----------ANIMACIÓN CAMBIO DE IMAGEN COLOR----------


$(document).ready(function(){
  $('.color-btn').click(function(){
    // Quitar clase activa del resto
    $('.color-btn').removeClass('active');
    $(this).addClass('active');

    // Obtener las nuevas imágenes del botón pulsado
    const img1Src = $(this).data('img1');
    const img2Src = $(this).data('img2');

    // Fade out ambas imágenes al mismo tiempo
    $('.color-img-1, .color-img-2').stop(true, true).fadeTo(250, 0, function(){
      // Cambiar src
      $('.color-img-1').attr('src', img1Src);
      $('.color-img-2').attr('src', img2Src);
      // Fade in
      $('.color-img-1, .color-img-2').fadeTo(250, 1);
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
