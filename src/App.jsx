import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Componentes Layout & UI
import Navbar from './components/layout/Navbar'; // Asegúrate de tener Navbar aquí si no está en Layout
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

function App() {
  const [isLoading, setIsLoading] = React.useState(true);

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }} basename={import.meta.env.BASE_URL}>
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
              className="relative min-h-screen"
            >
              {/* COMPONENTES GLOBALES (Se montan solo cuando termina la carga) */}
              <GlobalCursor />
              <GlobalAuroraBackground />
              <GlobalSpotlight />

              {/* RUTAS ANIMADAS */}
              <AnimatedRoutes />

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
    <AnimatePresence mode="popLayout">
      <Routes location={location} key={location.pathname}>
        {/* Layout envuelve todas las rutas principales */}
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