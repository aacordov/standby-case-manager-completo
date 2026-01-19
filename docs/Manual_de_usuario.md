# 📖 Manual de Usuario - Standby Case Manager

## Tabla de Contenidos

1. [Introducción](#introducción)
2. [Inicio de Sesión](#inicio-de-sesión)
3. [Panel Principal](#panel-principal)
4. [Gestión de Casos](#gestión-de-casos)
5. [Búsqueda y Filtros](#búsqueda-y-filtros)
6. [Command Palette](#command-palette)
7. [Gestión de Archivos](#gestión-de-archivos)
8. [Dashboard y Estadísticas](#dashboard-y-estadísticas)
9. [Gestión de Usuarios](#gestión-de-usuarios)
10. [Importar y Exportar](#importar-y-exportar)
11. [Configuración de Perfil](#configuración-de-perfil)
12. [Preguntas Frecuentes](#preguntas-frecuentes)

---

## 📌 Introducción

Standby Case Manager es un sistema diseñado para gestionar casos de operación de manera eficiente. Este manual te guiará paso a paso en el uso de todas sus funcionalidades.

### Roles de Usuario

El sistema cuenta con tres roles principales:

| Rol | Permisos | Descripción |
|:----|:---------|:------------|
| **👑 Admin** | Acceso total | Gestión completa de casos, usuarios y configuración |
| **✍️ Ingreso** | Crear/Editar | Puede crear y modificar casos, pero no eliminarlos |
| **👁️ Consulta** | Solo lectura | Visualización de casos sin capacidad de modificación |

---

## 🔐 Inicio de Sesión

### Acceso al Sistema

1. Abre tu navegador web y accede a `http://localhost:3000`
2. Verás la pantalla de inicio de sesión

### Credenciales

Ingresa tus credenciales proporcionadas por el administrador:

```
Email: tu-email@empresa.com
Contraseña: tu-contraseña-segura
```

### Cambio de Tema

Antes de iniciar sesión, puedes cambiar entre tema claro y oscuro haciendo clic en el ícono 🌙/☀️ en la esquina superior derecha.

### Primer Inicio de Sesión

Si es tu primera vez:

1. Usa las credenciales proporcionadas
2. Se recomienda cambiar tu contraseña inmediatamente
3. Ve a **Perfil > Cambiar Contraseña**

---

## 🏠 Panel Principal

Una vez iniciada la sesión, verás el panel principal con:

### Barra de Navegación Superior

- **Logo**: Click para volver al inicio
- **Buscador**: Campo de búsqueda global
- **Command Palette**: Botón con ícono de comando (⌘)
- **Notificaciones**: Campana para ver alertas
- **Usuario**: Avatar con menú desplegable

### Menú Lateral

- 📊 **Dashboard**: Vista general y estadísticas
- 📋 **Casos**: Lista y gestión de casos
- 👥 **Usuarios**: Gestión de usuarios (solo Admin)
- ⚙️ **Configuración**: Ajustes del sistema

---

## 📋 Gestión de Casos

### Ver Lista de Casos

1. Click en **Casos** en el menú lateral
2. Verás una tabla con todos los casos
3. Cada caso muestra:
   - ID del caso
   - Título
   - Prioridad (🔴 Alta, 🟡 Media, 🟢 Baja)
   - Estado (Abierto, En Progreso, Resuelto, Cerrado)
   - Responsable
   - Fecha de creación

### Crear Nuevo Caso

1. Click en el botón **+ Nuevo Caso**
2. Completa el formulario:
   ```
   - Título: Descripción breve del caso
   - Descripción: Detalles completos
   - Prioridad: Alta / Media / Baja
   - Tipo: Incidente / Problema / Solicitud
   - Responsable: Selecciona un usuario
   - Fecha límite: (opcional)
   ```
3. Click en **Crear Caso**

### Editar un Caso

1. Click en el caso que deseas editar
2. En la vista detallada, click en **✏️ Editar**
3. Modifica los campos necesarios
4. Click en **Guardar Cambios**

### Ver Detalles de un Caso

1. Click en cualquier caso de la lista
2. Se abrirá un panel lateral con:
   - Información completa
   - Historial de cambios
   - Comentarios
   - Archivos adjuntos
   - Línea de tiempo

### Cambiar Estado de un Caso

En la vista detallada:

1. Click en el estado actual
2. Selecciona el nuevo estado:
   - 🔵 Abierto
   - 🟡 En Progreso
   - 🟢 Resuelto
   - ⚫ Cerrado

### Agregar Comentarios

1. En la vista detallada del caso
2. Scroll hasta la sección de comentarios
3. Escribe tu comentario en el campo de texto
4. Click en **Enviar**

### Eliminar un Caso (Solo Admin)

1. Abre el caso
2. Click en el menú ⋮ (tres puntos)
3. Selecciona **Eliminar**
4. Confirma la acción

> ⚠️ **Advertencia**: Esta acción no se puede deshacer

---

## 🔍 Búsqueda y Filtros

### Búsqueda Rápida

En la barra superior:

1. Click en el campo de búsqueda
2. Escribe palabras clave
3. Los resultados se mostrarán automáticamente

Puedes buscar por:
- ID de caso
- Título
- Descripción
- Responsable

### Filtros Avanzados

#### Por Fecha

Click en el selector de fechas y elige:

- **Presets rápidos**:
  - 📅 Último mes (1M)
  - 📅 Últimos 3 meses (3M)
  - 📅 Últimos 6 meses (6M)
  - 📅 Personalizado

- **Rango personalizado**:
  1. Click en "Personalizado"
  2. Selecciona fecha inicio
  3. Selecciona fecha fin
  4. Click en "Aplicar"

#### Por Prioridad

- 🔴 Alta
- 🟡 Media
- 🟢 Baja

#### Por Estado

- 🔵 Abierto
- 🟡 En Progreso
- 🟢 Resuelto
- ⚫ Cerrado

#### Por Responsable

Selecciona uno o varios usuarios del dropdown.

### Limpiar Filtros

Click en el botón **Limpiar Filtros** para resetear todos los filtros.

---

## ⌨️ Command Palette

El Command Palette te permite acceder rápidamente a cualquier función del sistema.

### Abrir Command Palette

- **Atajo de teclado**: `Ctrl + K` (Windows/Linux) o `Cmd + K` (Mac)
- **Botón**: Click en el ícono ⌘ en la barra superior

### Comandos Disponibles

```
🔍 Buscar casos...
➕ Crear nuevo caso
👥 Ver usuarios
📊 Ir a dashboard
⚙️ Configuración
🚪 Cerrar sesión
```

### Navegación

1. Escribe para filtrar comandos
2. Usa ↑ ↓ para moverte entre opciones
3. Presiona Enter para ejecutar

---

## 📂 Gestión de Archivos

### Subir Archivos

#### Método 1: Drag & Drop

1. Abre un caso
2. Ve a la sección "Archivos"
3. Arrastra los archivos desde tu explorador
4. Suéltalos en el área designada

#### Método 2: Click

1. Click en **📎 Adjuntar archivos**
2. Selecciona archivos de tu computadora
3. Click en **Abrir**

### Formatos Soportados

- 📄 Documentos: PDF, DOC, DOCX, TXT
- 🖼️ Imágenes: JPG, PNG, GIF
- 📊 Hojas de cálculo: XLS, XLSX, CSV
- 📦 Comprimidos: ZIP, RAR
- 📝 Logs: LOG, TXT

### Tamaño Máximo

- Por archivo: 10 MB
- Total por caso: 100 MB

### Previsualizar Archivos

1. Click en el archivo en la lista
2. Se abrirá una vista previa (para PDFs e imágenes)
3. Click fuera para cerrar

### Descargar Archivos

1. Hover sobre el archivo
2. Click en el ícono de descarga ⬇️

### Eliminar Archivos (Solo Admin/Ingreso)

1. Hover sobre el archivo
2. Click en el ícono de eliminar 🗑️
3. Confirma la acción

---

## 📊 Dashboard y Estadísticas

### Vista General

El dashboard muestra:

#### Métricas Principales

- 📈 **Total de Casos**: Cantidad total en el sistema
- 🔵 **Casos Abiertos**: Casos sin resolver
- 🟡 **En Progreso**: Casos activos
- 🟢 **Resueltos**: Casos completados

#### Gráficos

1. **Casos por Estado**
   - Gráfico de barras
   - Vista de los últimos 30 días

2. **Casos por Prioridad**
   - Gráfico de pastel
   - Distribución actual

3. **Tendencia Temporal**
   - Gráfico de líneas
   - Evolución mensual

4. **Top Responsables**
   - Ranking de usuarios más activos

### Actualización de Datos

- Automática cada 30 segundos
- Manual: Click en el botón 🔄 Actualizar

---

## 👥 Gestión de Usuarios

> **Nota**: Solo disponible para usuarios con rol Admin

### Ver Lista de Usuarios

1. Click en **Usuarios** en el menú
2. Verás todos los usuarios registrados

### Crear Nuevo Usuario

1. Click en **+ Nuevo Usuario**
2. Completa el formulario:
   ```
   Nombre completo: Nombre del usuario
   Email: correo@empresa.com
   Rol: Admin / Ingreso / Consulta
   Contraseña inicial: mínimo 8 caracteres
   ```
3. Click en **Crear Usuario**

### Editar Usuario

1. Click en el usuario
2. Modifica los campos necesarios
3. Click en **Guardar**

### Cambiar Rol

1. Abre el usuario
2. Selecciona el nuevo rol
3. Click en **Guardar**

### Desactivar Usuario

1. Abre el usuario
2. Toggle en "Estado activo"
3. Confirma

> **Nota**: Los usuarios desactivados no pueden iniciar sesión

### Eliminar Usuario

1. Click en ⋮ junto al usuario
2. Selecciona **Eliminar**
3. Confirma la acción

> ⚠️ Se reasignarán automáticamente sus casos abiertos

---

## 📤 Importar y Exportar

### Exportar Casos

#### A Excel

1. Ve a **Casos**
2. Aplica los filtros deseados (opcional)
3. Click en **Exportar > Excel**
4. El archivo se descargará automáticamente

**Columnas incluidas**:
- ID, Título, Descripción, Prioridad, Estado
- Responsable, Fecha de creación, Última actualización

#### A PDF

1. Ve a **Casos**
2. Click en **Exportar > PDF**
3. Elige el formato:
   - 📄 Lista completa
   - 📋 Reporte detallado
4. El PDF se generará y descargará

### Importar Casos

#### Desde Excel

1. Click en **Importar > Excel**
2. Descarga la plantilla si es la primera vez
3. Completa la plantilla con tus datos
4. Click en **Seleccionar archivo**
5. Elige tu archivo completado
6. Click en **Importar**

**Formato de la plantilla**:
```
Título | Descripción | Prioridad | Tipo | Responsable | Fecha Límite
```

#### Validaciones

El sistema validará:
- ✅ Campos requeridos
- ✅ Formato de fechas
- ✅ Existencia de responsables
- ✅ Valores válidos de prioridad/estado

#### Resultados de Importación

Después de importar, verás un resumen:
```
✅ 45 casos importados correctamente
❌ 3 casos con errores
⚠️ 2 casos duplicados (saltados)
```

---

## ⚙️ Configuración de Perfil

### Acceder a tu Perfil

1. Click en tu avatar (esquina superior derecha)
2. Selecciona **Mi Perfil**

### Información Personal

Puedes actualizar:
- Nombre completo
- Email
- Teléfono
- Zona horaria

### Cambiar Contraseña

1. Ve a **Mi Perfil > Seguridad**
2. Completa:
   ```
   Contraseña actual: ********
   Nueva contraseña: ********
   Confirmar nueva contraseña: ********
   ```
3. Click en **Cambiar Contraseña**

**Requisitos de contraseña**:
- Mínimo 8 caracteres
- Al menos una mayúscula
- Al menos un número
- Al menos un carácter especial

### Preferencias

Personaliza tu experiencia:

- **Tema**: Claro / Oscuro / Auto
- **Idioma**: Español / English
- **Notificaciones**: Activar/desactivar
- **Formato de fecha**: DD/MM/YYYY o MM/DD/YYYY
- **Zona horaria**: Selecciona tu zona

### Avatar

Tu avatar se genera automáticamente basado en tu email (hash único).

---

## ❓ Preguntas Frecuentes

### ¿Cómo recupero mi contraseña?

1. En la pantalla de login, click en "¿Olvidaste tu contraseña?"
2. Ingresa tu email
3. Recibirás un link de recuperación
4. Sigue las instrucciones del email

### ¿Por qué no puedo editar un caso?

Verifica que:
- Tengas rol de Admin o Ingreso
- El caso no esté cerrado
- Tengas permisos sobre ese caso

### ¿Cómo cambio la zona horaria?

1. Ve a **Mi Perfil > Preferencias**
2. Selecciona tu zona horaria
3. Click en **Guardar**

### ¿Puedo recuperar un caso eliminado?

No, la eliminación es permanente. Solo usuarios Admin pueden eliminar casos.

### ¿Cuál es el límite de casos?

No hay límite definido. El sistema puede manejar miles de casos eficientemente.

### ¿Se guardan automáticamente los cambios?

No, debes hacer click en **Guardar** para que los cambios persistan.

### ¿Cómo sé si hay actualizaciones en un caso?

Los casos actualizados muestran una insignia 🔔 en la lista.

### ¿Puedo trabajar offline?

No, Standby Case Manager requiere conexión a internet para funcionar.

### ¿Los archivos se respaldan?

Sí, todos los archivos se almacenan de forma segura en el servidor y se respaldan diariamente.

### ¿Cómo reporto un bug?

1. Click en tu avatar
2. Selecciona **Reportar problema**
3. Describe el problema detalladamente
4. Envía el reporte

---

## 📞 Soporte Técnico

Si necesitas ayuda adicional:

- 📧 **Email**: 
- **Allan Córdova**: [aacordov@gmail.com](mailto:aacordov@gmail.com)
- **José Briones**: [josmbrio@gmail.com](mailto:josmbrio@gmail.com)
- **Larry Sánchez**: [lajasanc@gmail.com](mailto:lajasanc@gmail.com)
- **Ronny Ortiz**: [ronny.ortiz.54@hotmail.com](mailto:ronny.ortiz.54@hotmail.com)
- 💬 **Chat**: Disponible en horario laboral

---

**Última actualización**: Enero 2026
**Versión del manual**: 2.2.3