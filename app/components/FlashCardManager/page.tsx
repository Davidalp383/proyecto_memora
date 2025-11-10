"use client";

import React, { useState, useEffect } from "react";

interface FlashcardManagerProps {
    deckId?: string;
    onCreateCard: (newCard: { front: string; back: string; deckId: string }) => void;
    currentUserId: string; // <-- nueva prop
    onCreateDeck?: (newDeck: DeckType) => void;
}

interface DeckType {
    id: string;
    name: string;
}

const FlashcardManager: React.FC<FlashcardManagerProps> = ({ deckId: initialDeckId, onCreateCard, currentUserId, onCreateDeck }) => {    
    const [front, setFront] = useState("");
    const [back, setBack] = useState("");
    const [deckId, setDeckId] = useState(initialDeckId || "");
    const [decks, setDecks] = useState<DeckType[]>([]);
    const [newDeckName, setNewDeckName] = useState("");
    const [feedback, setFeedback] = useState<{ message: string; type: "success" | "error" } | null>(null);

    // --- Cargar mazos desde la API ---
    useEffect(() => {
        async function loadDecks() {
            try {
                const res = await fetch("/api/decks");
                const data = await res.json();
                setDecks(data);
                if (!deckId && data.length > 0) setDeckId(data[0].id);
            } catch (err) {
                console.error("Error cargando mazos:", err);
            }
        }
        loadDecks();
    }, []);

    const handleCreateCard = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!front.trim() || !back.trim() || !deckId) {
        setFeedback({ message: "Completa todos los campos.", type: "error" });
        return;
    }

    try {
        const res = await fetch("/api/flashcards", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ front, back, deckId }),
        });
        if (!res.ok) throw new Error("Error al crear tarjeta");
        const card = await res.json();

        onCreateCard(card); // <-- pasar la tarjeta real con el ID de la DB
        setFront("");
        setBack("");
        setFeedback({ message: "¡Tarjeta creada exitosamente!", type: "success" });
        setTimeout(() => setFeedback(null), 3000);
    } catch (err) {
        console.error(err);
        setFeedback({ message: "Error al crear tarjeta.", type: "error" });
    }
};


const handleCreateDeck = async () => {
    if (!newDeckName.trim()) return;
    try {
        const res = await fetch("/api/decks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: newDeckName, userId: currentUserId })
        });
        if (!res.ok) throw new Error("Error creando mazo");
        const deck = await res.json();

        // 1️⃣ actualizar estado interno
        setDecks(prev => [...prev, deck]);
        setDeckId(deck.id);
        setNewDeckName("");

        // 2️⃣ notificar a RepetitionPage
        if (onCreateDeck) onCreateDeck({ ...deck, cardCount: 0 });
    } catch (err) {
        console.error(err);
    }
};


    return (
        <div className="w-full max-w-lg p-6 bg-white rounded-xl shadow-2xl border border-blue-200">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Crear Nueva Tarjeta</h2>

            {feedback && (
                <div
                    className={`p-3 mb-4 rounded-lg text-sm font-medium ${
                        feedback.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}
                    role="alert"
                >
                    {feedback.message}
                </div>
            )}

            <form onSubmit={handleCreateCard} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Frente</label>
                    <textarea
                        value={front}
                        onChange={(e) => setFront(e.target.value)}
                        rows={3}  
                        className="w-full p-3 border border-gray-300 rounded-lg text-black"
                        placeholder="Pregunta o término"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Reverso</label>
                    <textarea
                        value={back}
                        onChange={(e) => setBack(e.target.value)}
                        rows={3}
                        className="w-full p-3 text-black border border-gray-300 rounded-lg"
                        placeholder="Respuesta o definición"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-black-700 mb-1">Mazo</label>
                    <select
                        value={deckId}
                        onChange={(e) => setDeckId(e.target.value)}
                        className="w-full p-3 border border-gray-300 text-black rounded-lg"
                    >
                        {decks.map((d) => (
                            <option key={d.id} value={d.id}>
                                {d.name}
                            </option>
                        ))}
                    </select>
                    <div className="flex mt-2 space-x-2">
                        <input
                            type="text"
                            value={newDeckName}
                            onChange={(e) => setNewDeckName(e.target.value)}
                            placeholder="Nuevo mazo"
                            className="flex-1 p-2  border text-black border-gray-300 rounded-lg"
                        />
                        <button
                            type="button"
                            onClick={handleCreateDeck}
                            className="text-blacK px-4 py-2 bg-blue-600 text-white rounded-lg"
                        >
                            Crear
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full px-4 py-2 bg-green-500  text-white font-semibold rounded-lg hover:bg-green-600"
                >
                    Guardar Tarjeta
                </button>
            </form>
        </div>
    );
};

export default FlashcardManager;
