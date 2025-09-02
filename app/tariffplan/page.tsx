export default function Tariffplan() {
  const nav = [
    { icon: '/images-temp/b9f5aa840e2d.svg', label: 'Home' },
    {
      icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTUnIGhlaWdodD0nMTQnIHZpZXdCb3g9JzAgMCAxNSAxNCcgZmlsbD0nbm9uZScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz4KPHBhdGggZD0nTTEwIDEyLjYyNVYxMS4zNzVDMTAgMTAuNzEyIDkuNzM2NjEgMTAuMDc2MSA5LjI2Nzc3IDkuNjA3MjNDOC43OTg5MyA5LjEzODM5IDguMTYzMDQgOC44NzUgNy41IDguODc1SDMuNzVDMy4wODY5NiA4Ljg3NSAyLjQ1MTA3IDkuMTM4MzkgMS45ODIyMyA5LjYwNzIzQzEuNTEzMzkgMTAuMDc2MSAxLjI1IDEwLjcxMiAxLjI1IDExLjM3NVYxMi42MjVNMTMuNzUgMTIuNjI1VjExLjM3NUMxMy43NDk2IDEwLjgyMTEgMTMuNTY1MiAxMC4yODMgMTMuMjI1OSA5Ljg0NTJDMTIuODg2NSA5LjQwNzQxIDEyLjQxMTMgOS4wOTQ3MyAxMS44NzUgOC45NTYyNU0xMCAxLjQ1NjI1QzEwLjUzNzggMS41OTM5NCAxMS4wMTQ0IDEuOTA2NjkgMTEuMzU0OCAyLjM0NTE5QzExLjY5NTIgMi43ODM3IDExLjg3OTkgMy4zMjMwMiAxMS44Nzk5IDMuODc4MTNDMTEuODc5OSA0LjQzMzIzIDExLjY5NTIgNC45NzI1NSAxMS4zNTQ4IDUuNDExMDZDMTEuMDE0NCA1Ljg0OTU2IDEwLjUzNzggNi4xNjIzMSAxMCA2LjNNOC4xMjUgMy44NzVDOC4xMjUgNS4yNTU3MSA3LjAwNTcxIDYuMzc1IDUuNjI1IDYuMzc1QzQuMjQ0MjkgNi4zNzUgMy4xMjUgNS4yNTU3MSAzLjEyNSAzLjg3NUMzLjEyNSAyLjQ5NDI5IDQuMjQ0MjkgMS4zNzUgNS42MjUgMS4zNzVDNy4wMDU3MSAxLjM3NSA4LjEyNSAyLjQ5NDI5IDguMTI1IDMuODc1Wicgc3Ryb2tlPScjRjRGOUZGJyBzdHJva2Utb3BhY2l0eT0nMC41JyBzdHJva2Utd2lkdGg9JzEuNScgc3Ryb2tlLWxpbmVjYXA9J3JvdW5kJyBzdHJva2UtbGluZWpvaW49J3JvdW5kJy8+Cjwvc3ZnPgo=',
      label: 'People',
    },
    { icon: '/images-temp/99403c74c582.svg', label: 'Strategies' },
    {
      icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTUnIGhlaWdodD0nMTYnIHZpZXdCb3g9JzAgMCAxNSAxNicgZmlsbD0nbm9uZScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz4KPHBhdGggZD0nTTkuMzc1IDExLjc1SDYuMjVNMTEuMjUgOS4yNUg2LjI1TTIuNSAxNC4yNUgxMi41QzEyLjgzMTUgMTQuMjUgMTMuMTQ5NSAxNC4xMTgzIDEzLjM4MzkgMTMuODgzOUMxMy42MTgzIDEzLjY0OTUgMTMuNzUgMTMuMzMxNSAxMy43NSAxM1YzQzEzLjc1IDIuNjY4NDggMTMuNjE4MyAyLjM1MDU0IDEzLjM4MzkgMi4xMTYxMkMxMy4xNDk1IDEuODgxNyAxMi44MzE1IDEuNzUgMTIuNSAxLjc1SDVDNC42Njg0OCAxLjc1IDQuMzUwNTQgMS44ODE3IDQuMTE2MTIgMi4xMTYxMkMzLjg4MTcgMi4zNTA1NCAzLjc1IDIuNjY4NDggMy43NSAzVjEzQzMuNzUgMTMuMzMxNSAzLjYxODMgMTMuNjQ5NSAzLjM4Mzg4IDEzLjg4MzlDMy4xNDk0NiAxNC4xMTgzIDIuODMxNTIgMTQuMjUgMi41IDE0LjI1Wk0yLjUgMTQuMjVDMi4xNjg0OCAxNC4yNSAxLjg1MDU0IDE0LjExODMgMS42MTYxMiAxMy44ODM5QzEuMzgxNyAxMy42NDk1IDEuMjUgMTMuMzMxNSAxLjI1IDEzVjcuMzc1QzEuMjUgNy4wNDM0OCAxLjM4MTcgNi43MjU1NCAxLjYxNjEyIDYuNDkxMTJDMS44NTA1NCA2LjI1NjcgMi4xNjg0OCA2LjEyNSAyLjUgNi4xMjVIMy43NU02Ljg3NSA0LjI1SDEwLjYyNUMxMC45NzAyIDQuMjUgMTEuMjUgNC41Mjk4MiAxMS4yNSA0Ljg3NVY2LjEyNUMxMS4yNSA2LjQ3MDE4IDEwLjk3MDIgNi43NSAxMC42MjUgNi43NUg2Ljg3NUM2LjUyOTgyIDYuNzUgNi4yNSA2LjQ3MDE4IDYuMjUgNi4xMjVWNC44NzVDNi4yNSA0LjUyOTgyIDYuNTI5ODIgNC4yNSA2Ljg3NSA0LjI1Wicgc3Ryb2tlPScjRjRGOUZGJyBzdHJva2Utb3BhY2l0eT0nMC41JyBzdHJva2Utd2lkdGg9JzEuNScgc3Ryb2tlLWxpbmVjYXA9J3JvdW5kJyBzdHJva2UtbGluZWpvaW49J3JvdW5kJy8+Cjwvc3ZnPgo=',
      label: 'News',
    },
    { icon: '/images-temp/41dd40048729.svg', label: 'Account' },
  ];

  const plans = [
    {
      name: 'Standart',
      badge: 'Popular',
      price: '$50.99',
      period: '1 month',
      cta: 'Buy',
    },
    {
      name: "Let's discuss it",
      badge: null,
      price: 'Contractual',
      period: '1 month',
      cta: 'Buy',
    },
  ];

  return (
    <div className="w-full">
      {/* Top bar */}
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-4 py-3">
        {/* nav icons */}
        <nav className="flex items-center gap-4">
          {nav.map((n) => (
            <div key={n.label} className="flex items-center gap-2">
              <img alt={`${n.label} icon`} className="h-4 w-4" src={n.icon} />
              <span className="text-sm text-white/80">{n.label}</span>
            </div>
          ))}
        </nav>

        <h1 className="text-lg font-semibold text-white">Tariff plan</h1>

        <div className="flex items-center gap-3">
          <img
            alt="Bell"
            className="h-5 w-5"
            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMjAnIGhlaWdodD0nMjAnIHZpZXdCb3g9JzAgMCAyMCAyMCcgZmlsbD0nbm9uZScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz4KPHBhdGggZD0nTTguNDYwNDEgMTguMTM0N0M4LjYxNjQ1IDE4LjM5NzggOC44NDA4OCAxOC42MTYyIDkuMTExMTMgMTguNzY4MUM5LjM4MTM4IDE4LjkyIDkuNjg3OTQgMTkgMTAgMTlDMTAuMzEyMSAxOSAxMC42MTg2IDE4LjkyIDEwLjg4ODkgMTguNzY4MUMxMS4xNTkxIDE4LjYxNjIgMTEuMzgzNSAxOC4zOTc4IDExLjUzOTYgMTguMTM0N00yLjIzMjI0IDEyLjUzMjJDMi4xMTYxMiAxMi42NTYxIDIuMDM5NDkgMTIuODEwMiAyLjAxMTY3IDEyLjk3NTdDMS45ODM4NSAxMy4xNDEyIDIuMDA2MDMgMTMuMzExMSAyLjA3NTU0IDEzLjQ2NDVDMi4xNDUwNCAxMy42MTggMi4yNTg4NSAxMy43NDg1IDIuNDAzMTQgMTMuODQwMkMyLjU0NzQzIDEzLjkzMTggMi43MTU5NyAxMy45ODA3IDIuODg4MjYgMTMuOTgwOEgxNy4xMTA4QzE3LjI4MyAxMy45ODA5IDE3LjQ1MTYgMTMuOTMyMiAxNy41OTYgMTMuODQwN0MxNy43NDA0IDEzLjc0OTIgMTcuODU0MyAxMy42MTg5IDE3LjkyNCAxMy40NjU1QzE3Ljk5MzcgMTMuMzEyMSAxOC4wMTYxIDEzLjE0MjMgMTcuOTg4NSAxMi45NzY4QzE3Ljk2MDkgMTIuODExMiAxNy44ODQ1IDEyLjY1NzEgMTcuNzY4NiAxMi41MzNDMTYuNTg2MyAxMS4zNDY2IDE1LjMzMyAxMC4wODU3IDE1LjMzMyA2LjE5MjMzQzE1LjMzMyA0LjgxNTI0IDE0Ljc3MSAzLjQ5NDU1IDEzLjc3MDggMi41MjA4QzEyLjc3MDYgMS41NDcwNSAxMS40MTQgMSA5Ljk5OTUyIDFDOC41ODUgMSA3LjIyODQyIDEuNTQ3MDUgNi4yMjgyIDIuNTIwOEM1LjIyNzk5IDMuNDk0NTUgNC42NjYwNyA0LjgxNTI0IDQuNjY2MDcgNi4xOTIzM0M0LjY2NjA3IDEwLjA4NTcgMy40MTE4MiAxMS4zNDY2IDIuMjMyMjQgMTIuNTMyMzonIHN0cm9rZT0nI0Y0RjlGRicgc3Ryb2tlLXdpZHRoPScxLjc1JyBzdHJva2UtbGluZWNhcD0ncm91bmQnIHN0cm9rZS1saW5lam9pbj0ncm91bmQnLz4KPC9zdmc+Cg=="
          />
          <div className="rounded-lg border border-white/10 px-2 py-1">
            <span className="text-xs text-white/70">Exit</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="px-4 py-6">
        <h2 className="text-2xl font-semibold text-white">Choose a data plan</h2>
        <p className="mt-1 text-sm text-white/60">
          Choose the most suitable tariff plan for yourself
        </p>
      </section>

      {/* Plans */}
      <section className="grid grid-cols-1 gap-4 px-4 pb-8 md:grid-cols-2">
        {plans.map((p) => (
          <article
            key={p.name}
            className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-white">{p.name}</h3>
                  {p.badge && (
                    <span className="inline-block rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-xs text-white/70">
                      {p.badge}
                    </span>
                  )}
                </div>
                {/* декоративный плейсхолдер из макета */}
                <span className="text-[10px] text-white/20">
                  [object Object][object Object][object Object]
                </span>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-semibold text-white">{p.price}</span>
                <span className="rounded-full border border-white/10 px-2 py-0.5 text-xs text-white/60">
                  {p.period}
                </span>
              </div>
            </div>

            <div className="mt-5">
              <button
                className="w-full rounded-xl bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/15"
                type="button"
              >
                {p.cta}
              </button>
            </div>
          </article>
        ))}
      </section>

      {/* Bottom info / footer-like block */}
      <footer className="border-t border-white/10 px-4 py-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img alt="Vector2386" className="h-5 w-auto" src="/images-temp/4f917a926962.svg" />
            <nav className="flex items-center gap-4">
              {['Home', 'People', 'Strategies', 'News', 'Account'].map((l) => (
                <span key={l} className="text-sm text-white/70">
                  {l}
                </span>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-sm text-white/70">+7 999 999 99 99</span>
            <span className="text-sm text-white/70">name@gmail.com</span>
          </div>

          <span className="text-[10px] text-white/20">
            [object Object][object Object][object Object]
          </span>
        </div>
      </footer>
    </div>
  );
}
