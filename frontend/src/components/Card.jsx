export default function Card({ children, className = "" }) {
  return (
    <div className={`card bg-[#12161a] rounded-2xl p-4 shadow-lg shadow-black/40 border border-white/5 ${className}`}>
      {children}
    </div>
  )
}
