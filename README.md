# 🏨 Hotel Esco Brea — Página Web Oficial

> **Donde el descanso se convierte en experiencia**  
> Proyecto académico desarrollado para la asignatura de Ingeniería en Sistemas.

---

## 📋 Descripción del Proyecto

Página web completa para el **Hotel Esco Brea**, ubicado en Punta Cana, República Dominicana. Desarrollada con tecnologías web fundamentales (HTML, CSS y JavaScript puro), sin frameworks externos, siguiendo buenas prácticas de desarrollo frontend.

---

## 🗂️ Estructura del Proyecto

```
hotel-esco-brea/
│
├── index.html          → Estructura principal de la página
├── css/
│   └── styles.css      → Todos los estilos visuales
├── js/
│   └── main.js         → Lógica e interactividad
├── assets/
│   └── images/         → Imágenes del hotel (locales)
└── README.md           → Este archivo
```

---

## 🚀 Tecnologías Utilizadas

| Tecnología | Uso |
|------------|-----|
| HTML5 | Estructura semántica de la página |
| CSS3 | Estilos, animaciones y diseño responsive |
| JavaScript (ES6+) | Lógica dinámica e interactividad |
| Google Fonts | Tipografías: Playfair Display + DM Sans |
| OpenStreetMap | Mapa embebido de ubicación |
| localStorage | Guardar preferencia de modo oscuro |

---

## 📄 Secciones de la Página

1. **Hero / Inicio** — Banner principal con nombre, eslogan y botones de acción
2. **Sobre Nosotros** — Descripción del hotel y características destacadas
3. **Misión, Visión y Valores** — Identidad institucional del hotel
4. **Habitaciones** — Tarjetas dinámicas generadas con JavaScript
5. **Disponibilidad** — Estado actual de habitaciones con indicadores visuales
6. **Contacto** — Información, botón WhatsApp y mapa interactivo

---

## ⚙️ Funcionalidades Implementadas

### 🌙 Modo Oscuro / Claro
- Botón conmutador en el header
- La preferencia se guarda en `localStorage`
- Al recargar la página, recuerda el tema elegido

### 🏠 Habitaciones Dinámicas
- Los datos se definen en un array en `main.js`
- Las tarjetas se generan automáticamente con JavaScript
- Fácil de actualizar: solo modificar el array `habitaciones`

### ✅ Disponibilidad en Tiempo Real (Simulada)
- Barras de progreso visuales por tipo de habitación
- Colores semáforo: verde (disponible), amarillo (pocas), rojo (sin disponibilidad)
- Contadores totales: disponibles, ocupadas y total

### 📱 Diseño Responsive
- Adaptado para móvil, tablet y escritorio
- Menú hamburguesa funcional en móvil
- Grid flexible con CSS Grid y auto-fit

### ✨ Animaciones
- Elementos que aparecen al hacer scroll (IntersectionObserver)
- Hover en tarjetas de habitaciones
- Transiciones suaves en botones y links

---

## ♿ Accesibilidad

- Etiquetas semánticas correctas (`header`, `nav`, `main`, `section`, `article`, `footer`, `address`)
- Atributos `aria-label`, `aria-expanded`, `aria-live` en elementos interactivos
- Atributo `alt` descriptivo en todas las imágenes
- Navegación completa con teclado (`:focus-visible`)
- Buen contraste de colores en modo claro y oscuro

---

## 🔍 SEO Básico

- `<title>` descriptivo con nombre del hotel y ubicación
- `<meta name="description">` con descripción del negocio
- `<meta name="keywords">` con palabras clave relevantes
- Open Graph tags para compartir en redes sociales
- Atributos `loading="lazy"` en imágenes para mejor rendimiento

---

## 🎨 Diseño Visual

- **Paleta modo claro:** Azul oscuro `#1b3a5c` + Dorado `#c9a84c` + Blanco `#ffffff`
- **Paleta modo oscuro:** Azul marino `#0f1923` + Dorado `#c9a84c` + Gris claro
- **Tipografías:** Playfair Display (títulos elegantes) + DM Sans (cuerpo legible)
- **Variables CSS:** Todo centralizado en `:root` para fácil mantenimiento

---

## 🛠️ Cómo Ejecutar el Proyecto

1. Clona o descarga el repositorio
2. Abre la carpeta en VS Code
3. Abre `index.html` con **Live Server** (extensión de VS Code)
4. ¡Listo! No requiere instalación de dependencias

```bash
# Con Git Bash, desde la carpeta del proyecto:
code .
# Luego clic derecho en index.html → "Open with Live Server"
```

---

## 📦 Cómo Modificar las Habitaciones

Abre `js/main.js` y edita el array `habitaciones`:

```javascript
const habitaciones = [
  {
    id: 1,
    tipo: "Habitación Simple",
    titulo: "Simple Confort",
    descripcion: "Tu descripción aquí...",
    precio: 85,
    moneda: "USD",
    totalHabitaciones: 10,
    imagen: "assets/images/tu-imagen.jpg",
    amenidades: ["WiFi", "A/C", "TV"],
  },
  // Agrega más habitaciones aquí...
];
```

---

## 📦 Cómo Modificar la Disponibilidad

En el mismo `main.js`, edita el array `disponibilidad`:

```javascript
const disponibilidad = [
  { idHabitacion: 1, disponibles: 6 }, // 6 de 10 disponibles
  { idHabitacion: 2, disponibles: 0 }, // Sin disponibilidad
];
```

---

## 👨‍💻 Datos del Hotel

| Campo | Valor |
|-------|-------|
| Nombre | Hotel Esco Brea |
| Dirección | Calle Principal Punta Cana #4 |
| Ciudad | Punta Cana, República Dominicana |
| Teléfono | +1 (809) 555-0192 |
| WhatsApp | +1 (809) 555-0192 |
| Correo | am399315@gmail.com |

---

## 📚 Conceptos Aplicados

- **HTML Semántico** — Uso correcto de etiquetas para estructura y significado
- **CSS Variables** — Sistema de diseño centralizado y mantenible
- **CSS Grid & Flexbox** — Layouts modernos y flexibles
- **JavaScript ES6+** — Arrow functions, template literals, forEach, find
- **DOM Manipulation** — Creación dinámica de elementos HTML
- **localStorage API** — Persistencia de preferencias del usuario
- **IntersectionObserver API** — Animaciones eficientes al hacer scroll
- **Responsive Design** — Media queries para múltiples dispositivos
- **Accesibilidad Web (WCAG)** — Buenas prácticas de inclusión digital
- **SEO On-Page** — Meta tags y estructura optimizada para buscadores

---

## 🎓 Información Académica

- **Proyecto:** Desarrollo Web Frontend
- **Institución:** Ingeniería en Sistemas
- **Tecnologías:** HTML5, CSS3, JavaScript vanilla
- **Año:** 2025

---

*Desarrollado con dedicación para demostrar los fundamentos del desarrollo web moderno.*