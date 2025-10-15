from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from db import fetch_all, fetch_one
import os

app = FastAPI(title="Zenavia Ranked API")

# Autoriser le front React à communiquer
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# === ROUTES API ===
@app.get("/api/health")
async def health():
    return {"ok": True}

@app.get("/api/leaderboard")
async def leaderboard():
    rows = await fetch_all(
        "SELECT minecraft_name, mmr, season_id FROM players ORDER BY mmr DESC LIMIT 10"
    )
    return rows

@app.get("/api/player/{name}")
async def player(name: str):
    row = await fetch_one(
        "SELECT * FROM players WHERE minecraft_name = ?", name
    )
    if not row:
        raise HTTPException(404, detail="Player not found")
    return row

@app.get("/api/matches/recent")
async def matches_recent():
    rows = await fetch_all(
        "SELECT * FROM matches ORDER BY date DESC LIMIT 10"
    )
    return rows


# === SERVE FRONTEND BUILD ===
frontend_path = os.path.join(os.path.dirname(__file__), "../frontend/dist")

# Servir le dossier React buildé
if os.path.exists(frontend_path):
    app.mount("/", StaticFiles(directory=frontend_path, html=True), name="frontend")

# Fallback pour React Router
@app.get("/{full_path:path}")
async def serve_frontend(full_path: str):
    index_path = os.path.join(frontend_path, "index.html")
    if os.path.exists(index_path):
        return FileResponse(index_path)
    return {"error": "Frontend not found"}
