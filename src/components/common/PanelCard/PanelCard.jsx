export default function PanelCard({ children, className = '' }) {
  return (
    <section className={`rounded-xl border border-line bg-white p-5 md:p-6 ${className}`.trim()}>
      {children}
    </section>
  )
}
