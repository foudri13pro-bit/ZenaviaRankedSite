import { useEffect, useState } from 'react'
import Card from '../components/Card.jsx'

export default function Matches() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:8000/api/matches/recent')
      .then(r => r.json())
      .then(setRows)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="grid gap-4">
      <h1 className="text-2xl font-bold">📜 Matchs récents</h1>

      {loading ? (
        <Card>
          <div className="text-gray-400">Chargement des matchs...</div>
        </Card>
      ) : rows.length === 0 ? (
        <Card>
          <div className="text-gray-400">Aucun match récent trouvé.</div>
        </Card>
      ) : (
        rows.map((m, i) => (
          <Card key={i} className="flex items-center justify-between">
            <div>
              <div className="font-semibold">
                #{m.match_id} — {new Date(m.date).toLocaleString()}
              </div>
              <div className="text-sm text-gray-400">
                Participants : {(m.participants || '').split(',').length}
              </div>
            </div>
            <div
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                m.winner === 'humains'
                  ? 'bg-green-600/40 text-green-300'
                  : 'bg-red-600/40 text-red-300'
              }`}
            >
              Vainqueurs : {m.winner?.toUpperCase() || 'INCONNU'}
            </div>
          </Card>
        ))
      )}
    </div>
  )
}