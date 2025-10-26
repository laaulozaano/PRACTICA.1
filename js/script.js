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

// const bestSellersSwiper = new Swiper('.best-sellers-swiper', {
//   slidesPerView: 'auto', 
//   spaceBetween: 15,      
//   loop: true,
//   grabCursor: true,      
//   centeredSlides: false, 
// });



