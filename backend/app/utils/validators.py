"""
Input Validation Utilities

Provides validation functions for protein sequences, FASTA files,
and other user inputs to ensure data integrity and security.
"""

import re
from typing import Tuple, Optional


# Valid amino acid single-letter codes
VALID_AA = set('ACDEFGHIKLMNPQRSTVWY')


def validate_sequence(sequence: str) -> Tuple[bool, Optional[str], str]:
    """
    Validate a protein sequence
    
    Args:
        sequence: Raw sequence string (may contain whitespace, numbers, etc.)
        
    Returns:
        Tuple of (is_valid, error_message, cleaned_sequence)
    """
    if not sequence or not sequence.strip():
        return False, "Sequence is empty", ""
    
    # Remove FASTA headers, whitespace, and numbers
    cleaned = re.sub(r'>.*\n?', '', sequence)  # Remove FASTA headers
    cleaned = re.sub(r'\s', '', cleaned)       # Remove whitespace
    cleaned = re.sub(r'[0-9]', '', cleaned)    # Remove numbers
    cleaned = cleaned.upper()                   # Convert to uppercase
    
    # Keep only valid amino acid characters
    cleaned = ''.join(c for c in cleaned if c in VALID_AA)
    
    if len(cleaned) < 3:
        return False, "Sequence must be at least 3 amino acids long after cleaning", ""
    
    if len(cleaned) > 50000:
        return False, "Sequence exceeds maximum length of 50,000 amino acids", ""
    
    # Check for invalid characters in original
    original_chars = set(sequence.upper())
    invalid = original_chars - VALID_AA - set(' \t\n\r0123456789>')
    if invalid:
        return False, f"Invalid characters found: {', '.join(sorted(invalid))}", cleaned
    
    return True, None, cleaned


def validate_fasta(content: str) -> Tuple[bool, Optional[str]]:
    """
    Validate FASTA format content
    
    Args:
        content: FASTA file content as string
        
    Returns:
        Tuple of (is_valid, error_message)
    """
    lines = content.strip().split('\n')
    
    if not lines:
        return False, "File is empty"
    
    # Check for at least one header
    has_header = any(line.strip().startswith('>') for line in lines)
    if not has_header:
        return False, "No FASTA headers found (lines starting with >)"
    
    # Check for sequence content
    has_sequence = any(
        line.strip() and not line.strip().startswith('>')
        for line in lines
    )
    if not has_sequence:
        return False, "No sequence data found"
    
    return True, None


def sanitize_filename(filename: str) -> str:
    """
    Sanitize a filename for security
    
    Removes potentially dangerous characters from filenames
    to prevent directory traversal attacks.
    """
    # Remove path components
    filename = filename.replace('\\', '/').split('/')[-1]
    
    # Remove non-alphanumeric characters except safe ones
    filename = re.sub(r'[^a-zA-Z0-9._-]', '_', filename)
    
    # Limit length
    if len(filename) > 100:
        name, ext = filename[:96], filename[-4:] if '.' in filename else ''
        filename = name + ext
    
    return filename
