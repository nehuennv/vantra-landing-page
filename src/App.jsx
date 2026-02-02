import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

// Componentes Layout & UI
import Navbar from './components/layout/Navbar';
// Footer removed from App.jsx, now in PageTransition
import GlobalAuroraBackground from './components/layout/GlobalAuroraBackground';
import GlobalCursor from './components/layout/GlobalCursor';
import GlobalSpotlight from './components/layout/GlobalSpotlight';
import SmoothScroll from './components/layout/SmoothScroll';
import Layout from './components/layout/Layout';
import SplashScreen from './components/layout/SplashScreen';
import PageTransition from './components/layout/PageTransition';

// Páginas
import Home from './pages/Home';
import RestoProduct from './pages/RestoProduct';
import MedProduct from './pages/MedProduct';
import Team from './pages/Team';

// 🔥 COMPONENTE ESPÍA: RASTREADOR DE MOVIMIENTO
// Este componente detecta cambios de ruta y dispara el evento 'PageView'
// usando el script que pegamos en index.html
// Componente de rastreo eliminado de la vista
const FacebookPixelTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Verificamos si el script global de Facebook (fbq) existe
    if (window.fbq) {
      // Tracking PageView logic
      window.fbq('track', 'PageView');
    }
  }, [location]); // Se ejecuta cada vez que cambia la ruta

  return null; // No renderiza nada visual
};

function App() {
  const [isLoading, setIsLoading] = React.useState(true);

  return (
    // ... keys
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }} basename={import.meta.env.BASE_URL}>

      {/* 🔥 AQUÍ ESTÁ LA CLAVE: Insertamos el rastreador dentro del Router */}
      <FacebookPixelTracker />



      <SmoothScroll>

        {/* LÓGICA DE SPLASH SCREEN VS CONTENIDO */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <SplashScreen key="splash" onComplete={() => setIsLoading(false)} />
          ) : (
            <motion.div
              key="main-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col min-h-screen relative overflow-hidden"
            >
              {/* COMPONENTES GLOBALES */}
              <GlobalCursor />
              <GlobalAuroraBackground />
              <GlobalSpotlight />

              {/* BARRA DE NAVEGACIÓN PERSISTENTE */}
              <Navbar />

              {/* CONTENIDO PRINCIPAL ANIMADO */}
              <main className="flex-grow z-10 w-full">
                <AnimatedRoutes />
              </main>

            </motion.div>
          )}
        </AnimatePresence>

      </SmoothScroll>
    </Router>
  );
}

// Sub-componente para manejar useLocation dentro del Router
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Layout ahora es transparente, solo envuelve rutas */}
        <Route element={<Layout />}>
          <Route path="/" element={
            <PageTransition>
              <Home />
            </PageTransition>
          } />
          <Route path="/resto" element={
            <PageTransition>
              <RestoProduct />
            </PageTransition>
          } />
          <Route path="/med" element={
            <PageTransition>
              <MedProduct />
            </PageTransition>
          } />
          <Route path="/equipo" element={
            <PageTransition>
              <Team />
            </PageTransition>
          } />
          <Route path="/configurar" element={
            <PageTransition>
              <div className="pt-32 text-center">Configurador en construcción...</div>
            </PageTransition>
          } />
          <Route path="/servicios" element={
            <PageTransition>
              <div className="pt-32 text-center">Sección de Servicios (Scroll en Home)</div>
            </PageTransition>
          } />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default App;