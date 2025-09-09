export const metadata = { title: 'Tariff Plan' };
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
      name: 'Standard',
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
      {/* Hero */}
      <section className="px-4 py-6">
        <h2 className="text-2xl font-semibold text-white">Choose a data plan</h2>
        <p className="mt-1 text-sm text-white/60">
          Choose the most suitable tariff plan for yourself
        </p>
      </section>

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
    </div>
  );
}
