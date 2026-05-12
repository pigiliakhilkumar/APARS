"""
ProtParam Service - Core Bioinformatics Calculations

This module implements all physicochemical property calculations for protein sequences.
It is equivalent to the ProtParam tool from ExPASY and BioPython.

Libraries used:
- Bio.SeqUtils.ProtParam: Primary protein analysis
- numpy: Array operations and mathematical computations
- scipy: Optimization algorithms (for pI calculation)
"""

from Bio.SeqUtils import ProtParamData
from Bio.SeqUtils.ProtParam import ProteinAnalysis
import numpy as np
from typing import Dict, List, Tuple, Optional


class ProtParamService:
    """
    Protein Parameter Analysis Service
    
    Computes physicochemical properties from amino acid sequences:
    - Molecular weight (average and monoisotopic)
    - Theoretical isoelectric point (pI)
    - Amino acid composition
    - Atomic composition
    - Extinction coefficient
    - Instability index
    - Aliphatic index
    - GRAVY (Grand Average of Hydropathy)
    - Secondary structure prediction
    - Hydrophobicity profile
    - Charge vs pH profile
    - Estimated half-life
    """
    
    def __init__(self):
        # Kyte-Doolittle hydropathy values
        self.kd_scale = ProtParamData.kd
        
        # Amino acid data table
        self.aa_data = self._init_aa_data()
    
    def _init_aa_data(self) -> Dict:
        """Initialize amino acid reference data"""
        aa_table = {
            'A': {'name': 'Alanine',       'mono': 71.03711,  'avg': 71.0788,  'kd': 1.8,  'class': 'nonpolar'},
            'R': {'name': 'Arginine',      'mono': 156.10111, 'avg': 156.1875, 'kd': -4.5, 'class': 'basic'},
            'N': {'name': 'Asparagine',    'mono': 114.04293, 'avg': 114.1038, 'kd': -3.5, 'class': 'polar'},
            'D': {'name': 'Aspartic Acid', 'mono': 115.02694, 'avg': 115.0886, 'kd': -3.5, 'class': 'acidic'},
            'C': {'name': 'Cysteine',      'mono': 103.00919, 'avg': 103.1388, 'kd': 2.5,  'class': 'special'},
            'Q': {'name': 'Glutamine',     'mono': 128.05858, 'avg': 128.1307, 'kd': -3.5, 'class': 'polar'},
            'E': {'name': 'Glutamic Acid', 'mono': 129.04259, 'avg': 129.1155, 'kd': -3.5, 'class': 'acidic'},
            'G': {'name': 'Glycine',       'mono': 57.02146,  'avg': 57.0519,  'kd': -0.4, 'class': 'nonpolar'},
            'H': {'name': 'Histidine',     'mono': 137.05891, 'avg': 137.1411, 'kd': -3.2, 'class': 'basic'},
            'I': {'name': 'Isoleucine',    'mono': 113.08406, 'avg': 113.1594, 'kd': 4.5,  'class': 'nonpolar'},
            'L': {'name': 'Leucine',       'mono': 113.08406, 'avg': 113.1594, 'kd': 3.8,  'class': 'nonpolar'},
            'K': {'name': 'Lysine',        'mono': 128.09496, 'avg': 128.1741, 'kd': -3.9, 'class': 'basic'},
            'M': {'name': 'Methionine',    'mono': 131.04049, 'avg': 131.1925, 'kd': 1.9,  'class': 'nonpolar'},
            'F': {'name': 'Phenylalanine', 'mono': 147.06841, 'avg': 147.1766, 'kd': 2.8,  'class': 'aromatic'},
            'P': {'name': 'Proline',       'mono': 97.05276,  'avg': 97.1167,  'kd': -1.6, 'class': 'nonpolar'},
            'S': {'name': 'Serine',        'mono': 87.03203,  'avg': 87.0782,  'kd': -0.8, 'class': 'polar'},
            'T': {'name': 'Threonine',     'mono': 101.04768, 'avg': 101.1051, 'kd': -0.7, 'class': 'polar'},
            'W': {'name': 'Tryptophan',    'mono': 186.07931, 'avg': 186.2132, 'kd': -0.9, 'class': 'aromatic'},
            'V': {'name': 'Valine',        'mono': 99.06841,  'avg': 99.1326,  'kd': 4.2,  'class': 'nonpolar'},
            'Y': {'name': 'Tyrosine',      'mono': 163.06333, 'avg': 163.1760, 'kd': -1.3, 'class': 'aromatic'},
        }
        return aa_table
    
    def analyze(self, sequence: str, name: str = "Unnamed Sequence") -> Dict:
        """
        Main analysis function - computes all protein properties
        
        Args:
            sequence: Amino acid sequence (single-letter code)
            name: Optional display name
            
        Returns:
            Dictionary containing all computed properties
        """
        # Clean the sequence
        seq = self._clean_sequence(sequence)
        
        # Use BioPython's ProteinAnalysis
        analyzer = ProteinAnalysis(seq)
        
        # Basic properties
        length = len(seq)
        
        # Molecular weight
        mw_avg = analyzer.molecular_weight()
        mw_mono = sum(self.aa_data[aa]['mono'] for aa in seq) + 18.011
        
        # Theoretical pI
        pi = analyzer.isoelectric_point()
        
        # Amino acid composition
        composition = self._get_composition(analyzer, seq)
        
        # Atomic composition
        atomic = self._get_atomic_composition(seq)
        
        # Extinction coefficient
        ext_coeff = analyzer.molar_extinction_coefficient()
        
        # Instability index
        instability = analyzer.instability_index()
        
        # Aliphatic index
        aliphatic = self._aliphatic_index(analyzer, seq)
        
        # GRAVY
        gravy = analyzer.gravy()
        
        # Secondary structure
        ss = analyzer.secondary_structure_fraction()
        
        # Hydrophobicity profile
        hydro_profile = self._hydrophobicity_profile(seq)
        
        # Charge profile
        charge_profile = self._charge_profile(seq)
        
        # Half-life
        half_life = self._half_life(seq[0])
        
        # Classification counts
        class_counts = self._classification_counts(seq)
        
        return {
            'sequence_name': name,
            'sequence': seq,
            'sequence_length': length,
            'molecular_weight': {
                'average': round(mw_avg, 2),
                'monoisotopic': round(mw_mono, 2),
            },
            'theoretical_pi': round(pi, 2),
            'amino_acid_composition': composition,
            'atomic_composition': atomic,
            'extinction_coefficient': {
                'reduced': ext_coeff[0],
                'oxidized': ext_coeff[1],
                'absorbance_reduced': round(ext_coeff[0] / mw_avg, 3) if mw_avg > 0 else 0,
                'absorbance_oxidized': round(ext_coeff[1] / mw_avg, 3) if mw_avg > 0 else 0,
            },
            'instability_index': round(instability, 2),
            'is_stable': instability < 40,
            'aliphatic_index': round(aliphatic, 3),
            'gravy': round(gravy, 3),
            'charge_at_ph7': round(self._charge_at_ph(seq, 7.0), 3),
            'half_life': half_life,
            'secondary_structure': {
                'helix': round(ss[0] * 100, 1),
                'sheet': round(ss[1] * 100, 1),
                'turn': round(ss[2] * 100, 1),
            },
            'hydrophobicity_plot': hydro_profile,
            'charge_plot': charge_profile,
            'classification_counts': class_counts,
            'n_terminus': seq[0],
            'c_terminus': seq[-1],
        }
    
    def _clean_sequence(self, sequence: str) -> str:
        """Clean sequence - remove whitespace, numbers, and invalid characters"""
        valid = set('ACDEFGHIKLMNPQRSTVWY')
        cleaned = ''.join(c.upper() for c in sequence if c.upper() in valid)
        if len(cleaned) < 3:
            raise ValueError("Sequence must be at least 3 amino acids")
        if len(cleaned) > 50000:
            raise ValueError("Sequence exceeds maximum length of 50,000")
        return cleaned
    
    def _get_composition(self, analyzer: ProteinAnalysis, seq: str) -> List[Dict]:
        """Get detailed amino acid composition"""
        counts = analyzer.count_amino_acids()
        total = len(seq)
        mw = analyzer.molecular_weight()
        
        composition = []
        for aa in sorted(self.aa_data.keys()):
            count = counts.get(aa, 0)
            if count > 0:
                aa_info = self.aa_data[aa]
                composition.append({
                    'code': aa,
                    'name': aa_info['name'],
                    'count': count,
                    'mole_percent': round((count / total) * 100, 2),
                    'mass_percent': round((count * aa_info['avg']) / mw * 100, 2),
                    'classification': aa_info['class'],
                })
        
        # Sort by count descending
        composition.sort(key=lambda x: x['count'], reverse=True)
        return composition
    
    def _get_atomic_composition(self, seq: str) -> Dict:
        """Calculate atomic composition (C, H, N, O, S)"""
        # Simplified atom counts per amino acid
        atoms = {
            'A': {'C': 3, 'H': 7,  'N': 1, 'O': 2, 'S': 0},
            'R': {'C': 6, 'H': 14, 'N': 4, 'O': 2, 'S': 0},
            'N': {'C': 4, 'H': 8,  'N': 2, 'O': 3, 'S': 0},
            'D': {'C': 4, 'H': 7,  'N': 1, 'O': 4, 'S': 0},
            'C': {'C': 3, 'H': 7,  'N': 1, 'O': 2, 'S': 1},
            'Q': {'C': 5, 'H': 10, 'N': 2, 'O': 3, 'S': 0},
            'E': {'C': 5, 'H': 9,  'N': 1, 'O': 4, 'S': 0},
            'G': {'C': 2, 'H': 5,  'N': 1, 'O': 2, 'S': 0},
            'H': {'C': 6, 'H': 9,  'N': 3, 'O': 2, 'S': 0},
            'I': {'C': 6, 'H': 13, 'N': 1, 'O': 2, 'S': 0},
            'L': {'C': 6, 'H': 13, 'N': 1, 'O': 2, 'S': 0},
            'K': {'C': 6, 'H': 14, 'N': 2, 'O': 2, 'S': 0},
            'M': {'C': 5, 'H': 11, 'N': 1, 'O': 2, 'S': 1},
            'F': {'C': 9, 'H': 11, 'N': 1, 'O': 2, 'S': 0},
            'P': {'C': 5, 'H': 9,  'N': 1, 'O': 2, 'S': 0},
            'S': {'C': 3, 'H': 7,  'N': 1, 'O': 3, 'S': 0},
            'T': {'C': 4, 'H': 9,  'N': 1, 'O': 3, 'S': 0},
            'W': {'C': 11,'H': 12, 'N': 2, 'O': 2, 'S': 0},
            'V': {'C': 5, 'H': 11, 'N': 1, 'O': 2, 'S': 0},
            'Y': {'C': 9, 'H': 11, 'N': 1, 'O': 3, 'S': 0},
        }
        
        result = {'C': 0, 'H': 0, 'N': 0, 'O': 0, 'S': 0}
        for aa in seq:
            if aa in atoms:
                for atom in result:
                    result[atom] += atoms[aa][atom]
        
        # Add water
        result['H'] += 2
        result['O'] += 1
        result['total'] = sum(result.values())
        
        return result
    
    def _aliphatic_index(self, analyzer: ProteinAnalysis, seq: str) -> float:
        """Calculate aliphatic index"""
        counts = analyzer.count_amino_acids()
        total = len(seq)
        
        ala = counts.get('A', 0)
        val = counts.get('V', 0)
        ile = counts.get('I', 0)
        leu = counts.get('L', 0)
        
        return ala + 2.9 * val + 3.9 * (ile + leu)
    
    def _hydrophobicity_profile(self, seq: str, window: int = 9) -> List[Dict]:
        """Compute Kyte-Doolittle hydropathy profile with sliding window"""
        half = window // 2
        profile = []
        
        for i in range(len(seq)):
            start = max(0, i - half)
            end = min(len(seq), i + half + 1)
            
            values = [self.kd_scale.get(seq[j], 0) for j in range(start, end)]
            avg = sum(values) / len(values) if values else 0
            
            profile.append({
                'position': i + 1,
                'value': round(avg, 3)
            })
        
        return profile
    
    def _charge_at_ph(self, seq: str, ph: float) -> float:
        """Calculate net charge at given pH"""
        # Use BioPython's built-in method
        analyzer = ProteinAnalysis(seq)
        charge = analyzer.charge_at_pH(ph)
        return charge
    
    def _charge_profile(self, seq: str) -> List[Dict]:
        """Generate charge vs pH profile"""
        profile = []
        for ph in np.arange(0, 14.5, 0.5):
            charge = self._charge_at_ph(seq, ph)
            profile.append({
                'ph': round(ph, 1),
                'charge': round(charge, 3)
            })
        return profile
    
    def _half_life(self, n_term: str) -> Dict:
        """Get estimated half-life based on N-terminal residue"""
        mammalian = {
            'A': '4.4 h', 'R': '1 h', 'N': '1.4 h', 'D': '1.1 h', 'C': '1.2 h',
            'Q': '0.8 h', 'E': '1 h', 'G': '30 h', 'H': '3.5 h', 'I': '20 h',
            'L': '5.5 h', 'K': '1.3 h', 'M': '30 h', 'F': '1.1 h', 'P': '>20 h',
            'S': '1.9 h', 'T': '7.2 h', 'W': '2.8 h', 'V': '100 h', 'Y': '2.8 h',
        }
        yeast = {
            'A': '>20 h', 'R': '2 min', 'N': '3 min', 'D': '3 min', 'C': '>20 h',
            'Q': '10 min', 'E': '30 min', 'G': '>20 h', 'H': '10 min', 'I': '30 min',
            'L': '3 min', 'K': '3 min', 'M': '>20 h', 'F': '3 min', 'P': '>20 h',
            'S': '>20 h', 'T': '>20 h', 'W': '3 min', 'V': '>20 h', 'Y': '10 min',
        }
        ecoli = {
            'A': '>10 h', 'R': '2 min', 'N': '>10 h', 'D': '>10 h', 'C': '>10 h',
            'Q': '>10 h', 'E': '>10 h', 'G': '>10 h', 'H': '>10 h', 'I': '>10 h',
            'L': '2 min', 'K': '2 min', 'M': '>10 h', 'F': '2 min', 'P': '-',
            'S': '>10 h', 'T': '>10 h', 'W': '2 min', 'V': '>10 h', 'Y': '2 min',
        }
        
        return {
            'mammalian': mammalian.get(n_term, 'Unknown'),
            'yeast': yeast.get(n_term, 'Unknown'),
            'ecoli': ecoli.get(n_term, 'Unknown'),
        }
    
    def _classification_counts(self, seq: str) -> Dict:
        """Count amino acids by classification"""
        counts = {}
        for aa in seq:
            cls = self.aa_data[aa]['class']
            counts[cls] = counts.get(cls, 0) + 1
        return counts
    
    def get_amino_acid_table(self) -> Dict:
        """Return the amino acid reference table"""
        return {
            'amino_acids': self.aa_data,
            'classifications': {
                'polar': 'Polar (hydrophilic)',
                'nonpolar': 'Non-polar (hydrophobic)',
                'acidic': 'Acidic (negatively charged)',
                'basic': 'Basic (positively charged)',
                'aromatic': 'Aromatic',
                'special': 'Special (Cysteine)',
            },
            'scales': {
                'hydropathy': 'Kyte-Doolittle',
                'description': 'Values > 0 are hydrophobic, < 0 are hydrophilic',
            }
        }
