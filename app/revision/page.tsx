"use client";
import React, { useState, useCallback, useMemo, useEffect } from "react"; 
import { Repeat, Settings, Boxes, Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import FlashcardManager from "../components/FlashCardManager/page";

// --- TIPOS Y DATOS MOCK ---
type FlashcardType = { id: string; front: string; back: string; deckId: string; };
type DeckType = { id: string; name: string; cardCount: number; };
type RepeatDataType = { day: string; count: number; };

// --- COMPONENTES AUXILIARES ---

// ... (ProgressBar, Flashcard, ReviewCalendar, RepeatGraph permanecen igual) ...

const ProgressBar: React.FC<{ sessionCount: number; totalCount: number; timeElapsed: string; }> = ({ sessionCount, totalCount, timeElapsed }) => {
    const progress = (sessionCount / totalCount) * 100;
    return (
        <div className="flex items-center justify-between p-4 bg-white shadow-lg border-b border-gray-200">
            <div className="text-sm font-medium text-gray-700">Progreso de Sesión</div>
            <div className="flex-grow mx-4 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-2 bg-green-500 transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
            <div className="text-sm text-gray-500">{sessionCount}/{totalCount} ({timeElapsed})</div>
        </div>
    );
};

const Flashcard: React.FC<{ card: FlashcardType; onResponse: (response: string) => void; }> = ({ card, onResponse }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-[1.02]">
            <div 
                className={`p-8 h-80 flex flex-col justify-center items-center text-center cursor-pointer transition-all duration-500 transform ${isFlipped ? 'bg-green-50' : 'bg-indigo-50'}`}
                onClick={() => setIsFlipped(true)} // solo permite voltear
            >
                <p className="text-xl font-semibold text-gray-700 mb-4">{isFlipped ? "Respuesta" : "Pregunta"}</p>
                <div className="text-2xl font-bold text-gray-900 leading-relaxed">{isFlipped ? card.back : card.front}</div>
            </div>

            {/* Mostrar botones solo si la tarjeta está volteada */}
            {isFlipped && (
                <div className="p-4 bg-gray-100 flex justify-around">
                    <button onClick={() => onResponse("Difícil")} className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition shadow-md">Difícil</button>
                    <button onClick={() => onResponse("Intermedio")} className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition shadow-md">Intermedio</button>
                    <button onClick={() => onResponse("Fácil")} className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition shadow-md">Fácil</button>
                </div>
            )}
        </div>
    );
};


// --- CAMBIO CLAVE 3: DeckList modificado para ser interactivo ---
const DeckList: React.FC<{
    decks: DeckType[]; 
    selectedDeckId: string; 
    onSelectDeck: (id: string) => void; 
    onDeleteDeck: (id: string) => void; // <-- nueva prop
}> = ({ decks, selectedDeckId, onSelectDeck, onDeleteDeck }) => (
    <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100">
        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
            <Boxes size={20} className="mr-2 text-blue-500"/>Mazos de Estudio
        </h2>
        <ul className="space-y-2">
            {decks.map(deck => (
                <li
                    key={deck.id}
                    className={`flex justify-between items-center p-2 rounded-lg transition ${
                        selectedDeckId === deck.id ? 'bg-blue-100 ring-2 ring-blue-500' : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                >
                    <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onSelectDeck(deck.id)}>
                        <span className="text-sm font-medium text-gray-700">{deck.name}</span>
                        <span className="text-xs text-blue-500 bg-blue-100 px-2 py-0.5 rounded-full">{deck.cardCount}</span>
                    </div>
                    <button 
                        onClick={(e) => { e.stopPropagation(); onDeleteDeck(deck.id); }}
                        className="p-1 text-red-500 hover:text-red-700 transition"
                        title="Eliminar mazo"
                    >
                        <X size={16}/>
                    </button>
                </li>
            ))}
        </ul>
    </div>
);


const ReviewCalendar: React.FC = () => (
    <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Calendario de Repaso</h2>
        <div className="grid grid-cols-7 gap-1 text-center text-xs">
            {['D', 'L', 'M', 'X', 'J', 'V', 'S'].map(day => <div key={day} className="font-semibold text-gray-500">{day}</div>)}
            {Array.from({ length: 28 }).map((_, i) => (
                <div key={i} className={`h-8 flex items-center justify-center rounded-md ${i % 5 === 0 ? 'bg-green-500 text-white font-bold' : 'bg-gray-100 text-gray-600'}`}>{i + 1}</div>
            ))}
        </div>
    </div>
);

const RepeatGraph: React.FC<{ data: RepeatDataType[]; }> = ({ data }) => (
    <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Repeticiones Semanales</h2>
        <div className="flex h-32 items-end space-x-2">
            {data.map(item => (
                <div key={item.day} className="flex flex-col items-center flex-grow">
                    <div className="w-4 bg-blue-500 rounded-t-lg transition-all duration-500 hover:bg-blue-600" style={{ height: `${item.count / 250 * 100}%` }} title={`${item.count} repeticiones`}></div>
                    <span className="text-xs mt-1 text-gray-500">{item.day}</span>
                </div>
            ))}
        </div>
    </div>
);


// --- COMPONENTE PRINCIPAL ---
const RepetitionPage: React.FC = () => {
    const [decks, setDecks] = useState<DeckType[]>([]);
    const [currentUserId, setCurrentUserId] = useState<string>("");
    const [allCards, setAllCards] = useState<FlashcardType[]>([]);
    const [repeatData, setRepeatData] = useState<RepeatDataType[]>([]);
    const [mode, setMode] = useState<'review'|'create'>('review');
    const [sessionCount, setSessionCount] = useState(21);
    const totalCount = 50 + allCards.length;
    const timeElapsed = "12:45";
    const router = useRouter();

    // --- CAMBIO CLAVE 1: Estado para el mazo seleccionado ---
    const [selectedDeckId, setSelectedDeckId] = useState<string>("");

    useEffect(() => {
    let userId = localStorage.getItem("userId");
        if (!userId) {
            userId = crypto.randomUUID(); // genera un ID único
            localStorage.setItem("userId", userId);
        }
        setCurrentUserId(userId); // guarda en el estado
    }, []);


    useEffect(() => {
    async function loadDecks() {
        try {
            const res = await fetch("/api/decks");
            const data = await res.json();
            setDecks(data);

            // Selecciona automáticamente el primer mazo si existe
            if (data.length > 0) setSelectedDeckId(data[0].id);
        } catch (err) {
            console.error("Error cargando mazos:", err);
        }
    }

    async function loadCards() {
        try {
            const res = await fetch("/api/flashcards");
            const data = await res.json();
            setAllCards(data);
        } catch (err) {
            console.error("Error cargando tarjetas:", err);
        }
    }

    async function loadRepeatData() {
        // Por ahora aún usamos el mock del gráfico
        setRepeatData([
            { day: "Lun", count: 120 }, { day: "Mar", count: 180 }, { day: "Mié", count: 150 },
            { day: "Jue", count: 220 }, { day: "Vie", count: 200 }, { day: "Sáb", count: 100 },
            { day: "Dom", count: 50 },
        ]);
    }

        loadDecks();
        loadCards();
        loadRepeatData();
    }, []);


    // --- CAMBIO CLAVE 2: Filtrar tarjetas según el mazo seleccionado ---
    const filteredCards = useMemo(
    () => allCards?.filter(card => card.deckId === selectedDeckId) || [],
    [allCards, selectedDeckId]
    );

    const handleDeckCreate = (newDeck: DeckType) => {
    setDecks(prev => [...prev, newDeck]);
    setSelectedDeckId(newDeck.id); // selecciona el nuevo mazo automáticamente
    };

    const [currentIndex, setCurrentIndex] = useState(0);

    const currentCard = useMemo(() => filteredCards[currentIndex] || null, [filteredCards, currentIndex]);

    const handleCardResponse = useCallback((response: string) => {
        // Aquí podrías enviar la respuesta a tu API si quieres
        console.log("Respuesta de la tarjeta:", response);

        setSessionCount(prev => (prev < totalCount ? prev + 1 : prev));

        // Avanzar al siguiente índice
        setCurrentIndex(prev => {
            const nextIndex = prev + 1;
            return nextIndex >= filteredCards.length ? 0 : nextIndex; // vuelve al inicio si termina
        });
    }, [totalCount, filteredCards.length]);
    
    const handleCardCreate = useCallback((newCardData:Omit<FlashcardType,'id'>)=> {
        const newCard: FlashcardType = { ...newCardData, id:`new-card-${Date.now()}` };
        
        // 1. Agregar la tarjeta a todas las tarjetas
        setAllCards(prev => [newCard, ...prev]);
        
        // 2. Actualizar el conteo del mazo correspondiente
        setDecks(prevDecks => prevDecks.map(deck => deck.id===newCard.deckId ? {...deck, cardCount:deck.cardCount+1}:deck));

    },[]);

    const handleDeleteDeck = async (deckId: string) => {
        if (!confirm("¿Seguro que quieres eliminar este mazo?")) return;

        try {
            const res = await fetch(`/api/decks/${deckId}`, { method: "DELETE" });
            if (!res.ok) throw new Error("No se pudo eliminar el mazo");
            setDecks(prev => prev.filter(deck => deck.id !== deckId));
            if (selectedDeckId === deckId && decks.length > 0) {
            setSelectedDeckId(decks[0].id);
            }
        } catch (err) {
            console.error(err);
            alert("Error eliminando el mazo");
        }
        };



    const toggleMode = ()=> setMode(prev=>prev==='review'?'create':'review');
    const buttonIcon = mode==='review'?Plus:X;
    const buttonText = mode==='review'?'Crear Tarjeta':'Cerrar Creación';
    const buttonClass = mode==='review'?"bg-blue-600 hover:bg-blue-700":"bg-red-500 hover:bg-red-600";

    return (
        <div className="min-h-screen bg-gray-50 font-sans antialiased">
            <ProgressBar sessionCount={sessionCount} totalCount={totalCount} timeElapsed={timeElapsed} />
            <header className="flex justify-between items-center p-6 bg-white border-b border-gray-200 shadow-md">
                <div className="flex items-center text-2xl font-bold text-green-600"><Repeat size={24} className="mr-2"/>Spaced Review</div>
                <div className="flex items-center space-x-4">
                    <button onClick={toggleMode} className={`flex items-center px-4 py-2 text-white rounded-xl shadow-lg ${buttonClass}`}>
                        {React.createElement(buttonIcon,{size:20,className:"mr-2"})}{buttonText}
                    </button>
                    <button onClick={()=>router.push("/register")} className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-xl shadow hover:bg-gray-300 transition">← Dashboard</button>
                    <button className="hidden sm:flex items-center text-gray-600 hover:text-blue-600 transition"><Settings size={20} className="mr-1"/> Configuración</button>
                </div>
            </header>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-6 max-w-7xl mx-auto">
                {/* --- USO DECKLIST INTERACTIVO --- */}
                <div className="lg:col-span-1">
                    <DeckList 
                        decks={decks} 
                        selectedDeckId={selectedDeckId} 
                        onSelectDeck={setSelectedDeckId} 
                        onDeleteDeck={handleDeleteDeck}
                    />
                </div>
                {/* --- RENDERIZADO CONDICIONAL DE TARJETA / MANAGER --- */}
                <div className="lg:col-span-2 flex justify-center items-start pt-8 min-h-[400px]">
                    {mode === 'review' 
                        ? currentCard
                        ? <Flashcard key={currentCard.id} card={currentCard} onResponse={handleCardResponse} />
                        : <p className="text-gray-500 text-center">No hay tarjetas disponibles en este mazo.</p>
                        : <FlashcardManager
                            deckId={selectedDeckId}
                            onCreateCard={handleCardCreate}
                            currentUserId={currentUserId}
                            onCreateDeck={(newDeck) => {
                            setDecks(prev => [...prev, { ...newDeck, cardCount: 0 }]); 
                            setSelectedDeckId(newDeck.id);
                            }}
                        />
                    }
                </div>
                <div className="lg:col-span-1 space-y-6"><ReviewCalendar /><RepeatGraph data={repeatData}/></div>
            </div>
        </div>
    );
};

export default RepetitionPage;