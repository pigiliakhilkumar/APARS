"""
FASTA Parser Service

Handles parsing of FASTA format files, which are the standard format
for representing nucleotide or peptide sequences.

FASTA format:
    >header_line with optional description
    SEQUENCELINE1
    SEQUENCELINE2
    
    >next_sequence_header
    SEQUENCE...

Libraries used:
- Bio.SeqIO: Primary FASTA parsing (Biopython)
"""

from Bio import SeqIO
from io import StringIO
from typing import List, Dict


class FastaParser:
    """
    FASTA File Parser
    
    Parses FASTA format files and extracts sequence entries.
    Supports both single and multi-sequence FASTA files.
    """
    
    def parse(self, content: str) -> List[Dict]:
        """
        Parse FASTA content and return list of sequence entries
        
        Args:
            content: String containing FASTA formatted data
            
        Returns:
            List of dicts with 'header' and 'sequence' keys
        """
        sequences = []
        
        # Use Biopython for robust parsing
        try:
            handle = StringIO(content)
            for record in SeqIO.parse(handle, "fasta"):
                sequences.append({
                    'header': record.description,
                    'sequence': str(record.seq),
                    'id': record.id,
                    'length': len(record.seq)
                })
        except Exception:
            # Fallback: manual parsing if Biopython fails
            sequences = self._manual_parse(content)
        
        return sequences
    
    def _manual_parse(self, content: str) -> List[Dict]:
        """Manual FASTA parser as fallback"""
        sequences = []
        current_header = ""
        current_seq = []
        
        for line in content.split('\n'):
            line = line.strip()
            if not line:
                continue
            
            if line.startswith('>'):
                # Save previous sequence if exists
                if current_header and current_seq:
                    sequences.append({
                        'header': current_header,
                        'sequence': ''.join(current_seq),
                        'id': current_header.split()[0],
                        'length': len(''.join(current_seq))
                    })
                # Start new sequence
                current_header = line[1:].strip()
                current_seq = []
            else:
                # Sequence line - keep only alphabetic characters
                cleaned = ''.join(c for c in line if c.isalpha())
                if cleaned:
                    current_seq.append(cleaned.upper())
        
        # Don't forget the last sequence
        if current_header and current_seq:
            sequences.append({
                'header': current_header,
                'sequence': ''.join(current_seq),
                'id': current_header.split()[0],
                'length': len(''.join(current_seq))
            })
        
        return sequences
    
    def validate(self, content: str) -> Dict:
        """
        Validate FASTA content without full parsing
        
        Returns:
            Dict with 'valid' (bool) and 'error' (str or None)
        """
        lines = content.strip().split('\n')
        
        if not lines:
            return {'valid': False, 'error': 'Empty file'}
        
        # Check for at least one header
        has_header = any(line.strip().startswith('>') for line in lines)
        if not has_header:
            return {'valid': False, 'error': 'No FASTA headers found (lines starting with >)'}
        
        # Check for sequence content
        has_sequence = any(
            line.strip() and not line.strip().startswith('>') 
            for line in lines
        )
        if not has_sequence:
            return {'valid': False, 'error': 'No sequence data found'}
        
        return {'valid': True, 'error': None}
