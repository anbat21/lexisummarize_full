# Copilot / AI Agent Instructions for LexiSummarize V2

Fast, focused notes for an AI coding agent to make productive changes in this repo.

1) Architecture (overview)
- Backend: FastAPI app under `backend/app` (entry: `backend/app/main.py`). Routers: `/api/auth` and `/api/summarize`.
- Frontend: Vite + React app in `frontend/` (entry: `frontend/src/main.jsx`). Pages live in `frontend/src/pages/`.
- DB: MongoDB client in `backend/app/db/mongo.py` exposes `users_collection`.

2) Environment & secrets
- `backend/.env` contains local defaults: `HF_API_KEY`, `MONGO_URI`, `JWT_SECRET`.
- Backend loads `.env` via `python-dotenv` (added) on startup. For production, prefer real env vars.
- Frontend: use Vite env `VITE_API_URL` to configure backend base URL (fallback `http://localhost:8000`).

3) Key endpoints and shapes
- POST `/api/summarize/` — body `{ text: string, length?: 'short'|'medium'|'long' }`. Uses Hugging Face Inference API (`facebook/bart-large-cnn`). Implemented in `backend/app/api/routes/summarize.py`.
- POST `/api/auth/register` — body `{ email, password }` — stores user in `users` collection.
- POST `/api/auth/login` — body `{ email, password }` — returns `{ token }` JWT. See `backend/app/auth/*`.

4) Project-specific conventions
- JWT: code uses `PyJWT` (`jwt.encode`). `requirements.txt` pins `PyJWT`; keep imports as `import jwt`.
- Passwords: hashed with `bcrypt` in `backend/app/auth/security.py`.
- DB: `users_collection.create_index('email', unique=True)` is created at import-time to enforce uniqueness.
- HF integration: summarizer issues a POST to HF Inference API and expects `summary_text` in the response; code now checks status codes and handles unexpected shapes.

5) Dev / run commands
- Backend (recommended):
  - create venv and install:
    ```bash
    cd backend
    python -m venv .venv
    source .venv/bin/activate
    pip install -r requirements.txt
    ```
  - run server (from backend folder):
    ```bash
    uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
    ```
- Frontend:
  - install & start:
    ```bash
    cd frontend
    npm install
    npm run dev
    ```
  - set `VITE_API_URL` in `.env` (Vite) to point to backend if not default.

6) Quick fixes already applied
- `requirements.txt` pinned and clarified (uses `PyJWT`, `python-dotenv`).
- `backend/app/db/mongo.py` creates a unique index on `email`.
- `backend/app/api/routes/summarize.py` hardened: timeouts, status-code checks, robust parsing, and length mapping.
- `backend/app/main.py` loads `.env` on startup for local dev.
- Frontend `api.js` now reads `VITE_API_URL` and uses an axios client; pages use controlled inputs and password masking.

7) Recommended next work (pick actionable tasks)
- Add tests: unit tests for auth (hash/verify), JWT creation/verification, and summarize route (mock HF API).
- Add CI workflow to run lint/tests.
- Improve logging and add structured logs (e.g., `logging` configs) for backend.
- Add a simple README with env example and curl snippets.

If you'd like, I can run the backend and frontend locally now, add example curl requests, or scaffold basic pytest tests and CI. Which should I do next?
