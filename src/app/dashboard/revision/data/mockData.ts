export interface FlashcardData {
  id: number;
  question: string;
  answer: string;
  deck: string;
  topic: string;
  interval: string;
  easeFactor: number;
}

export interface DeckSummary {
  name: string;
  dueToday: number;
  tag: 'HS' | 'STEM' | 'Core' | 'Lang';
  tagColor: string;
}

export interface RepeatData {
  name: string;
  count: number;
}

export const MOCK_FLASHCARD: FlashcardData = {
  id: 1,
  question: "¿Cuál es la derivada de $f(x) = x^2$?",
  answer: "La derivada de $f(x) = x^2$ es $f'(x) = 2x$.",
  deck: "Cálculo",
  topic: "Derivadas",
  interval: "3 días",
  easeFactor: 0.28,
};

export const MOCK_DECKS: DeckSummary[] = [
  { name: "Biología", dueToday: 23, tag: 'HS', tagColor: 'bg-green-100 text-green-700' },
  { name: "Cálculo", dueToday: 12, tag: 'STEM', tagColor: 'bg-blue-100 text-blue-700' },
  { name: "Historia", dueToday: 8, tag: 'Core', tagColor: 'bg-indigo-100 text-indigo-700' },
  { name: "Vocabulario EN", dueToday: 15, tag: 'Lang', tagColor: 'bg-yellow-100 text-yellow-700' },
];

export const MOCK_REPEAT_DATA: RepeatData[] = [
  { name: 'Hoy', count: 12 },
  { name: 'Mañana', count: 20 },
  { name: '1d', count: 28 },
  { name: '3d', count: 16 },
  { name: '1s', count: 8 },
  { name: '2s', count: 4 },
];

export const BUTTON_RESPONSES = [
  { label: "Fácil", color: "bg-green-500 hover:bg-green-600", days: "4d" },
  { label: "Difícil", color: "bg-orange-500 hover:bg-orange-600", days: "1d" },
  { label: "Olvidé", color: "bg-red-500 hover:bg-red-600", days: "<1m" },
];
