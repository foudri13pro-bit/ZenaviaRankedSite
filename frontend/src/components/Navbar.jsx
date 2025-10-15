export default function Navbar() {
  return (
    <div className="w-full border-b border-white/10 bg-[#12161a]/80 backdrop-blur sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
        <div className="text-xl font-bold">🧟 Zenavia Ranked</div>
        <nav className="flex gap-4 text-sm text-gray-400">
          <a href="#/" className="hover:text-white">🏆 Leaderboard</a>
          <a href="#/matches" className="hover:text-white">📜 Matchs</a>
          <a href="#/lore" className="hover:text-white">📻 Lore</a>
        </nav>
      </div>
    </div>
  )
}
