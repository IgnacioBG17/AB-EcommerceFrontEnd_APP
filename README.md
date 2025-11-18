# AB-EcommerceFrontEnd_APP (React)

Frontend de un **estilo Amazon** construido con **React 17** y **Create React App**, orientado a componentes reutilizables, **Redux Toolkit** para estado global, **Stripe** para pagos, y diseño responsivo con **Bootstrap/MDBReact**. 

## 🧱 Stack principal
- **React 17.0.2** + **React DOM**
- **Redux Toolkit**, `react-redux`, `redux-thunk`
- **React Router v6**
- **Axios**
- **Bootstrap 5**, **React-Bootstrap**, **MDBReact**
- **Stripe** (`@stripe/react-stripe-js`, `@stripe/stripe-js`)
- **Testing Library** (Jest)
- **Create React App (react-scripts 4)**

## ✨ Características
- UI responsiva y modular (componentes reutilizables).
- Estado global con slices (Redux Toolkit).
- Pagos integrados con Stripe (client-side).
- Paginación, sliders (filtros de precio) y alerts.
- Metadatos dinámicos con `react-helmet`.
- Config estándar de ESLint y Browserslist.

## 🚀 Inicio rápido
```bash
# 1) Node version 16.17.1
# 2) Instalar dependencias 
npm install

# 3) Ejecutar en desarrollo
npm start

# 4) Abrir en navegador
http://localhost:3000
```

## 🗂️ Estado global (Redux Toolkit)
- Patrón recomendado por slice:
  - **state inicial** → **reducers** → **extraReducers** para async thunks.
  - Acciones asincrónicas: `createAsyncThunk` (fetch a API con axios).
```

## 💳 Pagos con Stripe
- Instalar y wrappear la app con `<Elements>` usando `stripeapi`.
- Seguir el flujo de PaymentIntents (el **secret** se crea en el backend; aquí solo se confirma el pago con el `client_secret`).

## 🌐 Cliente HTTP (Axios)
- Define un `axiosInstance` con `baseURL` = `BASE_URL`.
- Interceptores para auth tokens y manejo centralizado de errores.
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
- **Listo para:** dev y pruebas.
- **Futuro:** migrar a React 18 + `react-scripts@5` o **Vite** para builds más rápidos.

## 🗺️ Roadmap (sugerido)
- [ ] Migrar a React 19.
- [ ] Diseño accesible (A11y).
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
