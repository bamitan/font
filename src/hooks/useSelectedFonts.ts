import { useState } from 'react';
import { FontOption } from '../types/font.types';
import { loadFont } from '../utils/fontLoader';

export const useSelectedFonts = () => {
  const [selected, setSelected] = useState<FontOption[]>([]);

  const addFont = async (font: FontOption) => {
    await loadFont(font.family, font.variants);
    setSelected((prev) => (prev.find((f) => f.id === font.id) ? prev : [...prev, font]));
  };

  const removeFont = (id: string) => {
    setSelected((prev) => prev.filter((f) => f.id !== id));
  };

  return { selected, addFont, removeFont };
};
