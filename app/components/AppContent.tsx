"use client"; 

import React, { useState, useCallback } from 'react';
// Importaciones simuladas para Recharts (generalmente disponibles en el entorno de ejecución)
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
// Iconos de Lucide React (generalmente disponibles)
import { LucideIcon, Gauge, Clock, BookOpen, CheckCircle, Target, Bell, Search, Zap, Calendar, ArrowRight, Menu, X, ListTodo, Star, TrendingUp } from 'lucide-react';
import { useRouter } from "next/navigation";

// --- INTERFACES DE TYPESCRIPT ---

interface SummaryData {
  id: number;
  title: string;
  value: string;
  subtext: string;
  color: string;
  icon: LucideIcon; // Type for Lucide React icons
}

interface ChartData {
  name: string;
  [key: string]: string | number;
}

interface PieChartEntry {
  [key: string]: string | number; // ✅ Esto arregla el error
  name: string;
  value: number;
  color: string;
}

interface Reminder {
  id: number;
  title: string;
  text: string;
  action: string;
  actionColor: string;
  icon: LucideIcon;
  time: string;
}

interface Session {
  id: number;
  title: string;
  time: string;
  action: string;
  actionColor: string;
}

interface SummaryCardProps {
  title: string;
  value: string;
  subtext: string;
  color: string;
  Icon: LucideIcon;
}

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

interface BarChartPlaceholderProps {
  data: ChartData[];
  title: string;
  dataKey: string;
  xAxisLabel: string;
  barColor: string;
}

// --- MOCK DATA EN ESPAÑOL (Typed) ---
const MOCK_SUMMARY_DATA: SummaryData[] = [
  { id: 1, title: "Retención semanal", value: "82%", subtext: "+5% vs. semana pasada", color: "bg-blue-500", icon: TrendingUp },
  { id: 2, title: "Temas completados", value: "28", subtext: "3 nuevos esta semana", color: "bg-green-500", icon: BookOpen },
  { id: 3, title: "Tiempo de estudio", value: "6h 40m", subtext: "Objetivo: 6h / semana", color: "bg-yellow-500", icon: Clock },
  { id: 4, title: "Racha activa", value: "12 días", subtext: "+2 días", color: "bg-red-500", icon: Zap },
];

const PIE_CHART_DATA: PieChartEntry[] = [
  { name: 'Retención', value: 82, color: '#3b82f6' }, // Blue
  { name: 'Pérdida', value: 18, color: '#f59e0b' },   // Amber
];

const BAR_CHART_COMPLETADOS_DATA: ChartData[] = [
  { name: 'Esta semana', Temas: 28 },
  { name: 'Anterior', Temas: 25 },
];

const BAR_CHART_TIEMPO_DATA: ChartData[] = [
  { name: 'Lun', Minutos: 120 },
  { name: 'Mar', Minutos: 180 },
  { name: 'Mié', Minutos: 60 },
  { name: 'Jue', Minutos: 150 },
  { name: 'Vie', Minutos: 90 },
];

const REMINDERS: Reminder[] = [
  { id: 1, title: 'Revisión de tarjetas', text: '30 items vencen en 2h.', action: 'Revisar', actionColor: 'bg-green-500', icon: ListTodo, time: 'Ahora' },
  { id: 2, title: 'Sesión Pomodoro', text: 'Inicie un bloque de 25 minutos', action: 'Empezar', actionColor: 'bg-yellow-500', icon: Clock, time: '' },
  { id: 3, title: 'Repasar Biología', text: 'Recordatorio de repaso espaciado', action: 'Hoy 18:00', actionColor: 'bg-orange-500', icon: BookOpen, time: 'Hoy 18:00' },
  { id: 4, title: 'Cerca de un logro', text: 'Completa 2 temas más', action: 'Ver', actionColor: 'bg-indigo-500', icon: Star, time: '' },
];

const UPCOMING_SESSIONS: Session[] = [
  { id: 1, title: 'Matemáticas', time: 'Mañana 09:00 - 10:00', action: 'Ver detalles', actionColor: 'bg-yellow-500' },
  { id: 2, title: 'Historia', time: 'Vie 16:00 - 17:30', action: 'Reprogramar', actionColor: 'bg-orange-500' },
];

// --- COMPONENTES INTERNOS ---

// Componente Tarjeta de Resumen (Top Row)
const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, subtext, color, Icon }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col transition duration-300 hover:shadow-xl">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-sm font-semibold text-gray-500">{title}</h3>
      <div className={`p-2 rounded-full text-white ${color} shadow-md`}>
        <Icon size={16} />
      </div>
    </div>
    <div className="text-3xl font-extrabold text-gray-900 mb-1">{value}</div>
    <p className={`text-xs font-medium ${color.replace('bg', 'text')}`}>{subtext}</p>
  </div>
);

// Placeholder de Gráfico Circular
const PieChartPlaceholder: React.FC<{ data: PieChartEntry[], title: string }> = ({ data, title }) => (
  <div className="flex flex-col items-center justify-center w-full h-full min-h-[250px] p-4">
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={data as any} // <-- o tipa PieChartEntry con [key: string]: number | string
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          labelLine={false}
          label={(props: any) => `${props.name}: ${props.value}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={(value: number, name: string) => [`${value}%`, name]} />
        <Legend layout="horizontal" align="center" verticalAlign="bottom" iconType="circle" />
      </PieChart>
    </ResponsiveContainer>
    <div className="mt-4 text-xs text-gray-500">Métricas de Retención: Azul (Retención) vs. Ámbar (Pérdida)</div>
  </div>
);

// Placeholder de Gráfico de Barras
const BarChartPlaceholder: React.FC<BarChartPlaceholderProps> = ({ data, dataKey, xAxisLabel, barColor }) => (
  <div className="flex flex-col items-center justify-center w-full h-full min-h-[250px] p-4">
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false} />
        <XAxis dataKey={xAxisLabel} stroke="#6b7280" />
        <YAxis stroke="#6b7280" />
        <Tooltip formatter={(value: number) => [`${value} ${dataKey === 'Temas' ? 'temas' : 'min.'}`]} />
        <Bar dataKey={dataKey} fill={barColor} radius={[4, 4, 0, 0]} />
        <Legend layout="horizontal" align="center" verticalAlign="top" iconType="circle" wrapperStyle={{ paddingTop: '10px' }} />
      </BarChart>
    </ResponsiveContainer>
    <div className="mt-4 text-xs text-gray-500">
      {dataKey === 'Temas' ? 'Comparación de temas completados' : 'Minutos de estudio por día'}
    </div>
  </div>
);

// Componente Tarjeta de Recordatorio
const ReminderItem: React.FC<Reminder> = ({ title, text, action, actionColor, icon: Icon }) => (
  <div className="flex items-start justify-between p-4 border-b border-gray-100 last:border-b-0">
    <div className="flex items-center">
      <div className="p-2 rounded-lg bg-blue-50 text-blue-600 mr-3">
        <Icon size={20} />
      </div>
      <div>
        <h4 className="font-semibold text-gray-800">{title}</h4>
        <p className="text-sm text-gray-500">{text}</p>
      </div>
    </div>
    <button className={`flex-shrink-0 ml-4 px-3 py-1 text-sm font-bold text-white rounded-lg shadow-md transition hover:opacity-90 ${actionColor}`}>
      {action}
    </button>
  </div>
);

// Componente Tarjeta de Sesiones Próximas
const SessionItem: React.FC<Session> = ({ title, time, action }) => (
  <div className="flex items-center justify-between p-4 border-b border-gray-100 last:border-b-0">
    <div>
      <h4 className="font-semibold text-gray-800">{title}</h4>
      <p className="text-sm text-gray-500 flex items-center">
        <Calendar size={14} className="mr-1 text-blue-400" />
        {time}
      </p>
    </div>
    <button className={`flex-shrink-0 ml-4 px-3 py-1 text-xs font-semibold text-gray-700 rounded-full transition hover:bg-gray-100 border border-gray-200`}>
      {action}
    </button>
  </div>
);

// Componente Tarjeta Contenedora Principal
const CardContainer: React.FC<{ title: string, children: React.ReactNode, className?: string }> = ({ title, children, className = '' }) => (
  <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
    <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">{title}</h2>
    {children}
  </div>
);

// --- SIDEBAR ---
const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const navItems: { name: string, icon: LucideIcon, active: boolean }[] = [
    { name: "Mis Sesiones", icon: Gauge, active: true },
    { name: "Pomodoro", icon: Clock, active: false },
    { name: "Revisión", icon: ListTodo, active: false },
    { name: "Logros", icon: Star, active: false },
  ];

  const router = useRouter();

  return (
    <>
      {/* Botón de Menú (Solo móvil) */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-full bg-blue-600 text-white shadow-lg"
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar - Fijo y visible en desktop, controlado por estado en móvil */}
      <div className={`
        fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out
        w-64 bg-white border-r border-gray-200 flex flex-col p-6 z-50 shadow-2xl lg:shadow-none
      `}>
        {/* Encabezado/Logo */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-extrabold text-blue-600">Estudio App</h1>
          <button className="lg:hidden text-gray-600 hover:text-gray-900" onClick={toggleSidebar}>
            <X size={24} />
          </button>
        </div>

        {/* Búsqueda */}
        <div className="mb-6">
          <label htmlFor="search-nav" className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Buscar...</label>
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              id="search-nav"
              type="text"
              placeholder="Buscar..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
        </div>

        {/* Navegación */}
        <nav className="flex-1">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Navegación</p>
          <ul>
            {navItems.map(item => (
              <li key={item.name} className="mb-2">
                <button
                  onClick={() => {
                    if(item.name === 'Revisión') {
                      router.push('/revision'); // Redirige a la página de revisión
                    } else if(item.name === 'Pomodoro') {
                      router.push('/pomodoro'); // Redirige a la página de pomodoro
                    }
                  }}
                  className={`flex items-center w-full p-3 rounded-xl transition duration-150
                    ${item.active ? 'bg-blue-100 text-blue-700 font-semibold shadow-inner' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <item.icon size={20} className="mr-3" />
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Perfil Inferior */}
        <div className="mt-auto pt-6 border-t border-gray-100">
          <div className="flex items-center">
            <img
              src="https://placehold.co/40x40/60a5fa/ffffff?text=AG"
              alt="Perfil de Alex García"
              className="w-10 h-10 rounded-full object-cover"
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => { e.currentTarget.onerror = null; e.currentTarget.src="https://placehold.co/40x40/60a5fa/ffffff?text=AG"; }}
            />
            <div className="ml-3">
              <p className="font-semibold text-gray-800 text-sm">Alex García</p>
              <p className="text-xs text-gray-500">Estudiante</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


// --- MAIN DASHBOARD COMPONENT ---
const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = useCallback((): void => {
    setIsSidebarOpen(prev => !prev);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans antialiased">  

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        <main className="p-4 md:p-6 flex-1 overflow-y-auto">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Panel de Estudio</h1>

          {/* 1. Tarjetas de Resumen (4 Columnas) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {MOCK_SUMMARY_DATA.map(data => (
              <SummaryCard
                key={data.id}
                title={data.title}
                value={data.value}
                subtext={data.subtext}
                color={data.color}
                Icon={data.icon}
              />
            ))}
          </div>

          {/* 2. Gráficos y Recordatorios */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Columna Izquierda (Gráficos Principales) */}
            <div className="lg:col-span-2 space-y-6">
              {/* Progreso y Retención (Fila 1) */}
              <CardContainer title="Progreso y Retención" className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                  {/* Gráfico Circular de Retención */}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Retención semanal (circular)</h3>
                    <PieChartPlaceholder data={PIE_CHART_DATA} title="Retención vs Pérdida" />
                  </div>
                  
                  {/* Gráfico de Barra de Temas Completados */}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Temas completados (barra)</h3>
                    <BarChartPlaceholder 
                      data={BAR_CHART_COMPLETADOS_DATA}
                      title="Temas Completados"
                      dataKey="Temas"
                      xAxisLabel="name"
                      barColor="#10b981" // Green
                    />
                  </div>
                </div>
              </CardContainer>

              {/* Tiempo de Estudio y Control (Fila 2) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Gráfico de Barra de Tiempo de Estudio */}
                <CardContainer title="Tiempo de estudio (barra)">
                  <BarChartPlaceholder 
                    data={BAR_CHART_TIEMPO_DATA}
                    title="Minutos de estudio por día"
                    dataKey="Minutos"
                    xAxisLabel="name"
                    barColor="#3b82f6" // Blue
                  />
                </CardContainer>

                {/* Control General (Summary View) */}
                <CardContainer title="Control general">
                  <div className="h-full flex flex-col justify-center items-center py-8">
                    <div className="w-24 h-24 rounded-full bg-blue-50 flex items-center justify-center mb-3">
                        <Target size={48} className="text-blue-600"/>
                    </div>
                    <p className="text-lg font-medium text-gray-700 mb-1">Objetivo Semanal: 6h</p>
                    <p className="text-2xl font-bold text-gray-900">Real: 6h 40m</p>
                    <p className="text-sm text-green-600 mt-2">¡Superaste tu meta!</p>
                  </div>
                </CardContainer>
              </div>
            </div>

            {/* Columna Derecha (Recordatorios y Sesiones) */}
            <div className="lg:col-span-1 space-y-6">
              {/* Recordatorios Inteligentes */}
              <CardContainer title="Recordatorios inteligentes" className="p-0">
                <div className="p-4">
                  {REMINDERS.map(reminder => (
                    <ReminderItem
                      key={reminder.id}
                      id={reminder.id}
                      title={reminder.title}
                      text={reminder.text}
                      action={reminder.action}
                      actionColor={reminder.actionColor}
                      icon={reminder.icon}
                      time={reminder.time}
                    />
                  ))}
                </div>
                <div className="text-right p-4 border-t">
                  <a href="#" className="text-blue-600 text-sm font-semibold hover:text-blue-700 transition flex items-center justify-end">
                    Ver todos <ArrowRight size={16} className="ml-1" />
                  </a>
                </div>
              </CardContainer>

              {/* Próximas Sesiones */}
              <CardContainer title="Próximas sesiones" className="p-0">
                <div className="p-4">
                  {UPCOMING_SESSIONS.map(session => (
                    <SessionItem
                      key={session.id}
                      id={session.id}  
                      title={session.title}
                      time={session.time}
                      action={session.action}
                      actionColor={session.actionColor}
                    />
                  ))}
                </div>
              </CardContainer>
            </div>
          </div>

        </main>
      </div>
      
    </div>
  );
};

export default App;
