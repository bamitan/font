import React, { useRef, useCallback } from 'react';
import FontCard from './components/FontCard';
import ControlPanel from './components/ControlPanel';
import FontSelector from './components/FontSelector';
import ExportPanel from './components/ExportPanel';
import { useFonts } from './hooks/useFonts';
import { useSettings } from './hooks/useSettings';
import { useSelectedFonts } from './hooks/useSelectedFonts';

const App: React.FC = () => {
  const [settings, dispatch] = useSettings();
  const { fonts: fontList, favorites, toggleFavorite, loading, error, getRandomFonts } = useFonts();
  const { selected, addFont, removeFont } = useSelectedFonts();
  const { columns, category } = settings;
  const cardsRef = useRef<HTMLDivElement>(null);

  const handleCopyWithStyles = useCallback((text: string, fontFamily: string) => {
    navigator.clipboard.writeText(text).then(() => {
      // スタイル付きでコピーするための一時要素を作成
      const tempElement = document.createElement('div');
      tempElement.style.fontFamily = fontFamily;
      tempElement.style.position = 'fixed';
      tempElement.style.opacity = '0';
      tempElement.textContent = text;
      document.body.appendChild(tempElement);
      
      // 選択範囲を設定
      const range = document.createRange();
      range.selectNode(tempElement);
      window.getSelection()?.removeAllRanges();
      window.getSelection()?.addRange(range);
      
      // コピーコマンドを実行
      document.execCommand('copy');
      
      // 後片付け
      window.getSelection()?.removeAllRanges();
      document.body.removeChild(tempElement);
      
      alert(`「${text}」をスタイル付きでコピーしました！`);
    }).catch(err => {
      console.error('コピーに失敗しました:', err);
      alert('コピーに失敗しました。もう一度お試しください。');
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col gap-6 p-4 md:p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text font-['M_PLUS_Rounded_1c']">
          BAMITANのフォント屋さん
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">フォントを比べてお気に入りを見つけよう！✨</p>
        <button
          onClick={() => {
            document.documentElement.classList.toggle('dark');
          }}
          className="mt-4 px-4 py-2 bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-200 rounded-full text-sm font-medium hover:bg-pink-200 dark:hover:bg-pink-800 transition-colors"
        >
          テーマ切り替え
        </button>
      </header>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex flex-col gap-4 w-full md:w-72">
          <ControlPanel
            settings={settings}
            dispatch={dispatch}
            onAddRandom={() => {
              const randoms = getRandomFonts(5);
              randoms.forEach(addFont);
            }}
          />
          <FontSelector fonts={fontList} addFont={addFont} category={category} />
          <ExportPanel targetRef={cardsRef} />
        </div>

        <div className="flex-1" ref={cardsRef}>
          {loading && <p>Loading fonts...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {selected.length === 0 && <p className="text-gray-500">Select fonts to compare</p>}
          <div className={`grid gap-4 ${columns === 1 ? 'grid-cols-1' : columns === 2 ? 'md:grid-cols-2' : columns === 3 ? 'md:grid-cols-3' : 'md:grid-cols-4'}`}>
            {selected.map((font) => (
              <FontCard
                key={font.id}
                font={font}
                settings={settings}
                onRemove={removeFont}
                isFavorite={favorites.includes(font.id)}
                toggleFavorite={toggleFavorite}
                onCopy={handleCopyWithStyles}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
