import BrandMark from '@/components/common/BrandMark/BrandMark'
import { environment } from '@/config/environment'

export default function AuthShell({ title, subtitle, note, children, footer }) {
  return (
    <div className="grid min-h-screen place-items-center bg-canvas px-4 py-8">
      <div className="w-full max-w-[440px] rounded-xl border border-line bg-white p-6 shadow-sm sm:p-8">
        <BrandMark />
        <h1 className="mt-4 mb-1 text-2xl font-semibold text-ink">{title || environment.appName}</h1>
        {subtitle ? <p className="mt-0 mb-1 text-sm text-muted">{subtitle}</p> : null}
        {note ? <p className="mt-0 mb-6 text-sm text-subtle">{note}</p> : <div className="mb-6" />}
        {children}
        {footer ? <div className="mt-4 text-sm">{footer}</div> : null}
      </div>
    </div>
  )
}
