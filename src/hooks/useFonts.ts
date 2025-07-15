import { useEffect, useState, useCallback } from 'react';
import { FontOption } from '../types/font.types';
import { loadFont } from '../utils/fontLoader';

interface UseFontsReturn {
  fonts: FontOption[];
  addFont: (font: FontOption) => void;
  removeFont: (id: string) => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  loading: boolean;
  error: string | null;
  getRandomFonts: (count: number) => FontOption[];
}

// If you have a Google Fonts API key set it in VITE_GOOGLE_FONTS_API_KEY. Otherwise we fall back to a preset list.
const GOOGLE_FONTS_API = import.meta.env.VITE_GOOGLE_FONTS_API_KEY
  ? `https://www.googleapis.com/webfonts/v1/webfonts?sort=popularity&key=${import.meta.env.VITE_GOOGLE_FONTS_API_KEY}`
  : null;

const FALLBACK_FONTS: FontOption[] = [
  { id: 'Roboto', family: 'Roboto', category: 'sans-serif', variants: ['regular', '700'], files: {} },
  { id: 'Open Sans', family: 'Open Sans', category: 'sans-serif', variants: ['regular', '700'], files: {} },
  { id: 'Lato', family: 'Lato', category: 'sans-serif', variants: ['regular', '700'], files: {} },
  { id: 'Montserrat', family: 'Montserrat', category: 'sans-serif', variants: ['regular', '700'], files: {} },
  { id: 'Inter', family: 'Inter', category: 'sans-serif', variants: ['regular', '700'], files: {} },
  { id: 'Poppins', family: 'Poppins', category: 'sans-serif', variants: ['regular', '700'], files: {} },
  { id: 'Merriweather', family: 'Merriweather', category: 'serif', variants: ['regular', '700'], files: {} },
  { id: 'Noto Sans JP', family: 'Noto Sans JP', category: 'sans-serif', variants: ['regular', '700'], files: {} },
  { id: 'Noto Serif JP', family: 'Noto Serif JP', category: 'serif', variants: ['regular', '700'], files: {} },
  { id: 'M PLUS 1p', family: 'M PLUS 1p', category: 'sans-serif', variants: ['regular', '700'], files: {} },
  { id: 'Raleway', family: 'Raleway', category: 'sans-serif', variants: ['regular', '700'], files: {} },
  { id: 'Oswald', family: 'Oswald', category: 'sans-serif', variants: ['regular', '700'], files: {} },
  { id: 'Ubuntu', family: 'Ubuntu', category: 'sans-serif', variants: ['regular', '700'], files: {} },
  { id: 'PT Sans', family: 'PT Sans', category: 'sans-serif', variants: ['regular', '700'], files: {} },
  { id: 'PT Serif', family: 'PT Serif', category: 'serif', variants: ['regular', '700'], files: {} },
  { id: 'Playfair Display', family: 'Playfair Display', category: 'serif', variants: ['regular', '700'], files: {} },
  { id: 'Rubik', family: 'Rubik', category: 'sans-serif', variants: ['regular', '700'], files: {} },
  { id: 'Fira Sans', family: 'Fira Sans', category: 'sans-serif', variants: ['regular', '700'], files: {} },
  { id: 'Inconsolata', family: 'Inconsolata', category: 'monospace', variants: ['regular', '700'], files: {} },
  { id: 'Source Sans Pro', family: 'Source Sans Pro', category: 'sans-serif', variants: ['regular', '700'], files: {} },
  { id: 'Source Serif Pro', family: 'Source Serif Pro', category: 'serif', variants: ['regular', '700'], files: {} },
  { id: 'Source Code Pro', family: 'Source Code Pro', category: 'monospace', variants: ['regular', '700'], files: {} },
  { id: 'Manrope', family: 'Manrope', category: 'sans-serif', variants: ['regular', '700'], files: {} },
  { id: 'Quicksand', family: 'Quicksand', category: 'sans-serif', variants: ['regular', '700'], files: {} },
  { id: 'Bitter', family: 'Bitter', category: 'serif', variants: ['regular', '700'], files: {} },
  { id: 'Mukta', family: 'Mukta', category: 'sans-serif', variants: ['regular', '700'], files: {} },
  { id: 'Hind', family: 'Hind', category: 'sans-serif', variants: ['regular', '700'], files: {} },
  { id: 'Karla', family: 'Karla', category: 'sans-serif', variants: ['regular', '700'], files: {} },
  { id: 'IBM Plex Sans', family: 'IBM Plex Sans', category: 'sans-serif', variants: ['regular', '700'], files: {} },
  { id: 'IBM Plex Serif', family: 'IBM Plex Serif', category: 'serif', variants: ['regular', '700'], files: {} },
  { id: 'Cabin', family: 'Cabin', category: 'sans-serif', variants: ['regular', '700'], files: {} },
  { id: 'Zilla Slab', family: 'Zilla Slab', category: 'serif', variants: ['regular', '700'], files: {} },
  { id: 'Noto Sans', family: 'Noto Sans', category: 'sans-serif', variants: ['regular', '700'], files: {} },
  { id: 'Noto Serif', family: 'Noto Serif', category: 'serif', variants: ['regular', '700'], files: {} },
  { id: 'Nanum Gothic', family: 'Nanum Gothic', category: 'sans-serif', variants: ['regular', '700'], files: {} },
  { id: 'Nanum Myeongjo', family: 'Nanum Myeongjo', category: 'serif', variants: ['regular', '700'], files: {} },
  { id: 'Heebo', family: 'Heebo', category: 'sans-serif', variants: ['regular', '700'], files: {} },
  { id: 'Work Sans', family: 'Work Sans', category: 'sans-serif', variants: ['regular', '700'], files: {} },
  // Japanese fonts with distinctive designs
  { id: 'M PLUS Rounded 1c', family: 'M PLUS Rounded 1c', category: 'sans-serif', variants: ['regular', '700'], files: {} },
  { id: 'Sawarabi Mincho', family: 'Sawarabi Mincho', category: 'serif', variants: ['regular'], files: {} },
  { id: 'Sawarabi Gothic', family: 'Sawarabi Gothic', category: 'sans-serif', variants: ['regular'], files: {} },
  { id: 'Kosugi Maru', family: 'Kosugi Maru', category: 'sans-serif', variants: ['regular'], files: {} },
  { id: 'Kosugi', family: 'Kosugi', category: 'sans-serif', variants: ['regular'], files: {} },
  { id: 'Hachi Maru Pop', family: 'Hachi Maru Pop', category: 'handwriting', variants: ['regular'], files: {} },
  { id: 'Yusei Magic', family: 'Yusei Magic', category: 'sans-serif', variants: ['regular'], files: {} },
  { id: 'DotGothic16', family: 'DotGothic16', category: 'sans-serif', variants: ['regular'], files: {} },
  { id: 'Train One', family: 'Train One', category: 'display', variants: ['regular'], files: {} },
  { id: 'RocknRoll One', family: 'RocknRoll One', category: 'sans-serif', variants: ['regular'], files: {} },
  { id: 'Reggae One', family: 'Reggae One', category: 'display', variants: ['regular'], files: {} },
  
  // Rounded / playful fonts
  { id: 'Nunito', family: 'Nunito', category: 'sans-serif', variants: ['regular', '700'], files: {} },
  { id: 'Nunito Sans', family: 'Nunito Sans', category: 'sans-serif', variants: ['regular', '700'], files: {} },
  { id: 'Varela Round', family: 'Varela Round', category: 'sans-serif', variants: ['regular'], files: {} },
  { id: 'Asap Rounded', family: 'Asap Rounded', category: 'sans-serif', variants: ['regular', '700'], files: {} },
  { id: 'Baloo 2', family: 'Baloo 2', category: 'display', variants: ['regular', '700'], files: {} },
  { id: 'Fredoka One', family: 'Fredoka One', category: 'display', variants: ['regular'], files: {} },
  { id: 'Comfortaa', family: 'Comfortaa', category: 'display', variants: ['regular', '700'], files: {} },
  
  // Handwriting / decorative
  { id: 'Pacifico', family: 'Pacifico', category: 'handwriting', variants: ['regular'], files: {} },
  { id: 'Indie Flower', family: 'Indie Flower', category: 'handwriting', variants: ['regular'], files: {} },
  { id: 'Caveat', family: 'Caveat', category: 'handwriting', variants: ['regular', '700'], files: {} },
  { id: 'Courgette', family: 'Courgette', category: 'handwriting', variants: ['regular'], files: {} },
  { id: 'Chewy', family: 'Chewy', category: 'display', variants: ['regular'], files: {} },
  { id: 'Luckiest Guy', family: 'Luckiest Guy', category: 'display', variants: ['regular'], files: {} },
  
  // Additional decorative fonts with personality
  { id: 'Dela Gothic One', family: 'Dela Gothic One', category: 'display', variants: ['regular'], files: {} },
  { id: 'Yomogi', family: 'Yomogi', category: 'handwriting', variants: ['regular'], files: {} },
  { id: 'New Tegomin', family: 'New Tegomin', category: 'serif', variants: ['regular'], files: {} },
  { id: 'Yuji Syuku', family: 'Yuji Syuku', category: 'serif', variants: ['regular'], files: {} },
  { id: 'Yuji Hentaigana Akari', family: 'Yuji Hentaigana Akari', category: 'handwriting', variants: ['regular'], files: {} },
  { id: 'Yuji Boku', family: 'Yuji Boku', category: 'serif', variants: ['regular'], files: {} }

];

export const useFonts = (): UseFontsReturn => {
  const [fonts, setFonts] = useState<FontOption[]>([]);
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('favorites') || '[]');
    } catch {
      return [];
    }
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // fetch font list once
  useEffect(() => {
    const fetchFonts = async () => {
      // If API key not provided, use preset list.
      if (!GOOGLE_FONTS_API) {
        setFonts(FALLBACK_FONTS);
        return;
      }
      setLoading(true);
      try {
        const res = await fetch(GOOGLE_FONTS_API);
        if (!res.ok) throw new Error('Network');
        const data = await res.json();
        const mapped: FontOption[] = data.items.slice(0, 50).map((f: any) => ({
          ...f,
          id: f.family,
        }));
        setFonts(mapped);
      } catch (e) {
        // fallback to preset list on error
        setFonts(FALLBACK_FONTS);
        setError('Failed to load Google Fonts list. Using preset list.');
      } finally {
        setLoading(false);
      }
    };
    fetchFonts();
  }, []);

  const addFont = useCallback(
    async (font: FontOption) => {
      try {
        await loadFont(font.family, font.variants);
        setFonts((prev) => (prev.find((f) => f.id === font.id) ? prev : [...prev, font]));
      } catch (e) {
        // ignore
      }
    },
    []
  );

  const removeFont = (id: string) => {
    setFonts((prev) => prev.filter((f) => f.id !== id));
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id];
      localStorage.setItem('favorites', JSON.stringify(next));
      return next;
    });
  };

  const getRandomFonts = (count: number) => {
    if (fonts.length === 0) return [];
    const shuffled = [...fonts].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  return { fonts, addFont, removeFont, favorites, toggleFavorite, loading, error, getRandomFonts };
};
