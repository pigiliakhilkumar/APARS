"""
Report Generator Service

Generates downloadable reports in multiple formats:
- PDF: Publication-ready formatted reports
- CSV: Spreadsheet data for further analysis
- JSON: Machine-readable structured data

Libraries used:
- reportlab: PDF generation
- pandas: CSV data formatting
- json: JSON export (built-in)
"""

from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
import pandas as pd
import json
from typing import Dict, List
from datetime import datetime


class ReportGenerator:
    """
    Protein Analysis Report Generator
    
    Creates professional, publication-ready reports from
    protein analysis results.
    """
    
    def generate_pdf(self, results: Dict, output_path: str) -> str:
        """
        Generate a PDF report
        
        Args:
            results: Complete analysis results dictionary
            output_path: Path to save the PDF file
            
        Returns:
            Path to the generated PDF file
        """
        doc = SimpleDocTemplate(
            output_path,
            pagesize=letter,
            rightMargin=72,
            leftMargin=72,
            topMargin=72,
            bottomMargin=18
        )
        
        # Container for the 'Flowable' objects
        elements = []
        styles = getSampleStyleSheet()
        
        # Custom styles
        title_style = ParagraphStyle(
            'CustomTitle',
            parent=styles['Heading1'],
            fontSize=24,
            textColor=colors.HexColor('#2563EB'),
            spaceAfter=30,
            alignment=TA_CENTER
        )
        
        heading_style = ParagraphStyle(
            'CustomHeading',
            parent=styles['Heading2'],
            fontSize=14,
            textColor=colors.HexColor('#1E293B'),
            spaceAfter=12,
            spaceBefore=12
        )
        
        # Title
        elements.append(Paragraph("APARS Protein Analysis Report", title_style))
        elements.append(Spacer(1, 0.2 * inch))
        
        # Metadata
        meta_data = [
            ['Sequence Name:', results.get('sequence_name', 'N/A')],
            ['Sequence Length:', f"{results.get('sequence_length', 0)} residues"],
            ['Generated:', datetime.now().strftime("%Y-%m-%d %H:%M:%S")],
        ]
        meta_table = Table(meta_data, colWidths=[2 * inch, 4 * inch])
        meta_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (0, -1), colors.HexColor('#F1F5F9')),
            ('TEXTCOLOR', (0, 0), (-1, -1), colors.HexColor('#334155')),
            ('ALIGN', (0, 0), (0, -1), 'LEFT'),
            ('ALIGN', (1, 0), (1, -1), 'LEFT'),
            ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
            ('FONTNAME', (1, 0), (1, -1), 'Helvetica'),
            ('FONTSIZE', (0, 0), (-1, -1), 10),
            ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#CBD5E1')),
            ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ]))
        elements.append(meta_table)
        elements.append(Spacer(1, 0.3 * inch))
        
        # Basic Properties Section
        elements.append(Paragraph("Basic Properties", heading_style))
        
        basic_props = [
            ['Property', 'Value'],
            ['Molecular Weight (average)', f"{results.get('molecular_weight', {}).get('average', 0):.2f} Da"],
            ['Molecular Weight (monoisotopic)', f"{results.get('molecular_weight', {}).get('monoisotopic', 0):.2f} Da"],
            ['Theoretical pI', str(results.get('theoretical_pi', 'N/A'))],
            ['GRAVY Score', str(results.get('gravy', 'N/A'))],
            ['Instability Index', f"{results.get('instability_index', 0)} ({'Stable' if results.get('is_stable') else 'Unstable'})"],
            ['Aliphatic Index', str(results.get('aliphatic_index', 'N/A'))],
            ['Charge at pH 7', str(results.get('charge_at_ph7', 'N/A'))],
            ['Extinction Coeff (reduced)', f"{results.get('extinction_coefficient', {}).get('reduced', 0)} M\u207B\u00B9cm\u207B\u00B9"],
            ['Extinction Coeff (oxidized)', f"{results.get('extinction_coefficient', {}).get('oxidized', 0)} M\u207B\u00B9cm\u207B\u00B9"],
        ]
        
        basic_table = Table(basic_props, colWidths=[3 * inch, 3 * inch])
        basic_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#2563EB')),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, 0), 11),
            ('FONTNAME', (0, 1), (-1, -1), 'Helvetica'),
            ('FONTSIZE', (0, 1), (-1, -1), 10),
            ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#CBD5E1')),
            ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#F8FAFC')]),
            ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ]))
        elements.append(basic_table)
        elements.append(Spacer(1, 0.2 * inch))
        
        # Atomic Composition
        elements.append(Paragraph("Atomic Composition", heading_style))
        atomic = results.get('atomic_composition', {})
        atomic_data = [['Atom', 'Count', 'Percentage']]
        for atom in ['C', 'H', 'N', 'O', 'S']:
            count = atomic.get(atom, 0)
            pct = (count / atomic.get('total', 1)) * 100 if atomic.get('total') else 0
            atomic_data.append([atom, str(count), f"{pct:.1f}%"])
        
        atomic_table = Table(atomic_data, colWidths=[2 * inch, 2 * inch, 2 * inch])
        atomic_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#2563EB')),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#CBD5E1')),
            ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#F8FAFC')]),
        ]))
        elements.append(atomic_table)
        elements.append(PageBreak())
        
        # Amino Acid Composition
        elements.append(Paragraph("Amino Acid Composition", heading_style))
        
        aa_data = [['AA', 'Name', 'Count', 'Mole %', 'Mass %']]
        for aa in results.get('amino_acid_composition', []):
            aa_data.append([
                aa.get('code', ''),
                aa.get('name', ''),
                str(aa.get('count', 0)),
                f"{aa.get('mole_percent', 0):.2f}%",
                f"{aa.get('mass_percent', 0):.2f}%",
            ])
        
        aa_table = Table(aa_data, colWidths=[0.6 * inch, 1.8 * inch, 1 * inch, 1 * inch, 1 * inch])
        aa_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#2563EB')),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('ALIGN', (1, 1), (1, -1), 'LEFT'),
            ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#CBD5E1')),
            ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#F8FAFC')]),
            ('FONTSIZE', (0, 0), (-1, -1), 9),
        ]))
        elements.append(aa_table)
        
        # Build PDF
        doc.build(elements)
        return output_path
    
    def generate_csv(self, results: Dict, output_path: str) -> str:
        """
        Generate a CSV file with analysis results
        
        Args:
            results: Complete analysis results dictionary
            output_path: Path to save the CSV file
            
        Returns:
            Path to the generated CSV file
        """
        rows = []
        
        # Basic properties
        rows.append(['Property', 'Value'])
        rows.append(['Sequence Name', results.get('sequence_name', 'N/A')])
        rows.append(['Sequence Length', str(results.get('sequence_length', 0))])
        rows.append(['Molecular Weight (avg)', str(results.get('molecular_weight', {}).get('average', 0))])
        rows.append(['Molecular Weight (mono)', str(results.get('molecular_weight', {}).get('monoisotopic', 0))])
        rows.append(['Theoretical pI', str(results.get('theoretical_pi', 'N/A'))])
        rows.append(['GRAVY', str(results.get('gravy', 'N/A'))])
        rows.append(['Instability Index', str(results.get('instability_index', 'N/A'))])
        rows.append(['Aliphatic Index', str(results.get('aliphatic_index', 'N/A'))])
        rows.append(['Charge at pH 7', str(results.get('charge_at_ph7', 'N/A'))])
        rows.append([])
        
        # Amino acid composition
        rows.append(['AA', 'Name', 'Count', 'Mole %', 'Mass %'])
        for aa in results.get('amino_acid_composition', []):
            rows.append([
                aa.get('code', ''),
                aa.get('name', ''),
                str(aa.get('count', 0)),
                str(aa.get('mole_percent', 0)),
                str(aa.get('mass_percent', 0)),
            ])
        
        # Write to CSV
        df = pd.DataFrame(rows)
        df.to_csv(output_path, index=False, header=False)
        return output_path
