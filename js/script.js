
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


// ---------filtros----------

$(document).ready(function(){
  function applyFilters(){
    const activeFilters = $('.filter-checkbox:checked').map(function(){
      return $(this).data('filter');
    }).get();

    $('.product-item').each(function(){
      const categories = [$(this).data('category'), $(this).data('price')];
      const techs = $(this).data('tech') ? $(this).data('tech').split(' ') : [];
      const attributes = categories.concat(techs);

      const show = activeFilters.length === 0 || activeFilters.every(f => attributes.includes(f));
      $(this).toggle(show);
    });
  }

  // Cada vez que cambia un checkbox
  $('.filter-checkbox').change(applyFilters);

  // Botón Clear Filters
  $('#clearFilters').click(function(){
    $('.filter-checkbox').prop('checked', false);
    applyFilters();
  });
});



// product page----------
gsap.registerPlugin(ScrollTrigger);

let heroTL = gsap.timeline({
  scrollTrigger: {
    trigger: ".hero-2",
    start: "top top",
    end: "bottom+=150% top",
    scrub: 1.5,
    pin: true,
    anticipatePin: 1,
    invalidateOnRefresh: true,
    onUpdate: (self) => {
      // cuando el scroll esté casi al final, mostramos precio y opciones
      if (self.progress > 0.75) {
        document.querySelector(".price-product").classList.add("visible");
        document.querySelector(".product-options").classList.add("visible");
      } else {
        document.querySelector(".price-product").classList.remove("visible");
        document.querySelector(".product-options").classList.remove("visible");
      }
    }
  }
});

// Animación del título
heroTL
  .fromTo(".product-name-h1",
    { scale: 1, yPercent: 0 },
    { scale: 1, yPercent: -20, ease: "power2.inOut" }
  )
  .to(".product-name-h1",
    { fontSize: '4vw', yPercent: -5, scale: 1, ease: "power2.inOut" }
  );

// Animación de la imagen
heroTL.fromTo(".product-image",
  { scale: 1, xPercent: 0, yPercent: 0 },
  { scale: 1.1, xPercent: 60, yPercent: 5, ease: "power2.inOut" },
  "<"
);



// Chips scroll
gsap.utils.toArray(".chip").forEach((layer, i) => {
  gsap.fromTo(layer, 
    {opacity: 0, y: 50*i}, 
    {
      opacity: 1, 
      y: 0,
      scrollTrigger: {
        trigger: ".chips",
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    }
  );
});

// Swiper
var swiper = new Swiper(".mySwiper", {
  direction: "vertical",
  loop: true,
  autoplay: { delay: 2000 }
});

// Reviews pagination
let currentPage = 0;
const reviews = $(".reviews-list .review");

$(".next").click(function(){
  reviews.hide();
  currentPage++;
  if(currentPage >= reviews.length) currentPage = 0;
  reviews.eq(currentPage).show();
});

$(".prev").click(function(){
  reviews.hide();
  currentPage--;
  if(currentPage < 0) currentPage = reviews.length -1;
  reviews.eq(currentPage).show();
});

reviews.hide().eq(0).show();
