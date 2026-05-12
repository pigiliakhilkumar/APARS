// ============================================================
// APARS - Bioinformatics Calculation Engine
// Computes physicochemical properties from amino acid sequences
// ============================================================

export interface AminoAcidData {
  code: string;
  name: string;
  monoisotopic: number;
  average: number;
  pkCooh: number;
  pkNh3: number;
  pkR: number | null;
  hydrophobicity: number;
  classification: 'polar' | 'nonpolar' | 'acidic' | 'basic' | 'aromatic' | 'special';
  atoms: { C: number; H: number; N: number; O: number; S: number };
}

export const AMINO_ACID_DATA: Record<string, AminoAcidData> = {
  A: { code: 'A', name: 'Alanine', monoisotopic: 71.03711, average: 71.0788, pkCooh: 2.34, pkNh3: 9.69, pkR: null, hydrophobicity: 1.8, classification: 'nonpolar', atoms: { C: 3, H: 7, N: 1, O: 2, S: 0 } },
  R: { code: 'R', name: 'Arginine', monoisotopic: 156.10111, average: 156.1875, pkCooh: 2.17, pkNh3: 9.04, pkR: 12.48, hydrophobicity: -4.5, classification: 'basic', atoms: { C: 6, H: 14, N: 4, O: 2, S: 0 } },
  N: { code: 'N', name: 'Asparagine', monoisotopic: 114.04293, average: 114.1038, pkCooh: 2.02, pkNh3: 8.80, pkR: null, hydrophobicity: -3.5, classification: 'polar', atoms: { C: 4, H: 8, N: 2, O: 3, S: 0 } },
  D: { code: 'D', name: 'Aspartic Acid', monoisotopic: 115.02694, average: 115.0886, pkCooh: 1.88, pkNh3: 9.60, pkR: 3.65, hydrophobicity: -3.5, classification: 'acidic', atoms: { C: 4, H: 7, N: 1, O: 4, S: 0 } },
  C: { code: 'C', name: 'Cysteine', monoisotopic: 103.00919, average: 103.1388, pkCooh: 1.96, pkNh3: 10.28, pkR: 8.18, hydrophobicity: 2.5, classification: 'special', atoms: { C: 3, H: 7, N: 1, O: 2, S: 1 } },
  Q: { code: 'Q', name: 'Glutamine', monoisotopic: 128.05858, average: 128.1307, pkCooh: 2.17, pkNh3: 9.13, pkR: null, hydrophobicity: -3.5, classification: 'polar', atoms: { C: 5, H: 10, N: 2, O: 3, S: 0 } },
  E: { code: 'E', name: 'Glutamic Acid', monoisotopic: 129.04259, average: 129.1155, pkCooh: 2.19, pkNh3: 9.67, pkR: 4.25, hydrophobicity: -3.5, classification: 'acidic', atoms: { C: 5, H: 9, N: 1, O: 4, S: 0 } },
  G: { code: 'G', name: 'Glycine', monoisotopic: 57.02146, average: 57.0519, pkCooh: 2.34, pkNh3: 9.60, pkR: null, hydrophobicity: -0.4, classification: 'nonpolar', atoms: { C: 2, H: 5, N: 1, O: 2, S: 0 } },
  H: { code: 'H', name: 'Histidine', monoisotopic: 137.05891, average: 137.1411, pkCooh: 1.82, pkNh3: 9.17, pkR: 6.00, hydrophobicity: -3.2, classification: 'basic', atoms: { C: 6, H: 9, N: 3, O: 2, S: 0 } },
  I: { code: 'I', name: 'Isoleucine', monoisotopic: 113.08406, average: 113.1594, pkCooh: 2.36, pkNh3: 9.60, pkR: null, hydrophobicity: 4.5, classification: 'nonpolar', atoms: { C: 6, H: 13, N: 1, O: 2, S: 0 } },
  L: { code: 'L', name: 'Leucine', monoisotopic: 113.08406, average: 113.1594, pkCooh: 2.36, pkNh3: 9.60, pkR: null, hydrophobicity: 3.8, classification: 'nonpolar', atoms: { C: 6, H: 13, N: 1, O: 2, S: 0 } },
  K: { code: 'K', name: 'Lysine', monoisotopic: 128.09496, average: 128.1741, pkCooh: 2.18, pkNh3: 8.95, pkR: 10.53, hydrophobicity: -3.9, classification: 'basic', atoms: { C: 6, H: 14, N: 2, O: 2, S: 0 } },
  M: { code: 'M', name: 'Methionine', monoisotopic: 131.04049, average: 131.1925, pkCooh: 2.28, pkNh3: 9.21, pkR: null, hydrophobicity: 1.9, classification: 'nonpolar', atoms: { C: 5, H: 11, N: 1, O: 2, S: 1 } },
  F: { code: 'F', name: 'Phenylalanine', monoisotopic: 147.06841, average: 147.1766, pkCooh: 1.83, pkNh3: 9.13, pkR: null, hydrophobicity: 2.8, classification: 'aromatic', atoms: { C: 9, H: 11, N: 1, O: 2, S: 0 } },
  P: { code: 'P', name: 'Proline', monoisotopic: 97.05276, average: 97.1167, pkCooh: 1.99, pkNh3: 10.60, pkR: null, hydrophobicity: -1.6, classification: 'nonpolar', atoms: { C: 5, H: 9, N: 1, O: 2, S: 0 } },
  S: { code: 'S', name: 'Serine', monoisotopic: 87.03203, average: 87.0782, pkCooh: 2.21, pkNh3: 9.15, pkR: null, hydrophobicity: -0.8, classification: 'polar', atoms: { C: 3, H: 7, N: 1, O: 3, S: 0 } },
  T: { code: 'T', name: 'Threonine', monoisotopic: 101.04768, average: 101.1051, pkCooh: 2.11, pkNh3: 9.62, pkR: null, hydrophobicity: -0.7, classification: 'polar', atoms: { C: 4, H: 9, N: 1, O: 3, S: 0 } },
  W: { code: 'W', name: 'Tryptophan', monoisotopic: 186.07931, average: 186.2132, pkCooh: 2.38, pkNh3: 9.39, pkR: null, hydrophobicity: -0.9, classification: 'aromatic', atoms: { C: 11, H: 12, N: 2, O: 2, S: 0 } },
  V: { code: 'V', name: 'Valine', monoisotopic: 99.06841, average: 99.1326, pkCooh: 2.32, pkNh3: 9.62, pkR: null, hydrophobicity: 4.2, classification: 'nonpolar', atoms: { C: 5, H: 11, N: 1, O: 2, S: 0 } },
  Y: { code: 'Y', name: 'Tyrosine', monoisotopic: 163.06333, average: 163.1760, pkCooh: 2.20, pkNh3: 9.11, pkR: 10.07, hydrophobicity: -1.3, classification: 'aromatic', atoms: { C: 9, H: 11, N: 1, O: 3, S: 0 } },
};

export const VALID_AA = new Set(Object.keys(AMINO_ACID_DATA));
export const CLASSIFICATION_COLORS: Record<string, string> = {
  polar: '#3B82F6',
  nonpolar: '#6B7280',
  acidic: '#EF4444',
  basic: '#10B981',
  aromatic: '#8B5CF6',
  special: '#F59E0B',
};

// Dipeptide instability weights (selected common values)
const DIPEPTIDE_INSTABILITY: Record<string, number> = {
  'AA': 1.0, 'AR': 1.0, 'AN': 1.0, 'AD': -0.5, 'AC': 1.0, 'AQ': 1.0, 'AE': -0.5, 'AG': 1.0,
  'AH': 1.0, 'AI': 1.0, 'AL': 1.0, 'AK': 1.0, 'AM': 1.0, 'AF': 1.0, 'AP': 1.0, 'AS': 1.0,
  'AT': 1.0, 'AW': 1.0, 'AV': 1.0, 'AY': 1.0,
  'RA': -0.5, 'RR': 1.0, 'RN': 0.5, 'RD': 0.0, 'RC': -0.5, 'RQ': 0.5, 'RE': 0.0, 'RG': 0.5,
  'RH': 1.0, 'RI': 0.5, 'RL': 0.5, 'RK': 1.0, 'RM': 0.5, 'RF': 0.5, 'RP': 0.0, 'RS': 0.5,
  'RT': 0.5, 'RW': 0.5, 'RV': 0.5, 'RY': 0.5,
  'NA': 0.0, 'NR': 0.5, 'NN': 0.0, 'ND': 0.0, 'NC': -1.0, 'NQ': 0.0, 'NE': 0.5, 'NG': 0.0,
  'NH': 0.5, 'NI': 0.0, 'NL': 0.0, 'NK': 0.0, 'NM': 0.0, 'NF': 0.0, 'NP': 0.0, 'NS': 0.0,
  'NT': 0.0, 'NW': 0.0, 'NV': 0.0, 'NY': 0.0,
  'DA': -0.5, 'DR': 0.0, 'DN': 0.0, 'DD': 0.0, 'DC': -1.0, 'DQ': 0.0, 'DE': 0.0, 'DG': 0.0,
  'DH': 0.0, 'DI': 0.0, 'DL': 0.0, 'DK': 0.0, 'DM': 0.0, 'DF': 0.0, 'DP': 0.0, 'DS': 0.0,
  'DT': 0.0, 'DW': 0.0, 'DV': 0.0, 'DY': 0.0,
  'CA': 0.0, 'CR': -0.5, 'CN': -1.0, 'CD': -1.0, 'CC': 0.0, 'CQ': 0.0, 'CE': -1.0, 'CG': 0.0,
  'CH': 0.0, 'CI': 0.0, 'CL': 0.0, 'CK': 0.0, 'CM': 0.0, 'CF': 0.0, 'CP': 0.0, 'CS': 0.0,
  'CT': 0.0, 'CW': 0.0, 'CV': 0.0, 'CY': 0.0,
  'QA': 0.0, 'QR': 0.5, 'QN': 0.0, 'QD': 0.0, 'QC': 0.0, 'QQ': 0.0, 'QE': 0.5, 'QG': 0.0,
  'QH': 0.0, 'QI': 0.0, 'QL': 0.0, 'QK': 0.0, 'QM': 0.0, 'QF': 0.0, 'QP': 0.0, 'QS': 0.0,
  'QT': 0.0, 'QW': 0.0, 'QV': 0.0, 'QY': 0.0,
  'EA': -0.5, 'ER': 0.0, 'EN': 0.5, 'ED': 0.0, 'EC': -1.0, 'EQ': 0.5, 'EE': 0.0, 'EG': 0.0,
  'EH': 0.0, 'EI': 0.0, 'EL': 0.0, 'EK': 0.0, 'EM': 0.0, 'EF': 0.0, 'EP': 0.0, 'ES': 0.0,
  'ET': 0.0, 'EW': 0.0, 'EV': 0.0, 'EY': 0.0,
  'GA': 0.0, 'GR': 0.5, 'GN': 0.0, 'GD': 0.0, 'GC': 0.0, 'GQ': 0.0, 'GE': 0.0, 'GG': 0.0,
  'GH': 0.0, 'GI': 0.0, 'GL': 0.0, 'GK': 0.0, 'GM': 0.0, 'GF': 0.0, 'GP': 0.0, 'GS': 0.0,
  'GT': 0.0, 'GW': 0.0, 'GV': 0.0, 'GY': 0.0,
  'HA': 0.0, 'HR': 1.0, 'HN': 0.5, 'HD': 0.0, 'HC': 0.0, 'HQ': 0.0, 'HE': 0.0, 'HG': 0.0,
  'HH': 0.0, 'HI': 0.0, 'HL': 0.0, 'HK': 0.0, 'HM': 0.0, 'HF': 0.0, 'HP': 0.0, 'HS': 0.0,
  'HT': 0.0, 'HW': 0.0, 'HV': 0.0, 'HY': 0.0,
  'IA': 0.0, 'IR': 0.5, 'IN': 0.0, 'ID': 0.0, 'IC': 0.0, 'IQ': 0.0, 'IE': 0.0, 'IG': 0.0,
  'IH': 0.0, 'II': 0.0, 'IL': 0.0, 'IK': 0.0, 'IM': 0.0, 'IF': 0.0, 'IP': 0.0, 'IS': 0.0,
  'IT': 0.0, 'IW': 0.0, 'IV': 0.0, 'IY': 0.0,
  'LA': 0.0, 'LR': 0.5, 'LN': 0.0, 'LD': 0.0, 'LC': 0.0, 'LQ': 0.0, 'LE': 0.0, 'LG': 0.0,
  'LH': 0.0, 'LI': 0.0, 'LL': 0.0, 'LK': 0.0, 'LM': 0.0, 'LF': 0.0, 'LP': 0.0, 'LS': 0.0,
  'LT': 0.0, 'LW': 0.0, 'LV': 0.0, 'LY': 0.0,
  'KA': 0.0, 'KR': 1.0, 'KN': 0.0, 'KD': 0.0, 'KC': 0.0, 'KQ': 0.0, 'KE': 0.0, 'KG': 0.0,
  'KH': 0.0, 'KI': 0.0, 'KL': 0.0, 'KK': 0.0, 'KM': 0.0, 'KF': 0.0, 'KP': 0.0, 'KS': 0.0,
  'KT': 0.0, 'KW': 0.0, 'KV': 0.0, 'KY': 0.0,
  'MA': 0.0, 'MR': 0.5, 'MN': 0.0, 'MD': 0.0, 'MC': 0.0, 'MQ': 0.0, 'ME': 0.0, 'MG': 0.0,
  'MH': 0.0, 'MI': 0.0, 'ML': 0.0, 'MK': 0.0, 'MM': 0.0, 'MF': 0.0, 'MP': 0.0, 'MS': 0.0,
  'MT': 0.0, 'MW': 0.0, 'MV': 0.0, 'MY': 0.0,
  'FA': 0.0, 'FR': 0.5, 'FN': 0.0, 'FD': 0.0, 'FC': 0.0, 'FQ': 0.0, 'FE': 0.0, 'FG': 0.0,
  'FH': 0.0, 'FI': 0.0, 'FL': 0.0, 'FK': 0.0, 'FM': 0.0, 'FF': 0.0, 'FP': 0.0, 'FS': 0.0,
  'FT': 0.0, 'FW': 0.0, 'FV': 0.0, 'FY': 0.0,
  'PA': 0.0, 'PR': 0.0, 'PN': 0.0, 'PD': 0.0, 'PC': 0.0, 'PQ': 0.0, 'PE': 0.0, 'PG': 0.0,
  'PH': 0.0, 'PI': 0.0, 'PL': 0.0, 'PK': 0.0, 'PM': 0.0, 'PF': 0.0, 'PP': 0.0, 'PS': 0.0,
  'PT': 0.0, 'PW': 0.0, 'PV': 0.0, 'PY': 0.0,
  'SA': 0.0, 'SR': 0.5, 'SN': 0.0, 'SD': 0.0, 'SC': 0.0, 'SQ': 0.0, 'SE': 0.0, 'SG': 0.0,
  'SH': 0.0, 'SI': 0.0, 'SL': 0.0, 'SK': 0.0, 'SM': 0.0, 'SF': 0.0, 'SP': 0.0, 'SS': 0.0,
  'ST': 0.0, 'SW': 0.0, 'SV': 0.0, 'SY': 0.0,
  'TA': 0.0, 'TR': 0.5, 'TN': 0.0, 'TD': 0.0, 'TC': 0.0, 'TQ': 0.0, 'TE': 0.0, 'TG': 0.0,
  'TH': 0.0, 'TI': 0.0, 'TL': 0.0, 'TK': 0.0, 'TM': 0.0, 'TF': 0.0, 'TP': 0.0, 'TS': 0.0,
  'TT': 0.0, 'TW': 0.0, 'TV': 0.0, 'TY': 0.0,
  'WA': 0.0, 'WR': 0.5, 'WN': 0.0, 'WD': 0.0, 'WC': 0.0, 'WQ': 0.0, 'WE': 0.0, 'WG': 0.0,
  'WH': 0.0, 'WI': 0.0, 'WL': 0.0, 'WK': 0.0, 'WM': 0.0, 'WF': 0.0, 'WP': 0.0, 'WS': 0.0,
  'WT': 0.0, 'WW': 0.0, 'WV': 0.0, 'WY': 0.0,
  'VA': 0.0, 'VR': 0.5, 'VN': 0.0, 'VD': 0.0, 'VC': 0.0, 'VQ': 0.0, 'VE': 0.0, 'VG': 0.0,
  'VH': 0.0, 'VI': 0.0, 'VL': 0.0, 'VK': 0.0, 'VM': 0.0, 'VF': 0.0, 'VP': 0.0, 'VS': 0.0,
  'VT': 0.0, 'VW': 0.0, 'VV': 0.0, 'VY': 0.0,
  'YA': 0.0, 'YR': 0.5, 'YN': 0.0, 'YD': 0.0, 'YC': 0.0, 'YQ': 0.0, 'YE': 0.0, 'YG': 0.0,
  'YH': 0.0, 'YI': 0.0, 'YL': 0.0, 'YK': 0.0, 'YM': 0.0, 'YF': 0.0, 'YP': 0.0, 'YS': 0.0,
  'YT': 0.0, 'YW': 0.0, 'YV': 0.0, 'YY': 0.0,
};

// Chou-Fasman propensities for secondary structure
const CHOU_FASMAN: Record<string, { helix: number; sheet: number; turn: number }> = {
  A: { helix: 1.45, sheet: 0.97, turn: 0.66 }, C: { helix: 0.77, sheet: 1.30, turn: 0.84 },
  D: { helix: 0.98, sheet: 0.80, turn: 1.20 }, E: { helix: 1.53, sheet: 0.26, turn: 1.00 },
  F: { helix: 1.12, sheet: 1.28, turn: 0.58 }, G: { helix: 0.53, sheet: 0.81, turn: 1.56 },
  H: { helix: 1.24, sheet: 0.71, turn: 0.81 }, I: { helix: 1.00, sheet: 1.60, turn: 0.47 },
  K: { helix: 1.07, sheet: 0.74, turn: 1.01 }, L: { helix: 1.34, sheet: 1.22, turn: 0.57 },
  M: { helix: 1.20, sheet: 1.67, turn: 0.47 }, N: { helix: 0.73, sheet: 0.65, turn: 1.33 },
  P: { helix: 0.59, sheet: 0.62, turn: 1.52 }, Q: { helix: 1.17, sheet: 1.23, turn: 0.58 },
  R: { helix: 0.79, sheet: 0.90, turn: 0.93 }, S: { helix: 0.79, sheet: 0.72, turn: 1.32 },
  T: { helix: 0.82, sheet: 1.20, turn: 1.03 }, V: { helix: 1.14, sheet: 1.65, turn: 0.50 },
  W: { helix: 1.14, sheet: 1.19, turn: 0.75 }, Y: { helix: 0.61, sheet: 1.29, turn: 1.05 },
};

// Half-life lookup (N-end rule)
const HALF_LIFE_MAMMALIAN: Record<string, string> = {
  A: '4.4 h', 'R': '1 h', 'N': '1.4 h', 'D': '1.1 h', 'C': '1.2 h',
  Q: '0.8 h', 'E': '1 h', 'G': '30 h', 'H': '3.5 h', 'I': '20 h',
  'L': '5.5 h', 'K': '1.3 h', 'M': '30 h', 'F': '1.1 h', 'P': '>>20 h',
  'S': '1.9 h', 'T': '7.2 h', 'W': '2.8 h', 'V': '100 h', 'Y': '2.8 h',
};

const HALF_LIFE_YEAST: Record<string, string> = {
  A: '>20 h', 'R': '2 min', 'N': '3 min', 'D': '3 min', 'C': '>20 h',
  Q: '10 min', 'E': '30 min', 'G': '>20 h', 'H': '10 min', 'I': '30 min',
  'L': '3 min', 'K': '3 min', 'M': '>20 h', 'F': '3 min', 'P': '>20 h',
  'S': '>20 h', 'T': '>20 h', 'W': '3 min', 'V': '>20 h', 'Y': '10 min',
};

const HALF_LIFE_ECOLI: Record<string, string> = {
  A: '>10 h', 'R': '2 min', 'N': '>10 h', 'D': '>10 h', 'C': '>10 h',
  Q: '>10 h', 'E': '>10 h', 'G': '>10 h', 'H': '>10 h', 'I': '>10 h',
  'L': '2 min', 'K': '2 min', 'M': '>10 h', 'F': '2 min', 'P': '-',
  'S': '>10 h', 'T': '>10 h', 'W': '2 min', 'V': '>10 h', 'Y': '2 min',
};

export interface AminoAcidComposition {
  code: string;
  name: string;
  count: number;
  molePercent: number;
  massPercent: number;
  classification: string;
}

export interface AtomicComposition {
  C: number;
  H: number;
  N: number;
  O: number;
  S: number;
  total: number;
}

export interface HydrophobicityPoint {
  position: number;
  windowStart: number;
  windowEnd: number;
  value: number;
}

export interface SecondaryStructure {
  helix: number;
  sheet: number;
  turn: number;
  coil: number;
}

export interface ChargePoint {
  ph: number;
  charge: number;
}

export interface ProteinResults {
  sequence: string;
  sequenceLength: number;
  sequenceName: string;
  molecularWeight: { average: number; monoisotopic: number };
  theoreticalPi: number;
  aminoAcidComposition: AminoAcidComposition[];
  atomicComposition: AtomicComposition;
  extinctionCoefficient: {
    reduced: number;
    oxidized: number;
    absorbanceReduced: number;
    absorbanceOxidized: number;
  };
  instabilityIndex: number;
  isStable: boolean;
  aliphaticIndex: number;
  gravy: number;
  chargeAtPh7: number;
  halfLife: {
    mammalian: string;
    yeast: string;
    ecoli: string;
  };
  secondaryStructure: SecondaryStructure;
  hydrophobicityPlot: HydrophobicityPoint[];
  chargePlot: ChargePoint[];
  classificationCounts: Record<string, number>;
  nTerminus: string;
  cTerminus: string;
}

export function validateSequence(seq: string): { valid: boolean; error?: string; cleaned?: string } {
  if (!seq || seq.trim().length === 0) {
    return { valid: false, error: 'Sequence is empty' };
  }
  
  // Remove FASTA headers
  let cleaned = seq.replace(/>.*\n?/g, '');
  // Remove whitespace, numbers, and non-AA characters
  cleaned = cleaned.replace(/\s/g, '').replace(/[0-9]/g, '').toUpperCase();
  
  if (cleaned.length < 3) {
    return { valid: false, error: 'Sequence must be at least 3 amino acids long' };
  }
  if (cleaned.length > 50000) {
    return { valid: false, error: 'Sequence exceeds maximum length of 50,000 amino acids' };
  }
  
  // Check for invalid characters
  const invalid: string[] = [];
  for (const char of cleaned) {
    if (!VALID_AA.has(char)) {
      invalid.push(char);
    }
  }
  if (invalid.length > 0) {
    const unique = [...new Set(invalid)].slice(0, 10);
    return { valid: false, error: `Invalid amino acid characters: ${unique.join(', ')}` };
  }
  
  return { valid: true, cleaned };
}

export function parseFasta(fastaText: string): Array<{ header: string; sequence: string }> {
  const entries: Array<{ header: string; sequence: string }> = [];
  const lines = fastaText.split('\n');
  let currentHeader = '';
  let currentSeq = '';
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('>')) {
      if (currentHeader && currentSeq) {
        entries.push({ header: currentHeader, sequence: currentSeq });
      }
      currentHeader = trimmed.slice(1).trim();
      currentSeq = '';
    } else if (trimmed) {
      currentSeq += trimmed.replace(/\s/g, '').replace(/[0-9]/g, '').toUpperCase();
    }
  }
  
  if (currentHeader && currentSeq) {
    entries.push({ header: currentHeader, sequence: currentSeq });
  }
  
  return entries;
}

function computeNetCharge(sequence: string, ph: number): number {
  let positive = 0;
  let negative = 0;
  
  // N-terminus (average pK ~9.69 for first AA)
  const nTermAA = AMINO_ACID_DATA[sequence[0]];
  if (nTermAA) {
    positive += 1 / (1 + Math.pow(10, ph - nTermAA.pkNh3));
  }
  
  // C-terminus (average pK ~2.34 for last AA)
  const cTermAA = AMINO_ACID_DATA[sequence[sequence.length - 1]];
  if (cTermAA) {
    negative += 1 / (1 + Math.pow(10, cTermAA.pkCooh - ph));
  }
  
  for (const aa of sequence) {
    const data = AMINO_ACID_DATA[aa];
    if (!data) continue;
    
    // Basic residues (positive charge)
    if (aa === 'R' || aa === 'K' || aa === 'H') {
      if (data.pkR) {
        positive += 1 / (1 + Math.pow(10, ph - data.pkR));
      }
    }
    
    // Acidic residues (negative charge)
    if (aa === 'D' || aa === 'E') {
      negative += 1 / (1 + Math.pow(10, data.pkR! - ph));
    }
    
    // Cysteine
    if (aa === 'C' && data.pkR) {
      negative += 1 / (1 + Math.pow(10, data.pkR - ph));
    }
    
    // Tyrosine
    if (aa === 'Y' && data.pkR) {
      negative += 1 / (1 + Math.pow(10, data.pkR - ph));
    }
  }
  
  return positive - negative;
}

function computeTheoreticalPi(sequence: string): number {
  let low = 0;
  let high = 14;
  let mid = 7;
  
  for (let i = 0; i < 100; i++) {
    mid = (low + high) / 2;
    const charge = computeNetCharge(sequence, mid);
    if (Math.abs(charge) < 0.001) break;
    if (charge > 0) {
      low = mid;
    } else {
      high = mid;
    }
  }
  
  return parseFloat(mid.toFixed(2));
}

function computeInstabilityIndex(sequence: string): number {
  let totalWeight = 0;
  for (let i = 0; i < sequence.length - 1; i++) {
    const dipeptide = sequence[i] + sequence[i + 1];
    const weight = DIPEPTIDE_INSTABILITY[dipeptide];
    if (weight !== undefined) {
      totalWeight += weight;
    }
  }
  return (10.0 / sequence.length) * totalWeight;
}

function computeAliphaticIndex(_sequence: string, composition: AminoAcidComposition[]): number {
  const ala = composition.find(c => c.code === 'A')?.count || 0;
  const val = composition.find(c => c.code === 'V')?.count || 0;
  const ile = composition.find(c => c.code === 'I')?.count || 0;
  const leu = composition.find(c => c.code === 'L')?.count || 0;
  
  return parseFloat((ala + 2.9 * val + 3.9 * (ile + leu)).toFixed(3));
}

function computeGravy(sequence: string): number {
  let sum = 0;
  for (const aa of sequence) {
    const data = AMINO_ACID_DATA[aa];
    if (data) sum += data.hydrophobicity;
  }
  return parseFloat((sum / sequence.length).toFixed(3));
}

function computeSecondaryStructure(sequence: string): SecondaryStructure {
  let helixScore = 0, sheetScore = 0, turnScore = 0;
  
  for (const aa of sequence) {
    const props = CHOU_FASMAN[aa];
    if (props) {
      helixScore += props.helix;
      sheetScore += props.sheet;
      turnScore += props.turn;
    }
  }
  
  const total = helixScore + sheetScore + turnScore;
  if (total === 0) return { helix: 25, sheet: 25, turn: 25, coil: 25 };
  
  const helix = (helixScore / total) * 100;
  const sheet = (sheetScore / total) * 100;
  const turn = (turnScore / total) * 100;
  const coil = Math.max(0, 100 - helix - sheet - turn);
  
  const sum = helix + sheet + turn + coil;
  return {
    helix: parseFloat(((helix / sum) * 100).toFixed(1)),
    sheet: parseFloat(((sheet / sum) * 100).toFixed(1)),
    turn: parseFloat(((turn / sum) * 100).toFixed(1)),
    coil: parseFloat(((coil / sum) * 100).toFixed(1)),
  };
}

function computeHydrophobicityPlot(sequence: string, windowSize: number = 9): HydrophobicityPoint[] {
  const points: HydrophobicityPoint[] = [];
  const halfWindow = Math.floor(windowSize / 2);
  
  for (let i = 0; i < sequence.length; i++) {
    let sum = 0;
    let count = 0;
    const start = Math.max(0, i - halfWindow);
    const end = Math.min(sequence.length, i + halfWindow + 1);
    
    for (let j = start; j < end; j++) {
      const data = AMINO_ACID_DATA[sequence[j]];
      if (data) {
        sum += data.hydrophobicity;
        count++;
      }
    }
    
    if (count > 0) {
      points.push({
        position: i + 1,
        windowStart: start + 1,
        windowEnd: end,
        value: parseFloat((sum / count).toFixed(3)),
      });
    }
  }
  
  return points;
}

function computeChargePlot(sequence: string): ChargePoint[] {
  const points: ChargePoint[] = [];
  for (let ph = 0; ph <= 14; ph += 0.5) {
    points.push({
      ph: parseFloat(ph.toFixed(1)),
      charge: parseFloat(computeNetCharge(sequence, ph).toFixed(3)),
    });
  }
  return points;
}

export function analyzeProtein(sequence: string, sequenceName: string = ''): ProteinResults {
  const validation = validateSequence(sequence);
  if (!validation.valid || !validation.cleaned) {
    throw new Error(validation.error || 'Invalid sequence');
  }
  
  const seq = validation.cleaned;
  const length = seq.length;
  
  // Amino acid composition
  const aaCounts: Record<string, number> = {};
  for (const aa of seq) {
    aaCounts[aa] = (aaCounts[aa] || 0) + 1;
  }
  
  const composition: AminoAcidComposition[] = Object.keys(AMINO_ACID_DATA).map(code => {
    const data = AMINO_ACID_DATA[code];
    const count = aaCounts[code] || 0;
    return {
      code,
      name: data.name,
      count,
      molePercent: parseFloat(((count / length) * 100).toFixed(2)),
      massPercent: 0, // Will be calculated after MW
      classification: data.classification,
    };
  });
  
  // Molecular weight
  let avgWeight = 0;
  let monoWeight = 0;
  for (const aa of seq) {
    const data = AMINO_ACID_DATA[aa];
    if (data) {
      avgWeight += data.average;
      monoWeight += data.monoisotopic;
    }
  }
  avgWeight += 18.015;
  monoWeight += 18.011;
  
  // Update mass percentages
  for (const comp of composition) {
    const data = AMINO_ACID_DATA[comp.code];
    if (data) {
      comp.massPercent = parseFloat(((comp.count * data.average) / avgWeight * 100).toFixed(2));
    }
  }
  
  // Atomic composition
  const atoms: AtomicComposition = { C: 0, H: 0, N: 0, O: 0, S: 0, total: 0 };
  for (const aa of seq) {
    const data = AMINO_ACID_DATA[aa];
    if (data) {
      atoms.C += data.atoms.C;
      atoms.H += data.atoms.H;
      atoms.N += data.atoms.N;
      atoms.O += data.atoms.O;
      atoms.S += data.atoms.S;
    }
  }
  // Add water
  atoms.H += 2;
  atoms.O += 1;
  atoms.total = atoms.C + atoms.H + atoms.N + atoms.O + atoms.S;
  
  // Extinction coefficient
  const nW = aaCounts['W'] || 0;
  const nY = aaCounts['Y'] || 0;
  const nC = aaCounts['C'] || 0;
  const ecReduced = (nW * 5500) + (nY * 1490) + (nC * 125);
  const ecOxidized = ecReduced - (Math.floor(nC / 2) * 250);
  
  // Instability index
  const ii = computeInstabilityIndex(seq);
  
  // Aliphatic index
  const ai = computeAliphaticIndex(seq, composition);
  
  // GRAVY
  const gravy = computeGravy(seq);
  
  // Theoretical pI
  const pi = computeTheoreticalPi(seq);
  
  // Charge at pH 7
  const charge7 = parseFloat(computeNetCharge(seq, 7.0).toFixed(3));
  
  // Half-life
  const nTerm = seq[0];
  
  // Secondary structure
  const ss = computeSecondaryStructure(seq);
  
  // Hydrophobicity plot
  const hydroPlot = computeHydrophobicityPlot(seq);
  
  // Charge plot
  const chargePlot = computeChargePlot(seq);
  
  // Classification counts
  const classificationCounts: Record<string, number> = {};
  for (const comp of composition) {
    classificationCounts[comp.classification] = (classificationCounts[comp.classification] || 0) + comp.count;
  }
  
  return {
    sequence: seq,
    sequenceLength: length,
    sequenceName: sequenceName || `Sequence_${length}aa`,
    molecularWeight: { average: parseFloat(avgWeight.toFixed(2)), monoisotopic: parseFloat(monoWeight.toFixed(2)) },
    theoreticalPi: pi,
    aminoAcidComposition: composition.filter(c => c.count > 0).sort((a, b) => b.count - a.count),
    atomicComposition: atoms,
    extinctionCoefficient: {
      reduced: ecReduced,
      oxidized: Math.max(0, ecOxidized),
      absorbanceReduced: parseFloat((ecReduced / avgWeight).toFixed(3)),
      absorbanceOxidized: parseFloat((Math.max(0, ecOxidized) / avgWeight).toFixed(3)),
    },
    instabilityIndex: parseFloat(ii.toFixed(2)),
    isStable: ii < 40,
    aliphaticIndex: ai,
    gravy,
    chargeAtPh7: charge7,
    halfLife: {
      mammalian: HALF_LIFE_MAMMALIAN[nTerm] || '>10 h',
      yeast: HALF_LIFE_YEAST[nTerm] || '>20 h',
      ecoli: HALF_LIFE_ECOLI[nTerm] || '>10 h',
    },
    secondaryStructure: ss,
    hydrophobicityPlot: hydroPlot,
    chargePlot: chargePlot,
    classificationCounts,
    nTerminus: nTerm,
    cTerminus: seq[seq.length - 1],
  };
}

// Example protein sequence (Bovine Serum Albumin fragment)
export const EXAMPLE_SEQUENCE = `MKWVTFISLLLLFSSAYSRGVFRRDTHKSEIAHRFKDLGEEHFKGLVLIAFSQYLQQCPFEDHVKLVNEVTEFAKTCVADESAENCDKSLHTLFGDKLCTVATLRETYGEMADCCAKQEPERNECFLQHKDDNPNLPRLVRPEVDVMCTAFHDNEETFLKKYLYEIARRHPYFYAPELLYYANKYNGVFQECCQAEDKGACLLPKIETMREKVLASSARQRLRCASIQKFGERALKAWSVARLSQKFPKAEFVEVTKLVTDLTKVHKECCHGDLLECADDRADLAKYICENQDSISSKLKECCEKPLLEKSHCIAEVENDEMPADLPSLAADFVESKDVCKNYAEAKDVFLGMFLYEYARRHPDYSVVLLLRLAKTYETTLEKCCAAADPHECYAKVFDEFKPLVEEPQNLIKQNCELFEQLGEYKFQNALLVRYTKKVPQVSTPTLVEVSRNLGKVGSKCCKHPEAKRMPCAEDYLSVVLNQLCVLHEKTPVSDRVTKCCTESLVNRRPCFSALTPDETYVPKAFDEKLFTFHADICTLPDTEKQIKKQTALVELLKHKPKATEEQLKTVMENFVAFVDKCCAADDKEACFAVEGPKLVVSTQTALA`;
