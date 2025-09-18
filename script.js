// script.js

// Menú desplegable tipo botón
function toggleMenu(button) {
  const allMenus = document.querySelectorAll(".menu-items");

  allMenus.forEach(menu => {
    if (menu !== button.nextElementSibling) {
      menu.classList.remove("mostrando");
      setTimeout(() => {
        menu.style.display = "none";
      }, 300);
    }
  });

  const currentMenu = button.nextElementSibling;

  if (currentMenu.classList.contains("mostrando")) {
    currentMenu.classList.remove("mostrando");
    setTimeout(() => {
      currentMenu.style.display = "none";
    }, 300);
  } else {
    currentMenu.style.display = "grid";
    setTimeout(() => {
      currentMenu.classList.add("mostrando");
    }, 10);
  }
}

// Cierre del menú si se hace clic fuera
document.addEventListener("click", function (event) {
  const isMenuOrButton =
    event.target.closest(".menu-items") ||
    event.target.closest(".menu-boton");

  if (!isMenuOrButton) {
    document.querySelectorAll(".menu-items").forEach(menu => {
      if (menu.classList.contains("mostrando")) {
        menu.classList.remove("mostrando");
        setTimeout(() => {
          menu.style.display = "none";
        }, 300);
      }
    });
  }
});

// Carrusel
document.addEventListener("DOMContentLoaded", () => {
  const carrusel = document.querySelector("#carrusel");
  const lugares = document.querySelectorAll(".lugar");
  const btnIzq = document.querySelector(".flecha.izquierda");
  const btnDer = document.querySelector(".flecha.derecha");

  if (carrusel && lugares.length && btnIzq && btnDer) {
    let indice = 0;
    let intervalo;

    function actualizarVista() {
      lugares.forEach((el, i) => el.classList.remove("activo"));
      lugares[indice].classList.add("activo");

      const anchoLugar = lugares[0].offsetWidth + 20;
      const offset =
        carrusel.parentElement.offsetWidth / 2 - anchoLugar / 2;
      const desplazamiento = anchoLugar * indice;

      carrusel.style.transform = `translateX(${
        -desplazamiento + offset
      }px)`;
    }

    function avanzar() {
      indice = (indice + 1) % lugares.length;
      actualizarVista();
    }

    function retroceder() {
      indice = (indice - 1 + lugares.length) % lugares.length;
      actualizarVista();
    }

    function iniciarAuto() {
      intervalo = setInterval(avanzar, 4000);
    }

    function reiniciarAuto() {
      clearInterval(intervalo);
      iniciarAuto();
    }

    btnDer.addEventListener("click", () => {
      avanzar();
      reiniciarAuto();
    });

    btnIzq.addEventListener("click", () => {
      retroceder();
      reiniciarAuto();
    });

    actualizarVista();
    iniciarAuto();
  }
});

// Menú lateral o de opciones
function toggleMenuOpciones() {
  document.querySelector(".div-opciones")?.classList.toggle("activo");
}

function toggleMenuOpciones() {
  document.querySelector('.div-opciones')?.classList.toggle('activo');
}



  const carrusel = document.getElementById('carrusel');
  const btnIzquierda = document.getElementById('btnIzquierda');
  const btnDerecha = document.getElementById('btnDerecha');

  btnIzquierda.addEventListener('click', () => {
    carrusel.scrollBy({left: -300, behavior: 'smooth'});
  });

  btnDerecha.addEventListener('click', () => {
    carrusel.scrollBy({left: 300, behavior: 'smooth'});
  });

  // Modal elements
  const modal = document.getElementById('modal');
  const modalImagen = document.getElementById('modalImagen');
  const modalCerrar = document.getElementById('modalCerrar');
  const modalIzquierda = document.getElementById('modalIzquierda');
  const modalDerecha = document.getElementById('modalDerecha');

  const imagenes = Array.from(document.querySelectorAll('.imagen-carrusel'));
  let indiceActual = 0;

  function abrirModal(index) {
    indiceActual = index;
    modalImagen.src = imagenes[indiceActual].src;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Evita scroll de fondo
  }

  function cerrarModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  function mostrarSiguiente() {
    indiceActual = (indiceActual + 1) % imagenes.length;
    modalImagen.src = imagenes[indiceActual].src;
  }

  function mostrarAnterior() {
    indiceActual = (indiceActual - 1 + imagenes.length) % imagenes.length;
    modalImagen.src = imagenes[indiceActual].src;
  }

  // Click en imagenes para abrir modal
  imagenes.forEach(img => {
    img.addEventListener('click', () => {
      abrirModal(parseInt(img.dataset.index));
    });
  });

  // Flechas modal
  modalIzquierda.addEventListener('click', mostrarAnterior);
  modalDerecha.addEventListener('click', mostrarSiguiente);

  // Cerrar modal con la X
  modalCerrar.addEventListener('click', cerrarModal);

  // Cerrar modal clic fuera de imagen
  modal.addEventListener('click', (e) => {
    if(e.target === modal) cerrarModal();
  });

  // Navegacion con teclado (opcional)
  window.addEventListener('keydown', (e) => {
    if(!modal.classList.contains('active')) return;
    if(e.key === 'ArrowRight') mostrarSiguiente();
    else if(e.key === 'ArrowLeft') mostrarAnterior();
    else if(e.key === 'Escape') cerrarModal();
  });

  const btnOleo = document.getElementById("btn-oleo");
  const btnElettro = document.getElementById("btn-elettro");
  const btnHybrid = document.getElementById("btn-hybrid");

  const infoOleo = document.getElementById("info-oleo");
  const infoElettro = document.getElementById("info-elettro");
  const infoHybrid = document.getElementById("info-hybrid");

  btnOleo.addEventListener("click", () => {
    infoOleo.style.display = "block";
    infoElettro.style.display = "none";
    infoHybrid.style.display = "none";
    btnOleo.classList.add("active");
    btnElettro.classList.remove("active");
    btnHybrid.classList.remove("active");
  });

  btnElettro.addEventListener("click", () => {
    infoOleo.style.display = "none";
    infoElettro.style.display = "block";
    infoHybrid.style.display = "none";
    btnElettro.classList.add("active");
    btnOleo.classList.remove("active");
    btnHybrid.classList.remove("active");
  });

  btnHybrid.addEventListener("click", () => {
    infoOleo.style.display = "none";
    infoElettro.style.display = "none";
    infoHybrid.style.display = "block";
    btnHybrid.classList.add("active");
    btnOleo.classList.remove("active");
    btnElettro.classList.remove("active");
  });

