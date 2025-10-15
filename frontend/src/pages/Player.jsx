import { useEffect, useState } from "react"
import Card from "../components/Card.jsx"

export default function Player() {
  const [player, setPlayer] = useState(null)
  const [loading, setLoading] = useState(true)

  const name = decodeURIComponent(window.location.hash.split("/")[2] || "")

  useEffect(() => {
    if (!name) return
    fetch(`http://localhost:8000/api/player/${name}`)
      .then((r) => r.json())
      .then(setPlayer)
      .finally(() => setLoading(false))
  }, [name])

  const goBack = () => {
    window.location.hash = "#/"
  }

  if (!name)
    return <div className="text-gray-400">Aucun joueur sélectionné.</div>

  return (
    <div className="grid gap-6">
      {/* 🔙 Bouton retour */}
      <button
        onClick={goBack}
        className="w-fit flex items-center gap-2 text-sm text-gray-400 hover:text-[#e11d48] hover:drop-shadow-[0_0_6px_#e11d48aa] transition-all"
      >
        ⬅ Retour au leaderboard
      </button>

      <h1 className="text-2xl font-bold drop-shadow-[0_0_8px_#e11d48aa]">
        👤 Profil — {name}
      </h1>

      {loading ? (
        <Card>
          <div>Chargement des données joueur...</div>
        </Card>
      ) : !player ? (
        <Card>
          <div className="text-gray-400">Joueur introuvable.</div>
        </Card>
      ) : (
        <>
          <Card className="flex flex-col md:flex-row justify-between gap-4">
            <div>
              <h2 className="font-semibold text-lg">{player.minecraft_name}</h2>
              <p className="text-gray-400 text-sm">Saison {player.season_id}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-[#e11d48] drop-shadow-[0_0_6px_#e11d48aa]">
                {player.mmr}
              </div>
              <div className="text-gray-400 text-sm">MMR</div>
            </div>
          </Card>

          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <h3 className="font-semibold mb-2">🎯 Statistiques</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>🏆 Victoires humains : {player.wins_humain}</li>
                <li>☣️ Victoires zombies : {player.wins_zombie}</li>
                <li>💀 Défaites : {player.losses}</li>
                <li>⚔️ Kills zombies : {player.kills_zombie}</li>
                <li>🔫 Kills humains : {player.kills_humain}</li>
                <li>🩸 Dégâts infligés : {player.dmg_dealt}</li>
                <li>🤝 Assists : {player.assists}</li>
              </ul>
            </Card>

            <Card>
              <h3 className="font-semibold mb-2">🏅 Badges</h3>
              <div className="flex flex-wrap gap-2">
                {player.mmr >= 2000 && (
                  <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-lg text-sm">
                    🥇 Légende
                  </span>
                )}
                {player.mmr >= 1500 && player.mmr < 2000 && (
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-lg text-sm">
                    🧠 Élite
                  </span>
                )}
                {player.mmr < 1500 && (
                  <span className="px-3 py-1 bg-gray-500/20 text-gray-400 rounded-lg text-sm">
                    ☠️ Recrue
                  </span>
                )}
              </div>
            </Card>
          </div>
        </>
      )}
    </div>
  )
}
