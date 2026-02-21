/* ================================================
   HOTEL ESCO BREA — main.js
   Autor: Proyecto Académico
   Descripción: Lógica principal de la página web
   Incluye:
     1. Datos de habitaciones
     2. Renderizado de tarjetas
     3. Disponibilidad dinámica
     4. Modo oscuro / claro con localStorage
     5. Menú móvil
     6. Animaciones al hacer scroll
     7. Año actual en el footer
================================================ */


/* ================================================
   1. DATOS DE HABITACIONES
   Aquí defines cada tipo de habitación del hotel.
   Para agregar una nueva, copia un objeto { } y
   modifica sus valores.
================================================ */
const habitaciones = [
  {
    id: 1,
    tipo: "Habitación Simple",
    titulo: "Simple Confort",
    descripcion: "Perfecta para viajeros solos o de negocios. Cuenta con cama doble, aire acondicionado, TV y baño privado con todas las comodidades.",
    precio: 85,
    moneda: "USD",
    totalHabitaciones: 10,
    imagen: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80",
    amenidades: ["WiFi", "A/C", "TV", "Desayuno"],
  },
  {
    id: 2,
    tipo: "Habitación Doble",
    titulo: "Doble Premium",
    descripcion: "Ideal para parejas o viajeros que buscan más espacio. Dos camas queen size, balcón privado con vista al jardín y minibar incluido.",
    precio: 130,
    moneda: "USD",
    totalHabitaciones: 8,
    imagen: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&q=80",
    amenidades: ["WiFi", "A/C", "Balcón", "Minibar", "TV"],
  },
  {
    id: 3,
    tipo: "Suite",
    titulo: "Suite Caribeña",
    descripcion: "Sumérgete en la esencia del Caribe. Sala de estar separada, jacuzzi privado, vista al mar y servicio de mayordomo personalizado.",
    precio: 220,
    moneda: "USD",
    totalHabitaciones: 5,
    imagen: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80",
    amenidades: ["WiFi", "Jacuzzi", "Vista al mar", "Mayordomo", "Minibar"],
  },
  {
    id: 4,
    tipo: "Suite",
    titulo: "Suite Presidencial",
    descripcion: "La experiencia más exclusiva del hotel. Dos habitaciones, sala de estar, comedor privado, terraza panorámica y acceso VIP al spa.",
    precio: 380,
    moneda: "USD",
    totalHabitaciones: 2,
    imagen: "https://images.unsplash.com/photo-1631049421450-348ccd7f8949?w=600&q=80",
    amenidades: ["WiFi", "Terraza", "Spa VIP", "Chef privado", "Butler"],
  },
];


/* ================================================
   2. DATOS DE DISPONIBILIDAD
   Aquí simulamos cuántas habitaciones están
   disponibles en este momento.
   En un proyecto real esto vendría de un servidor.
================================================ */
const disponibilidad = [
  { idHabitacion: 1, disponibles: 6 },
  { idHabitacion: 2, disponibles: 3 },
  { idHabitacion: 3, disponibles: 1 },
  { idHabitacion: 4, disponibles: 0 },
];


/* ================================================
   3. FUNCIÓN: RENDERIZAR TARJETAS DE HABITACIONES
   Crea el HTML de cada tarjeta y lo inserta
   en el grid de habitaciones del index.html
================================================ */
function renderizarHabitaciones() {
  // Obtenemos el contenedor del grid
  const grid = document.getElementById("rooms-grid");

  // Si no existe el contenedor, salimos
  if (!grid) return;

  // Limpiamos el contenido anterior
  grid.innerHTML = "";

  // Recorremos cada habitación y creamos su tarjeta
  habitaciones.forEach((hab) => {
    // Creamos el elemento article (semántico para una tarjeta)
    const card = document.createElement("article");
    card.className = "room-card animate-in";
    card.setAttribute("role", "listitem");

    // Construimos las amenidades como etiquetas pequeñas
    const amenidadesHTML = hab.amenidades
      .map((a) => `<span class="amenity-tag">${a}</span>`)
      .join("");

    // Definimos el HTML interno de la tarjeta
    card.innerHTML = `
      <img
        src="${hab.imagen}"
        alt="Fotografía de la ${hab.titulo} en Hotel Esco Brea"
        class="room-card__image"
        loading="lazy"
        width="600"
        height="200"
      />
      <div class="room-card__body">
        <p class="room-card__type">${hab.tipo}</p>
        <h3 class="room-card__title">${hab.titulo}</h3>
        <p class="room-card__desc">${hab.descripcion}</p>
        <div class="room-card__amenities" aria-label="Amenidades incluidas">
          ${amenidadesHTML}
        </div>
        <div class="room-card__footer">
          <div class="room-card__price">
            <span class="price__amount">$${hab.precio}</span>
            <span class="price__label">${hab.moneda} / noche</span>
          </div>
          <div class="room-card__count">
            <strong>${hab.totalHabitaciones}</strong>
            habitaciones
          </div>
        </div>
        <!-- MODIFICADO: Ahora el botón lleva a la página de reservaciones -->
        <a href="reservaciones.html" class="btn btn--reserve" style="margin-top: 1rem;">
          🛎️ Reservar Ahora
        </a>
      </div>
    `;

    // Insertamos la tarjeta en el grid
    grid.appendChild(card);
  });
}


/* ================================================
   4. FUNCIÓN: RENDERIZAR DISPONIBILIDAD
   Muestra el estado actual de cada tipo de
   habitación con barras de progreso y colores.
================================================ */
function renderizarDisponibilidad() {
  const grid = document.getElementById("availability-grid");
  if (!grid) return;

  // Variables para el resumen total
  let totalDisponibles = 0;
  let totalOcupadas    = 0;
  let totalHabitaciones = 0;

  grid.innerHTML = "";

  // Recorremos la disponibilidad
  disponibilidad.forEach((item) => {
    // Buscamos la habitación correspondiente
    const hab = habitaciones.find((h) => h.id === item.idHabitacion);
    if (!hab) return;

    const disponibles = item.disponibles;
    const ocupadas    = hab.totalHabitaciones - disponibles;
    const porcentaje  = Math.round((disponibles / hab.totalHabitaciones) * 100);

    // Acumulamos para el resumen
    totalDisponibles  += disponibles;
    totalOcupadas     += ocupadas;
    totalHabitaciones += hab.totalHabitaciones;

    // Determinamos el estado visual
    let estadoTexto  = "Disponible";
    let estadoClase  = "status-badge--available";
    let barraClase   = "";

    if (disponibles === 0) {
      estadoTexto = "Sin disponibilidad";
      estadoClase = "status-badge--occupied";
      barraClase  = "avail-card__bar--empty";
    } else if (porcentaje <= 30) {
      estadoTexto = "Últimas habitaciones";
      estadoClase = "status-badge--occupied";
      barraClase  = "avail-card__bar--low";
    }

    // Creamos la tarjeta de disponibilidad
    const card = document.createElement("div");
    card.className = "avail-card animate-in";
    card.setAttribute("role", "listitem");

    card.innerHTML = `
      <div class="avail-card__header">
        <h3 class="avail-card__name">${hab.titulo}</h3>
        <span class="status-badge ${estadoClase}" aria-label="Estado: ${estadoTexto}">
          ${estadoTexto}
        </span>
      </div>
      <div
        class="avail-card__bar-wrap"
        role="progressbar"
        aria-valuenow="${disponibles}"
        aria-valuemin="0"
        aria-valuemax="${hab.totalHabitaciones}"
        aria-label="${disponibles} de ${hab.totalHabitaciones} disponibles"
      >
        <div
          class="avail-card__bar ${barraClase}"
          style="width: ${porcentaje}%"
        ></div>
      </div>
      <div class="avail-card__numbers">
        <span>
          Disponibles: <strong style="color: var(--color-available)">${disponibles}</strong>
        </span>
        <span>
          Ocupadas: <strong style="color: var(--color-occupied)">${ocupadas}</strong>
        </span>
        <span>Total: <strong>${hab.totalHabitaciones}</strong></span>
      </div>
    `;

    grid.appendChild(card);
  });

  // Actualizamos los contadores del resumen
  actualizarContadores(totalDisponibles, totalOcupadas, totalHabitaciones);
}


/* ================================================
   5. FUNCIÓN: ACTUALIZAR CONTADORES DEL RESUMEN
   Actualiza los números grandes en la sección
   de disponibilidad (disponibles, ocupadas, total)
================================================ */
function actualizarContadores(disponibles, ocupadas, total) {
  const elDisp  = document.getElementById("count-available");
  const elOcup  = document.getElementById("count-occupied");
  const elTotal = document.getElementById("count-total");

  if (elDisp)  elDisp.textContent  = disponibles;
  if (elOcup)  elOcup.textContent  = ocupadas;
  if (elTotal) elTotal.textContent = total;
}


/* ================================================
   6. MODO OSCURO / CLARO
   Guarda la preferencia del usuario en
   localStorage para que se recuerde al recargar.
================================================ */
function iniciarModoOscuro() {
  const boton = document.getElementById("theme-toggle");
  if (!boton) return;

  // Leemos la preferencia guardada (si existe)
  const temaGuardado = localStorage.getItem("tema-hotel");

  // Si hay preferencia guardada, la aplicamos
  if (temaGuardado === "dark") {
    activarModoOscuro();
  } else {
    activarModoClaro();
  }

  // Escuchamos el clic en el botón
  boton.addEventListener("click", () => {
    const temaActual = document.documentElement.getAttribute("data-theme");

    if (temaActual === "dark") {
      activarModoClaro();
    } else {
      activarModoOscuro();
    }
  });
}

function activarModoOscuro() {
  document.documentElement.setAttribute("data-theme", "dark");
  localStorage.setItem("tema-hotel", "dark");

  const boton = document.getElementById("theme-toggle");
  if (boton) {
    boton.querySelector(".btn-theme__icon").textContent = "☀️";
    boton.setAttribute("aria-label", "Cambiar a modo claro");
  }
}

function activarModoClaro() {
  document.documentElement.removeAttribute("data-theme");
  localStorage.setItem("tema-hotel", "light");

  const boton = document.getElementById("theme-toggle");
  if (boton) {
    boton.querySelector(".btn-theme__icon").textContent = "🌙";
    boton.setAttribute("aria-label", "Cambiar a modo oscuro");
  }
}


/* ================================================
   7. MENÚ MÓVIL (HAMBURGUESA)
   Abre y cierra el menú en pantallas pequeñas.
   También cierra el menú al hacer clic en un link.
================================================ */
function iniciarMenuMovil() {
  const btnMenu  = document.getElementById("menu-toggle");
  const menuMov  = document.getElementById("mobile-menu");
  if (!btnMenu || !menuMov) return;

  // Clic en el botón hamburguesa
  btnMenu.addEventListener("click", () => {
    const estaAbierto = !menuMov.hidden;

    if (estaAbierto) {
      cerrarMenu(btnMenu, menuMov);
    } else {
      abrirMenu(btnMenu, menuMov);
    }
  });

  // Cerrar menú al hacer clic en cualquier link del menú móvil
  const linksMovil = menuMov.querySelectorAll(".nav-mobile__link");
  linksMovil.forEach((link) => {
    link.addEventListener("click", () => {
      cerrarMenu(btnMenu, menuMov);
    });
  });
}

function abrirMenu(btn, menu) {
  menu.hidden = false;
  btn.setAttribute("aria-expanded", "true");
  btn.setAttribute("aria-label", "Cerrar menú de navegación");
}

function cerrarMenu(btn, menu) {
  menu.hidden = true;
  btn.setAttribute("aria-expanded", "false");
  btn.setAttribute("aria-label", "Abrir menú de navegación");
}


/* ================================================
   8. ANIMACIONES AL HACER SCROLL
   Los elementos con clase .animate-in aparecen
   suavemente cuando entran al viewport (pantalla).
   Usamos IntersectionObserver (moderno y eficiente).
================================================ */
function iniciarAnimacionesScroll() {
  // Verificamos que el navegador soporte IntersectionObserver
  if (!("IntersectionObserver" in window)) return;

  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          // El elemento es visible: activamos la animación
          entrada.target.classList.add("visible");
          // Dejamos de observar para no repetir la animación
          observador.unobserve(entrada.target);
        }
      });
    },
    {
      threshold: 0.1, // Se activa cuando el 10% del elemento es visible
      rootMargin: "0px 0px -40px 0px",
    }
  );

  // Observamos todos los elementos con clase animate-in
  // Usamos setTimeout para esperar que el DOM esté listo
  setTimeout(() => {
    const elementos = document.querySelectorAll(".animate-in");
    elementos.forEach((el) => observador.observe(el));
  }, 100);
}


/* ================================================
   9. AÑO ACTUAL EN EL FOOTER
   Actualiza automáticamente el año de copyright.
================================================ */
function actualizarAnio() {
  const elAnio = document.getElementById("year");
  if (elAnio) {
    elAnio.textContent = new Date().getFullYear();
  }
}


/* ================================================
   10. INICIALIZACIÓN PRINCIPAL
   Todo comienza aquí cuando la página carga.
   DOMContentLoaded = el HTML ya está listo.
================================================ */
document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ Hotel Esco Brea - Página cargada correctamente");

  // Renderizamos las secciones dinámicas
  renderizarHabitaciones();
  renderizarDisponibilidad();

  // Iniciamos funcionalidades
  iniciarModoOscuro();
  iniciarMenuMovil();
  iniciarAnimacionesScroll();
  actualizarAnio();
});