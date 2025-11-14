# LexiSummarize V2

Quickstart and examples for local development.

## Backend (FastAPI)

1. Create a virtualenv and install dependencies:

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

2. Create a `backend/.env` with these keys (or update values):

```
HF_API_KEY=
MONGO_URI=mongodb://localhost:27017
JWT_SECRET=supersecret
```

3. Run the backend (from `backend/`):

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## Frontend (Vite + React)

1. Install and run the frontend:

```bash
cd frontend
npm install
npm run dev
```

2. By default the frontend points to `http://localhost:8000`. To change that, create `frontend/.env` with:

```
VITE_API_URL=http://localhost:8000
```

## Example curl requests

Register a user:

```bash
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"secret"}'
```

Login:

```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"secret"}'
```

Summarize text:

```bash
curl -X POST http://localhost:8000/api/summarize/ \
  -H "Content-Type: application/json" \
  -d '{"text":"Long text to summarize","length":"short"}'
```

## Running tests

From repo root:

```bash
cd backend
source .venv/bin/activate
pip install -r requirements.txt
pytest -q
```

If you want, I can add CI workflow to run tests on push.
