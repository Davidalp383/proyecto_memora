"use client";

import React, { useState, useCallback } from 'react';
// Íconos de Lucide React
import { User, Globe, Bell, Settings, TrendingUp, Download, Sun, Moon, Palette, Camera, Upload, Trash2 } from 'lucide-react';

// --- INTERFACES DE TYPESCRIPT ---

type Tab = 'Perfil' | 'Idioma y Tema' | 'Notificaciones' | 'Historial';

interface UserProfile {
  name: string;
  studyGoal: string;
  description: string;
  photoUrl: string;
}

interface DisplaySettings {
  language: string;
  region: string;
  theme: 'Claro' | 'Oscuro';
  accent: 'Azul' | 'Verde' | 'Violeta';
}

interface NotificationPreferences {
  smartReminders: boolean;
  pushEnabled: boolean;
  emailEnabled: boolean;
  calendarEnabled: boolean;
}

// --- MOCK DATA EN ESPAÑOL ---

const MOCK_PROFILE: UserProfile = {
  name: "Tu nombre aquí",
  studyGoal: "Ej: 2 horas diarias / Preparar examen",
  description: "Cuenta brevemente tu enfoque y materias prioritarias...",
  photoUrl: "https://placehold.co/100x100/a78bfa/ffffff?text=U", // Placeholder con color de acento
};

const MOCK_DISPLAY: DisplaySettings = {
    language: 'Español (ES)',
    region: 'América Latina',
    theme: 'Claro',
    accent: 'Azul',
};

const MOCK_NOTIFS: NotificationPreferences = {
    smartReminders: true,
    pushEnabled: true,
    emailEnabled: true,
    calendarEnabled: false,
};

const MOCK_DOWNLOAD_OPTIONS = {
    range: 'Últimos 90 días',
    format: 'CSV',
    detail: 'Sesiones y tarjetas',
};


// --- COMPONENTES ---

// Componente para los títulos de sección
const SectionTitle: React.FC<{ icon: React.FC<any>, title: string, color: string }> = ({ icon: Icon, title, color }) => (
    <div className={`flex items-center text-xl font-bold text-gray-800 mb-5 border-b pb-2 ${color}`}>
        <Icon size={22} className={`mr-2 ${color.replace('border-b-4', 'text')}`} />
        {title}
    </div>
);

// Componente Botón de Pestaña
const TabButton: React.FC<{ tab: Tab, activeTab: Tab, onClick: (tab: Tab) => void }> = ({ tab, activeTab, onClick }) => (
    <button 
        onClick={() => onClick(tab)}
        className={`px-6 py-3 font-bold rounded-t-xl transition duration-200 text-lg ${
            activeTab === tab
                ? 'bg-white text-blue-600 border-b-4 border-blue-600 shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
        }`}
    >
        {tab}
    </button>
);


// --- PANELS DE CONTENIDO ---

// 1. Panel de Perfil
const ProfilePanel: React.FC<{ profile: UserProfile, onUpdate: (p: UserProfile) => void }> = ({ profile, onUpdate }) => {
    
    // Simulación de manejo de formulario
    const [currentProfile, setCurrentProfile] = useState<UserProfile>(profile);

    const handleChange = (field: keyof UserProfile, value: string) => {
        setCurrentProfile(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        onUpdate(currentProfile);
        alert('Perfil guardado (simulación)'); // Usar un modal real en una app productiva
    };

    return (
        <div className="space-y-6">
            <SectionTitle icon={User} title="Información básica del perfil" color="text-blue-600" />
            
            {/* Nombre y Objetivo */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Nombre</label>
                    <input 
                        type="text" 
                        value={currentProfile.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        className="p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
                        placeholder="Tu nombre aquí"
                    />
                </div>
                 <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Objetivo de estudio</label>
                    <input 
                        type="text" 
                        value={currentProfile.studyGoal}
                        onChange={(e) => handleChange('studyGoal', e.target.value)}
                        className="p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
                        placeholder="Ej: 2 horas diarias / Preparar examen"
                    />
                </div>
            </div>

            {/* Descripción */}
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Descripción breve</label>
                <textarea 
                    value={currentProfile.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition h-24"
                    placeholder="Cuenta brevemente tu enfoque y materias prioritarias..."
                />
            </div>
            
            {/* Foto de Perfil */}
            <div className="flex items-center space-x-6 pt-4">
                <img 
                    src={currentProfile.photoUrl} 
                    alt="Foto de perfil" 
                    className="w-24 h-24 rounded-full object-cover shadow-lg border-2 border-blue-300" 
                />
                <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Foto de perfil</p>
                    <div className="flex space-x-3">
                        <button className="px-3 py-2 text-sm font-semibold bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center">
                            <Upload size={16} className="mr-1" /> Subir
                        </button>
                        <button className="px-3 py-2 text-sm font-semibold bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition flex items-center">
                            <Trash2 size={16} className="mr-1" /> Quitar
                        </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Recomendado: 400x400px &bull; JPG o PNG</p>
                </div>
            </div>

             {/* Botones de acción */}
            <div className="flex justify-end space-x-4 pt-6 border-t mt-8">
                <button className="px-6 py-2 font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition">
                    Cancelar
                </button>
                <button onClick={handleSave} className="px-6 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition shadow-lg">
                    Guardar cambios
                </button>
            </div>
        </div>
    );
};

// 2. Panel de Idioma y Tema
const DisplayPanel: React.FC<{ display: DisplaySettings, onUpdate: (d: DisplaySettings) => void }> = ({ display, onUpdate }) => {
    
    const [currentDisplay, setCurrentDisplay] = useState<DisplaySettings>(display);

    const handleThemeChange = (theme: 'Claro' | 'Oscuro') => {
        setCurrentDisplay(prev => ({ ...prev, theme }));
        // Aquí se aplicaría el cambio de tema a la app
    };
    
    const handleAccentChange = (accent: 'Azul' | 'Verde' | 'Violeta') => {
        setCurrentDisplay(prev => ({ ...prev, accent }));
        // Aquí se aplicaría el cambio de color de acento
    };

    const handleSave = () => {
        onUpdate(currentDisplay);
        alert('Ajustes de pantalla guardados (simulación)');
    };
    
    const ACCENTS: DisplaySettings['accent'][] = ['Azul', 'Verde', 'Violeta'];


    return (
        <div className="space-y-6">
            <SectionTitle icon={Globe} title="Idioma y personalización visual" color="text-blue-600" />
            
            {/* Idioma y Región */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Idioma</label>
                    <select
                        value={currentDisplay.language}
                        onChange={(e) => setCurrentDisplay(prev => ({ ...prev, language: e.target.value }))}
                        className="p-3 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 transition"
                    >
                        <option>Español (ES)</option>
                        <option>English (US)</option>
                    </select>
                </div>
                 <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Región</label>
                    <select
                        value={currentDisplay.region}
                        onChange={(e) => setCurrentDisplay(prev => ({ ...prev, region: e.target.value }))}
                        className="p-3 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 transition"
                    >
                        <option>América Latina</option>
                        <option>España</option>
                        <option>Estados Unidos</option>
                    </select>
                </div>
            </div>

            {/* Tema Visual */}
            <div>
                 <label className="text-sm font-medium text-gray-700 mb-2 block">Tema visual</label>
                <div className="flex space-x-2 p-1 bg-gray-100 rounded-xl w-fit border">
                    <button 
                        onClick={() => handleThemeChange('Claro')}
                        className={`px-4 py-2 text-sm font-semibold rounded-lg transition flex items-center ${currentDisplay.theme === 'Claro' ? 'bg-white shadow-md text-gray-800' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        <Sun size={18} className="mr-1" /> Claro
                    </button>
                    <button 
                        onClick={() => handleThemeChange('Oscuro')}
                        className={`px-4 py-2 text-sm font-semibold rounded-lg transition flex items-center ${currentDisplay.theme === 'Oscuro' ? 'bg-gray-800 shadow-md text-white' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        <Moon size={18} className="mr-1" /> Oscuro
                    </button>
                </div>
            </div>
            
            {/* Color de Acento */}
            <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Color de acento</label>
                <div className="flex space-x-4">
                    {ACCENTS.map(accent => (
                        <button
                            key={accent}
                            onClick={() => handleAccentChange(accent)}
                            className={`p-1 rounded-full border-2 transition ${currentDisplay.accent === accent ? 'border-gray-500 ring-2 ring-offset-2' : 'border-transparent'}`}
                            style={{ 
                                borderColor: currentDisplay.accent === accent ? '#000' : 'transparent',
                                backgroundColor: accent === 'Azul' ? '#3b82f6' : accent === 'Verde' ? '#10b981' : '#8b5cf6'
                            }}
                        >
                            <div className="w-8 h-8 rounded-full shadow-md" />
                        </button>
                    ))}
                </div>
            </div>
            
            {/* Botones de acción */}
            <div className="flex justify-end space-x-4 pt-6 border-t mt-8">
                <button className="px-6 py-2 font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition">
                    Cancelar
                </button>
                <button onClick={handleSave} className="px-6 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition shadow-lg">
                    Guardar ajustes
                </button>
            </div>
        </div>
    );
};

// 3. Panel de Notificaciones
const NotificationsPanel: React.FC<{ notifs: NotificationPreferences, onUpdate: (n: NotificationPreferences) => void }> = ({ notifs, onUpdate }) => {
    
    const [currentNotifs, setCurrentNotifs] = useState<NotificationPreferences>(notifs);

    const handleToggle = (field: keyof NotificationPreferences, enabled: boolean) => {
        setCurrentNotifs(prev => ({ ...prev, [field]: enabled }));
    };

    const handleSave = () => {
        onUpdate(currentNotifs);
        alert('Preferencias de notificación guardadas (simulación)');
    };

    const ToggleSwitch: React.FC<{ label: string, description: string, checked: boolean, onChange: (enabled: boolean) => void }> = ({ label, description, checked, onChange }) => (
        <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <div className="flex flex-col flex-1 mr-4">
                <p className="font-semibold text-gray-700">{label}</p>
                <p className="text-sm text-gray-500">{description}</p>
            </div>
            
            {/* Toggle Switch */}
            <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                    className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
        </div>
    );

    return (
        <div className="space-y-6">
            <SectionTitle icon={Bell} title="Preferencias de notificación" color="text-blue-600" />
            
            <ToggleSwitch
                label="Recordatorios inteligentes"
                description="Basados en curva de olvido y hábitos de estudio (altamente recomendado)"
                checked={currentNotifs.smartReminders}
                onChange={(e) => handleToggle('smartReminders', e)}
            />
            
            <div className="pt-4">
                <p className="font-bold text-gray-700 mb-3">Canales de alerta</p>
                <div className="bg-gray-50 p-4 rounded-xl space-y-3">
                    <ToggleSwitch
                        label="Notificaciones Push (Móvil/Web)"
                        description="Alertas en tiempo real directamente en tu dispositivo"
                        checked={currentNotifs.pushEnabled}
                        onChange={(e) => handleToggle('pushEnabled', e)}
                    />
                    <ToggleSwitch
                        label="Correo electrónico"
                        description="Resumen diario y alertas importantes para repasar"
                        checked={currentNotifs.emailEnabled}
                        onChange={(e) => handleToggle('emailEnabled', e)}
                    />
                    <ToggleSwitch
                        label="Integración con Calendario"
                        description="Añade sesiones planificadas a Google/Apple/Outlook"
                        checked={currentNotifs.calendarEnabled}
                        onChange={(e) => handleToggle('calendarEnabled', e)}
                    />
                </div>
            </div>

            {/* Botones de acción */}
            <div className="flex justify-end space-x-4 pt-6 border-t mt-8">
                <button className="px-6 py-2 font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition">
                    Cancelar
                </button>
                <button onClick={handleSave} className="px-6 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition shadow-lg">
                    Guardar preferencias
                </button>
            </div>
        </div>
    );
};

// 4. Panel de Historial
const HistoryPanel: React.FC = () => {
    
    // Simulación de opciones de descarga
    const [downloadOptions, setDownloadOptions] = useState(MOCK_DOWNLOAD_OPTIONS);

    const handleDownload = () => {
        alert(`Descargando historial con las siguientes opciones: Rango: ${downloadOptions.range}, Formato: ${downloadOptions.format}, Detalle: ${downloadOptions.detail}`);
    };

    const handleChange = (field: keyof typeof MOCK_DOWNLOAD_OPTIONS, value: string) => {
        setDownloadOptions(prev => ({ ...prev, [field]: value }));
    };

    const progressValue = downloadOptions.range === 'Últimos 90 días' ? 75 : 100;

    return (
        <div className="space-y-6">
            <SectionTitle icon={TrendingUp} title="Historial de progreso y datos" color="text-blue-600" />
            
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                 <h4 className="font-bold text-gray-800 mb-4">Exportar mis datos de estudio</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-1">Rango</label>
                        <select
                            value={downloadOptions.range}
                            onChange={(e) => handleChange('range', e.target.value)}
                            className="p-3 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 transition"
                        >
                            <option>Últimos 30 días</option>
                            <option>Últimos 90 días</option>
                            <option>Último año</option>
                            <option>Todo el historial</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-1">Formato</label>
                        <select
                            value={downloadOptions.format}
                            onChange={(e) => handleChange('format', e.target.value)}
                            className="p-3 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 transition"
                        >
                            <option>CSV</option>
                            <option>JSON</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-1">Detalle</label>
                        <select
                            value={downloadOptions.detail}
                            onChange={(e) => handleChange('detail', e.target.value)}
                            className="p-3 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 transition"
                        >
                            <option>Sesiones y tarjetas</option>
                            <option>Solo tarjetas repasadas</option>
                            <option>Rachas y niveles</option>
                        </select>
                    </div>
                </div>

                {/* Barra de Simulación de Progreso de Descarga */}
                <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-1">Progreso de exportación de datos:</p>
                    <div className="h-2 bg-gray-200 rounded-full">
                        <div 
                            className="h-2 bg-blue-500 rounded-full transition-all duration-500"
                            style={{ width: `${progressValue}%` }}
                        />
                    </div>
                </div>

                <p className="text-xs text-gray-500 mb-6">Incluye rachas, niveles, sesiones Pomodoro y rendimiento en tarjetas.</p>
                
                <div className="flex justify-end">
                    <button onClick={handleDownload} className="px-6 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition shadow-lg flex items-center">
                        <Download size={20} className="mr-2" /> Descargar
                    </button>
                </div>
            </div>
            
            {/* Sección de Integración */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h4 className="font-bold text-gray-800 mb-4">Integración y API</h4>
                <p className="text-gray-600 mb-4">Conecta StudyFlow con otras herramientas de productividad.</p>
                <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                     <span className="font-semibold text-gray-700">Clave de API</span>
                     <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition">
                        Generar nueva clave
                     </button>
                </div>
            </div>
        </div>
    );
};


// --- COMPONENTE PRINCIPAL: UserSettingsPage ---
const UserSettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('Perfil');
  
  // Estados de datos (simulados)
  const [profile, setProfile] = useState<UserProfile>(MOCK_PROFILE);
  const [display, setDisplay] = useState<DisplaySettings>(MOCK_DISPLAY);
  const [notifs, setNotifs] = useState<NotificationPreferences>(MOCK_NOTIFS);

  const renderContent = useCallback(() => {
    switch (activeTab) {
      case 'Perfil':
        return <ProfilePanel profile={profile} onUpdate={setProfile} />;
      case 'Idioma y Tema':
        return <DisplayPanel display={display} onUpdate={setDisplay} />;
      case 'Notificaciones':
        return <NotificationsPanel notifs={notifs} onUpdate={setNotifs} />;
      case 'Historial':
        return <HistoryPanel />;
      default:
        return <ProfilePanel profile={profile} onUpdate={setProfile} />;
    }
  }, [activeTab, profile, display, notifs]);

    const handleBack = () => {
        window.history.back();
    };

  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased p-6">
      
      {/* Encabezado Principal */}
      <header className="flex justify-between items-center mb-8 border-b pb-4">
        <div className="flex items-center text-3xl font-extrabold text-gray-900">
          <Settings size={30} className="mr-2 text-blue-600" />
          Módulo de Configuración del Usuario
        </div>
        <div className="text-sm text-gray-500 flex items-center">
            <span className="font-semibold mr-1">Estilo:</span> Profesional <span className="mx-2">•</span> <span className="font-semibold mr-1">Acento:</span> Azul
        </div>
        <button 
            onClick={handleBack} 
            className="flex items-center text-gray-600 hover:text-gray-900 transition mr-4"
        >
            ← Volver
        </button>
      </header>

      {/* Pestañas de Navegación */}
      <div className="flex space-x-1 mb-8">
        <TabButton tab="Perfil" activeTab={activeTab} onClick={setActiveTab} />
        <TabButton tab="Idioma y Tema" activeTab={activeTab} onClick={setActiveTab} />
        <TabButton tab="Notificaciones" activeTab={activeTab} onClick={setActiveTab} />
        <TabButton tab="Historial" activeTab={activeTab} onClick={setActiveTab} />
      </div>

      {/* Contenido de la Pestaña Activa */}
      <div className="bg-white p-8 rounded-xl shadow-2xl">
        {renderContent()}
      </div>

    </div>
  );
};

export default UserSettingsPage;
