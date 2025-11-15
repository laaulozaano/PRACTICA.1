// ----------MODAL----------
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const myModal = new bootstrap.Modal(document.getElementById('discountModal'));
    myModal.show();
  }, 3000); // se abre a los 3 segundos
});

$(document).ready(function () {

  // Abrir carrito al click en icono (añade id="cartIcon" al carrito en navbar)
  $('#cartIcon').click(function () {
    $('#cartSidebar').addClass('open');
  });

  // Cerrar carrito
  $('#closeCart').click(function () {
    $('#cartSidebar').removeClass('open');
  });

  // Quitar producto
  $('.cart-item-remove').click(function () {
    $(this).closest('.cart-item').remove();
    updateSubtotal();
  });

  // Incrementar / Decrementar cantidad
  $('.qty-btn').click(function () {
    var $qty = $(this).siblings('.qty-number');
    var current = parseInt($qty.text());
    if ($(this).hasClass('plus')) {
      $qty.text(current + 1);
    } else if ($(this).hasClass('minus') && current > 1) {
      $qty.text(current - 1);
    }
    updateSubtotal();
  });

  // Función actualizar subtotal
  function updateSubtotal() {
    var subtotal = 0;
    $('.cart-item').each(function () {
      var price = parseFloat($(this).data('price'));
      var qty = parseInt($(this).find('.qty-number').text());
      subtotal += price * qty;
    });
    $('#cartSubtotal').text('$' + subtotal);
  }

});



// ----------ANIMACIÓN CAMBIO DE IMAGEN COLOR----------

$(document).ready(function () {
  $('.color-btn').click(function () {
    // Quitar clase activa del resto
    $('.color-btn').removeClass('active');
    $(this).addClass('active');

    // Obtener las nuevas imágenes del botón pulsado
    const img1Src = $(this).data('img1');
    const img2Src = $(this).data('img2');

    // Fade out ambas imágenes al mismo tiempo
    $('.color-img-1, .color-img-2').stop(true, true).fadeTo(250, 0, function () {
      // Cambiar src
      $('.color-img-1').attr('src', img1Src);
      $('.color-img-2').attr('src', img2Src);
      // Fade in
      $('.color-img-1, .color-img-2').fadeTo(250, 1);
    });
  });
});


// --------SLIDER---------

document.addEventListener("DOMContentLoaded", function () {
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
$(document).ready(function () {
  $('#newsletterForm').on('submit', function (e) {
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

$(document).ready(function () {
  function applyFilters() {
    const activeFilters = $('.filter-checkbox:checked').map(function () {
      return $(this).data('filter');
    }).get();

    $('.product-item').each(function () {
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
  $('#clearFilters').click(function () {
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



// ANIMACION FOTO DE CHIP
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".chip-img").forEach((img, i) => {
  gsap.to(img, {
    opacity: 1,
    y: 0,
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: img,
      start: "top 85%",
      toggleActions: "play none none reverse"
    }
  });

  // Pequeña flotación mientras aparecen
  gsap.to(img, {
    y: -15,
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
});



// Carousel reviews
// JS para carousel de reviews
const reviews = document.querySelectorAll('.review-item');
const reviewsPerPage = 4;
let currentPage = 1;
const totalPages = Math.ceil(reviews.length / reviewsPerPage);

const prevBtn = document.getElementById('prev-review');
const nextBtn = document.getElementById('next-review');
const pageDisplay = document.getElementById('review-page');

function showReviews(page) {
  const start = (page - 1) * reviewsPerPage;
  const end = start + reviewsPerPage;
  reviews.forEach((review, i) => {
    if (i >= start && i < end) {
      review.style.opacity = 1;
      review.style.transform = "translateY(0)";
    } else {
      review.style.opacity = 0;
      review.style.transform = "translateY(20px)";
    }
  });
  pageDisplay.textContent = `${page} / ${totalPages}`;
}

prevBtn.addEventListener('click', () => {
  if (currentPage > 1) currentPage--;
  showReviews(currentPage);
});

nextBtn.addEventListener('click', () => {
  if (currentPage < totalPages) currentPage++;
  showReviews(currentPage);
});

// Inicializar
showReviews(currentPage);


// Animación scroll imagen central
const imgCentral = document.querySelector(".reviews-image img");
window.addEventListener("scroll", () => {
  const rect = imgCentral.getBoundingClientRect();
  if (rect.top < window.innerHeight * 0.9) {
    imgCentral.style.opacity = "1";
    imgCentral.style.transform = "translateY(0)";
  }
});
