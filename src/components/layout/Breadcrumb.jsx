import { Link, useMatches } from 'react-router-dom'

export default function Breadcrumb() {
  const matches = useMatches().filter((match) => match.handle?.breadcrumb)
  if (matches.length === 0) return null

  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="m-0 flex list-none flex-wrap items-center gap-1 p-0 text-sm text-muted">
        {matches.map((match, index) => {
          const last = index === matches.length - 1
          return (
            <li key={match.pathname || match.handle.breadcrumb} className="flex items-center gap-1">
              {index > 0 ? <span className="text-subtle">/</span> : null}
              {last || !match.pathname ? (
                <span className={last ? 'font-medium text-ink' : undefined}>{match.handle.breadcrumb}</span>
              ) : (
                <Link to={match.pathname} className="text-muted hover:text-brand">
                  {match.handle.breadcrumb}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
