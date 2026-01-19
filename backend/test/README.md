# Guía de Testing - Standby Case Manager

Esta guía documenta la estrategia de testing del sistema de gestión de casos.

## 📋 Tabla de Contenidos

- [Estructura de Tests](#estructura-de-tests)
- [Configuración](#configuración)
- [Ejecución de Tests](#ejecución-de-tests)
- [Cobertura](#cobertura)
- [Tipos de Tests](#tipos-de-tests)
- [Fixtures Disponibles](#fixtures-disponibles)

---

## 📁 Estructura de Tests

```
backend/
├── tests/
│   ├── conftest.py              # Fixtures compartidas
│   ├── unit/                    # Tests unitarios
│   │   ├── test_auth_unit.py    # Tests de autenticación
│   │   └── test_models.py       # Tests de modelos
│   └── integration/             # Tests de integración
│       ├── test_auth_integration.py
│       ├── test_cases_integration.py
│       └── test_users_integration.py
├── pytest.ini                   # Configuración de pytest
├── requirements.txt             # Dependencias principales
└── requirements-dev.txt         # Dependencias de desarrollo
```

---

## ⚙️ Configuración

### 1. Instalar Dependencias

```bash
# Instalar dependencias principales
pip install -r requirements.txt

# Instalar dependencias de desarrollo y testing
pip install -r requirements-dev.txt
```

### 2. Variables de Entorno (Opcional)

Los tests usan una base de datos SQLite en memoria por defecto. No se requiere configuración adicional.

---

## 🚀 Ejecución de Tests

### Ejecutar todos los tests

```bash
pytest
```

### Ejecutar solo tests unitarios

```bash
pytest -m unit
```

### Ejecutar solo tests de integración

```bash
pytest -m integration
```

### Ejecutar tests por categoría

```bash
# Tests de autenticación
pytest -m auth

# Tests de casos
pytest -m cases

# Tests de usuarios
pytest -m users
```

### Ejecutar un archivo específico

```bash
pytest tests/unit/test_auth_unit.py
pytest tests/integration/test_cases_integration.py
```

### Ejecutar una clase o función específica

```bash
# Ejecutar una clase específica
pytest tests/unit/test_auth_unit.py::TestPasswordHashing

# Ejecutar una función específica
pytest tests/unit/test_auth_unit.py::TestPasswordHashing::test_password_hash_generation
```

### Modo verbose (detallado)

```bash
pytest -v
```

### Ver salida de print statements

```bash
pytest -s
```

---

## 📊 Cobertura

### Generar reporte de cobertura

```bash
# Generar reporte en terminal
pytest --cov=app --cov-report=term-missing

# Generar reporte HTML
pytest --cov=app --cov-report=html

# Abrir reporte HTML (se genera en htmlcov/index.html)
# En Linux/Mac:
open htmlcov/index.html
# En Windows:
start htmlcov/index.html
```

### Verificar cobertura mínima

El proyecto está configurado para requerir 80% de cobertura mínima (configurado en pytest.ini).

---

## 🧪 Tipos de Tests

### Tests Unitarios (`tests/unit/`)

Tests que prueban funciones y métodos individuales sin dependencias externas.

**Características:**
- No requieren base de datos
- Ejecución rápida
- Prueban lógica de negocio aislada
- Marcados con `@pytest.mark.unit`

**Ejemplos:**
- Validación de hash de contraseñas
- Creación de tokens JWT
- Validación de modelos Pydantic

### Tests de Integración (`tests/integration/`)

Tests que prueban endpoints completos con todas sus dependencias.

**Características:**
- Usan base de datos SQLite en memoria
- Prueban flujos completos
- Verifican interacción entre componentes
- Marcados con `@pytest.mark.integration`

**Ejemplos:**
- Login y autenticación completa
- Creación y actualización de casos
- Gestión de usuarios

---

## 🎯 Fixtures Disponibles

Las fixtures están definidas en `tests/conftest.py` y están disponibles para todos los tests.

### Fixtures de Base de Datos

- `db_session`: Sesión de base de datos para tests
- `client`: Cliente HTTP de prueba (AsyncClient)

### Fixtures de Usuarios

- `admin_user`: Usuario con rol ADMIN
- `ingreso_user`: Usuario con rol INGRESO
- `consulta_user`: Usuario con rol CONSULTA
- `inactive_user`: Usuario inactivo

### Fixtures de Tokens

- `admin_token`: Token JWT válido para admin
- `ingreso_token`: Token JWT válido para ingreso
- `consulta_token`: Token JWT válido para consulta

### Fixtures de Headers HTTP

- `admin_headers`: Headers con autenticación de admin
- `ingreso_headers`: Headers con autenticación de ingreso
- `consulta_headers`: Headers con autenticación de consulta

### Fixtures de Casos

- `sample_case`: Un caso de ejemplo
- `multiple_cases`: Lista de 10 casos con diferentes estados y prioridades
- `case_with_observations`: Caso con observaciones asociadas

---

## 📝 Ejemplo de Uso de Fixtures

```python
import pytest
from httpx import AsyncClient

@pytest.mark.integration
@pytest.mark.asyncio
async def test_example(
    client: AsyncClient,      # Cliente HTTP
    admin_headers: dict,       # Headers con token de admin
    sample_case: Case          # Caso de ejemplo
):
    response = await client.get(
        f"/cases/{sample_case.id}",
        headers=admin_headers
    )
    
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == sample_case.id
```

---

## 🎨 Marcadores (Markers)

Los tests están organizados con marcadores para ejecución selectiva:

- `@pytest.mark.unit`: Tests unitarios
- `@pytest.mark.integration`: Tests de integración
- `@pytest.mark.auth`: Tests de autenticación
- `@pytest.mark.cases`: Tests de casos
- `@pytest.mark.users`: Tests de usuarios
- `@pytest.mark.slow`: Tests que toman más tiempo

### Combinar Marcadores

```bash
# Ejecutar tests unitarios de autenticación
pytest -m "unit and auth"

# Ejecutar tests de integración de casos
pytest -m "integration and cases"

# Ejecutar todos los tests excepto los lentos
pytest -m "not slow"
```

---

## 🔍 Debugging

### Ejecutar con pdb (Python debugger)

```bash
pytest --pdb
```

Esto abrirá el debugger cuando un test falle.

### Ver traceback completo

```bash
pytest --tb=long
```

### Ejecutar último test fallido

```bash
pytest --lf
```

### Ejecutar tests que fallaron y luego todos

```bash
pytest --ff
```

---

## ✅ Buenas Prácticas

1. **Escribir tests antes o junto con el código** (TDD)
2. **Mantener tests independientes** - cada test debe poder ejecutarse solo
3. **Usar fixtures para setup repetitivo** - evitar duplicación
4. **Nombres descriptivos** - `test_admin_can_create_case` es mejor que `test_case_1`
5. **Organizar con marcadores** - facilita ejecución selectiva
6. **Verificar casos límite** - no solo el camino feliz
7. **Mantener cobertura >80%** - configurado en pytest.ini

---

## 🐛 Solución de Problemas

### Error: "ModuleNotFoundError"

```bash
# Asegurarse de que el PYTHONPATH incluye el directorio backend
export PYTHONPATH="${PYTHONPATH}:/ruta/al/backend"

# O ejecutar desde el directorio backend
cd backend
pytest
```

### Error: "Database locked"

Los tests usan SQLite en memoria, esto no debería ocurrir. Si ocurre:
- Verificar que no hay sesiones de DB abiertas
- Revisar que las fixtures están usando `async with` correctamente

### Tests muy lentos

```bash
# Usar pytest-xdist para paralelizar
pip install pytest-xdist
pytest -n auto  # Usa todos los CPUs disponibles
```

---

## 📚 Recursos Adicionales

- [Pytest Documentation](https://docs.pytest.org/)
- [pytest-asyncio](https://pytest-asyncio.readthedocs.io/)
- [HTTPX Testing](https://www.python-httpx.org/advanced/#testing)
- [FastAPI Testing](https://fastapi.tiangolo.com/tutorial/testing/)

---

## 🤝 Contribuir

Al agregar nuevas funcionalidades:

1. Escribir tests unitarios para lógica de negocio
2. Escribir tests de integración para endpoints
3. Mantener cobertura >80%
4. Actualizar esta documentación si es necesario

---

**Última actualización:** Enero 2026
**Versión:** 1.0.0
