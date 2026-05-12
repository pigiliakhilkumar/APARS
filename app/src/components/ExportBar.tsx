import { useRef } from 'react';
import { FileText, FileSpreadsheet, FileJson } from 'lucide-react';
import { useAnalysisStore } from '@/stores/analysisStore';
import { useUIStore } from '@/stores/uiStore';
import jsPDF from 'jspdf';
import type { ProteinResults } from '@/lib/bioinformatics';

export default function ExportBar() {
  const results = useAnalysisStore((s: AnalysisState) => s.results);
  const showToast = useUIStore((s: UIState) => s.showToast);
  const btnRef = useRef<HTMLDivElement>(null);

  if (!results) return null;

  const exportPDF = () => {
    try {
      const doc = new jsPDF();
      const r = results;
      let y = 20;

      doc.setFontSize(20);
      doc.text('APARS - Protein Analysis Report', 20, y);
      y += 12;

      doc.setFontSize(10);
      doc.text(`Generated: ${new Date().toLocaleString()}`, 20, y);
      y += 8;
      doc.text(`Sequence: ${r.sequenceName} (${r.sequenceLength} residues)`, 20, y);
      y += 12;

      doc.setFontSize(14);
      doc.text('Basic Properties', 20, y);
      y += 8;
      doc.setFontSize(10);

      const props: [string, string][] = [
        ['Molecular Weight (avg)', `${r.molecularWeight.average.toFixed(2)} Da`],
        ['Molecular Weight (mono)', `${r.molecularWeight.monoisotopic.toFixed(2)} Da`],
        ['Theoretical pI', `${r.theoreticalPi}`],
        ['GRAVY', `${r.gravy}`],
        ['Instability Index', `${r.instabilityIndex} (${r.isStable ? 'Stable' : 'Unstable'})`],
        ['Aliphatic Index', `${r.aliphaticIndex}`],
        ['Charge at pH 7', `${r.chargeAtPh7 > 0 ? '+' : ''}${r.chargeAtPh7}`],
        ['Extinction Coeff (red)', `${r.extinctionCoefficient.reduced} M^-1cm^-1`],
      ];

      for (const [k, v] of props) {
        doc.text(`${k}: ${v}`, 20, y);
        y += 6;
        if (y > 270) {
          doc.addPage();
          y = 20;
        }
      }

      y += 8;
      doc.setFontSize(14);
      doc.text('Amino Acid Composition', 20, y);
      y += 8;
      doc.setFontSize(9);

      for (const aa of r.aminoAcidComposition) {
        doc.text(`${aa.code} (${aa.name}): ${aa.count} (${aa.molePercent}%)`, 20, y);
        y += 5;
        if (y > 270) {
          doc.addPage();
          y = 20;
        }
      }

      doc.save(`apars-report-${r.sequenceName.replace(/\s+/g, '_')}.pdf`);
      showToast('PDF report downloaded', 'success');
    } catch {
      showToast('Failed to generate PDF', 'error');
    }
  };

  const exportCSV = () => {
    try {
      const r = results;
      const rows: string[][] = [
        ['Property', 'Value'],
        ['Sequence Name', r.sequenceName],
        ['Sequence Length', String(r.sequenceLength)],
        ['Molecular Weight (avg)', String(r.molecularWeight.average)],
        ['Molecular Weight (mono)', String(r.molecularWeight.monoisotopic)],
        ['Theoretical pI', String(r.theoreticalPi)],
        ['GRAVY', String(r.gravy)],
        ['Instability Index', String(r.instabilityIndex)],
        ['Stable', String(r.isStable)],
        ['Aliphatic Index', String(r.aliphaticIndex)],
        ['Charge at pH 7', String(r.chargeAtPh7)],
        ['Extinction Coeff (reduced)', String(r.extinctionCoefficient.reduced)],
        ['Extinction Coeff (oxidized)', String(r.extinctionCoefficient.oxidized)],
        ['Absorbance (reduced)', String(r.extinctionCoefficient.absorbanceReduced)],
        ['Half-life (mammalian)', r.halfLife.mammalian],
        ['Half-life (yeast)', r.halfLife.yeast],
        ['Half-life (E. coli)', r.halfLife.ecoli],
        ['', ''],
        ['AA', 'Name', 'Count', 'Mole %', 'Mass %'],
        ...r.aminoAcidComposition.map((a) => [a.code, a.name, String(a.count), String(a.molePercent), String(a.massPercent)]),
      ];

      const csv = rows.map((row) => row.map((c) => `"${c}"`).join(',')).join('\n');
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `apars-data-${r.sequenceName.replace(/\s+/g, '_')}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      showToast('CSV data exported', 'success');
    } catch {
      showToast('Failed to export CSV', 'error');
    }
  };

  const exportJSON = () => {
    try {
      const blob = new Blob([JSON.stringify(results, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `apars-results-${results.sequenceName.replace(/\s+/g, '_')}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showToast('JSON results exported', 'success');
    } catch {
      showToast('Failed to export JSON', 'error');
    }
  };

  return (
    <div
      ref={btnRef}
      className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 shadow-lg px-4 py-3"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Export Results:
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={exportPDF}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-700 dark:text-red-300 text-sm font-medium rounded-lg transition-colors"
          >
            <FileText className="w-4 h-4" />
            PDF
          </button>
          <button
            onClick={exportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-medium rounded-lg transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4" />
            CSV
          </button>
          <button
            onClick={exportJSON}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium rounded-lg transition-colors"
          >
            <FileJson className="w-4 h-4" />
            JSON
          </button>
        </div>
      </div>
    </div>
  );
}

interface AnalysisState {
  results: ProteinResults | null;
}

interface UIState {
  showToast: (message: string, type: 'success' | 'error' | 'info') => void;
}
