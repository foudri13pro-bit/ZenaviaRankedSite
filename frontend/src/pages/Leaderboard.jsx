import { useEffect, useState } from "react"
import Card from "../components/Card.jsx"

export default function Leaderboard() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("http://localhost:8000/api/leaderboard")
      .then((r) => r.json())
      .then(setRows)
      .finally(() => setLoading(false))
  }, [])

  const handleClick = (name) => {
    window.location.hash = `#/player/${encodeURIComponent(name)}`
  }

  return (
    <div className="grid gap-4">
      <h1 className="text-2xl font-bold drop-shadow-[0_0_8px_#e11d48aa]">
        🏆 Leaderboard — Saison actuelle
      </h1>

      <Card>
        {loading ? (
          <div>Chargement…</div>
        ) : (
          <div className="grid gap-3">
            {rows.map((r, i) => (
              <div
                key={i}
                className="flex items-center justify-between bg-black/20 rounded-xl p-3 cursor-pointer hover:bg-[#e11d48]/20 transition-all duration-200"
                onClick={() => handleClick(r.minecraft_name)}
              >
                <div className="flex items-center gap-3">
                  <div className="text-lg">
                    {i === 0
                      ? "👑"
                      : i === 1
                      ? "🥈"
                      : i === 2
                      ? "🥉"
                      : `#${i + 1}`}
                  </div>
                  <div>
                    <div className="font-semibold text-white hover:text-[#e11d48] transition-all">
                      {r.minecraft_name}
                    </div>
                    <div className="text-sm text-gray-400">
                      Saison {r.season_id}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold">{r.mmr}</div>
                  <div className="text-xs text-gray-400">MMR</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
