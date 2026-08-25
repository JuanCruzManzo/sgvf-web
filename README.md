# SGVF - Sistema de Gestión de Venta Frutihortícola

Frontend de **SGVF**, una aplicación web desarrollada para centralizar y simplificar la gestión diaria de un comercio mayorista frutihortícola.

La aplicación fue diseñada como una **web responsive**, con especial foco en su utilización desde dispositivos móviles.

El sistema permite gestionar ventas, productos, stock, clientes, proveedores, cuentas corrientes, pagos y generación de tickets desde una interfaz simple y rápida.

## Tecnologías utilizadas

- React
- TypeScript
- Vite
- Material UI
- Axios
- React Router

## Funcionalidades

### Ventas

- Registro de nuevas ventas.
- Selección de cliente.
- Venta a consumidor final.
- Selección de múltiples productos.
- Ingreso de cantidad de cajones y precio unitario.
- Cálculo automático de subtotales y total.
- Ventas pagadas o pendientes.
- Listado de ventas.
- Consulta del detalle de una venta.
- Cancelación de ventas.
- Generación y descarga de tickets.

### Productos y stock

- Listado de productos.
- Búsqueda de productos.
- Alta y modificación de productos.
- Visualización del stock disponible.
- Identificación de productos con stock bajo.
- Identificación de productos sin stock.
- Integración del stock con las ventas.

### Clientes

- Listado de clientes.
- Alta y modificación de clientes.
- Consulta del detalle de cada cliente.
- Visualización del saldo pendiente.
- Registro de nuevas deudas.
- Registro de cobros.
- Historial de movimientos.

### Proveedores

- Gestión de proveedores.
- Consulta de información.
- Gestión de cuentas corrientes y pagos.

### Autenticación

- Inicio de sesión.
- Autenticación mediante JWT.
- Rutas protegidas.
- Envío automático del token en las solicitudes a la API.

## Arquitectura

El frontend consume una API REST desarrollada con ASP.NET Core.

Las solicitudes HTTP se encuentran centralizadas mediante Axios.

El flujo general de comunicación es:

React
  ↓
Services
  ↓
Axios
  ↓
ASP.NET Core Web API
  ↓
SQL Server


La estructura principal del frontend es:
src/
├── assets/
├── components/
├── layouts/
├── pages/
│   ├── Clientes/
│   ├── Dashboard/
│   ├── Login/
│   ├── Productos/
│   ├── Proveedores/
│   └── Ventas/
├── routes/
├── services/
├── styles/
├── App.tsx
└── main.tsx


## Flujo de una venta

El flujo principal de una venta consiste en:

1. Seleccionar un cliente o realizar la operación como Consumidor Final.
2. Agregar uno o más productos.
3. Indicar la cantidad de cajones.
4. Indicar el precio unitario.
5. Calcular automáticamente subtotales y total.
6. Seleccionar si la venta está pagada o pendiente.
7. Confirmar la operación.
8. Enviar la venta a la API.
9. Actualizar automáticamente el stock desde el backend.
10. Actualizar la deuda del cliente cuando corresponda.
11. Consultar el detalle de la venta.
12. Generar el ticket correspondiente.

## Autenticación

El sistema utiliza **JSON Web Tokens (JWT)**.

Una vez realizado correctamente el login, el token recibido desde el backend se almacena localmente y Axios lo incorpora automáticamente a las solicitudes protegidas.

Las solicitudes autenticadas utilizan el encabezado:


Authorization: Bearer <token>


## Instalación

### 1. Clonar el repositorio


git clone <URL_DEL_REPOSITORIO_FRONTEND>


### 2. Ingresar al proyecto

cd sgvf-web


### 3. Instalar las dependencias

npm install

### 4. Ejecutar el proyecto

npm run dev


Por defecto, Vite ejecutará la aplicación en:

http://localhost:5173


## Configuración de la API

La configuración de Axios se encuentra en:

src/services/api.ts

Durante el desarrollo, la API puede configurarse de la siguiente manera:


import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7153/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;


La URL debe modificarse si el backend se ejecuta en otro puerto o entorno.


## Autores

Desarrollado por:

- Juan Cruz Manzo
- Camila Ernaga

## Estado del proyecto

Proyecto funcional desarrollado como aplicación web full stack.

---

**SGVF - Sistema de Gestión de Venta Frutihortícola**
