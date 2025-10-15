import Card from '../components/Card.jsx'

export default function Lore() {
  return (
    <div className="grid gap-4">
      <h1 className="text-2xl font-bold">📻 Lore & Archives</h1>
      <Card>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="font-semibold mb-2">Chronologie officielle</h2>
            <p className="text-gray-400 text-sm mb-3">
              Consulte la timeline de Zenavia RP / RankedInfected.
            </p>
            <a
              className="inline-block bg-[#e11d48]/80 hover:bg-[#e11d48] text-white px-4 py-2 rounded-xl"
              href="#"
              target="_blank"
              rel="noreferrer"
            >
              📄 Ouvrir le PDF
            </a>
          </div>
          <div>
            <h2 className="font-semibold mb-2">ZenaFM (extrait)</h2>
            <p className="text-gray-400 text-sm">
              “…ici… Zenavia… répétons… contamination en cours…”
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
