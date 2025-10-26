// CAMBIO DE COLOR BOTONES

$(document).ready(function(){
  $('.color-btn').click(function(){
    // quitar active del resto
    $('.color-btn').removeClass('active');
    $(this).addClass('active');

    // obtener src de data attributes
    const img1 = $(this).data('img1');
    const img2 = $(this).data('img2');

    // cambiar imágenes
    $('.color-img-1').attr('src', img1);
    $('.color-img-2').attr('src', img2);
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



