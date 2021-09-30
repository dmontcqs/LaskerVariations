var container = document.querySelector("#container");
var activeItem = null;

var active = false;

//   el primero es el evenlistener, el segundo es un eventhandeler, el tercer elemento una función expresada más abajo,
//false es su valor inicial?
container.addEventListener("touchstart", dragStart, false);
container.addEventListener("touchend", dragEnd, false);
container.addEventListener("touchmove", drag, false);
container.addEventListener("mousedown", dragStart, false);
container.addEventListener("mouseup", dragEnd, false);
container.addEventListener("mousemove", drag, false);

//   FUNCIÓN DRAGSTART

function dragStart(e) {
  if (e.target !== e.currentTarget) {
    active = true;

    // this is the item we are interacting with
    activeItem = e.target;
    // pageXOffset and pageYOffset properties son los px que se desplaza un elemento en el eje X y en eje Y;

    if (!activeItem.xOffset) {
      activeItem.xOffset = 0;
    }

    if (!activeItem.yOffset) {
      activeItem.yOffset = 0;
    }

    if (e.type === "touchstart") {
      activeItem.initialX = e.touches[0].clientX - activeItem.xOffset;
      activeItem.initialY = e.touches[0].clientY - activeItem.yOffset;
    } else {
      console.log("doing something!");
      activeItem.initialX = e.clientX - activeItem.xOffset;
      activeItem.initialY = e.clientY - activeItem.yOffset;
    }
  }
}

//   FUNCIÓN DRAG END

function dragEnd(e) {
  if (activeItem !== null) {
    activeItem.initialX = activeItem.currentX;
    activeItem.initialY = activeItem.currentY;
  }

  active = false;
  activeItem = null;
}

//   función DRAG
function drag(e) {
  if (active) {
    if (e.type === "touchmove") {
      e.preventDefault();

      activeItem.currentX = e.touches[0].clientX - activeItem.initialX;
      activeItem.currentY = e.touches[0].clientY - activeItem.initialY;
    } else {
      activeItem.currentX = e.clientX - activeItem.initialX;
      activeItem.currentY = e.clientY - activeItem.initialY;
    }

    activeItem.xOffset = activeItem.currentX;
    activeItem.yOffset = activeItem.currentY;

    setTranslate(activeItem.currentX, activeItem.currentY, activeItem);
  }
}

function setTranslate(xPos, yPos, el) {
  el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}


// HTML2CANVAS
/**
 * Ejemplo 1 de html2canvas para convertir el HTML de una web
 * a un elemento canvas y adjuntarlo al contenido actual
 * 
 * @author parzibyte
 */
//Definimos el botón para escuchar su click, y también el contenedor del canvas
const $boton = document.querySelector("#btnCapturar"), // El botón que desencadena
  $objetivo = document.querySelector("#container"), // A qué le tomamos la foto
  $contenedorCanvas = document.querySelector("#contenedorCanvas"); // En dónde ponemos el elemento canvas

// Agregar el listener al botón
$boton.addEventListener("click", () => {
  html2canvas($objetivo) // Llamar a html2canvas y pasarle el elemento
    .then(canvas => {
      // Cuando se resuelva la promesa traerá el canvas
      $contenedorCanvas.appendChild(canvas);// Lo agregamos como hijo del div
      // $contenedorCanvas.appendChild(p)
    });
});
 