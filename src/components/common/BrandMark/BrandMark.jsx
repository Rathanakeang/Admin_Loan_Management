export default function BrandMark({ className = '' }) {
  return (
    <span className={`inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand text-base font-semibold text-white ${className}`.trim()}>
      L
    </span>
  )
}
