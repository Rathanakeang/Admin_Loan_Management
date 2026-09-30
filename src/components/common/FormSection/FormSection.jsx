export default function FormSection({ step, title, description, children }) {
  return (
    <section className="mb-6 border-b border-line pb-2 last:mb-0 last:border-b-0 last:pb-0">
      <div className="mb-4">
        <h2 className="m-0 text-base font-semibold text-ink">
          {step ? <span className="mr-2 text-sm font-medium text-brand">{step}</span> : null}
          {title}
        </h2>
        {description ? <p className="mt-1 mb-0 text-sm text-muted">{description}</p> : null}
      </div>
      {children}
    </section>
  )
}
