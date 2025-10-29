"use client";
 
import { useRouter } from 'next/navigation';
import React, { useState, useCallback } from 'react';
// Íconos de Lucide React
import { Star, Trophy, Target, TrendingUp, Zap, Clock, User, Users, ClipboardList, CheckCircle, Award, Feather, Sparkles, Sun, HardHat, Calendar } from 'lucide-react';

// --- INTERFACES DE TYPESCRIPT ---

type Tab = 'Mis Logros' | 'Ranking';
type ChallengeType = 'Diario' | 'Semanal';

interface UserXP {
  level: number;
  xpCurrent: number;
  xpNextLevel: number;
}

interface Badge {
  id: number;
  title: string;
  description: string;
  icon: React.FC<any>; // Icono del componente
  iconColor: string; // Tailwind color class
  isHighlighted: boolean;
}

interface Streak {
  id: number;
  title: string;
  progressText: string;
  currentValue: number;
  targetValue: number;
  icon: React.FC<any>;
}

interface Challenge {
  id: number;
  title: string;
  type: ChallengeType;
  description: string;
  reward: string;
  joinable: boolean;
}

interface RankingUser {
  id: number;
  name: string;
  xp: number;
  rank: number;
  isCurrentUser: boolean;
  avatarUrl: string;
}

interface AchievementSummary {
  badges: number;
  level: number;
  currentStreak: number;
  maxStreak: number;
}

// --- MOCK DATA EN ESPAÑOL ---

const MOCK_XP: UserXP = {
  level: 7,
  xpCurrent: 1240,
  xpNextLevel: 2000,
};

const MOCK_BADGES: Badge[] = [
  { id: 1, title: "Maestro de Rachas", description: "7 días seguidos", icon: Zap, iconColor: 'bg-green-500', isHighlighted: true },
  { id: 2, title: "Explosión de Foco", description: "5 ciclos en un día", icon: Target, iconColor: 'bg-blue-500', isHighlighted: true },
  { id: 3, title: "Constante", description: "30 tarjetas/día", icon: CheckCircle, iconColor: 'bg-violet-500', isHighlighted: true },
  { id: 4, title: "Madrugador", description: "Inicio antes de 8AM", icon: Sun, iconColor: 'bg-yellow-500', isHighlighted: false },
  { id: 5, title: "Guerrero", description: "100 ciclos Pomodoro", icon: HardHat, iconColor: 'bg-red-500', isHighlighted: false },
];

const MOCK_STREAKS: Streak[] = [
  { id: 1, title: "Semana perfecta", progressText: "Estudia 7/7 días", currentValue: 5, targetValue: 7, icon: Calendar },
  { id: 2, title: "Meta diaria", progressText: "Completa 3 ciclos", currentValue: 2, targetValue: 3, icon: Clock },
];

const MOCK_CHALLENGES: Challenge[] = [
  { id: 1, title: "Mañanas productivas", type: 'Diario', description: "2 ciclos antes de las 10AM", reward: "50 XP", joinable: true },
  { id: 2, title: "Maratón de tarjetas", type: 'Semanal', description: "200 tarjetas esta semana", reward: "Insignia dorada", joinable: true },
  { id: 3, title: "Fórmulas matemáticas", type: 'Diario', description: "Repasa 50 fórmulas", reward: "25 XP", joinable: false },
];

const MOCK_RANKING: RankingUser[] = [
  { id: 1, name: "Ana", xp: 3280, rank: 1, isCurrentUser: false, avatarUrl: "https://placehold.co/40x40/fbcfe8/be185d?text=A" },
  { id: 2, name: "Luis", xp: 2960, rank: 2, isCurrentUser: false, avatarUrl: "https://placehold.co/40x40/bfdbfe/1d4ed8?text=L" },
  { id: 3, name: "Marta", xp: 2840, rank: 3, isCurrentUser: false, avatarUrl: "https://placehold.co/40x40/d1d5db/374151?text=M" },
  { id: 4, name: "Tú", xp: 2600, rank: 4, isCurrentUser: true, avatarUrl: "https://placehold.co/40x40/a78bfa/ffffff?text=Y" },
  { id: 5, name: "Carlos", xp: 2400, rank: 5, isCurrentUser: false, avatarUrl: "https://placehold.co/40x40/fecaca/b91c1c?text=C" },
];

const MOCK_SUMMARY: AchievementSummary = {
  badges: 12,
  level: 7,
  currentStreak: 5,
  maxStreak: 22,
};

// --- COMPONENTES ---

// Nivel y barra de progreso
const LevelProgress: React.FC<{ xp: UserXP }> = ({ xp }) => {
  const progressPercentage = (xp.xpCurrent / xp.xpNextLevel) * 100;
  const xpRemaining = xp.xpNextLevel - xp.xpCurrent;

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-violet-500">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800">Nivel y progreso</h3>
        <span className="text-2xl font-extrabold text-violet-600 flex items-center">
          <Trophy size={24} className="mr-1" /> Nivel {xp.level}
        </span>
      </div>

      <div className="text-sm font-medium text-gray-600 mb-2">
        XP: {xp.xpCurrent} / {xp.xpNextLevel}
      </div>
      
      {/* Barra de Progreso */}
      <div className="h-2 bg-gray-200 rounded-full mb-2">
        <div 
          className="h-2 bg-violet-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      <p className="text-xs text-gray-500">
        {progressPercentage.toFixed(0)}% completado &bull; {xpRemaining} XP restantes
      </p>
    </div>
  );
};

// Tarjeta de Insignia Destacada
const BadgeCard: React.FC<{ badge: Badge }> = ({ badge }) => {
  const Icon = badge.icon;
  return (
    <div 
      className={`p-4 rounded-xl text-center shadow-md border-b-4 ${badge.iconColor.replace('bg', 'border')}`}
      style={{ backgroundColor: `${badge.iconColor.replace('500', '100')}` }}
    >
      <div className={`w-12 h-12 ${badge.iconColor} rounded-full mx-auto flex items-center justify-center mb-2 text-white shadow-lg`}>
        <Icon size={24} />
      </div>
      <p className="font-bold text-gray-800 text-sm leading-tight">{badge.title}</p>
      <p className="text-xs text-gray-600 mt-1">{badge.description}</p>
    </div>
  );
};

// Resumen de Insignias y Rachas
const AchivementSummaryCard: React.FC<{ summary: AchievementSummary }> = ({ summary }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-emerald-500">
    <h3 className="text-xl font-bold text-gray-800 mb-4">Resumen de logros</h3>
    <div className="grid grid-cols-2 gap-4 text-center">
      <div className="bg-gray-50 p-3 rounded-lg">
        <p className="text-3xl font-extrabold text-violet-600">{summary.badges}</p>
        <p className="text-sm font-medium text-gray-600">Insignias</p>
      </div>
      <div className="bg-gray-50 p-3 rounded-lg">
        <p className="text-3xl font-extrabold text-violet-600">{summary.level}</p>
        <p className="text-sm font-medium text-gray-600">Nivel</p>
      </div>
      <div className="bg-gray-50 p-3 rounded-lg">
        <p className="text-3xl font-extrabold text-emerald-600">{summary.currentStreak}</p>
        <p className="text-sm font-medium text-gray-600">Racha actual</p>
      </div>
      <div className="bg-gray-50 p-3 rounded-lg">
        <p className="text-3xl font-extrabold text-emerald-600">{summary.maxStreak}</p>
        <p className="text-sm font-medium text-gray-600">Máx. racha</p>
      </div>
    </div>
    <p className="text-xs text-gray-500 mt-4 text-center">Completa desafíos para ganar XP y subir de nivel más rápido.</p>
  </div>
);

// Tarjeta de Racha/Meta de Estudio
const StreakCard: React.FC<{ streak: Streak }> = ({ streak }) => {
  const Icon = streak.icon;
  const progressPercent = (streak.currentValue / streak.targetValue) * 100;
  const isCompleted = streak.currentValue >= streak.targetValue;

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-emerald-500 flex justify-between items-center">
      <div className="flex items-start">
        <Icon size={24} className="text-emerald-500 flex-shrink-0 mr-3 mt-1" />
        <div>
          <h4 className="font-bold text-gray-800 mb-1">{streak.title}</h4>
          <p className="text-sm text-gray-600">{streak.progressText}</p>
          <div className="w-24 h-1 bg-gray-200 rounded-full mt-2">
            <div 
              className={`h-1 rounded-full ${isCompleted ? 'bg-green-500' : 'bg-emerald-500'}`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">Progreso: {streak.currentValue}/{streak.targetValue}</p>
        </div>
      </div>
      <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition flex-shrink-0">
        Detalles
      </button>
    </div>
  );
};

// Tarjeta de Desafío Diario/Semanal
const ChallengeCard: React.FC<{ challenge: Challenge }> = ({ challenge }) => {
  const typeColor = challenge.type === 'Diario' ? 'bg-yellow-100 text-yellow-800' : 'bg-pink-100 text-pink-800';

  return (
    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
      <div>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${typeColor} mb-1 block w-fit`}>
          {challenge.type}
        </span>
        <h4 className="font-bold text-gray-800">{challenge.title}</h4>
        <p className="text-sm text-gray-600">{challenge.description}</p>
        <p className="text-xs text-violet-600 font-medium mt-1">Recompensa: {challenge.reward}</p>
      </div>
      {challenge.joinable ? (
        <button className="px-3 py-1 text-sm font-bold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 transition flex-shrink-0">
          Unirme
        </button>
      ) : (
        <span className="text-sm text-green-600 font-semibold flex items-center flex-shrink-0">
          <CheckCircle size={18} className="mr-1" /> Completado
        </span>
      )}
    </div>
  );
};

// Panel de Clasificación (Ranking)
const RankingPanel: React.FC<{ users: RankingUser[] }> = ({ users }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500">
    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
      <Users size={20} className="mr-2 text-blue-500" />
      Panel de clasificación
    </h3>
    <ul className="space-y-3">
      {users.map(user => (
        <li
          key={user.id}
          className={`flex justify-between items-center p-3 rounded-xl transition ${user.isCurrentUser ? 'bg-violet-50 border-2 border-violet-500' : 'bg-gray-50 hover:bg-gray-100'}`}
        >
          <div className="flex items-center space-x-3">
            <span className={`text-lg font-extrabold w-6 text-center ${user.rank <= 3 ? 'text-yellow-500' : 'text-gray-500'}`}>{user.rank}</span>
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className={`font-semibold ${user.isCurrentUser ? 'text-violet-700' : 'text-gray-800'}`}>{user.name} {user.isCurrentUser && '(Tú)'}</span>
          </div>
          <span className="text-xl font-bold text-gray-700">{user.xp} XP</span>
        </li>
      ))}
    </ul>
  </div>
);

// --- COMPONENTE PRINCIPAL: GamificationPage ---
const GamificationPage: React.FC = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('Mis Logros');

  const highlightedBadges = MOCK_BADGES.filter(b => b.isHighlighted);

  const handleTabChange = useCallback((tab: Tab) => {
    setActiveTab(tab);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased p-6">
      
      {/* Encabezado */}
      <header className="flex justify-between items-center mb-6 border-b pb-4">
        <div className="flex items-center text-3xl font-extrabold text-gray-900">
          <Award size={30} className="mr-2 text-violet-500" />
          Gamificación
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => handleTabChange('Mis Logros')}
            className={`px-4 py-2 font-bold rounded-xl transition ${activeTab === 'Mis Logros' ? 'bg-violet-600 text-white shadow-lg' : 'text-gray-600 hover:bg-gray-200'}`}
          >
            <Star size={18} className="inline mr-1" /> Mis Logros
          </button>
          <button 
            onClick={() => handleTabChange('Ranking')}
            className={`px-4 py-2 font-bold rounded-xl transition ${activeTab === 'Ranking' ? 'bg-violet-600 text-white shadow-lg' : 'text-gray-600 hover:bg-gray-200'}`}
          >
            <Users size={18} className="inline mr-1" /> Ranking
          </button>
        </div>
      </header>


      {/* Navegación y Contenido */}
      <div className="space-y-6">
        
        {/* Pestañas de Navegación */}
        <div className="flex space-x-3">
            <button 
                onClick={() => handleTabChange('Mis Logros')}
                className={`text-lg font-bold pb-2 border-b-2 transition duration-200 ${activeTab === 'Mis Logros' ? 'border-violet-600 text-violet-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
                Mis Logros
            </button>
            <button 
                onClick={() => handleTabChange('Ranking')}
                className={`text-lg font-bold pb-2 border-b-2 transition duration-200 ${activeTab === 'Ranking' ? 'border-violet-600 text-violet-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
                Ranking
            </button>
            <button
            onClick={() => router.push('/register')}
            className="px-4 py-2 font-bold rounded-xl bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
          >
            ← Volver al Dashboard
          </button>

        </div>

        {/* CONTENIDO DE PESTAÑA */}

        {activeTab === 'Mis Logros' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Columna Izquierda/Central: Insignias, Rachas y Desafíos */}
            <div className="lg:col-span-2 space-y-6">

              {/* 1. Nivel y Progreso */}
              <LevelProgress xp={MOCK_XP} />

              {/* 2. Insignias Destacadas */}
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-800 flex items-center">
                        <Star size={20} className="mr-2 text-yellow-500" />
                        Insignias destacadas
                    </h3>
                    <span className="text-sm font-medium text-blue-600 flex items-center hover:text-blue-700 cursor-pointer">
                        <Award size={16} className="mr-1" /> {MOCK_BADGES.length} Insignias
                    </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {highlightedBadges.map(badge => (
                    <BadgeCard key={badge.id} badge={badge} />
                  ))}
                </div>
              </div>

              {/* 3. Rachas de Estudio */}
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 rounded-xl bg-gray-100">
                    <h3 className="text-xl font-bold text-gray-800">Rachas de estudio</h3>
                    <span className="text-sm font-bold text-emerald-600 flex items-center">
                        <Zap size={18} className="mr-1" /> Racha actual: {MOCK_SUMMARY.currentStreak}
                    </span>
                </div>
                {MOCK_STREAKS.map(streak => (
                    <StreakCard key={streak.id} streak={streak} />
                ))}
              </div>
            </div>
            
            {/* Columna Derecha: Resumen y Desafíos */}
            <div className="lg:col-span-1 space-y-6">
              
              {/* Resumen de Logros */}
              <AchivementSummaryCard summary={MOCK_SUMMARY} />

              {/* Desafíos Diarios y Semanales */}
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-800 flex items-center">
                        <ClipboardList size={20} className="mr-2 text-violet-500" />
                        Desafíos
                    </h3>
                    <span className="text-sm font-medium text-blue-600 hover:text-blue-700 cursor-pointer">
                        Diarios &amp; Semanales
                    </span>
                </div>
                <div className="space-y-4">
                  {MOCK_CHALLENGES.map(challenge => (
                    <ChallengeCard key={challenge.id} challenge={challenge} />
                  ))}
                </div>
              </div>

              {/* Espacio para Logro Especial/Meta */}
              <div className="p-6 bg-yellow-50 rounded-xl shadow-lg border-2 border-dashed border-yellow-300 text-center">
                <Sparkles size={30} className="text-yellow-600 mx-auto mb-2" />
                <p className="font-bold text-yellow-800">¡Casi Nivel 8!</p>
                <p className="text-sm text-yellow-700">Solo te faltan 760 XP para el siguiente nivel.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Ranking' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* El Ranking ocupa dos tercios de la pantalla para destacarse */}
            <div className="lg:col-span-2">
                <RankingPanel users={MOCK_RANKING} />
            </div>
            {/* Resumen de Logros en la columna derecha para contexto */}
            <div className="lg:col-span-1">
                 <AchivementSummaryCard summary={MOCK_SUMMARY} />
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default GamificationPage;
