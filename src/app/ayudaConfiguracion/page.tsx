"use client";

import React, { useState, useCallback } from 'react';
// Íconos de Lucide React
import { LifeBuoy, Search, ChevronDown, ChevronRight, MessageSquare, BookOpen, Video, Users, Lock, Sun, Mail, Send, X, Clock, Bell, Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';


// --- INTERFACES DE TYPESCRIPT ---

type Category = 'Repetición espaciada' | 'Pomodoro' | 'Notificaciones inteligentes' | 'Configuración y cuenta' | 'Privacidad y datos';

interface FAQItem {
  question: string;
  answer: string;
  category: Category;
}

interface VideoTutorial {
  title: string;
  duration: string;
  link: string; // Simulación de enlace
  imagePlaceholder: string; // URL o placeholder
}

// --- MOCK DATA EN ESPAÑOL ---

const MOCK_FAQS: FAQItem[] = [
  {
    question: "¿Cómo funciona la repetición espaciada?",
    answer: "Organiza tus repasos según tu rendimiento y la curva del olvido para maximizar la retención. El sistema te notifica el momento óptimo para estudiar una tarjeta antes de que la olvides.",
    category: 'Repetición espaciada',
  },
  {
    question: "¿Cómo usar el temporizador Pomodoro?",
    answer: "Elige duración, inicios rápidos y detecciones automáticas desde la sección Pomodoro. El ciclo estándar es 25 minutos de trabajo y 5 minutos de descanso.",
    category: 'Pomodoro',
  },
  {
    question: "¿Qué son los recordatorios inteligentes?",
    answer: "Te avisamos en los momentos óptimos según tus hábitos y próximos repasos previstos. Se activan y configuran desde el módulo de Notificaciones.",
    category: 'Notificaciones inteligentes',
  },
  {
    question: "¿Cómo se desbloquean logros?",
    answer: "Completa rachas, sesiones y tarjetas para ganar puntos y subir en el ranking. Revisa tu progreso en el módulo de Gamificación.",
    category: 'Configuración y cuenta',
  },
  {
    question: "¿Cómo gestiono privacidad y datos?",
    answer: "Desde Configuración puedes revisar permisos, exportar o eliminar tu cuenta y datos de progreso en formato CSV/JSON.",
    category: 'Privacidad y datos',
  },
];

const MOCK_VIDEOS: VideoTutorial[] = [
    {
      title: "Primeros pasos con StudyFlow",
      duration: "3:45",
      link: "#",
      imagePlaceholder: "https://placehold.co/200x120/5c88e7/ffffff?text=Video+1",
    },
    {
      title: "Crea y organiza tus tarjetas",
      duration: "5:12",
      link: "#",
      imagePlaceholder: "https://placehold.co/200x120/5c88e7/ffffff?text=Video+2",
    },
    {
      title: "Aprovecha Pomodoro y descansos",
      duration: "4:08",
      link: "#",
      imagePlaceholder: "https://placehold.co/200x120/5c88e7/ffffff?text=Video+3",
    },
];

// --- COMPONENTES ---

// Componente Tarjeta de Pregunta Frecuente
const FAQCard: React.FC<{ faq: FAQItem }> = ({ faq }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    let IconComponent: React.FC<any> = BookOpen;
    let iconColor = 'text-blue-500';

    switch (faq.category) {
        case 'Repetición espaciada': IconComponent = Clock; iconColor = 'text-green-500'; break;
        case 'Pomodoro': IconComponent = Sun; iconColor = 'text-red-500'; break;
        case 'Notificaciones inteligentes': IconComponent = Bell; iconColor = 'text-amber-500'; break;
        case 'Configuración y cuenta': IconComponent = Settings; iconColor = 'text-violet-500'; break;
        case 'Privacidad y datos': IconComponent = Lock; iconColor = 'text-gray-500'; break;
        default: IconComponent = BookOpen;
    }


    return (
        <div className="border border-gray-200 rounded-xl transition-shadow duration-300 hover:shadow-lg">
            <button
                className="w-full flex justify-between items-center p-4 text-left"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center">
                    <IconComponent size={20} className={`mr-3 ${iconColor}`} />
                    <span className="font-semibold text-gray-800">{faq.question}</span>
                </div>
                <ChevronDown size={20} className={`text-gray-500 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="p-4 pt-0 text-gray-600 border-t border-gray-100">
                    {faq.answer}
                </div>
            )}
        </div>
    );
};

// Componente Contenedor de Tutorial de Video
const VideoTutorialCard: React.FC<{ video: VideoTutorial }> = ({ video }) => (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition">
        <a href={video.link} target="_blank" rel="noopener noreferrer" className="block">
            <div className="relative">
                <img src={video.imagePlaceholder} alt={`Tutorial: ${video.title}`} className="w-full h-auto object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition">
                        <Video size={24} className="text-white fill-white" />
                    </div>
                </div>
            </div>
            <div className="p-4">
                <p className="font-semibold text-gray-800 mb-1 leading-snug">{video.title}</p>
                <p className="text-sm text-gray-500 flex items-center">
                    <Clock size={14} className="mr-1" /> Duración: {video.duration}
                </p>
            </div>
        </a>
    </div>
);


// --- COMPONENTE PRINCIPAL: HelpSupportPage ---
const HelpSupportPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'Todas'>('Todas');

  const filteredFaqs = MOCK_FAQS.filter(faq => {
    const termMatch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const categoryMatch = selectedCategory === 'Todas' || faq.category === selectedCategory;
    return termMatch && categoryMatch;
  });
  
  const allCategories: ('Todas' | Category)[] = ['Todas', 'Repetición espaciada', 'Pomodoro', 'Notificaciones inteligentes', 'Configuración y cuenta', 'Privacidad y datos'];

  // Simulación de envío de formulario de contacto
  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Formulario de contacto enviado. Revisaremos tu solicitud pronto. (Simulación)');
  };
  const router = useRouter();

  return (
    
    <div className="min-h-screen bg-gray-50 font-sans antialiased p-6">
      
      {/* Encabezado y Buscador */}
      <button
            onClick={() => router.push("/register")}
            className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition flex items-center font-semibold"
          >
            <ChevronRight size={18} className="rotate-180 mr-1" />
            Volver
          </button>
      <header className="mb-8 p-8 bg-blue-600 rounded-xl text-white shadow-2xl">
        <div className="flex items-center text-3xl font-extrabold mb-2">
          <LifeBuoy size={30} className="mr-2" />
          Centro de Ayuda
        </div>
        <p className="text-blue-200 mb-6">Guías de uso, tutoriales y soporte técnico para optimizar tu estudio.</p>

        {/* Formulario de Búsqueda */}
        <form className="relative flex">
          <Search size={24} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Busca por tema, error o función (Ej: curva del olvido)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-4 pl-12 pr-4 bg-white text-gray-800 rounded-xl focus:ring-4 focus:ring-blue-300 focus:outline-none transition-shadow duration-200 shadow-inner"
          />
          <button 
            type="submit"
            className="hidden sm:block absolute right-2 top-2 bottom-2 px-6 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-700 transition"
          >
            Buscar
          </button>
        </form>
      </header>

      {/* Contenido Principal: Categorías y FAQ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Columna Izquierda: Categorías de Temas */}
        <div className="lg:col-span-1">
            <div className="p-6 bg-white rounded-xl shadow-lg border-l-4 border-blue-400">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <BookOpen size={20} className="mr-2 text-blue-600" />
                    Categorías de Temas
                </h3>
                <div className="space-y-2">
                    {allCategories.map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`w-full text-left px-3 py-2 rounded-lg transition duration-200 flex items-center justify-between text-gray-700 ${
                                selectedCategory === category ? 'bg-blue-100 text-blue-700 font-bold' : 'hover:bg-gray-100'
                            }`}
                        >
                            {category}
                            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-200">
                                {category === 'Todas' ? MOCK_FAQS.length : MOCK_FAQS.filter(f => f.category === category).length}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </div>

        {/* Columna Central y Derecha: FAQ, Contacto y Videos */}
        <div className="lg:col-span-2 space-y-8">
            
            {/* Preguntas Frecuentes (FAQ) */}
            <div>
                <h3 className="text-2xl font-extrabold text-gray-900 mb-4 flex items-center">
                    <BookOpen size={24} className="mr-2 text-blue-600" />
                    Preguntas Frecuentes ({selectedCategory !== 'Todas' ? selectedCategory : 'Temas principales'})
                </h3>
                <div className="space-y-3">
                    {filteredFaqs.length > 0 ? (
                        filteredFaqs.map((faq, index) => (
                            <FAQCard key={index} faq={faq} />
                        ))
                    ) : (
                        <div className="p-6 bg-white rounded-xl text-center text-gray-500">
                            No se encontraron resultados para "{searchTerm}". Intenta otra palabra clave o selecciona otra categoría.
                        </div>
                    )}
                </div>
            </div>
            
            {/* Tutoriales en Video */}
            <div>
                <h3 className="text-2xl font-extrabold text-gray-900 mb-4 flex items-center">
                    <Video size={24} className="mr-2 text-blue-600" />
                    Tutoriales en Video
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {MOCK_VIDEOS.map((video, index) => (
                        <VideoTutorialCard key={index} video={video} />
                    ))}
                </div>
            </div>

            {/* Chatbot o Formulario de Contacto */}
            <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-600">
                <h3 className="text-2xl font-extrabold text-gray-900 mb-4 flex items-center">
                    <MessageSquare size={24} className="mr-2 text-blue-600" />
                    Chatbot y Contacto
                </h3>
                <p className="text-gray-600 mb-4">
                    ¿No encuentras lo que buscas? Contáctanos o chatea con nuestro asistente para una respuesta rápida.
                </p>

                <form onSubmit={handleSubmitContact} className="space-y-4">
                    {/* Campos de contacto */}
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-1 block">Tu nombre</label>
                        <input 
                            type="text" 
                            placeholder="Tu nombre completo"
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-1 block">Tu correo electrónico</label>
                        <input 
                            type="email" 
                            placeholder="ejemplo@correo.com"
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-1 block">Describe tu problema</label>
                        <textarea 
                            placeholder="Cuéntanos el problema o adjunta enlaces..."
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition h-24"
                        />
                    </div>
                    
                    <div className="flex justify-between items-center pt-2">
                        <p className="text-xs text-gray-500">Tiempo de respuesta estimado: 24-48h</p>
                        <button 
                            type="submit"
                            className="px-6 py-3 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition shadow-lg flex items-center"
                        >
                            <Send size={18} className="mr-2" /> Enviar
                        </button>
                    </div>
                </form>
            </div>
            
        </div>
      </div>
      
    </div>
  );
};

export default HelpSupportPage;
