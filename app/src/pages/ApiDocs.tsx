import { useState } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import { Code, Copy, Check, Server, FileText, FileSpreadsheet, FileJson } from 'lucide-react';

interface Endpoint {
  method: string;
  path: string;
  description: string;
  body?: Record<string, string>;
  response: Record<string, unknown>;
}

const ENDPOINTS: Endpoint[] = [
  {
    method: 'POST',
    path: '/api/v1/analyze',
    description: 'Analyze a protein sequence and return all computed properties.',
    body: {
      sequence: 'string (required) - Amino acid sequence in single-letter code',
      name: 'string (optional) - Display name for the sequence',
    },
    response: {
      success: true,
      data: {
        sequenceLength: 583,
        molecularWeight: { average: 66472.35, monoisotopic: 66430.12 },
        theoreticalPi: 5.82,
        gravy: -0.42,
        isStable: true,
      },
    },
  },
  {
    method: 'POST',
    path: '/api/v1/analyze/fasta',
    description: 'Upload and analyze a FASTA file containing one or more sequences.',
    body: {
      file: 'multipart/form-data - .fasta, .fa, or .txt file',
    },
    response: {
      success: true,
      data: [
        { sequenceName: 'Protein_1', sequenceLength: 250, theoreticalPi: 7.2 },
      ],
    },
  },
  {
    method: 'POST',
    path: '/api/v1/export/pdf',
    description: 'Generate a downloadable PDF report for the analyzed sequence.',
    body: {
      sequence: 'string - The analyzed sequence',
      results: 'object - Complete analysis results object',
    },
    response: { message: 'PDF file download' },
  },
  {
    method: 'POST',
    path: '/api/v1/export/csv',
    description: 'Export analysis results as a CSV file.',
    body: {
      results: 'object - Complete analysis results object',
    },
    response: { message: 'CSV file download' },
  },
  {
    method: 'POST',
    path: '/api/v1/export/json',
    description: 'Export analysis results as a JSON file.',
    body: {
      results: 'object - Complete analysis results object',
    },
    response: { message: 'JSON file download' },
  },
  {
    method: 'POST',
    path: '/api/v1/ai/summarize',
    description: 'Get an AI-generated summary and functional insights for a protein sequence.',
    body: {
      sequence: 'string - Amino acid sequence',
    },
    response: {
      summary: 'A predicted globular protein with...',
      insights: ['Possible enzyme function', 'Contains binding domain'],
      confidence: 0.85,
    },
  },
];

const METHOD_COLORS: Record<string, string> = {
  GET: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  POST: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  PUT: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  DELETE: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
};

function EndpointCard({ endpoint }: { endpoint: Endpoint }) {
  const [copied, setCopied] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);

  const copy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 p-4 text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
      >
        <span
          className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase ${METHOD_COLORS[endpoint.method]}`}
        >
          {endpoint.method}
        </span>
        <code className="text-sm font-mono text-slate-900 dark:text-white flex-1">
          {endpoint.path}
        </code>
        <Code className="w-4 h-4 text-slate-400" />
      </button>

      {expanded && (
        <div className="px-4 pb-4 border-t border-slate-100 dark:border-slate-800">
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 mb-4">
            {endpoint.description}
          </p>

          {endpoint.body && (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                  Request Body
                </span>
                <button
                  onClick={() => copy(JSON.stringify(endpoint.body, null, 2), `${endpoint.path}-body`)}
                  className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  {copied === `${endpoint.path}-body` ? (
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                  )}
                </button>
              </div>
              <pre className="p-3 rounded-lg bg-slate-900 text-slate-300 text-xs font-mono overflow-x-auto">
                {JSON.stringify(endpoint.body, null, 2)}
              </pre>
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                Response
              </span>
              <button
                onClick={() => copy(JSON.stringify(endpoint.response, null, 2), `${endpoint.path}-resp`)}
                className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                {copied === `${endpoint.path}-resp` ? (
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                )}
              </button>
            </div>
            <pre className="p-3 rounded-lg bg-slate-900 text-slate-300 text-xs font-mono overflow-x-auto">
              {JSON.stringify(endpoint.response, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ApiDocs() {
  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <ScrollReveal className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <Server className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">API Documentation</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">REST API for protein analysis</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Base URL */}
        <ScrollReveal delay={50}>
          <div className="mb-8 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
            <p className="text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase mb-1">
              Base URL
            </p>
            <code className="text-sm font-mono text-blue-800 dark:text-blue-400">
              https://api.apars.bio/api/v1
            </code>
          </div>
        </ScrollReveal>

        {/* Export Formats */}
        <ScrollReveal delay={100}>
          <div className="mb-8 flex flex-wrap gap-3">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 text-sm">
              <FileText className="w-4 h-4" /> PDF
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 text-sm">
              <FileSpreadsheet className="w-4 h-4" /> CSV
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-sm">
              <FileJson className="w-4 h-4" /> JSON
            </div>
          </div>
        </ScrollReveal>

        {/* Endpoints */}
        <div className="space-y-4">
          {ENDPOINTS.map((endpoint) => (
            <ScrollReveal key={endpoint.path}>
              <EndpointCard endpoint={endpoint} />
            </ScrollReveal>
          ))}
        </div>

        {/* Authentication Note */}
        <ScrollReveal delay={100}>
          <div className="mt-10 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800">
            <p className="text-sm font-medium text-amber-800 dark:text-amber-300 mb-1">
              Authentication
            </p>
            <p className="text-sm text-amber-700 dark:text-amber-400">
              The public API does not require authentication for basic analysis. For higher rate
              limits and AI features, an API key is required. Contact us for access.
            </p>
          </div>
        </ScrollReveal>

        {/* Rate Limits */}
        <ScrollReveal delay={150}>
          <div className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <p className="text-sm font-medium text-slate-800 dark:text-slate-200 mb-1">
              Rate Limits
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Free tier: 100 requests/hour. Pro tier: 10,000 requests/hour.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
