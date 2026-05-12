"""
APARS - AI-Powered Protein Analysis and Research Suite
FastAPI Backend Application

This is the main entry point for the APARS backend API.
It provides REST endpoints for protein sequence analysis,
FASTA file parsing, report generation, and AI-powered features.
"""

from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from pydantic import BaseModel, Field, validator
from typing import Optional, List
import os
import tempfile
import json
from datetime import datetime

# Import our services
from app.services.protparam import ProtParamService
from app.services.fasta_parser import FastaParser
from app.services.report_gen import ReportGenerator

# ============================================================================
# App Initialization
# ============================================================================

app = FastAPI(
    title="APARS API",
    description="AI-Powered Protein Analysis and Research Suite - Backend API",
    version="1.0.0",
    contact={
        "name": "APARS Team",
        "email": "support@apars.bio",
    },
    license_info={
        "name": "MIT License",
        "url": "https://opensource.org/licenses/MIT",
    },
)

# CORS - Allow frontend to access the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize services
prot_param = ProtParamService()
fasta_parser = FastaParser()
report_gen = ReportGenerator()

# ============================================================================
# Request/Response Models
# ============================================================================

class SequenceRequest(BaseModel):
    """Request model for sequence analysis"""
    sequence: str = Field(..., min_length=3, max_length=50000, description="Protein sequence in single-letter code")
    name: Optional[str] = Field("Unnamed Sequence", description="Optional display name for the sequence")
    
    @validator('sequence')
    def validate_sequence(cls, v):
        """Validate that sequence contains only valid amino acid characters"""
        valid_aa = set('ACDEFGHIKLMNPQRSTVWY')
        cleaned = ''.join(c for c in v.upper() if c.isalpha())
        invalid = set(cleaned) - valid_aa
        if invalid:
            raise ValueError(f"Invalid amino acid characters: {', '.join(sorted(invalid))}")
        return cleaned

class AnalysisResponse(BaseModel):
    """Response model for protein analysis"""
    success: bool
    data: Optional[dict] = None
    error: Optional[str] = None
    computation_time_ms: Optional[float] = None

class ExportRequest(BaseModel):
    """Request model for exporting results"""
    sequence: str
    results: dict
    format: str = Field("pdf", pattern="^(pdf|csv|json)$")


# ============================================================================
# API Endpoints
# ============================================================================

@app.get("/")
async def root():
    """API root - returns basic info"""
    return {
        "name": "APARS API",
        "version": "1.0.0",
        "description": "AI-Powered Protein Analysis and Research Suite",
        "endpoints": [
            "/api/v1/analyze",
            "/api/v1/analyze/fasta",
            "/api/v1/export/pdf",
            "/api/v1/export/csv",
            "/api/v1/export/json",
            "/api/v1/health",
        ],
        "docs": "/docs",
    }


@app.get("/api/v1/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "services": {
            "protparam": "available",
            "fasta_parser": "available",
            "report_generator": "available",
        }
    }


@app.post("/api/v1/analyze", response_model=AnalysisResponse)
async def analyze_sequence(request: SequenceRequest):
    """
    Analyze a protein sequence and return all computed physicochemical properties.
    
    - **sequence**: Amino acid sequence (single-letter code, 3-50000 residues)
    - **name**: Optional display name
    
    Returns molecular weight, pI, composition, extinction coefficient,
    instability index, aliphatic index, GRAVY, and more.
    """
    import time
    start_time = time.time()
    
    try:
        # Run the analysis
        results = prot_param.analyze(request.sequence, request.name)
        computation_time = (time.time() - start_time) * 1000
        
        return AnalysisResponse(
            success=True,
            data=results,
            computation_time_ms=round(computation_time, 2)
        )
    except Exception as e:
        return AnalysisResponse(
            success=False,
            error=str(e)
        )


@app.post("/api/v1/analyze/fasta")
async def analyze_fasta(file: UploadFile = File(...)):
    """
    Upload and analyze a FASTA file containing one or more protein sequences.
    
    - **file**: FASTA file (.fasta, .fa, .txt)
    
    Returns analysis results for all sequences in the file.
    """
    import time
    start_time = time.time()
    
    # Validate file type
    allowed_extensions = {'.fasta', '.fa', '.txt'}
    file_ext = os.path.splitext(file.filename)[1].lower()
    if file_ext not in allowed_extensions:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid file type. Allowed: {', '.join(allowed_extensions)}"
        )
    
    try:
        # Read file content
        content = await file.read()
        content_str = content.decode('utf-8')
        
        # Parse FASTA
        sequences = fasta_parser.parse(content_str)
        
        if not sequences:
            raise HTTPException(status_code=400, detail="No valid sequences found in file")
        
        # Analyze each sequence
        results = []
        for seq_entry in sequences:
            analysis = prot_param.analyze(seq_entry['sequence'], seq_entry['header'])
            results.append({
                'header': seq_entry['header'],
                'analysis': analysis
            })
        
        computation_time = (time.time() - start_time) * 1000
        
        return {
            'success': True,
            'file_name': file.filename,
            'sequences_found': len(sequences),
            'results': results,
            'computation_time_ms': round(computation_time, 2)
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")


@app.post("/api/v1/export/pdf")
async def export_pdf(request: ExportRequest):
    """
    Generate a PDF report for the analyzed sequence.
    
    - **sequence**: The analyzed sequence
    - **results**: Complete analysis results
    
    Returns a downloadable PDF file.
    """
    try:
        with tempfile.NamedTemporaryFile(suffix='.pdf', delete=False) as tmp:
            report_gen.generate_pdf(request.results, tmp.name)
            return FileResponse(
                tmp.name,
                media_type='application/pdf',
                filename=f"apars-report-{request.results.get('sequence_name', 'analysis').replace(' ', '_')}.pdf"
            )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"PDF generation failed: {str(e)}")


@app.post("/api/v1/export/csv")
async def export_csv(request: ExportRequest):
    """
    Export analysis results as a CSV file.
    
    - **results**: Complete analysis results
    
    Returns a downloadable CSV file.
    """
    try:
        with tempfile.NamedTemporaryFile(suffix='.csv', mode='w', delete=False) as tmp:
            report_gen.generate_csv(request.results, tmp.name)
            return FileResponse(
                tmp.name,
                media_type='text/csv',
                filename=f"apars-data-{request.results.get('sequence_name', 'analysis').replace(' ', '_')}.csv"
            )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"CSV export failed: {str(e)}")


@app.post("/api/v1/export/json")
async def export_json(request: ExportRequest):
    """
    Export analysis results as a JSON file.
    
    - **results**: Complete analysis results
    
    Returns a downloadable JSON file.
    """
    try:
        with tempfile.NamedTemporaryFile(suffix='.json', mode='w', delete=False) as tmp:
            json.dump(request.results, tmp, indent=2)
            tmp.flush()
            return FileResponse(
                tmp.name,
                media_type='application/json',
                filename=f"apars-results-{request.results.get('sequence_name', 'analysis').replace(' ', '_')}.json"
            )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"JSON export failed: {str(e)}")


@app.get("/api/v1/amino-acid-table")
async def amino_acid_table():
    """Get the amino acid reference table with properties"""
    return prot_param.get_amino_acid_table()


# ============================================================================
# Error Handlers
# ============================================================================

@app.exception_handler(ValueError)
async def value_error_handler(request, exc):
    return JSONResponse(
        status_code=400,
        content={"success": False, "error": str(exc)}
    )

@app.exception_handler(Exception)
async def general_exception_handler(request, exc):
    return JSONResponse(
        status_code=500,
        content={"success": False, "error": "Internal server error", "detail": str(exc)}
    )


# ============================================================================
# Run the application
# ============================================================================

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
