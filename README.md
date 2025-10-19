# AB-EcommerceFrontEnd_APP (React)

Frontend de un **clon estilo Amazon** construido con **React 17** y **Create React App**, orientado a componentes reutilizables, **Redux Toolkit** para estado global, **Stripe** para pagos, y diseño responsivo con **Bootstrap/MDBReact**. Este documento sirve como guía de onboarding técnico.

## 🧱 Stack principal
- **React 17.0.2** + **React DOM**
- **Redux Toolkit**, `react-redux`, `redux-thunk`
- **React Router v6**
- **Axios**
- **Bootstrap 5**, **React-Bootstrap**, **MDBReact**
- **Stripe** (`@stripe/react-stripe-js`, `@stripe/stripe-js`)
- **Testing Library** (Jest + RTL)
- **Create React App (react-scripts 4)**

## ✨ Características
- UI responsiva y modular (componentes reutilizables).
- Estado global con slices (Redux Toolkit).
- Pagos integrados con Stripe (client-side).
- Paginación, sliders (filtros de precio) y alerts.
- Metadatos dinámicos con `react-helmet`.
- Testing de componentes con RTL.
- Config estándar de ESLint y Browserslist.

## 📁 Estructura recomendada
```
/src
  /assets/           # imágenes, íconos
  /components/       # componentes UI reutilizables
  /pages/            # vistas/páginas (Home, Product, Cart, Checkout)
  /routes/           # definición de rutas (React Router v6)
  /store/            # Redux Toolkit: slices, store, middlewares
  /services/         # axios instances, API clients
  /hooks/            # hooks personalizados (useAuth, useCart, etc.)
  /styles/           # estilos globales / variables
  /utils/            # helpers, formateadores
  index.tsx|jsx
  App.tsx|jsx
```

## ⚙️ Scripts (npm)
```bash
npm start      # servidor de desarrollo con hot reload
npm run build  # build optimizado para producción
npm test       # ejecuta pruebas (Jest + React Testing Library)
npm run eject  # expone la config interna de CRA (opción avanzada)
```

## 🚀 Inicio rápido
```bash
# 1) Instalar dependencias
npm install

# 2) Variables de entorno (crear .env)
# ver sección "Variables de entorno"

# 3) Ejecutar en desarrollo
npm start

# 4) Abrir en navegador
http://localhost:3000
```

## 🔐 Variables de entorno
Crea un archivo `.env` en la raíz:

```bash
# URL base del backend (ASP.NET Core u otro)
REACT_APP_API_BASE_URL=https://localhost:5001/api

# Public key de Stripe (NO usar secret key en el frontend)
REACT_APP_STRIPE_PUBLIC_KEY=pk_test_XXXXXXXXXXXX
```

> **Nota:** Toda variable usada por CRA debe empezar con `REACT_APP_`.

## 🗂️ Estado global (Redux Toolkit)
- `store/` contiene:
  - `store.ts` – configuración de store y middlewares (`thunk`).
  - `slices/` – p. ej., `authSlice.ts`, `cartSlice.ts`, `productSlice.ts`.
- Patrón recomendado por slice:
  - **state inicial** → **reducers** → **extraReducers** para async thunks.
  - Acciones asincrónicas: `createAsyncThunk` (fetch a API con axios).

## 🧭 Rutas (React Router v6)
- Definir rutas en `/routes`:
```tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Product from "@/pages/Product";
import Checkout from "@/pages/Checkout";

export default function AppRoutes() {
  return {
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/product/:id" element={<Product/>} />
        <Route path="/checkout" element={<Checkout/>} />
      </Routes>
    </BrowserRouter>
  };
}
```

## 💳 Pagos con Stripe
- Instalar y wrappear la app con `<Elements>` usando `REACT_APP_STRIPE_PUBLIC_KEY`.
- Seguir el flujo de PaymentIntents (el **secret** se crea en el backend; aquí solo se confirma el pago con el `client_secret`).

## 🌐 Cliente HTTP (Axios)
- Define un `axiosInstance` con `baseURL` = `REACT_APP_API_BASE_URL`.
- Interceptores para auth tokens y manejo centralizado de errores.

## 🧪 Pruebas
- **React Testing Library** + **Jest**:
  - Render de componentes, simulación de eventos (`user-event`).
  - Aserciones accesibles con `@testing-library/jest-dom`.
```bash
npm test
```

## 🧹 Calidad de código
- ESLint extendido de `react-app` y `react-app/jest`.
- Convenciones de commits sugeridas: *feat, fix, refactor, test, docs, chore*.
- Formateo consistente (recomendado Prettier).

## 🌍 Browserslist
- Producción: >0.2%, navegadores modernos, excluye obsoletos.
- Desarrollo: últimas versiones de Chrome/Firefox/Safari.

## 🧾 Resumen ejecutivo
- **Stack:** React 17 + CRA, Redux Toolkit, Axios, Bootstrap/MDBReact, Stripe, RTL.
- **Uso:** frontend e-commerce escalable con estado global y pagos.
- **Listo para:** dev, pruebas y build productivo.
- **Futuro:** migrar a React 18 + `react-scripts@5` o **Vite** para builds más rápidos.

## 🗺️ Roadmap (sugerido)
- [ ] Migrar a React 18.
- [ ] Dark mode y diseño accesible (A11y).
- [ ] Suspense/Code splitting por rutas.
- [ ] Tests E2E (Playwright/Cypress).
- [ ] Caché de datos (RTK Query).

## 🤝 Contribuir
1. Fork & clone  
2. `npm install`  
3. Crea una rama: `git checkout -b feat/nueva-funcionalidad`  
4. Commits pequeños y descriptivos  
5. Pull Request con detalle del cambio

## 📜 Licencia
MIT — libre uso con atribución.
