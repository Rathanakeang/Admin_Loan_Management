export default function InfoGrid({ items = [] }) {
  return (
    <dl className="m-0 grid grid-cols-1 gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.label} className="rounded-lg border border-line bg-canvas px-4 py-3">
          <dt className="text-xs font-medium text-muted">{item.label}</dt>
          <dd className="mt-1 mb-0 text-sm font-medium text-ink">{item.value ?? '—'}</dd>
        </div>
      ))}
    </dl>
  )
}
