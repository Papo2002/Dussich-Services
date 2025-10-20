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
  document.querySelector('.div-opciones')?.classList.toggle('activo');
}

const carruselScroll = document.getElementById('carrusel');
const btnIzquierda = document.getElementById('btnIzquierda');
const btnDerecha = document.getElementById('btnDerecha');

btnIzquierda?.addEventListener('click', () => {
  carruselScroll.scrollBy({left: -300, behavior: 'smooth'});
});

btnDerecha?.addEventListener('click', () => {
  carruselScroll.scrollBy({left: 300, behavior: 'smooth'});
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
  document.body.style.overflow = 'hidden';
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
modalIzquierda?.addEventListener('click', mostrarAnterior);
modalDerecha?.addEventListener('click', mostrarSiguiente);

// Cerrar modal con la X
modalCerrar?.addEventListener('click', cerrarModal);

// Cerrar modal clic fuera de imagen
modal.addEventListener('click', (e) => {
  if(e.target === modal) cerrarModal();
});

// Navegacion con teclado
window.addEventListener('keydown', (e) => {
  if(!modal.classList.contains('active')) return;
  if(e.key === 'ArrowRight') mostrarSiguiente();
  else if(e.key === 'ArrowLeft') mostrarAnterior();
  else if(e.key === 'Escape') cerrarModal();
});

// ------------------- Botones de selección (Oleodinamica / Elettromeccanica / Hybrid) -------------------
// Se adapta a cualquier número de botones con clase "boton-switch" y sección correspondiente

document.querySelectorAll('.boton-switch').forEach(boton => {
  boton.addEventListener('click', () => {
    const targetId = boton.id.replace('btn-', 'info-'); // Ej: btn-oleo -> info-oleo
    const targetDiv = document.getElementById(targetId);

    if(!targetDiv) return;

    // Ocultar todos los divs de info
    document.querySelectorAll('[id^="info-"]').forEach(div => div.style.display = 'none');
    targetDiv.style.display = 'block';

    // Activar solo el botón seleccionado
    document.querySelectorAll('.boton-switch').forEach(b => b.classList.remove('active'));
    boton.classList.add('active');
  });
});


// ------------------- Ocultar div izquierdo al hacer scroll -------------------
const divInfo = document.querySelector('.div-info');
const contenedorScroll = document.querySelector('.contenedor-scroll');

window.addEventListener('scroll', () => {
    const contenedorBottom = contenedorScroll.getBoundingClientRect().bottom;
    const topLimit = 50; // margen superior antes de ocultar
    if(contenedorBottom < topLimit) {
        divInfo.style.opacity = '0';
    } else {
        divInfo.style.opacity = '1';
    }
});


