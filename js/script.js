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
// gsap.registerPlugin(ScrollTrigger);

// let heroTL = gsap.timeline({
//   scrollTrigger: {
//     trigger: ".hero-2",
//     start: "top top",
//     end: "bottom+=150% top",
//     scrub: 1.5,
//     pin: true,
//     anticipatePin: 1,
//     invalidateOnRefresh: true,
//     onUpdate: (self) => {
//       if (self.progress > 0.75) {
//         document.querySelector(".price-product").classList.add("visible");
//         document.querySelector(".product-options").classList.add("visible");
//       } else {
//         document.querySelector(".price-product").classList.remove("visible");
//         document.querySelector(".product-options").classList.remove("visible");
//       }
//     }
//   }
// });


// Animación del título
// heroTL
//   .fromTo(".product-name-h1",
//     { scale: 1, yPercent: 0 },
//     { scale: 1, yPercent: -20, ease: "power2.inOut" }
//   )
//   .to(".product-name-h1",
//     { fontSize: '4vw', yPercent: -5, scale: 1, ease: "power2.inOut" }
//   );

// Animación de la imagen
// heroTL.fromTo(".product-image",
//   { scale: 1, xPercent: 0, yPercent: 0 },
//   { scale: 1.1, xPercent: 60, yPercent: 5, ease: "power2.inOut" },
//   "<"
// );

document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll('.fade-in');

  elements.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add('show');
    }, i * 150); // Delay escalonado elegante
  });
});


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
// ---- 20 REVIEWS ----
const allReviews = [
    { text: "El producto superó todas mis expectativas. La calidad de los materiales es increíble y la funcionalidad es impecable. Muy recomendable.", stars: 5, author: "María Ortega" },
    { text: "Me sorprendió gratamente la rapidez de envío y la atención al cliente. Además, el producto funciona a la perfección.", stars: 5, author: "Carlos Gómez" },
    { text: "Desde que lo uso, todo ha sido más fácil. La estabilidad y la eficiencia son notables. Recomiendo totalmente esta compra.", stars: 4, author: "Lucía Torres" },
    { text: "El diseño es elegante y moderno, y el rendimiento es excelente. Se nota que es un producto de alta gama.", stars: 5, author: "Pedro Martín" },
    { text: "Estoy muy satisfecho con la compra. El producto cumple exactamente con lo que prometen y la experiencia de uso es fantástica.", stars: 5, author: "Sandra López" },
    { text: "Llegó en perfectas condiciones y desde el primer momento funcionó sin problemas. Una compra que repetiría sin dudarlo.", stars: 4, author: "Álvaro Ruiz" },
    { text: "Material de alta calidad, duradero y confiable. Además, es muy fácil de usar y se adapta a cualquier necesidad.", stars: 5, author: "Patricia Vera" },
    { text: "La atención al cliente fue excelente y resolvieron todas mis dudas antes de comprar. Muy recomendable.", stars: 5, author: "Diego Morales" },
    { text: "La mejor compra que he hecho este año.", stars: 5, author: "Marta Blanco" },
    { text: "Es perfecto para quienes buscan eficiencia y diseño. La relación calidad-precio es insuperable.", stars: 5, author: "Javier Montes" },
    { text: "Me gustaría más volumen, pero buenos.", stars: 4, author: "Elena Campos" },
    { text: "El envío fue rápido y sin problemas. Todo llegó perfectamente embalado y funcionando de maravilla.", stars: 5, author: "Raúl Castro" },
    { text: "Tal como se describe, el producto funciona a la perfección. Estoy muy contento con mi compra.", stars: 5, author: "Isabel Reyes" },
    { text: "Relación calidad-precio excelente.", stars: 5, author: "Tomás Herrera" },
    { text: "Entrega rápida y producto impecable. Todo llegó en excelente estado y listo para usar. Muy satisfecho.", stars: 4, author: "Sara Molina" },
    { text: "Lo uso para editar vídeo, van genial.", stars: 5, author: "David Pérez" },
    { text: "Exactamente lo que buscaba. La calidad es superior y su uso es muy sencillo. Recomiendo totalmente.", stars: 5, author: "Julia Soler" },
    { text: "Mejor de lo esperado.", stars: 5, author: "Cristina Álvarez" },
    { text: "Muy buen producto, fácil de usar y de gran rendimiento. Cumple todas las expectativas que tenía.", stars: 4, author: "Sergio Ramos" },
    { text: "Excelente relación calidad-precio. Funciona mejor de lo que esperaba y se nota que está bien fabricado.", stars: 5, author: "Paula Marín" }
];

let currentPage = 1;
const reviewsPerPage = 4;

const reviewsContainer = document.getElementById("reviews-container");
const pagesContainer = document.getElementById("reviews-pages");
const prevBtn = document.getElementById("prev-reviews");
const nextBtn = document.getElementById("next-reviews");

// ---- Render de reviews ----
function renderReviews() {
    const start = (currentPage - 1) * reviewsPerPage;
    const end = start + reviewsPerPage;
    const visibleReviews = allReviews.slice(start, end);

    reviewsContainer.style.opacity = 0;

    setTimeout(() => {
        reviewsContainer.innerHTML = "";

        visibleReviews.forEach(r => {
            reviewsContainer.innerHTML += `
                <div class="review">
                    <p>${r.text}</p>
                    <div class="stars">${"★".repeat(r.stars)}${"☆".repeat(5 - r.stars)}</div>
                    <div class="author">${r.author}</div>
                </div>
            `;
        });

        reviewsContainer.style.opacity = 1;
    }, 200);
}

// ---- Crear paginación ----
function renderPagination() {
    const totalPages = Math.ceil(allReviews.length / reviewsPerPage);
    pagesContainer.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        const page = document.createElement("span");
        page.innerText = i;

        if (i === currentPage) page.classList.add("active-page");

        page.addEventListener("click", () => {
            currentPage = i;
            renderReviews();
            renderPagination();
        });

        pagesContainer.appendChild(page);
    }
}

// ---- Flechas ----
prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        renderReviews();
        renderPagination();
    }
});

nextBtn.addEventListener("click", () => {
    const totalPages = Math.ceil(allReviews.length / reviewsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderReviews();
        renderPagination();
    }
});

// ---- Inicializar ----
renderReviews();
renderPagination();



