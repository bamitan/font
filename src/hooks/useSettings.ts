import { useReducer } from 'react';

export interface SettingsState {
  text: string;
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
  fontWeight: number;
  columns: number; // 1-4
  category: string; // '' = all
}

export type SettingsAction =
  | { type: 'setText'; payload: string }
  | { type: 'fontSize'; payload: number }
  | { type: 'lineHeight'; payload: number }
  | { type: 'letterSpacing'; payload: number }
  | { type: 'fontWeight'; payload: number }
  | { type: 'columns'; payload: number }
  | { type: 'category'; payload: string };

const initialState: SettingsState = {
  text: 'The quick brown fox jumps over the lazy dog.\n素早い茶色の狐は寝ている犬を飛び越えた。',
  fontSize: 32,
  lineHeight: 1.4,
  letterSpacing: 0,
  fontWeight: 400,
  columns: 3,
  category: '',
};

const reducer = (state: SettingsState, action: SettingsAction): SettingsState => {
  switch (action.type) {
    case 'setText':
      return { ...state, text: action.payload };
    case 'fontSize':
      return { ...state, fontSize: action.payload };
    case 'lineHeight':
      return { ...state, lineHeight: action.payload };
    case 'letterSpacing':
      return { ...state, letterSpacing: action.payload };
    case 'fontWeight':
      return { ...state, fontWeight: action.payload };
    case 'columns':
      return { ...state, columns: Math.min(4, Math.max(1, action.payload)) };
    case 'category':
      return { ...state, category: action.payload };
    default:
      return state;
  }
};

export const useSettings = () => {
  return useReducer(reducer, initialState);
};
