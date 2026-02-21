/* ================================================
   HOTEL ESCO BREA — reservaciones.js
   Autor: Proyecto Académico
   Descripción: Lógica completa del sistema de
   reservaciones simulado. Incluye:
     1. Datos de habitaciones
     2. Navegación entre pasos
     3. Validación de formularios
     4. Actualización del resumen en tiempo real
     5. Tarjeta de crédito animada
     6. Simulación de pago
     7. Pantalla de confirmación
================================================ */


/* ================================================
   1. DATOS DE HABITACIONES
   Imágenes y precios por tipo de habitación
================================================ */
const habitacionesData = {
  "simple": {
    nombre: "Simple Confort",
    precio: 85,
    imagen: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80"
  },
  "doble": {
    nombre: "Doble Premium",
    precio: 130,
    imagen: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=400&q=80"
  },
  "suite-caribe": {
    nombre: "Suite Caribeña",
    precio: 220,
    imagen: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&q=80"
  },
  "suite-presidencial": {
    nombre: "Suite Presidencial",
    precio: 380,
    imagen: "https://images.unsplash.com/photo-1631049421450-348ccd7f8949?w=400&q=80"
  }
};


/* ================================================
   2. ESTADO GLOBAL DE LA RESERVACIÓN
   Guardamos aquí todos los datos del usuario
   mientras navega entre los pasos
================================================ */
const reservacion = {
  // Paso 1
  nombre: "",
  apellido: "",
  correo: "",
  telefono: "",
  pais: "",
  // Paso 2
  habitacion: "",
  fechaEntrada: "",
  fechaSalida: "",
  adultos: 2,
  ninos: 0,
  peticiones: "",
  // Calculados
  noches: 0,
  precioNoche: 0,
  subtotal: 0,
  impuestos: 0,
  total: 0,
  // Paso 3
  metodoPago: "credito",
  // Confirmación
  numeroReservacion: ""
};


/* ================================================
   3. PASO ACTUAL
================================================ */
let pasoActual = 1;


/* ================================================
   4. NAVEGACIÓN ENTRE PASOS
   Muestra y oculta los formularios según el paso
================================================ */
function irAPaso(numeroPaso) {
  // Ocultar paso actual
  const pasoActualEl = document.getElementById(`paso-${pasoActual}`);
  if (pasoActualEl) pasoActualEl.classList.add("res-paso--oculto");

  // Mostrar nuevo paso
  const nuevoPasoEl = document.getElementById(`paso-${numeroPaso}`);
  if (nuevoPasoEl) nuevoPasoEl.classList.remove("res-paso--oculto");

  // Actualizar indicadores visuales
  actualizarIndicadores(numeroPaso);

  // Actualizar paso actual
  pasoActual = numeroPaso;

  // Scroll al inicio del formulario
  document.querySelector(".res-formularios").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

function actualizarIndicadores(pasoNuevo) {
  for (let i = 1; i <= 4; i++) {
    const indicador = document.getElementById(`paso-indicator-${i}`);
    const linea = document.querySelectorAll(".paso__linea")[i - 1];

    if (!indicador) continue;

    indicador.classList.remove("paso--activo", "paso--completado");

    if (i < pasoNuevo) {
      // Pasos anteriores: completados
      indicador.classList.add("paso--completado");
      indicador.querySelector(".paso__numero").textContent = "✓";
      if (linea) linea.classList.add("paso__linea--completada");
    } else if (i === pasoNuevo) {
      // Paso actual: activo
      indicador.classList.add("paso--activo");
      indicador.querySelector(".paso__numero").textContent = i;
      if (linea) linea.classList.remove("paso__linea--completada");
    } else {
      // Pasos siguientes: inactivos
      indicador.querySelector(".paso__numero").textContent = i;
      if (linea) linea.classList.remove("paso__linea--completada");
    }
  }
}


/* ================================================
   5. VALIDACIONES DE FORMULARIO
   Cada función valida un campo específico y
   muestra mensajes de error debajo del campo
================================================ */

// Mostrar error en un campo
function mostrarError(idError, mensaje) {
  const el = document.getElementById(idError);
  if (el) el.textContent = mensaje;

  // Marcar el input como error
  const idInput = idError.replace("error-", "");
  const input = document.getElementById(idInput);
  if (input) {
    input.classList.add("form-input--error");
    input.classList.remove("form-input--valido");
  }
}

// Limpiar error de un campo
function limpiarError(idError) {
  const el = document.getElementById(idError);
  if (el) el.textContent = "";

  const idInput = idError.replace("error-", "");
  const input = document.getElementById(idInput);
  if (input) {
    input.classList.remove("form-input--error");
    input.classList.add("form-input--valido");
  }
}

// Validar el paso 1 completo
function validarPaso1() {
  let valido = true;

  const nombre = document.getElementById("nombre").value.trim();
  const apellido = document.getElementById("apellido").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const pais = document.getElementById("pais").value;

  // Nombre
  if (nombre.length < 2) {
    mostrarError("error-nombre", "El nombre debe tener al menos 2 caracteres.");
    valido = false;
  } else {
    limpiarError("error-nombre");
    reservacion.nombre = nombre;
  }

  // Apellido
  if (apellido.length < 2) {
    mostrarError("error-apellido", "El apellido debe tener al menos 2 caracteres.");
    valido = false;
  } else {
    limpiarError("error-apellido");
    reservacion.apellido = apellido;
  }

  // Correo
  const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexCorreo.test(correo)) {
    mostrarError("error-correo", "Ingresa un correo electrónico válido.");
    valido = false;
  } else {
    limpiarError("error-correo");
    reservacion.correo = correo;
  }

  // Teléfono
  if (telefono.length < 7) {
    mostrarError("error-telefono", "Ingresa un número de teléfono válido.");
    valido = false;
  } else {
    limpiarError("error-telefono");
    reservacion.telefono = telefono;
  }

  // País
  if (!pais) {
    mostrarError("error-pais", "Selecciona tu país de origen.");
    valido = false;
  } else {
    limpiarError("error-pais");
    reservacion.pais = pais;
  }

  // Actualizar resumen si es válido
  if (valido) {
    actualizarResumenHuesped();
  }

  return valido;
}

// Validar el paso 2 completo
function validarPaso2() {
  let valido = true;

  const habitacion = document.getElementById("habitacion").value;
  const fechaEntrada = document.getElementById("fecha-entrada").value;
  const fechaSalida = document.getElementById("fecha-salida").value;
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  // Habitación
  if (!habitacion) {
    mostrarError("error-habitacion", "Selecciona un tipo de habitación.");
    valido = false;
  } else {
    limpiarError("error-habitacion");
    reservacion.habitacion = habitacion;
  }

  // Fecha de entrada
  if (!fechaEntrada) {
    mostrarError("error-fecha-entrada", "Selecciona la fecha de entrada.");
    valido = false;
  } else if (new Date(fechaEntrada) < hoy) {
    mostrarError("error-fecha-entrada", "La fecha de entrada no puede ser en el pasado.");
    valido = false;
  } else {
    limpiarError("error-fecha-entrada");
    reservacion.fechaEntrada = fechaEntrada;
  }

  // Fecha de salida
  if (!fechaSalida) {
    mostrarError("error-fecha-salida", "Selecciona la fecha de salida.");
    valido = false;
  } else if (fechaSalida <= fechaEntrada) {
    mostrarError("error-fecha-salida", "La fecha de salida debe ser después de la entrada.");
    valido = false;
  } else {
    limpiarError("error-fecha-salida");
    reservacion.fechaSalida = fechaSalida;
  }

  // Guardar personas
  reservacion.adultos = parseInt(document.getElementById("adultos").value);
  reservacion.ninos   = parseInt(document.getElementById("ninos").value);
  reservacion.peticiones = document.getElementById("peticiones").value.trim();

  // Calcular noches y precios si todo es válido
  if (valido && fechaEntrada && fechaSalida) {
    calcularPrecios(fechaEntrada, fechaSalida, habitacion);
  }

  return valido;
}

// Validar el paso 3 (pago)
function validarPaso3() {
  let valido = true;

  const titular = document.getElementById("titular").value.trim();
  const numeroTarjeta = document.getElementById("numero-tarjeta").value.replace(/\s/g, "");
  const vencimiento = document.getElementById("vencimiento").value.trim();
  const cvv = document.getElementById("cvv").value.trim();

  // Titular
  if (titular.length < 3) {
    mostrarError("error-titular", "Ingresa el nombre del titular de la tarjeta.");
    valido = false;
  } else {
    limpiarError("error-titular");
  }

  // Número de tarjeta (16 dígitos)
  if (!/^\d{16}$/.test(numeroTarjeta)) {
    mostrarError("error-numero-tarjeta", "El número de tarjeta debe tener 16 dígitos.");
    valido = false;
  } else {
    limpiarError("error-numero-tarjeta");
  }

  // Vencimiento (formato MM/AA)
  if (!/^\d{2}\/\d{2}$/.test(vencimiento)) {
    mostrarError("error-vencimiento", "Formato inválido. Usa MM/AA (ej: 12/26).");
    valido = false;
  } else {
    const [mes, anio] = vencimiento.split("/").map(Number);
    const ahora = new Date();
    const anioActual = ahora.getFullYear() % 100;
    const mesActual  = ahora.getMonth() + 1;

    if (mes < 1 || mes > 12) {
      mostrarError("error-vencimiento", "El mes debe estar entre 01 y 12.");
      valido = false;
    } else if (anio < anioActual || (anio === anioActual && mes < mesActual)) {
      mostrarError("error-vencimiento", "La tarjeta está vencida.");
      valido = false;
    } else {
      limpiarError("error-vencimiento");
    }
  }

  // CVV (3 o 4 dígitos)
  if (!/^\d{3,4}$/.test(cvv)) {
    mostrarError("error-cvv", "El CVV debe tener 3 o 4 dígitos.");
    valido = false;
  } else {
    limpiarError("error-cvv");
  }

  return valido;
}


/* ================================================
   6. CÁLCULO DE PRECIOS
   Calcula noches, subtotal, impuestos y total
================================================ */
function calcularPrecios(fechaEntrada, fechaSalida, tipoHabitacion) {
  const entrada = new Date(fechaEntrada);
  const salida  = new Date(fechaSalida);

  // Diferencia en días (noches)
  const diffMs    = salida - entrada;
  const noches    = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  // Precio según habitación
  const hab       = habitacionesData[tipoHabitacion];
  const precioNoche = hab ? hab.precio : 0;

  const subtotal   = precioNoche * noches;
  const impuestos  = Math.round(subtotal * 0.18); // ITBIS 18%
  const total      = subtotal + impuestos;

  // Guardar en el estado
  reservacion.noches      = noches;
  reservacion.precioNoche = precioNoche;
  reservacion.subtotal    = subtotal;
  reservacion.impuestos   = impuestos;
  reservacion.total       = total;

  // Actualizar resumen visual
  actualizarResumenPrecios();
  actualizarResumenFechas();
}


/* ================================================
   7. ACTUALIZACIÓN DEL RESUMEN
   Actualiza el panel derecho en tiempo real
================================================ */
function actualizarResumenHuesped() {
  const nombre = document.getElementById("nombre").value.trim();
  const apellido = document.getElementById("apellido").value.trim();

  const elHuesped = document.getElementById("resumen-huesped");
  if (elHuesped && nombre) {
    elHuesped.textContent = `${nombre} ${apellido}`;
  }
}

function actualizarResumenFechas() {
  const entrada = document.getElementById("fecha-entrada").value;
  const salida  = document.getElementById("fecha-salida").value;
  const adultos = document.getElementById("adultos").value;
  const ninos   = document.getElementById("ninos").value;

  if (entrada) {
    document.getElementById("resumen-entrada").textContent = formatearFecha(entrada);
  }
  if (salida) {
    document.getElementById("resumen-salida").textContent = formatearFecha(salida);
  }
  if (reservacion.noches > 0) {
    document.getElementById("resumen-noches").textContent =
      `${reservacion.noches} noche${reservacion.noches > 1 ? "s" : ""}`;
  }

  let personas = `${adultos} adulto${adultos > 1 ? "s" : ""}`;
  if (parseInt(ninos) > 0) {
    personas += `, ${ninos} niño${ninos > 1 ? "s" : ""}`;
  }
  document.getElementById("resumen-personas").textContent = personas;
}

function actualizarResumenHabitacion() {
  const tipoHab = document.getElementById("habitacion").value;
  if (!tipoHab) return;

  const hab = habitacionesData[tipoHab];
  if (!hab) return;

  // Actualizar imagen
  const img = document.getElementById("resumen-img");
  if (img) {
    img.src = hab.imagen;
    img.alt = `Habitación ${hab.nombre}`;
  }

  // Actualizar nombre en overlay
  const tipoEl = document.getElementById("resumen-tipo-hab");
  if (tipoEl) tipoEl.textContent = hab.nombre;
}

function actualizarResumenPrecios() {
  const elPrecioNoche = document.getElementById("resumen-precio-noche");
  const elNochesTotal = document.getElementById("resumen-noches-total");
  const elImpuestos   = document.getElementById("resumen-impuestos");
  const elTotal       = document.getElementById("resumen-total");

  if (elPrecioNoche) elPrecioNoche.textContent = `$${reservacion.precioNoche}`;
  if (elNochesTotal) elNochesTotal.textContent = `x${reservacion.noches}`;
  if (elImpuestos)   elImpuestos.textContent   = `$${reservacion.impuestos}`;
  if (elTotal)       elTotal.textContent       = `$${reservacion.total}`;
}

// Formatear fecha a texto legible (ej: 15 de enero de 2025)
function formatearFecha(fechaStr) {
  const fecha = new Date(fechaStr + "T12:00:00");
  return fecha.toLocaleDateString("es-DO", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}


/* ================================================
   8. TARJETA ANIMADA
   Actualiza la tarjeta visual en tiempo real
   mientras el usuario escribe
================================================ */
function iniciarTarjetaAnimada() {
  const inputTitular = document.getElementById("titular");
  const inputNumero  = document.getElementById("numero-tarjeta");
  const inputVence   = document.getElementById("vencimiento");

  // Actualizar nombre en la tarjeta
  if (inputTitular) {
    inputTitular.addEventListener("input", () => {
      const val = inputTitular.value.toUpperCase() || "NOMBRE APELLIDO";
      document.getElementById("tarjeta-nombre").textContent = val;
    });
  }

  // Formatear número y actualizar tarjeta
  if (inputNumero) {
    inputNumero.addEventListener("input", (e) => {
      let val = e.target.value.replace(/\D/g, "").substring(0, 16);
      // Formato: 1234 5678 9012 3456
      val = val.replace(/(\d{4})(?=\d)/g, "$1 ");
      e.target.value = val;

      // Mostrar en la tarjeta con puntos para dígitos no escritos
      const digits = val.replace(/\s/g, "");
      let display = "";
      for (let i = 0; i < 16; i++) {
        if (i > 0 && i % 4 === 0) display += " ";
        display += digits[i] || "•";
      }
      document.getElementById("tarjeta-numero").textContent = display;
    });
  }

  // Formatear vencimiento y actualizar tarjeta
  if (inputVence) {
    inputVence.addEventListener("input", (e) => {
      let val = e.target.value.replace(/\D/g, "").substring(0, 4);
      if (val.length >= 3) {
        val = val.substring(0, 2) + "/" + val.substring(2);
      }
      e.target.value = val;
      document.getElementById("tarjeta-vence").textContent = val || "MM/AA";
    });
  }
}


/* ================================================
   9. SELECTOR DE MÉTODO DE PAGO
================================================ */
function iniciarMetodosPago() {
  const botones = document.querySelectorAll(".metodo-btn");

  botones.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Desactivar todos
      botones.forEach((b) => {
        b.classList.remove("metodo-btn--activo");
        b.setAttribute("aria-pressed", "false");
      });

      // Activar el clickeado
      btn.classList.add("metodo-btn--activo");
      btn.setAttribute("aria-pressed", "true");

      // Guardar método
      reservacion.metodoPago = btn.dataset.metodo;

      // Actualizar el tipo en la tarjeta visual
      const tipoEl = document.getElementById("tarjeta-tipo");
      if (tipoEl) {
        tipoEl.textContent = reservacion.metodoPago === "credito" ? "CRÉDITO" : "DÉBITO";
      }
    });
  });
}


/* ================================================
   10. SIMULACIÓN DE PAGO
   Muestra un spinner, espera 2 segundos y
   luego muestra la pantalla de confirmación
================================================ */
function procesarPago() {
  const btnPagar = document.getElementById("btn-pagar");
  if (!btnPagar) return;

  // Activar estado de carga
  btnPagar.classList.add("btn--loading");
  btnPagar.disabled = true;

  // Simular proceso de pago (2 segundos)
  setTimeout(() => {
    btnPagar.classList.remove("btn--loading");
    btnPagar.disabled = false;

    // Generar número de reservación aleatorio
    const numero = Math.floor(100000 + Math.random() * 900000);
    reservacion.numeroReservacion = `#ESB-${numero}`;

    // Mostrar confirmación
    mostrarConfirmacion();
    irAPaso(4);
  }, 2000);
}


/* ================================================
   11. PANTALLA DE CONFIRMACIÓN
   Llena el resumen final con todos los datos
================================================ */
function mostrarConfirmacion() {
  // Número de reservación
  const elNumero = document.getElementById("numero-reservacion");
  if (elNumero) elNumero.textContent = reservacion.numeroReservacion;

  // Detalle de la reservación
  const elDetalle = document.getElementById("confirmacion-detalle");
  if (!elDetalle) return;

  const hab = habitacionesData[reservacion.habitacion];

  elDetalle.innerHTML = `
    <div class="confirmacion__detalle-fila">
      <span>👤 Huésped</span>
      <span>${reservacion.nombre} ${reservacion.apellido}</span>
    </div>
    <div class="confirmacion__detalle-fila">
      <span>✉️ Correo</span>
      <span>${reservacion.correo}</span>
    </div>
    <div class="confirmacion__detalle-fila">
      <span>🛏️ Habitación</span>
      <span>${hab ? hab.nombre : reservacion.habitacion}</span>
    </div>
    <div class="confirmacion__detalle-fila">
      <span>📅 Entrada</span>
      <span>${formatearFecha(reservacion.fechaEntrada)}</span>
    </div>
    <div class="confirmacion__detalle-fila">
      <span>📅 Salida</span>
      <span>${formatearFecha(reservacion.fechaSalida)}</span>
    </div>
    <div class="confirmacion__detalle-fila">
      <span>🌙 Noches</span>
      <span>${reservacion.noches}</span>
    </div>
    <div class="confirmacion__detalle-fila">
      <span>👥 Personas</span>
      <span>${reservacion.adultos} adulto${reservacion.adultos > 1 ? "s" : ""}${reservacion.ninos > 0 ? `, ${reservacion.ninos} niño${reservacion.ninos > 1 ? "s" : ""}` : ""}</span>
    </div>
    <div class="confirmacion__detalle-fila">
      <span>💳 Total Pagado</span>
      <span>$${reservacion.total} USD</span>
    </div>
  `;
}


/* ================================================
   12. FECHAS MÍNIMAS
   Evita que el usuario seleccione fechas pasadas
================================================ */
function configurarFechas() {
  const hoy = new Date().toISOString().split("T")[0];

  const inputEntrada = document.getElementById("fecha-entrada");
  const inputSalida  = document.getElementById("fecha-salida");

  if (inputEntrada) {
    inputEntrada.min = hoy;

    // Al cambiar entrada, actualizar mínimo de salida
    inputEntrada.addEventListener("change", () => {
      if (inputSalida) {
        inputSalida.min = inputEntrada.value;
        // Si salida es anterior a entrada, limpiarla
        if (inputSalida.value && inputSalida.value <= inputEntrada.value) {
          inputSalida.value = "";
        }
      }
    });
  }

  if (inputSalida) {
    inputSalida.min = hoy;
  }
}


/* ================================================
   13. LISTENERS DE ACTUALIZACIÓN EN TIEMPO REAL
   El resumen se actualiza mientras el usuario
   llena el formulario sin necesidad de enviar
================================================ */
function iniciarListenersResumen() {
  // Actualizar resumen cuando cambia nombre
  const camposPersonales = ["nombre", "apellido"];
  camposPersonales.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", actualizarResumenHuesped);
  });

  // Actualizar resumen cuando cambia habitación
  const selectHab = document.getElementById("habitacion");
  if (selectHab) {
    selectHab.addEventListener("change", () => {
      actualizarResumenHabitacion();
      // Recalcular si ya hay fechas
      const entrada = document.getElementById("fecha-entrada").value;
      const salida  = document.getElementById("fecha-salida").value;
      if (entrada && salida && selectHab.value) {
        calcularPrecios(entrada, salida, selectHab.value);
      }
    });
  }

  // Actualizar resumen cuando cambian fechas
  ["fecha-entrada", "fecha-salida"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("change", () => {
        const entrada = document.getElementById("fecha-entrada").value;
        const salida  = document.getElementById("fecha-salida").value;
        const hab     = document.getElementById("habitacion").value;
        if (entrada && salida && hab) {
          calcularPrecios(entrada, salida, hab);
        }
      });
    }
  });

  // Actualizar personas
  ["adultos", "ninos"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("change", actualizarResumenFechas);
  });
}


/* ================================================
   14. BOTONES DE NAVEGACIÓN
   Conecta los botones con las funciones de pasos
================================================ */
function iniciarBotones() {

  // Paso 1 → Paso 2
  const btnPaso1 = document.getElementById("btn-paso1");
  if (btnPaso1) {
    btnPaso1.addEventListener("click", () => {
      if (validarPaso1()) {
        irAPaso(2);
      }
    });
  }

  // Volver al paso 1
  const btnVolver1 = document.getElementById("btn-volver-1");
  if (btnVolver1) {
    btnVolver1.addEventListener("click", () => irAPaso(1));
  }

  // Paso 2 → Paso 3
  const btnPaso2 = document.getElementById("btn-paso2");
  if (btnPaso2) {
    btnPaso2.addEventListener("click", () => {
      if (validarPaso2()) {
        irAPaso(3);
      }
    });
  }

  // Volver al paso 2
  const btnVolver2 = document.getElementById("btn-volver-2");
  if (btnVolver2) {
    btnVolver2.addEventListener("click", () => irAPaso(2));
  }

  // Paso 3 → Confirmar pago
  const btnPagar = document.getElementById("btn-pagar");
  if (btnPagar) {
    btnPagar.addEventListener("click", () => {
      if (validarPaso3()) {
        procesarPago();
      }
    });
  }
}


/* ================================================
   15. INICIALIZACIÓN PRINCIPAL
   Todo arranca aquí cuando la página carga
================================================ */
document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ Sistema de reservaciones cargado");

  iniciarBotones();
  iniciarTarjetaAnimada();
  iniciarMetodosPago();
  configurarFechas();
  iniciarListenersResumen();
});