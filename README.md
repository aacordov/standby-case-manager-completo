# 🛡️ Standby Case Manager

> **Sistema integral para la gestión y monitoreo de casos de operación en tiempo real.**

![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)
![Docker](https://img.shields.io/badge/Docker-Enabled-blue?style=for-the-badge&logo=docker)
![Stack](https://img.shields.io/badge/Stack-FastAPI%20%7C%20React%20%7C%20PostgreSQL-blueviolet?style=for-the-badge)
![Tests](https://img.shields.io/badge/Tests-Passing-brightgreen?style=for-the-badge)
![Coverage](https://img.shields.io/badge/Coverage-90%25-green?style=for-the-badge)

---

## 📋 Descripción

**Standby Case Manager** es una solución robusta diseñada para optimizar el flujo de trabajo de los equipos de operaciones. Permite registrar, monitorear y gestionar incidentes de manera eficiente, asegurando que nada se pierda en el cambio de turno.

### ✨ Características Principales

* **🚀 Gestión en Tiempo Real**: Actualizaciones instantáneas de casos y estados
* **🔍 Filtrado Avanzado**: Búsqueda potente por fecha (presets 1M/3M/6M), prioridad, estado y responsable
* **⌨️ Command Palette**: Navegación rápida y acciones globales con `Ctrl + K`
* **👤 Smart Avatars**: Identificación visual instantánea con avatares generados por hash
* **📂 Bóveda de Evidencias**: Adjunta imágenes, PDFs y logs con drag & drop, previsualización y auditoría
* **🌍 Soporte de Zona Horaria**: Detección automática para búsquedas precisas
* **🔒 Seguridad**: Autenticación JWT y gestión de roles (Admin/Ingreso/Consulta)
* **📊 Dashboard de Estadísticas**: Métricas y gráficos en tiempo real
* **📤 Importación/Exportación**: Soporte para Excel (XLSX) y PDF
* **🐳 Dockerizado**: Despliegue sencillo y consistente
* **✅ Testing Completo**: Suite de tests unitarios e integración

---

## 🛠️ Tecnologías

### Backend
- ⚡ **FastAPI** - Framework web moderno y rápido
- 🐘 **PostgreSQL** - Base de datos relacional
- 🔐 **JWT** - Autenticación segura
- 📦 **SQLModel** - ORM con tipado fuerte
- 🧪 **Pytest** - Framework de testing

### Frontend
- ⚛️ **React 18** - Librería UI con hooks
- ⚡ **Vite** - Build tool ultrarrápido
- 🎨 **TailwindCSS** - Framework CSS utility-first
- 🔄 **React Query** - Gestión de estado del servidor
- 🧭 **React Router** - Enrutamiento declarativo
- 🧪 **Vitest** - Testing framework para Vite
- 📊 **Recharts** - Gráficos y visualizaciones

### DevOps & Tools
- 🐳 **Docker** - Containerización
- 🥯 **Bun** - Runtime JavaScript rápido
- 🚀 **uv** - Gestor de paquetes Python ultrarrápido

---

## 🚀 Guía de Inicio Rápido

La forma más sencilla de ejecutar el proyecto es utilizando **Docker**. Olvídate de instalar dependencias manualmente.

### Requisitos Previos

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado y corriendo

### 1️⃣ Instalación

Clona el repositorio y navega al directorio:

```bash
git clone git@github.com:rortiz-09/standby-case-manager.git
cd standby-case-manager
```

### 2️⃣ Ejecución

Levanta todo el entorno con un solo comando:

```bash
docker compose up --build
```

> ☕ **Primera vez**: Puede tardar unos minutos descargando imágenes

### 3️⃣ Acceso

| Servicio | URL | Descripción |
|:---------|:----|:------------|
| **Frontend** | [http://localhost:3000](http://localhost:3000) | Interfaz principal |
| **API Docs** | [http://localhost:8000/docs](http://localhost:8000/docs) | Swagger UI |
| **API ReDoc** | [http://localhost:8000/redoc](http://localhost:8000/redoc) | Documentación alternativa |

---

## 🔐 Credenciales por Defecto

| Rol | Email | Password | Permisos |
|:----|:------|:---------|:---------|
| **Admin** | `admin@standby.com` | `admin123` | Acceso total |
| **Ingreso** | `ingreso@standby.com` | `ingreso123` | Crear/editar casos |
| **Consulta** | `consulta@standby.com` | `consulta123` | Solo lectura |

> ⚠️ **Importante**: Se recomienda cambiar esta contraseña inmediatamente después del primer inicio de sesión.

---

## 📂 Estructura del Proyecto

```text
standby-case-manager/
├── 📁 backend/                 # API RESTful con FastAPI
│   ├── 📁 app/
│   │   ├── 📄 main.py         # Punto de entrada
│   │   ├── 📄 models.py       # Modelos SQLModel
│   │   ├── 📄 database.py     # Configuración BD
│   │   ├── 📄 auth.py         # Autenticación JWT
│   │   └── 📁 routers/        # Endpoints
│   │       ├── 📄 auth.py     # Login/registro
│   │       ├── 📄 cases.py    # CRUD casos
│   │       ├── 📄 users.py    # Gestión usuarios
│   │       ├── 📄 files.py    # Upload archivos
│   │       ├── 📄 stats.py    # Estadísticas
│   │       └── 📄 import_export.py
│   ├── 📁 test/               # Tests unitarios
│   ├── 📄 requirements.txt
│   └── 📄 Dockerfile
│
├── 📁 frontend/               # SPA React + Vite
│   ├── 📁 src/
│   │   ├── 📁 components/    # Componentes React
│   │   │   └── 📁 ui/       # UI Components
│   │   ├── 📁 pages/        # Páginas/rutas
│   │   ├── 📁 context/      # Context API
│   │   ├── 📁 api/          # Axios config
│   │   ├── 📁 types/        # TypeScript types
│   │   ├── 📁 utils/        # Utilidades
│   │   └── 📁 test/         # Tests
│   ├── 📄 package.json
│   ├── 📄 vite.config.ts
│   ├── 📄 tailwind.config.js
│   └── 📄 Dockerfile
│
├── 📁 docs/                   # Documentación
│   ├── 📄 MANUAL_USUARIO.md
│   ├── 📄 DOCUMENTACION_TECNICA.md
│   └── 📄 DEPLOYMENT.md
│
├── 📄 docker-compose.yml
├── 📄 .gitignore
└── 📄 README.md
```

---

## 💻 Desarrollo Local (Manual)

Si deseas ejecutar los servicios fuera de Docker para desarrollo:

### Backend

```bash
cd backend

# Crear entorno virtual con uv
uv venv

# Activar entorno
# Windows: .venv\Scripts\activate
# Linux/Mac: source .venv/bin/activate

# Instalar dependencias
uv pip install -r requirements.txt

# Ejecutar servidor
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

**Variables de entorno** (`backend/.env`):
```env
DATABASE_URL=postgresql://user:password@localhost:5432/standby_db
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### Frontend

```bash
cd frontend

# Instalar dependencias
bun install

# Ejecutar en desarrollo
bun run dev

# Ejecutar tests
bun run test

# Tests con UI
bun run test:ui

# Coverage
bun run test:coverage

# Build para producción
bun run build
```

---

## 🧪 Testing

### Backend Tests

```bash
cd backend
pytest
pytest --cov=app --cov-report=html
```

### Frontend Tests

```bash
cd frontend
bun run test              # Modo interactivo
bun run test:run          # Una vez
bun run test:ui           # UI visual
bun run test:coverage     # Con coverage
```

**Coverage actual**: ~90% del código

---

## 📊 API Endpoints

### Autenticación
- `POST /auth/login` - Iniciar sesión
- `GET /auth/me` - Obtener usuario actual
- `POST /auth/refresh` - Renovar token

### Casos
- `GET /cases` - Listar casos (con filtros)
- `POST /cases` - Crear caso
- `GET /cases/{id}` - Obtener caso
- `PUT /cases/{id}` - Actualizar caso
- `DELETE /cases/{id}` - Eliminar caso

### Usuarios
- `GET /users` - Listar usuarios
- `POST /users` - Crear usuario
- `PUT /users/{id}` - Actualizar usuario
- `DELETE /users/{id}` - Eliminar usuario

### Archivos
- `POST /files/upload` - Subir archivo
- `GET /files/{id}` - Descargar archivo
- `DELETE /files/{id}` - Eliminar archivo

### Estadísticas
- `GET /stats/dashboard` - Dashboard principal
- `GET /stats/cases-by-status` - Por estado
- `GET /stats/cases-by-priority` - Por prioridad

### Import/Export
- `POST /export/cases` - Exportar a Excel
- `POST /export/pdf` - Exportar a PDF
- `POST /import/cases` - Importar desde Excel

---

## 🔒 Seguridad

- 🔐 **JWT Authentication** con tokens de acceso y refresh
- 🛡️ **CORS** configurado para dominios permitidos
- 🔑 **Bcrypt** para hash de contraseñas
- 👤 **Role-based Access Control** (RBAC)
- 🚫 **Rate Limiting** en endpoints críticos
- 📝 **Validación** con Pydantic y Zod

---

## 🐳 Docker

### Servicios

```yaml
services:
  - postgres: Base de datos
  - backend: API FastAPI
  - frontend: React SPA
```

### Comandos útiles

```bash
# Levantar servicios
docker compose up -d

# Ver logs
docker compose logs -f

# Reiniciar servicio
docker compose restart backend

# Ejecutar comando en contenedor
docker compose exec backend bash

# Detener todo
docker compose down

# Limpiar volúmenes
docker compose down -v
```

---

## 📖 Documentación Adicional

- 📘 [Manual de Usuario](./docs/MANUAL_USUARIO.md) - Guía completa de uso
- 🔧 [Documentación Técnica](./docs/DOCUMENTACION_TECNICA.md) - Arquitectura y APIs
- 🚀 [Guía de Despliegue](./docs/DEPLOYMENT.md) - Deploy en producción
- 🤝 [Guía de Contribución](./CONTRIBUTING.md) - Cómo contribuir

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

Ver [CONTRIBUTING.md](./CONTRIBUTING.md) para más detalles.

---

## 📝 Changelog

Ver [CHANGELOG.md](./CHANGELOG.md) para el historial de versiones.

**Versión actual**: 2.2.3

---

## 📄 Licencia

Este proyecto es propiedad privada. Todos los derechos reservados.

---

## 👥 Equipo

Desarrollado con ❤️ por el equipo de Standby Operations.

---

## 📞 Soporte

- 📧 Email: support@standby.com
- 💬 Slack: #standby-support
- 🐛 Issues: [GitHub Issues](https://github.com/rortiz-09/standby-case-manager/issues)

---

**Happy Coding! 🚀**