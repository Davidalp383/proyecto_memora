"use client";

import React, { useState, useEffect, useCallback, useMemo } from 'react';
// Íconos de Lucide React
import { Clock, Play, Pause, RotateCcw, Settings, History, CheckCircle, Target, Sun, Moon } from 'lucide-react';
import { useRouter } from 'next/navigation';
// --- INTERFACES DE TYPESCRIPT ---

type SessionType = 'Trabajo' | 'Descanso Corto' | 'Descanso Largo';

interface PomodoroConfig {
  workMinutes: number;
  shortBreakMinutes: number;
  longBreakMinutes: number;
  cyclesBeforeLongBreak: number;
  sound: 'Campana suave' | 'Electrónico' | 'Silencio';
  autoStart: boolean;
}

interface SessionHistory {
  id: number;
  type: SessionType;
  durationMinutes: number;
  completedAt: string;
  isCompleted: boolean;
}

// --- MOCK DATA EN ESPAÑOL ---

const INITIAL_CONFIG: PomodoroConfig = {
  workMinutes: 25,
  shortBreakMinutes: 5,
  longBreakMinutes: 15,
  cyclesBeforeLongBreak: 4,
  sound: 'Campana suave',
  autoStart: false,
};

const MOCK_HISTORY: SessionHistory[] = [
  { id: 1, type: 'Trabajo', durationMinutes: 25, completedAt: 'Hoy - 2:05 PM', isCompleted: true },
  { id: 2, type: 'Descanso Corto', durationMinutes: 5, completedAt: 'Hoy - 1:55 PM', isCompleted: true },
  { id: 3, type: 'Trabajo', durationMinutes: 25, completedAt: 'Ayer - 4:30 PM', isCompleted: true },
  { id: 4, type: 'Trabajo', durationMinutes: 25, completedAt: 'Ayer - 3:40 PM', isCompleted: true },
];

const MOCK_STATS = {
  cyclesToday: 3,
  focusMinutesToday: 60,
  cyclesThisWeek: 8,
  focusRatio: 92, // %
  currentStreak: 3, // días
};

// --- UTILIDADES ---

/**
 * Convierte segundos a formato MM:SS
 */
const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const pad = (num: number) => num.toString().padStart(2, '0');
  return `${pad(minutes)}:${pad(remainingSeconds)}`;
};

/**
 * Calcula el porcentaje de progreso para el temporizador circular.
 */
const calculateProgress = (time: number, total: number): number => {
  if (total === 0) return 0;
  // El progreso debe ir de 0% (inicio) a 100% (final)
  return 100 - (time / total) * 100;
};

// --- COMPONENTES DE VISTA ---

// Componente Temporizador Circular
interface TimerCircleProps {
  timeInSeconds: number;
  totalTime: number;
  sessionType: SessionType;
  isRunning: boolean;
}

const TimerCircle: React.FC<TimerCircleProps> = ({ timeInSeconds, totalTime, sessionType }) => {
  const progress = calculateProgress(timeInSeconds, totalTime);

  // Determinar color y texto de la sesión
  const sessionColor = sessionType === 'Trabajo' ? 'text-red-600' : 'text-green-600';
  const ringColor = sessionType === 'Trabajo' ? 'border-red-500' : 'border-green-500';
  const bgColor = sessionType === 'Trabajo' ? 'bg-red-50' : 'bg-green-50';
  const totalMinutes = Math.floor(totalTime / 60);


  return (
    <div className={`flex flex-col items-center justify-center p-8 rounded-xl shadow-2xl ${bgColor} transition-colors duration-500`}>
      <div className={`px-4 py-1 mb-6 text-sm font-bold rounded-full border border-current ${sessionColor}`}>
        {sessionType === 'Trabajo' ? 'Sesión de trabajo' : sessionType} ({totalMinutes}m)
      </div>

      <div className="relative w-72 h-72">
        <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
          {/* Fondo del círculo */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#e0e0e0"
            strokeWidth="5"
          />
          {/* Círculo de progreso */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={sessionType === 'Trabajo' ? '#ef4444' : '#10b981'} // Rojo/Verde
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 45} // 282.74
            strokeDashoffset={(100 - progress) * (2 * Math.PI * 45) / 100}
            style={{ transition: 'stroke-dashoffset 1s linear' }}
          />
        </svg>

        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
          <span className="text-6xl font-extrabold text-gray-900">{formatTime(timeInSeconds)}</span>
        </div>
      </div>

      <p className="text-gray-500 mt-4 text-sm">Foco en tu tarea actual</p>
    </div>
  );
};

// Componente Tarjeta de Estadísticas
const StatCard: React.FC<{ title: string, value: string | number, color: string }> = ({ title, value, color }) => (
  <div className={`p-4 rounded-xl shadow-md ${color} text-white font-semibold flex flex-col items-center justify-center`}>
    <div className="text-3xl">{value}</div>
    <div className="text-sm font-medium">{title}</div>
  </div>
);

// Componente para la Configuración de Intervalos
const IntervalConfiguration: React.FC<{ config: PomodoroConfig, setConfig: React.Dispatch<React.SetStateAction<PomodoroConfig>> }> = ({ config, setConfig }) => {
  // Opciones predefinidas
  const minuteOptions = Array.from({ length: 12 }, (_, i) => (i + 1) * 5); // 5, 10, 15, ... 60
  const cycleOptions = [1, 2, 3, 4, 5, 6];
  const soundOptions: PomodoroConfig['sound'][] = ['Campana suave', 'Electrónico', 'Silencio'];

  const handleChange = useCallback((key: keyof PomodoroConfig, value: number | string | boolean) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  }, [setConfig]);

  const SelectInput: React.FC<{ label: string, value: any, options: any[], onChange: (value: any) => void }> = ({ label, value, options, onChange }) => (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="p-2 border border-gray-300 rounded-lg bg-white focus:ring-red-500 focus:border-red-500 transition"
      >
        {options.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-red-400">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <Settings size={20} className="mr-2 text-red-500" />
        Configuración de intervalos
      </h3>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        <SelectInput
          label="Trabajo (min)"
          value={config.workMinutes}
          options={minuteOptions}
          onChange={(v) => handleChange('workMinutes', parseInt(v as string))}
        />
        <SelectInput
          label="Descanso corto (min)"
          value={config.shortBreakMinutes}
          options={minuteOptions.slice(0, 5)} // 5, 10, 15, 20, 25
          onChange={(v) => handleChange('shortBreakMinutes', parseInt(v as string))}
        />
        <SelectInput
          label="Descanso largo (min)"
          value={config.longBreakMinutes}
          options={minuteOptions.slice(2)} // 15, 20, ... 60
          onChange={(v) => handleChange('longBreakMinutes', parseInt(v as string))}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <SelectInput
          label="Ciclos antes de descanso largo"
          value={config.cyclesBeforeLongBreak}
          options={cycleOptions}
          onChange={(v) => handleChange('cyclesBeforeLongBreak', parseInt(v as string))}
        />
        <SelectInput
          label="Sonido"
          value={config.sound}
          options={soundOptions}
          onChange={(v) => handleChange('sound', v)}
        />
        <div className="flex items-center pt-6">
          <input
            id="auto-start"
            type="checkbox"
            checked={config.autoStart}
            onChange={(e) => handleChange('autoStart', e.target.checked)}
            className="h-5 w-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
          />
          <label htmlFor="auto-start" className="ml-2 text-sm font-medium text-gray-700">Auto-inicio</label>
        </div>
      </div>
    </div>
  );
};

// Componente Principal: Módulo Pomodoro
const PomodoroApp: React.FC = () => {
  const router = useRouter()
  const [config, setConfig] = useState<PomodoroConfig>(INITIAL_CONFIG);
  const [sessionType, setSessionType] = useState<SessionType>('Trabajo');
  const [isRunning, setIsRunning] = useState(false);
  const [cyclesCompleted, setCyclesCompleted] = useState(0);

  // Determinar el tiempo inicial basado en el tipo de sesión
  const initialTime = useMemo(() => {
    switch (sessionType) {
      case 'Trabajo':
        return config.workMinutes * 60;
      case 'Descanso Corto':
        return config.shortBreakMinutes * 60;
      case 'Descanso Largo':
        return config.longBreakMinutes * 60;
      default:
        return config.workMinutes * 60;
    }
  }, [sessionType, config]);

  const [timeInSeconds, setTimeInSeconds] = useState(initialTime);

  // Efecto para sincronizar el tiempo al cambiar la configuración o sesión
  useEffect(() => {
    setTimeInSeconds(initialTime);
  }, [initialTime]);

  // Lógica principal del temporizador
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (isRunning && timeInSeconds > 0) {
      timer = setInterval(() => {
        setTimeInSeconds(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeInSeconds === 0) {
      setIsRunning(false);
      handleSessionEnd();
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, timeInSeconds]);

  // Manejo del fin de sesión
  const handleSessionEnd = useCallback(() => {
    let nextSessionType: SessionType;
    let newCyclesCompleted = cyclesCompleted;

    if (sessionType === 'Trabajo') {
      newCyclesCompleted++;
      setCyclesCompleted(newCyclesCompleted);
      
      // Determinar si es un descanso largo o corto
      if (newCyclesCompleted % config.cyclesBeforeLongBreak === 0) {
        nextSessionType = 'Descanso Largo';
      } else {
        nextSessionType = 'Descanso Corto';
      }
    } else {
      // Después de cualquier descanso, vuelve al trabajo
      nextSessionType = 'Trabajo';
    }

    // Simular notificación o sonido
    console.log(`¡Sesión de ${sessionType} terminada!`);
    
    // Transicionar a la siguiente sesión
    setSessionType(nextSessionType);
    
    // Auto-inicio si está configurado
    if (config.autoStart) {
      // El useEffect de sincronización se encarga de setTimeInSeconds
      setIsRunning(true);
    }

  }, [sessionType, cyclesCompleted, config]);

  const handleStartPause = () => setIsRunning(prev => !prev);

  const handleReset = () => {
    setIsRunning(false);
    setTimeInSeconds(initialTime);
  };

  const handleNextSession = () => {
    setIsRunning(false);
    // Simular que el usuario salta la sesión actual (se puede mejorar la lógica de ciclos)
    handleSessionEnd(); 
  };
  
  // Botones de control
  const controlButtons = useMemo(() => (
    <div className="flex space-x-4 w-full justify-center mt-6">
      <button
        onClick={handleStartPause}
        className={`px-6 py-3 rounded-xl text-white font-bold text-lg shadow-lg transition-all duration-200 transform hover:scale-[1.02] ${isRunning ? 'bg-orange-500 hover:bg-orange-600' : 'bg-red-500 hover:bg-red-600'}`}
      >
        {isRunning ? <><Pause size={20} className="inline mr-2" /> Pausar</> : <><Play size={20} className="inline mr-2" /> Iniciar</>}
      </button>
      <button
        onClick={handleReset}
        className="px-6 py-3 bg-gray-300 text-gray-800 font-bold rounded-xl shadow-md hover:bg-gray-400 transition-all duration-200"
      >
        <RotateCcw size={20} className="inline mr-2" />
        Reiniciar
      </button>
      <button
        onClick={handleNextSession}
        className="px-6 py-3 bg-blue-300 text-blue-800 font-bold rounded-xl shadow-md hover:bg-blue-400 transition-all duration-200"
      >
        Siguiente
      </button>
    </div>
  ), [isRunning, handleStartPause, handleReset, handleNextSession]);


  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased p-6">
      
      {/* Encabezado */}
      <header className="flex justify-between items-center mb-6 border-b pb-4">
        <div className="flex items-center text-3xl font-extrabold text-gray-900">
          <Clock size={30} className="mr-2 text-red-500" />
          Pomodoro
        </div>
        <div className="flex space-x-4">
          <button className="flex items-center text-gray-600 hover:text-red-600 font-medium transition">
            <History size={20} className="mr-1" /> Historial
          </button>
          <button className="flex items-center text-gray-600 hover:text-red-600 font-medium transition">
            <Target size={20} className="mr-1" /> Logros
          </button>
          <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100 transition">
            <Settings size={20} />
          </button>
        </div>
      </header>

      {/* Botón para volver al Dashboard */}
      <div className="mb-6">
        <button
          onClick={() => router.push('/register')}
          className="flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
        >
          ← Volver al Dashboard
        </button>
      </div>


      {/* Contenido Principal (Temporizador + Stats) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Columna Izquierda/Central: Temporizador y Configuración */}
        <div className="lg:col-span-2 space-y-6 flex flex-col items-center">
          
          {/* Temporizador Central Grande */}
          <TimerCircle 
            timeInSeconds={timeInSeconds} 
            totalTime={initialTime} 
            sessionType={sessionType} 
            isRunning={isRunning}
          />
          
          {/* Botones de Control */}
          {controlButtons}

          {/* Área de Configuración (Debajo del Temporizador) */}
          <div className="w-full max-w-xl pt-8">
            <IntervalConfiguration config={config} setConfig={setConfig} />
          </div>
        </div>

        {/* Columna Derecha: Estadísticas e Historial */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Tarjetas de Estadísticas */}
          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-red-500">
             <h3 className="text-xl font-bold text-gray-800 mb-4">Estadísticas</h3>
            <div className="grid grid-cols-2 gap-4">
              <StatCard title="Ciclos hoy" value={MOCK_STATS.cyclesToday} color="bg-red-500" />
              <StatCard title="Foco total (min)" value={MOCK_STATS.focusMinutesToday} color="bg-red-400" />
              <StatCard title="Ciclos semana" value={MOCK_STATS.cyclesThisWeek} color="bg-orange-500" />
              <StatCard title="Ratio de foco" value={`${MOCK_STATS.focusRatio}%`} color="bg-orange-400" />
            </div>
          </div>
          
          {/* Historial de Sesiones */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <History size={20} className="mr-2 text-red-500" />
              Historial de sesiones
            </h3>
            <div className="space-y-3">
              {MOCK_HISTORY.map(session => (
                <div key={session.id} className="flex justify-between items-center p-3 rounded-lg bg-gray-50 border-l-4 border-gray-300">
                  <div className="flex items-center space-x-2">
                    {session.type === 'Trabajo' ? <Sun size={18} className="text-red-500" /> : <Moon size={18} className="text-green-500" />}
                    <div>
                      <p className="font-semibold text-gray-800">{session.type} - {session.durationMinutes}m</p>
                      <p className="text-xs text-gray-500">{session.completedAt}</p>
                    </div>
                  </div>
                  <CheckCircle size={20} className="text-green-500">
                    <title>Completado</title>
                </CheckCircle>

                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-4 text-center">Las sesiones se sincronizan con tu calendario.</p>
          </div>

          {/* Logros */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <Target size={20} className="mr-2 text-red-500" />
              Logros
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 rounded-lg bg-yellow-50 text-yellow-800 font-medium">
                Primera sesión <span className="text-xs bg-yellow-400 text-white px-2 py-0.5 rounded-full">+1</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-green-50 text-green-800 font-medium">
                Racha de 3 días <span className="text-xs bg-green-400 text-white px-2 py-0.5 rounded-full">Activo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PomodoroApp;
