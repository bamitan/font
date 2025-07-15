import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface ExportPanelProps {
  targetRef: React.RefObject<HTMLDivElement>;
}

const ExportPanel: React.FC<ExportPanelProps> = ({ targetRef }) => {
  const exportPNG = async () => {
    if (!targetRef.current) return;
    const canvas = await html2canvas(targetRef.current);
    const link = document.createElement('a');
    link.download = 'font-compare.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  const exportPDF = async () => {
    if (!targetRef.current) return;
    const canvas = await html2canvas(targetRef.current);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({ orientation: 'p', unit: 'px', format: [canvas.width, canvas.height] });
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save('font-compare.pdf');
  };

  return (
    <div className="flex gap-2">
      <button onClick={exportPNG} className="px-3 py-1 bg-primary text-white rounded">PNG</button>
      <button onClick={exportPDF} className="px-3 py-1 bg-primary text-white rounded">PDF</button>
    </div>
  );
};

export default ExportPanel;
