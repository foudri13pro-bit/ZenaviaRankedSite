import { useEffect, useState } from "react"
import Navbar from "./components/Navbar"
import Leaderboard from "./pages/Leaderboard"
import Matches from "./pages/Matches"
import Lore from "./pages/Lore"
import Player from "./pages/Player"

export default function App() {
  const [route, setRoute] = useState(window.location.hash || "#/")

  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash || "#/")
    window.addEventListener("hashchange", onHashChange)
    return () => window.removeEventListener("hashchange", onHashChange)
  }, [])

  return (
    <div className="min-h-screen bg-[#0b0e10] text-gray-100">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        {route === "#/" && <Leaderboard />}
        {route === "#/matches" && <Matches />}
        {route === "#/lore" && <Lore />}
        {route.startsWith("#/player/") && <Player />}
      </div>
    </div>
  )
}
