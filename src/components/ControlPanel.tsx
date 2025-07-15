import React from 'react';
import { SettingsState, SettingsAction } from '../hooks/useSettings';

interface ControlPanelProps {
  settings: SettingsState;
  dispatch: React.Dispatch<SettingsAction>;
  onAddRandom: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ settings, dispatch, onAddRandom }) => {
  const { text, fontSize, lineHeight, letterSpacing, fontWeight, columns, category } = settings;

  return (
    <div className="card bg-beige-100 dark:bg-gray-800 flex flex-col gap-4 w-full md:w-64">
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Sample Text</span>
        <textarea
          value={text}
          onChange={(e) => dispatch({ type: 'setText', payload: e.target.value })}
          rows={4}
          className="rounded p-2 bg-gray-50 dark:bg-gray-700 text-sm"
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Font Size: {fontSize}px</span>
        <input
          type="range"
          min={12}
          max={120}
          value={fontSize}
          onChange={(e) => dispatch({ type: 'fontSize', payload: +e.target.value })}
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Line Height: {lineHeight}</span>
        <input
          type="range"
          min={1}
          max={2}
          step={0.05}
          value={lineHeight}
          onChange={(e) => dispatch({ type: 'lineHeight', payload: +e.target.value })}
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Letter Spacing: {letterSpacing}px</span>
        <input
          type="range"
          min={-5}
          max={10}
          value={letterSpacing}
          onChange={(e) => dispatch({ type: 'letterSpacing', payload: +e.target.value })}
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Font Weight: {fontWeight}</span>
        <input
          type="range"
          min={100}
          max={900}
          step={100}
          value={fontWeight}
          onChange={(e) => dispatch({ type: 'fontWeight', payload: +e.target.value })}
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Columns: {columns}</span>
        <input
          type="range"
          min={1}
          max={4}
          value={columns}
          onChange={(e) => dispatch({ type: 'columns', payload: +e.target.value })}
        />
      </label>
      <button
        onClick={onAddRandom}
        className="w-full py-2 bg-primary text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:bg-primary/80 transform transition hover:-translate-y-0.5"
      >
        Surprise me (random fonts)
      </button>
      <label className="flex flex-col gap-1 mt-2">
        <span className="text-sm font-medium">Category</span>
        <select
          value={category}
          onChange={(e) => dispatch({ type: 'category', payload: e.target.value })}
          className="rounded p-2 bg-beige-50 dark:bg-gray-700"
        >
          <option value="">All</option>
          <option value="sans-serif">Sans-Serif</option>
          <option value="serif">Serif</option>
          <option value="display">Display</option>
          <option value="handwriting">Handwriting</option>
          <option value="monospace">Monospace</option>
        </select>
      </label>
    </div>
  );
};

export default ControlPanel;
