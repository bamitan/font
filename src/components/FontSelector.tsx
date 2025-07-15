import React, { useState } from 'react';
import { FontOption } from '../types/font.types';

interface FontSelectorProps {
  fonts: FontOption[];
  addFont: (font: FontOption) => void;
  category?: string;
}

const FontSelector: React.FC<FontSelectorProps> = ({ fonts, addFont, category = '' }) => {
  const [query, setQuery] = useState('');

  const filtered = fonts.filter(
    (f) =>
      f.family.toLowerCase().includes(query.toLowerCase()) && (category === '' || f.category === category)
  );

  return (
    <div className="flex flex-col gap-2 w-full md:w-64">
      <input
        type="text"
        placeholder="Search fonts..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="rounded p-2 bg-beige-50 dark:bg-gray-700"
      />
      <div className="max-h-64 overflow-y-auto border rounded bg-white dark:bg-gray-800">
        {filtered.map((font) => (
          <button
            key={font.id}
            onClick={() => addFont(font)}
            className="block w-full text-left px-2 py-1 hover:bg-primary/30"
          >
            {font.family}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FontSelector;
