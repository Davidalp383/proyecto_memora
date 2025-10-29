// app/components/MemoraLandingPage.tsx
import React from 'react';
import Link from 'next/link';
import {
  Brain,
  Clock,
  Zap,
  Sparkles,
  Play,
  ArrowRight,
  BookOpen,
  Blocks,
  Bell,
  Check,
  Menu,
} from 'lucide-react';

interface MemoraLandingPageProps {
  onAuthClick?: () => void;
}

const MemoraLandingPage: React.FC<MemoraLandingPageProps> = ({ onAuthClick }) => {
  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      <Header onAuthClick={onAuthClick} />
      <main>
        <HeroSection />
        <KeyAdvantages />
        <HowItWorks />
      </main>
      <FooterCTA onAuthClick={onAuthClick} />
      <Footer />
    </div>
  );
};


// --- Header ---
const Header: React.FC<{ onAuthClick?: () => void }> = ({ onAuthClick }) => (
  <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
      <div className="text-2xl font-bold text-indigo-600">Memora</div>

      <nav className="hidden md:flex space-x-8 items-center text-sm font-medium">
        <Link href="/" className="text-gray-600 hover:text-indigo-600">Inicio</Link>
        <Link href="#features" className="text-gray-600 hover:text-indigo-600">Características</Link>

        {/* 🔗 ahora redirigen a /register */}
        <Link
          href="/register"
          className="text-gray-600 hover:text-indigo-600"
        >
          Iniciar Sesión
        </Link>

        <Link
          href="/register"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-150 flex items-center shadow-md"
        >
          <Check className="w-4 h-4 mr-1" /> Registrarse
        </Link>
      </nav>

      <button className="md:hidden p-2 text-gray-600 hover:text-indigo-600">
        <Menu className="w-6 h-6" />
      </button>
    </div>
  </header>
);


// --- Hero Section ---
const HeroSection: React.FC = () => (
  <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 lg:pt-24 lg:pb-32 grid lg:grid-cols-2 gap-12 items-center z-0 relative">
    <div>
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
        Aprendizaje inteligente <br className="hidden sm:inline" /> con resultados{' '}
        <span className="text-indigo-600">medibles</span>
      </h1>
      <p className="text-lg text-gray-600 mb-8 max-w-lg">
        Memora combina repetición espaciada, Pomodoro y gamificación, potenciados por IA y notificaciones inteligentes, para ayudarte a estudiar mejor en menos tiempo.
      </p>
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <Link href="/register" className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition duration-150 flex items-center justify-center shadow-lg">
          <Play className="w-5 h-5 mr-2" /> Comienza a Estudiar
        </Link>
        <Link href="#how-it-works" className="text-indigo-600 border border-indigo-600 bg-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition duration-150 flex items-center justify-center">
          <ArrowRight className="w-5 h-5 mr-2 transform rotate-45" /> Descubre Cómo Funciona
        </Link>
      </div>
    </div>
    <div className="order-first lg:order-none relative">
      <div className="w-full h-80 sm:h-96 lg:h-full bg-gray-200 rounded-2xl overflow-hidden shadow-2xl">
        <img
          src="/image_428c9e.jpg"
          alt="Persona estudiando con una laptop"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-10 pointer-events-none"></div>
      </div>
    </div>
  </section>
);

// --- Key Advantages ---
const KeyAdvantages: React.FC = () => {
  const advantages = [
    { icon: <Brain className="w-6 h-6 text-indigo-600" />, title: 'Repetición Espaciada', description: 'Optimiza tus repasos según la curva del olvido para retener a largo plazo.' },
    { icon: <Clock className="w-6 h-6 text-indigo-600" />, title: 'Productividad', description: 'Ritmo de enfoque con Pomodoro y sesiones guiadas para mantener la constancia.' },
    { icon: <Zap className="w-6 h-6 text-indigo-600" />, title: 'Gamificación', description: 'Gana logros, sube en el ranking y mantén la motivación día a día.' },
    { icon: <Sparkles className="w-6 h-6 text-indigo-600" />, title: 'IA', description: 'Recomendaciones inteligentes y recordatorios en el momento exacto.' },
  ];

  return (
    <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-2xl font-bold mb-8">Ventajas clave</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {advantages.map(a => (
          <div key={a.title} className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition duration-200">
            <div className="flex items-center mb-3">
              <div className="p-3 bg-indigo-50 rounded-full">{a.icon}</div>
              <h3 className="text-lg font-semibold ml-3">{a.title}</h3>
            </div>
            <p className="text-gray-600 text-sm">{a.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

// --- How It Works ---
const HowItWorks: React.FC = () => {
  const steps = [
    { step: 'Paso 1', title: 'Crea o importa tus tarjetas', description: 'Organiza tus temas y deja que el sistema calcule cuándo repasar.', icon: <BookOpen className="w-8 h-8 text-indigo-600" /> },
    { step: 'Paso 2', title: 'Estudia en bloques', description: 'Usa Pomodoro y concentra tu atención en sesiones cortas y efectivas.', icon: <Blocks className="w-8 h-8 text-indigo-600" /> },
    { step: 'Paso 3', title: 'Recibe recordatorios inteligentes', description: 'La IA te avisa en la franja óptima para maximizar la retención.', icon: <Bell className="w-8 h-8 text-indigo-600" /> },
  ];

  return (
    <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-2xl font-bold mb-8">Cómo funciona</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((s, i) => (
          <div key={i} className="flex flex-col space-y-3">
            <p className="text-sm font-semibold text-gray-500">{s.step}</p>
            <h3 className="text-xl font-bold mb-2">{s.title}</h3>
            <p className="text-gray-600">{s.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

// --- Footer CTA ---
const FooterCTA: React.FC<{ onAuthClick?: () => void }> = ({ onAuthClick }) => (
  <section className="bg-gray-50 py-10 relative z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
      <div className="mb-4 md:mb-0">
        <h3 className="text-xl font-bold mb-1">¿Listo para mejorar tu memoria?</h3>
        <p className="text-gray-600 text-sm">Regístrate gratis y comienza hoy mismo.</p>
      </div>
      <div className="flex space-x-4">
        {/* 🔗 Ambos redirigen a /register */}
        <Link
          href="/register"
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-150 shadow-md"
        >
          Crear cuenta
        </Link>
        <Link
          href="/register"
          className="bg-white text-indigo-600 border border-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition duration-150"
        >
          Iniciar sesión
        </Link>
      </div>
    </div>
  </section>
);


const Footer: React.FC = () => (
  <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-sm text-gray-500 flex justify-between items-center">
    <p>© 2025 Memora</p>
    <div className="space-x-4">
      <a href="#" className="hover:text-indigo-600">Privacidad</a>
      <span className="text-gray-300">|</span>
      <a href="#" className="hover:text-indigo-600">Términos</a>
      <span className="text-gray-300">|</span>
      <a href="#" className="hover:text-indigo-600">Contacto</a>
    </div>
  </footer>
);

export default MemoraLandingPage;
