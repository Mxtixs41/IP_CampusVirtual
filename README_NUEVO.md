# 🎓 Campus Virtual+ | Plataforma LMS

**Campus Virtual+** es una plataforma educativa integral (Learning Management System) diseñada para instituciones de educación superior. Permite a estudiantes gestionar sus cursos, calificaciones, tareas, calendario académico y participar en foros de discusión, todo desde una interfaz moderna y amigable.

---

## 📋 Tabla de Contenidos

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Componentes Principales](#componentes-principales)
- [Paleta de Colores](#paleta-de-colores)
- [Próximas Mejoras](#próximas-mejoras)
- [Licencia](#licencia)

---

## ✨ Características

### Para Estudiantes
- **📊 Dashboard Inteligente**: Resumen personalizado con KPIs académicos
- **📚 Gestión de Cursos**: Vista completa de cursos activos con progreso en tiempo real
- **📅 Calendario Académico**: Agenda integrada de clases, exámenes y entregas
- **🎯 Sistema de Tareas**: Seguimiento de tareas pendientes, atrasadas y calificadas
- **📈 Calificaciones**: Visualización detallada de notas y evaluaciones
- **💬 Foros de Discusión**: Espacios colaborativos para compartir dudas y recursos
- **📚 Biblioteca Digital**: Acceso a recursos (PDFs, videos, enlaces)
- **👤 Perfil Personal**: Información del estudiante, logros y certificaciones
- **🎤 Aula Virtual**: Integración simulada con Zoom para clases en vivo
- **🔔 Sistema de Notificaciones**: Alertas sobre tareas urgentes y nuevas actividades

### Características Técnicas
- **Diseño Responsivo**: Funciona perfectamente en desktop, tablet y móvil
- **Tema Institucional**: Colores corporativos personalizables
- **Indicadores de Riesgo Académico**: Alerta visual cuando el promedio es inferior a 4.0
- **Gráficos Interactivos**: Visualización de rendimiento vs asistencia con Recharts
- **Interfaz Intuitiva**: Navegación lateral y acceso rápido a funciones

---

## 🛠️ Tecnologías

| Tecnología | Versión | Descripción |
|-----------|---------|------------|
| **Next.js** | 16.0.3 | Framework React con renderizado del lado del servidor |
| **React** | 19.2.0 | Librería para construir interfaces de usuario |
| **TypeScript** | 5 | Lenguaje tipado para mayor robustez |
| **Tailwind CSS** | 3.4.17 | Framework CSS utilitario para estilos |
| **Recharts** | 3.5.0 | Librería para gráficos React |
| **Lucide React** | 0.554.0 | Conjunto de iconos SVG |
| **ESLint** | 9 | Herramienta de análisis de código |

---

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js**: v18.0.0 o superior ([Descargar](https://nodejs.org/))
- **npm** o **yarn**: Administrador de paquetes
- **Git**: Para clonar el repositorio

Verifica las versiones:
```bash
node --version   # v18.x.x o superior
npm --version    # 9.x.x o superior
```

---

## 🚀 Instalación

### 1. Clonar el Repositorio
```bash
git clone https://github.com/tuusuario/IP_CampusVirtual.git
cd IP_CampusVirtual
```

### 2. Instalar Dependencias
```bash
npm install
# o si usas yarn
yarn install
```

### 3. Configurar Variables de Entorno (Opcional)
Crea un archivo `.env.local` en la raíz del proyecto:
```env
# Ejemplo de variables (personalizar según tu caso)
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Campus Virtual+
```

### 4. Ejecutar el Servidor de Desarrollo
```bash
npm run dev
```

La aplicación estará disponible en: **[http://localhost:3000](http://localhost:3000)**

---

## 💻 Uso

### Comandos Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo

# Producción
npm run build        # Compila la aplicación
npm start            # Inicia servidor de producción

# Linting
npm run lint         # Analiza código con ESLint
```

### Estructura de Navegación

1. **Inicio** - Dashboard con resumen académico
2. **Mis Cursos** - Lista de cursos inscritos
3. **Calendario** - Agenda de eventos académicos
4. **Notas** - Historial de calificaciones
5. **Mis Tareas** - Seguimiento de entregas
6. **Biblioteca** - Recursos digitales
7. **Foros** - Espacios de discusión
8. **Perfil** - Información personal y configuración

---

## 📁 Estructura del Proyecto

```
IP_CampusVirtual/
├── app/
│   ├── page.tsx                 # Componente principal (todas las vistas)
│   ├── layout.tsx               # Layout de la aplicación
│   └── globals.css              # Estilos globales
├── public/                       # Archivos estáticos
├── next.config.ts               # Configuración de Next.js
├── tailwind.config.ts           # Configuración de Tailwind CSS
├── tsconfig.json                # Configuración de TypeScript
├── eslint.config.mjs            # Configuración de ESLint
├── postcss.config.mjs           # Configuración de PostCSS
├── package.json                 # Dependencias del proyecto
└── README.md                    # Este archivo
```

---

## 🧩 Componentes Principales

### Vistas (Views)

| Componente | Descripción |
|-----------|------------|
| **DashboardView** | Resumen con KPIs, cursos principales y gráficos |
| **CoursesView** | Lista completa de cursos con filtros |
| **CalendarView** | Agenda de eventos académicos |
| **GradesView** | Tabla detallada de calificaciones |
| **TasksView** | Listado de tareas y entregas |
| **ForumsView** | Foros de discusión por curso |
| **LibraryView** | Recursos digitales (PDF, videos, enlaces) |
| **ProfileView** | Perfil del estudiante y configuración |
| **ClassroomModal** | Simulación de clase en vivo (Zoom) |

### Tipos de Datos

```typescript
interface Curso {
  id: number;
  nombre: string;
  codigo: string;
  profesor: string;
  progreso: number;
  proximaClase: string;
  linkZoom: string;
  tareasPendientes: number;
  imagen: string;
  descripcion?: string;
  promedioActual?: number;
}

interface Tarea {
  id: number;
  titulo: string;
  curso: string;
  vencimiento: string;
  estado: 'Pendiente' | 'Entregado' | 'Calificado' | 'Atrasado';
  nota?: number;
}

// Ver page.tsx para más interfaces...
```

---

## 🎨 Paleta de Colores

| Color | Código | Uso |
|-------|--------|-----|
| **Azul Institucional** | `#003366` | Primario (sidebar, botones, encabezados) |
| **Amarillo Acento** | `#FFCC00` | Acentos, alertas positivas |
| **Fondo Gris** | `#F3F4F6` | Fondo general de la aplicación |
| **Verde Éxito** | `#10B981` | Indicadores positivos |
| **Rojo Alerta** | `#EF4444` | Alertas, riesgo académico |
| **Naranja Advertencia** | `#F97316` | Advertencias secundarias |

---

## 📊 Datos de Ejemplo

El proyecto incluye datos simulados para demostración:

- **4 Cursos**: Anatomía General I, Matemáticas Aplicadas, Taller de Empleabilidad, Inglés Técnico II
- **5 Tareas**: Con diferentes estados (Pendiente, Entregado, Calificado, Atrasado)
- **4 Evaluaciones**: Con notas y ponderaciones
- **5+ Actividades Recientes**: Clases, tareas, foros, exámenes
- **4 Foros Activos**: Por curso
- **8 Recursos Biblioteca**: PDFs, videos, enlaces

---

## 🔧 Configuración Personalizada

### Cambiar Colores Institucionales

Edita los valores en `app/page.tsx` línea 4:

```typescript
// --- 1. CONFIGURACIÓN DE COLORES Y TEMA ---
// Azul Institucional: bg-[#003366]
// Amarillo Acento: text-[#FFCC00]
// Fondo: bg-[#F3F4F6]
```

### Modificar Datos de Ejemplo

Busca las arrays en `app/page.tsx`:
- `cursosData` (línea ~37)
- `actividadesData` (línea ~62)
- `calendarioData` (línea ~74)
- `notasData` (línea ~87)
- `forosData` (línea ~100)
- `bibliotecaData` (línea ~130)
- `tareasData` (línea ~142)

---

## 📱 Características Responsivas

- ✅ Desktop (1200px+)
- ✅ Tablet (768px - 1199px)
- ✅ Móvil (< 768px)

La navegación se adapta automáticamente usando Tailwind CSS breakpoints (`md:`, `lg:`, etc.)

---

## 🚀 Próximas Mejoras

- [ ] Backend API con Node.js/Express
- [ ] Base de datos (PostgreSQL/MongoDB)
- [ ] Autenticación y autorización
- [ ] Integración real con Zoom
- [ ] Sistema de almacenamiento S3 (AWS)
- [ ] Notificaciones en tiempo real (WebSocket)
- [ ] Exportación de reportes PDF
- [ ] Modo oscuro completo
- [ ] Internacionalización (i18n)
- [ ] Sistema de tutoría académica
- [ ] Analítica avanzada de desempeño
- [ ] Chat integrado entre estudiantes y profesores

---

## 📝 Licencia

Este proyecto está bajo la licencia **MIT**. Puedes usarlo, modificarlo y distribuirlo libremente.

---

## 📧 Contacto y Soporte

Para reportar errores, sugerencias o contribuciones, contacta al equipo de desarrollo.

**Desarrollado con ❤️ para Crecer Más**

---

## 📚 Recursos Útiles

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Recharts Documentation](https://recharts.org/)
- [Lucide Icons](https://lucide.dev)

---

**Última actualización**: 27 de Noviembre, 2025
