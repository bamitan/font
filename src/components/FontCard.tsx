import React from 'react';
import { FontOption } from '../types/font.types';
import { SettingsState } from '../hooks/useSettings';
import classNames from 'classnames';

interface FontCardProps {
  font: FontOption;
  settings: SettingsState;
  onRemove: (id: string) => void;
  isFavorite: boolean;
  toggleFavorite: (id: string) => void;
  onCopy: (text: string, fontFamily: string) => void;
}

const FontCard: React.FC<FontCardProps> = ({ font, settings, onRemove, isFavorite, toggleFavorite, onCopy }) => {
  const { text, fontSize, lineHeight, letterSpacing, fontWeight } = settings;

  return (
    <div className="card flex flex-col gap-4 relative w-full">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">{font.family}</h2>
        <div className="flex gap-2 items-center">
          <button
            onClick={() => toggleFavorite(font.id)}
            className={classNames('p-1 rounded', isFavorite ? 'text-yellow-400' : 'text-gray-500')}
            aria-label="toggle favorite"
          >
            ★
          </button>
          <button
            onClick={() => onRemove(font.id)}
            className="text-red-500 hover:text-red-600 dark:text-red-400"
            aria-label="remove card"
          >
            ✕
          </button>
        </div>
      </div>
      <div
        style={{
          fontFamily: `'${font.family}', sans-serif`,
          fontSize: `${fontSize}px`,
          lineHeight,
          letterSpacing: `${letterSpacing}px`,
          fontWeight,
        }}
        className="whitespace-pre-wrap break-words p-3 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        onClick={() => onCopy(text, font.family)}
        title="クリックしてコピー"
      >
        {text}
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
          クリックしてコピー
        </div>
      </div>
    </div>
  );
};

export default FontCard;
