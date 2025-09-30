export type Answer = 'A' | 'B' | 'C';
export type ProfileId = 1 | 2 | 3 | 4 | 5 | 6;

// Ponderación por pregunta (coherente con el copy del quiz)
const QUESTION_SCORES: Array<Record<Answer, number>> = [
  { A: 2.0, B: 1.0, C: 0.5 }, // Q1
  { A: 2.0, B: 1.5, C: 0.5 }, // Q2
  { A: 2.0, B: 1.0, C: 0.5 }, // Q3
  { A: 2.0, B: 1.5, C: 0.5 }, // Q4
  { A: 2.0, B: 1.0, C: 0.5 }, // Q5
];

export function calculateScore(answers: Answer[]): number {
  return answers.reduce((sum, ans, i) => sum + (QUESTION_SCORES[i]?.[ans] ?? 0), 0);
}

// Rango total posible: 2.5–10.0 (pasos de 0.5)
export type Threshold = { id: ProfileId; min: number; max: number };
export const PROFILE_THRESHOLDS: Threshold[] = [
  { id: 1, min: 9.0, max: 10.0 },  // Organizada
  { id: 2, min: 8.0, max: 8.5 },   // Precavida
  { id: 3, min: 6.5, max: 7.5 },   // Apurada
  { id: 4, min: 5.0,  max: 6.0 },  // Creativa
  { id: 5, min: 3.5,  max: 4.5 },  // Improvisada
  { id: 6, min: 2.5,  max: 3.0 },  // Pasota
];

export function classifyProfile(score: number): ProfileId {
  const s = Math.round(score * 2) / 2; // normaliza a paso 0.5
  const t = PROFILE_THRESHOLDS.find(tr => s >= tr.min && s <= tr.max);
  if (t) return t.id;

  // Failsafes (por si se cambian preguntas en el futuro)
  if (s > 10) return 1;
  if (s < 2.5) return 6;
  if (s > 8.5 && s < 9.0) return 2; // 8.6–8.9
  if (s > 7.5 && s < 8.0) return 3; // 7.6–7.9
  return 4;
}

export function scoreColor(score: number): string {
  const s = Math.round(score * 2) / 2;
  if (s >= 9.0) return 'text-green-600';
  if (s >= 8.0) return 'text-blue-600';
  if (s >= 6.5) return 'text-indigo-600';
  if (s >= 5.0) return 'text-purple-600';
  if (s >= 3.5) return 'text-orange-600';
  return 'text-red-600';
}

export function evaluationMessage(score: number): string {
  const s = Math.round(score * 2) / 2;
  if (s >= 9.0) return '¡Excelente nivel de organización fiscal!';
  if (s >= 8.0) return 'Muy buen nivel de planificación y precaución';
  if (s >= 6.5) return 'Buen nivel pero con tendencia a la urgencia';
  if (s >= 5.0) return 'Enfoque creativo que necesita más estructura';
  if (s >= 3.5) return 'Necesitas apoyo para mejorar tu organización';
  return 'Necesitas apoyo profesional urgente';
}