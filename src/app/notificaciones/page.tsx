"use client";

import React, { useState, useCallback } from 'react';
// Íconos de Lucide React
import { Bell, Mail, Clock, Calendar, CheckSquare, Settings, Check, Zap, Archive, Globe, Smartphone, BellOff, ListTodo, ChevronRight, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

// --- INTERFACES DE TYPESCRIPT ---

type NotificationType = 'Repaso' | 'Pomodoro' | 'Gamificación' | 'Calendario' | 'Correo';
type AlertChannel = 'Correo' | 'Push' | 'Calendario';

interface NotificationItem {
  id: number;
  title: string;
  description: string;
  type: NotificationType;
  timeAgo: string;
  isRecommended: boolean;
  isCompleted: boolean;
  icon: React.FC<any>; // Icono del componente
  iconColor: string; // Tailwind color class
}

interface AlertSetting {
  channel: AlertChannel;
  description: string;
  isEnabled: boolean;
}

// --- MOCK DATA EN ESPAÑOL ---

const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 1,
    title: "Repasar tarjetas: Álgebra - 1A",
    description: "Óptimo por curva del olvido",
    type: 'Repaso',
    timeAgo: 'hace 5 min',
    isRecommended: true,
    isCompleted: false,
    icon: Clock,
    iconColor: 'text-blue-600 bg-blue-100',
  },
  {
    id: 2,
    title: "Inicia un Pomodoro de 25 min",
    description: "Mejor franja según tu productividad matutina",
    type: 'Pomodoro',
    timeAgo: 'hace 10 min',
    isRecommended: true,
    isCompleted: true,
    icon: Zap,
    iconColor: 'text-red-600 bg-red-100',
  },
  {
    id: 3,
    title: "Recordatorio: Ranking semanal cierra hoy",
    description: "Suma puntos repasando 10 tarjetas",
    type: 'Gamificación',
    timeAgo: 'hace 30 min',
    isRecommended: false,
    isCompleted: false,
    icon: Globe,
    iconColor: 'text-violet-600 bg-violet-100',
  },
  {
    id: 4,
    title: "Sesión planificada: 19:00",
    description: "Añadida a tu calendario",
    type: 'Calendario',
    timeAgo: 'hace 1 hora',
    isRecommended: false,
    isCompleted: false,
    icon: Calendar,
    iconColor: 'text-emerald-600 bg-emerald-100',
  },
  {
    id: 5,
    title: "Resumen diario enviado",
    description: "Correo con avance y próximos repasos",
    type: 'Correo',
    timeAgo: 'hace 2 horas',
    isRecommended: false,
    isCompleted: false,
    icon: Mail,
    iconColor: 'text-yellow-600 bg-yellow-100',
  },
];

const INITIAL_ALERT_SETTINGS: AlertSetting[] = [
    { channel: 'Correo', description: 'Resumen diario y alertas importantes', isEnabled: true },
    { channel: 'Push', description: 'Recordatorios en tiempo real', isEnabled: true },
    { channel: 'Calendario', description: 'Integración Google/Apple/Outlook', isEnabled: false },
];

// --- COMPONENTES DE VISTA ---

// Tarjeta Individual de Notificación
const NotificationCard: React.FC<{ item: NotificationItem, onComplete: (id: number) => void }> = ({ item, onComplete }) => {
  const Icon = item.icon;
  const isRecommended = item.isRecommended;

  return (
    <div className={`p-4 rounded-xl shadow-sm transition-all duration-300 border ${item.isCompleted ? 'bg-gray-50 border-gray-200' : 'bg-white border-blue-100 hover:shadow-md'}`}>
      <div className="flex justify-between items-start">
        <div className="flex items-start space-x-3 flex-1">
          {/* Ícono de la notificación */}
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${item.iconColor} flex-shrink-0 mt-1`}>
            <Icon size={18} />
          </div>
          
          {/* Contenido */}
          <div className="min-w-0">
            <h4 className={`font-bold ${item.isCompleted ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
              {item.title}
            </h4>
            <div className="flex items-center text-sm text-gray-500 mt-1 space-x-2">
                <span className="truncate">{item.description}</span>
                {isRecommended && (
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-500 text-white flex-shrink-0">
                        Óptimo
                    </span>
                )}
            </div>
            <p className="text-xs text-gray-400 mt-1">{item.timeAgo}</p>
          </div>
        </div>
        
        {/* Botón de acción */}
        <div className="flex-shrink-0 ml-4">
          {!item.isCompleted && (
            <button
              onClick={() => onComplete(item.id)}
              className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition flex items-center"
            >
              <Check size={16} className="mr-1" />
              Completar
            </button>
          )}
          {item.isCompleted && (
            <span className="text-sm font-semibold text-green-600 flex items-center mt-2">
              <CheckCircle size={18} className="mr-1" /> Hecho
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

// Configuración de Alertas
const AlertSettings: React.FC<{ settings: AlertSetting[], onToggle: (channel: AlertChannel, enabled: boolean) => void }> = ({ settings, onToggle }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-400">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Settings size={20} className="mr-2 text-blue-600" />
                Configuración de alertas
            </h3>
            
            <div className="space-y-4 mb-6">
                {settings.map(setting => (
                    <div key={setting.channel} className="flex justify-between items-center py-2 border-b last:border-b-0">
                        <div className="flex flex-col">
                            <p className="font-semibold text-gray-700 flex items-center">
                                {setting.channel === 'Correo' && <Mail size={18} className="mr-2 text-yellow-500" />}
                                {setting.channel === 'Push' && <Smartphone size={18} className="mr-2 text-blue-500" />}
                                {setting.channel === 'Calendario' && <Calendar size={18} className="mr-2 text-emerald-500" />}
                                {setting.channel} electrónico
                            </p>
                            <p className="text-sm text-gray-500">{setting.description}</p>
                        </div>
                        
                        {/* Toggle Switch */}
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                value=""
                                className="sr-only peer"
                                checked={setting.isEnabled}
                                onChange={(e) => onToggle(setting.channel, e.target.checked)}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                ))}
            </div>

            {/* Ventana Preferida */}
             <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center mb-2">
                    <p className="font-semibold text-gray-700">Ventana preferida: 07:00–21:00</p>
                    <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center">
                        Ajustar <ChevronRight size={16} />
                    </button>
                </div>
                <div className="flex justify-between items-center">
                    <p className="font-semibold text-gray-700">Intensidad: Equilibrada</p>
                     <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center">
                        Cambiar <ChevronRight size={16} />
                    </button>
                </div>
            </div>

            <p className="text-xs text-gray-500 mt-6 pt-4 border-t border-gray-100">
                Consejo: Marca como completado para optimizar futuras recomendaciones.
            </p>
        </div>
    );
};

// --- COMPONENTE PRINCIPAL: NotificationsPage ---
const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);
  const [alertSettings, setAlertSettings] = useState<AlertSetting[]>(INITIAL_ALERT_SETTINGS);
  const [activeTab, setActiveTab] = useState<'Bandeja' | 'Recomendado' | 'Configuración'>('Bandeja');
  
  const recommendedNotifications = notifications.filter(n => n.isRecommended && !n.isCompleted);
  const inboxNotifications = notifications.filter(n => !n.isRecommended);

  const handleCompleteNotification = useCallback((id: number) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, isCompleted: true } : n)
    );
    console.log(`Notificación ${id} marcada como completada.`);
  }, []);

  const handleToggleAlert = useCallback((channel: AlertChannel, enabled: boolean) => {
    setAlertSettings(prev => 
      prev.map(s => s.channel === channel ? { ...s, isEnabled: enabled } : s)
    );
    console.log(`Alerta de ${channel} cambiada a ${enabled ? 'Activada' : 'Desactivada'}.`);
  }, []);

  const handleArchiveAll = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, isCompleted: true })));
    console.log("Todas las notificaciones marcadas como completadas.");
  }, []);
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased p-6">
      
      {/* Encabezado Principal */}
      <header className="flex justify-between items-center mb-8 border-b pb-4">
        <div className="flex items-center text-3xl font-extrabold text-gray-900">
          <Bell size={30} className="mr-2 text-blue-600" />
          Notificaciones Inteligentes
        </div>
        <button
            onClick={() => router.push("/register")}
            className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition flex items-center font-semibold"
          >
            <ChevronRight size={18} className="rotate-180 mr-1" />
            Volver
          </button>
        <button 
            onClick={handleArchiveAll}
            className="px-4 py-2 font-bold text-white bg-blue-600 rounded-xl shadow-lg hover:bg-blue-700 transition flex items-center"
          >
            <CheckSquare size={20} className="mr-2" />
            Marcar todo como hecho
        </button>
      </header>

      {/* Contenido Principal (Pestañas) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Columna Izquierda (Bandeja y Recomendados) */}
        <div className="lg:col-span-2 space-y-6">
            
            {/* Navegación de pestañas */}
            <div className="flex space-x-3 mb-4 p-1 bg-white rounded-xl shadow-sm border">
                <button 
                    onClick={() => setActiveTab('Bandeja')}
                    className={`px-4 py-2 font-bold rounded-lg transition text-sm ${activeTab === 'Bandeja' ? 'bg-blue-500 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                    <ListTodo size={16} className="inline mr-1" /> Bandeja ({notifications.filter(n => !n.isCompleted).length})
                </button>
                 <button 
                    onClick={() => setActiveTab('Recomendado')}
                    className={`px-4 py-2 font-bold rounded-lg transition text-sm ${activeTab === 'Recomendado' ? 'bg-blue-500 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                    <Zap size={16} className="inline mr-1" /> Recomendado
                </button>
                 <button 
                    onClick={() => setActiveTab('Configuración')}
                    className={`px-4 py-2 font-bold rounded-lg transition text-sm ${activeTab === 'Configuración' ? 'bg-blue-500 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                    <Settings size={16} className="inline mr-1" /> Configuración
                </button>
            </div>

            {/* Renderizar contenido basado en la pestaña activa */}
            {activeTab === 'Bandeja' && (
                <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">Bandeja de entrada</h3>
                    {inboxNotifications.length > 0 ? (
                        inboxNotifications.map(item => (
                            <NotificationCard key={item.id} item={item} onComplete={handleCompleteNotification} />
                        ))
                    ) : (
                        <p className="text-gray-500 p-8 bg-white rounded-xl text-center">No tienes notificaciones en tu bandeja. ¡Todo listo!</p>
                    )}
                </div>
            )}
            
            {activeTab === 'Recomendado' && (
                <div className="space-y-4">
                     <h3 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">Recomendado ahora</h3>
                    {recommendedNotifications.length > 0 ? (
                        recommendedNotifications.map(item => (
                            <NotificationCard key={item.id} item={item} onComplete={handleCompleteNotification} />
                        ))
                    ) : (
                        <p className="text-gray-500 p-8 bg-white rounded-xl text-center">No hay recomendaciones inteligentes en este momento. ¡Sigue tu plan!</p>
                    )}
                </div>
            )}
            
            {activeTab === 'Configuración' && (
                 <AlertSettings settings={alertSettings} onToggle={handleToggleAlert} />
            )}
        </div>

        {/* Columna Derecha (Resumen/Acciones Fijas) */}
        <div className="lg:col-span-1 space-y-6">
            
            {/* Resumen Fijo (Siempre visible) */}
            <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-600">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <ListTodo size={20} className="mr-2 text-blue-600" />
                    Pendientes de Hoy
                </h3>
                <ul className="space-y-3 text-gray-700">
                    <li className="flex items-center justify-between text-sm">
                        <span className="font-medium">Tarjetas a repasar:</span>
                        <span className="font-bold text-red-600">12 pendientes</span>
                    </li>
                    <li className="flex items-center justify-between text-sm">
                        <span className="font-medium">Ciclos Pomodoro:</span>
                        <span className="font-bold text-green-600">3 completados</span>
                    </li>
                     <li className="flex items-center justify-between text-sm">
                        <span className="font-medium">Desafío semanal:</span>
                        <span className="font-bold text-blue-600">80% progreso</span>
                    </li>
                </ul>
                <p className="text-xs text-gray-500 mt-4 pt-4 border-t">Completa las tareas para obtener la Racha Diaria.</p>
            </div>
            
            {/* Botón de Archivar todo */}
            <button 
              onClick={handleArchiveAll}
              className="w-full py-3 text-lg font-bold text-gray-700 bg-gray-200 rounded-xl hover:bg-gray-300 transition flex items-center justify-center shadow-md"
            >
              <Archive size={20} className="mr-2" />
              Archivar todo
            </button>
            
            {/* Notificación de preferencia */}
            <div className="p-4 rounded-xl bg-blue-50 border-2 border-blue-200 text-blue-800 text-sm">
                <p className="font-bold flex items-center">
                    <BellOff size={18} className="mr-2" />
                    Modo Silencioso
                </p>
                <p className="mt-1">
                    Recuerda que puedes cambiar la intensidad de las alertas en la sección de Configuración.
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
