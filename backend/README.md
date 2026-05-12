# APARS Backend

AI-Powered Protein Analysis and Research Suite - FastAPI Backend

## Overview

The APARS backend provides REST API endpoints for protein sequence analysis. It uses **BioPython**, **NumPy**, **Pandas**, and **SciPy** for bioinformatics calculations, and **ReportLab** for PDF report generation.

## Why Each Library is Used

| Library | Purpose |
|---------|---------|
| **FastAPI** | Modern, fast web framework for building APIs with Python |
| **BioPython** | Core bioinformatics library providing `ProtParam` for protein analysis |
| **NumPy** | Efficient array operations for mathematical computations |
| **Pandas** | Data manipulation and CSV export formatting |
| **SciPy** | Optimization algorithms (used in pI calculation) |
| **ReportLab** | PDF generation for professional reports |
| **Pydantic** | Data validation using Python type hints |

## Formulas Used

### Molecular Weight
```
MW = Sum(amino_acid_residue_weights) + water(18.015)
```

### Theoretical pI (Isoelectric Point)
Uses the bisection method to find the pH where net charge = 0:
```
Charge(pH) = Sum(N-term, basic_R, basic_K, basic_H) - Sum(C-term, acidic_D, acidic_E, Cys, Tyr)
pI = pH where Charge(pH) = 0 (within 0.001 tolerance)
```

### Extinction Coefficient at 280nm
```
E_reduced = nW * 5500 + nY * 1490 + nC * 125
E_oxidized = E_reduced - (n_cystine_pairs * 250)
```

### Instability Index
```
II = (10 / L) * Sum(dipeptide_instability_weights)
Stable if II < 40
```

### Aliphatic Index
```
AI = X(Ala) + 2.9 * X(Val) + 3.9 * X(Ile + Leu)
```

### GRAVY (Grand Average of Hydropathy)
```
GRAVY = Sum(Kyte-Doolittle_values) / Sequence_Length
```

## Project Structure

```
apars-backend/
|-- app/
|   |-- __init__.py
|   |-- main.py              # FastAPI application & routes
|   |-- routers/             # API route handlers
|   |-- models/              # Pydantic data models
|   |-- services/
|   |   |-- protparam.py     # Bioinformatics calculations
|   |   |-- fasta_parser.py  # FASTA file parsing
|   |   |-- report_gen.py    # PDF/CSV/JSON export
|   |-- utils/
|   |   |-- validators.py    # Input validation
|-- requirements.txt         # Python dependencies
|-- Dockerfile               # Container configuration
|-- README.md                # This file
```

## Quick Start

### Prerequisites
- Python 3.11 or higher
- pip (Python package manager)

### 1. Install Dependencies

```bash
# Navigate to the backend directory
cd apars-backend

# Create a virtual environment (recommended)
python -m venv venv

# Activate the virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 2. Run the Development Server

```bash
# Run with auto-reload for development
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Or use Python directly
python -m app.main
```

The API will be available at: http://localhost:8000

Interactive API docs: http://localhost:8000/docs

### 3. Test the API

```bash
# Health check
curl http://localhost:8000/api/v1/health

# Analyze a sequence
curl -X POST http://localhost:8000/api/v1/analyze \
  -H "Content-Type: application/json" \
  -d '{"sequence": "MKWVTFISLLLLFSSAYSRGVFRRDTHKSEIAHRFKDLGEEHFKGLVLIAFSQYLQQCPFEDHVKLVNEVTEFAKTCVADESAENCDKSLHTLFGDKLCTVATLRETYGEMADCCAKQEPERNECFLQHKDDNPNLPRLVRPEVDVMCTAFHDNEETFLKKYLYEIARRHPYFYAPELLYYANKYNGVFQECCQAEDKGA", "name": "BSA Fragment"}'
```

## Docker Deployment

### Build the Image

```bash
docker build -t apars-backend .
```

### Run the Container

```bash
docker run -d -p 8000:8000 --name apars-backend apars-backend
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API info |
| GET | `/api/v1/health` | Health check |
| POST | `/api/v1/analyze` | Analyze a sequence |
| POST | `/api/v1/analyze/fasta` | Upload & analyze FASTA file |
| POST | `/api/v1/export/pdf` | Export PDF report |
| POST | `/api/v1/export/csv` | Export CSV data |
| POST | `/api/v1/export/json` | Export JSON results |
| GET | `/api/v1/amino-acid-table` | Get AA reference table |
| GET | `/docs` | Interactive API docs (Swagger UI) |

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `8000` | Server port |
| `HOST` | `0.0.0.0` | Server host |
| `DEBUG` | `False` | Debug mode |
| `MAX_SEQUENCE_LENGTH` | `50000` | Maximum sequence length |
| `RATE_LIMIT_PER_HOUR` | `100` | Rate limit for free tier |

## Deployment Options

### Render
1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set build command: `pip install -r requirements.txt`
4. Set start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

### Railway
```bash
railway init
railway up
```

### Heroku
```bash
heroku create your-apars-backend
heroku config:set PORT=8000
git push heroku main
```

## License

MIT License - Open source for the scientific community.
