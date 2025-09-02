export const metadata = { title: "Profile" };
export default function Profile() {
  return (
    <div className="min-h-screen bg-[#0B0F14] text-white">
      {/* Top Nav */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0B0F14]/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <nav className="flex items-center gap-6 text-sm">
            <a className="flex items-center gap-2 font-medium text-white/90">
              <img alt="Home" className="h-4 w-4" src="/images-temp/b9f5aa840e2d.svg" />
              <span>Home</span>
            </a>

            <a className="flex items-center gap-2 text-white/60 hover:text-white/90">
              <img
                alt="People"
                className="h-4 w-4"
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTUnIGhlaWdodD0nMTQnIHZpZXdCb3g9JzAgMCAxNSAxNCcgZmlsbD0nbm9uZScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz4KPHBhdGggZD0nTTEwIDEyLjYyNVYxMS4zNzVDMTAgMTAuNzEyIDkuNzM2NjEgMTAuMDc2MSA5LjI2Nzc3IDkuNjA3MjNDOC43OTg5MyA5LjEzODM5IDguMTYzMDQgOC44NzUgNy41IDguODc1SDMuNzVDMy4wODY5NiA4Ljg3NSAyLjQ1MTA3IDkuMTM4MzkgMS45ODIyMyA5LjYwNzIzQzEuNTEzMzkgMTAuMDc2MSAxLjI1IDEwLjcxMiAxLjI1IDExLjM3NVYxMi42MjVNMTMuNzUgMTIuNjI1VjExLjM3NUMxMy43NDk2IDEwLjgyMTEgMTMuNTY1MiAxMC4yODMgMTMuMjI1OSA5Ljg0NTJDMTIuODg2NSA5LjQwNzQxIDEyLjQxMTMgOS4wOTQ3MyAxMS44NzUgOC45NTYyNU0xMCAxLjQ1NjI1QzEwLjUzNzggMS41OTM5NCAxMS4wMTQ0IDEuOTA2NjkgMTEuMzU0OCAyLjM0NTE5QzExLjY5NTIgMi43ODM3IDExLjg3OTkgMy4zMjMwMiAxMS44Nzk5IDMuODc4MTNDMTEuODc5OSA0LjQzMzIzIDExLjY5NTIgNC45NzI1NSAxMS4zNTQ4IDUuNDExMDZDMTEuMDE0NCA1Ljg0OTU2IDEwLjUzNzggNi4xNjIzMSAxMCA2LjNNOC4xMjUgMy44NzVDOC4xMjUgNS4yNTU3MSA3LjAwNTcxIDYuMzc1IDUuNjI1IDYuMzc1QzQuMjQ0MjkgNi4zNzUgMy4xMjUgNS4yNTU3MSAzLjEyNSAzLjg3NUMzLjEyNSAyLjQ5NDI5IDQuMjQ0MjkgMS4zNzUgNS42MjUgMS4zNzVDNy4wMDU3MSAxLjM3NSA4LjEyNSAyLjQ5NDI5IDguMTI1IDMuODc1Wicgc3Ryb2tlPScjRjRGOUZGJyBzdHJva2Utb3BhY2l0eT0nMC41JyBzdHJva2Utd2lkdGg9JzEuNScgc3Ryb2tlLWxpbmVjYXA9J3JvdW5kJyBzdHJva2UtbGluZWpvaW49J3JvdW5kJy8+Cjwvc3ZnPgo="
              />
              <span>People</span>
            </a>

            <a className="flex items-center gap-2 text-white/60 hover:text-white/90">
              <img alt="Strategies" className="h-4 w-4" src="/images-temp/99403c74c582.svg" />
              <span>Strategies</span>
            </a>

            <a className="flex items-center gap-2 text-white/60 hover:text-white/90">
              <img
                alt="News"
                className="h-4 w-4"
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTUnIGhlaWdodD0nMTYnIHZpZXdCb3g9JzAgMCAxNSAxNicgZmlsbD0nbm9uZScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz4KPHBhdGggZD0nTTkuMzc1IDExLjc1SDYuMjVNMTEuMjUgOS4yNUg2LjI1TTIuNSAxNC4yNUgxMi41QzEyLjgzMTUgMTQuMjUgMTMuMTQ5NSAxNC4xMTgzIDEzLjM4MzkgMTMuODgzOUMxMy42MTgzIDEzLjY0OTUgMTMuNzUgMTMuMzMxNSAxMy43NSAxM1YzQzEzLjc1IDIuNjY4NDggMTMuNjE4MyAyLjM1MDU0IDEzLjM4MzkgMi4xMTYxMkMxMy4xNDk1IDEuODgxNyAxMi44MzE1IDEuNzUgMTIuNSAxLjc1SDVDNC42Njg0OCAxLjc1IDQuMzUwNTQgMS44ODE3IDQuMTE2MTIgMi4xMTYxMkMzLjg4MTcgMi4zNTA1NCAzLjc1IDIuNjY4NDggMy43NSAzVjEzQzMuNzUgMTMuMzMxNSAzLjYxODMgMTMuNjQ5NSAzLjM4Mzg4IDEzLjg4MzlDMy4xNDk0NiAxNC4xMTgzIDIuODMxNTIgMTQuMjUgMi41IDE0LjI1Wk0yLjUgMTQuMjVDMi4xNjg0OCAxNC4yNSAxLjg1MDU0IDE0LjExODMgMS42MTYxMiAxMy44ODM5QzEuMzgxNyAxMy42NDk1IDEuMjUgMTMuMzMxNSAxLjI1IDEzVjcuMzc1QzEuMjUgNy4wNDM0OCAxLjM4MTcgNi43MjU1NCAxLjYxNjEyIDYuNDkxMTJDMS44NTA1NCA2LjI1NjcgMi4xNjg0OCA2LjEyNSAyLjUgNi4xMjVIMy43NU02Ljg3NSA0LjI1SDEwLjYyNUMxMC45NzAyIDQuMjUgMTEuMjUgNC41Mjk4MiAxMS4yNSA0Ljg3NVY2LjEyNUMxMS4yNSA2LjQ3MDE4IDEwLjk3MDIgNi43NSAxMC42MjUgNi43NUg2Ljg3NUM2LjUyOTgyIDYuNzUgNi4yNSA2LjQ3MDE4IDYuMjUgNi4xMjVWNC44NzVDNi4yNSA0LjUyOTgyIDYuNTI5ODIgNC4yNSA2Ljg3NSA0LjI1Wicgc3Ryb2tlPScjRjRGOUZGJyBzdHJva2Utb3BhY2l0eT0nMC41JyBzdHJva2Utd2lkdGg9JzEuNScgc3Ryb2tlLWxpbmVjYXA9J3JvdW5kJyBzdHJva2UtbGluZWpvaW49J3JvdW5kJy8+Cjwvc3ZnPgo="
              />
              <span>News</span>
            </a>

            <a className="flex items-center gap-2 text-white/60 hover:text-white/90">
              <img alt="Account" className="h-4 w-4" src="/images-temp/41dd40048729.svg" />
              <span>Account</span>
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <img
              alt="Bell"
              className="h-5 w-5 opacity-80"
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMjAnIGhlaWdodD0nMjAnIHZpZXdCb3g9JzAgMCAyMCAyMCcgZmlsbD0nbm9uZScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz4KPHBhdGggZD0nTTguNDYwNDEgMTguMTM0N0M4LjYxNjQ1IDE4LjM5NzggOC44NDA4OCAxOC42MTYyIDkuMTExMTMgMTguNzY4MUM5LjM4MTM4IDE4LjkyIDkuNjg3OTQgMTkgMTAgMTlDMTAuMzEyMSAxOSAxMC42MTg2IDE4LjkyIDEwLjg4ODkgMTguNzY4MUMxMS4xNTkxIDE4LjYxNjIgMTEuMzgzNSAxOC4zOTc4IDExLjUzOTYgMTguMTM0N00yLjIzMjI0IDEyLjUzMjJDMi4xMTYxMiAxMi42NTYxIDIuMDM5NDkgMTIuODEwMiAyLjAxMTY3IDEyLjk3NTdDMS45ODM4NSAxMy4xNDEyIDIuMDA2MDMgMTMuMzExIDIuMDc1NTQgMTMuNDY0NUMyLjE0NTA0IDEzLjYxOCAyLjI1ODg1IDEzLjc0ODUgMi40MDMxNCAxMy44NDAyQzIuNTQ3NDMgMTMuOTMxOCAyLjcxNTk3IDEzLjk4MDcgMi44ODgyNiAxMy45ODA4SDE3LjExMDhDMTcuMjgzIDEzLjk4MDkgMTcuNDUxNiAxMy45MzIyIDE3LjU5NiAxMy44NDA3QzE3Ljc0MDQgMTMuNzQ5MiAxNy44NTQzIDEzLjYxODkgMTcuOTI0IDEzLjQ2NTVDMTcuOTkzNyAxMy4zMTIxIDE4LjAxNjEgMTMuMTQyMyAxNy45ODg1IDEyLjk3NjhDMTcuOTYwOSAxMi44MTEyIDE3Ljg4NDUgMTIuNjU3MSAxNy43Njg2IDEyLjUzM0MxNi41ODYzIDExLjM0NjYgMTUuMzMzIDEwLjA4NTcgMTUuMzMzIDYuMTkyMzNDMTUuMzMzIDQuODE1MjQgMTQuNzcxIDMuNDk0NTUgMTMuNzcwOCAyLjUyMDhDMTIuNzcwNSAxLjU0NzA1IDExLjQxNCAxIDkuOTk5NTIgMUM4LjU4NSAxIDcuMjI4NDIgMS41NDcwNSA2LjIyODIgMi41MjA4QzUuMjI3OTkgMy40OTQ1NSA0LjY2NjA3IDQuODE1MjQgNC42NjYwNyA2LjE5MjMzQzQuNjY2MDcgMTAuMDg1NyAzLjQxMTgyIDExLjM0NjYgMi4yMzIyNCAxMi41MzJaJyBzdHJva2U9J3doaXRlJyBzdHJva2Utd2lkdGg9JzEuNzUnIHN0cm9rZS1saW5lY2FwPSdyb3VuZCcgc3Ryb2tlLWxpbmVqb2luPSdyb3VuZCcvPgo8L3N2Zz4K"
            />
            <span className="text-xs tracking-wide text-white/50 uppercase">Exit</span>
          </div>
        </div>
      </header>

      {/* Page Title */}
      <div className="mx-auto max-w-7xl px-4">
        <h1 className="py-6 text-xl font-semibold">Profile</h1>
      </div>

      <main className="mx-auto grid max-w-7xl gap-6 px-4 md:grid-cols-3 lg:grid-cols-4">
        {/* Profile card */}
        <section className="md:col-span-2 lg:col-span-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <div className="flex items-start gap-5">
              <img
                alt="avatar"
                className="h-16 w-16 rounded-2xl border border-white/10 object-cover"
                src="/images-temp/Profile/image2382.png"
              />

              <div className="flex-1 space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center rounded-full border border-emerald-400/40 bg-emerald-400/10 px-2.5 py-1 text-xs text-emerald-300">
                    Active
                  </span>
                  <img
                    alt="check"
                    className="h-5 w-5 opacity-80"
                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMjEnIGhlaWdodD0nMjEnIHZpZXdCb3g9JzAgMCAyMSAyMScgZmlsbD0nbm9uZScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz4KPHBhdGggZD0nTTcuNDQzMzYgNy40NDMxMkwxMy41NTcgMTMuNTU2OCcgc3Ryb2tlPSd3aGl0ZScgc3Ryb2tlLXdpZHRoPScxLjUnIHN0cm9rZS1saW5lY2FwPSdyb3VuZCcgc3Ryb2tlLWxpbmVqb2luPSdyb3VuZCcvPgo8cGF0aCBkPSdNMTMuNTU2NiA3LjQ0MzEyTDcuNDQyOTUgMTMuNTU2OCcgc3Ryb2tlPSd3aGl0ZScgc3Ryb2tlLXdpZHRoPScxLjUnIHN0cm9rZS1saW5lY2FwPSdyb3VuZCcgc3Ryb2tlLWxpbmVqb2luPSdyb3VuZCcvPgo8L3N2Zz4K"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm">
                    <div className="flex items-baseline gap-2">
                      <span className="font-medium">Standart</span>
                      <span className="text-xs text-white/60">Active until 24.03.2026</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-lg font-medium">username</div>
                </div>
              </div>
            </div>
          </div>

          {/* Billing */}
          <div className="mt-6">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Billing</h2>
              <a className="text-sm text-white/70 hover:text-white">See all</a>
            </div>

            <div className="space-y-3">
              {/* Item 1 */}
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                <div className="flex items-center gap-3">
                  <img
                    alt="card"
                    className="h-6 w-6"
                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMjUnIGhlaWdodD0nMjYnIHZpZXdCb3g9JzAgMCAyNSAyNicgZmlsbD0nbm9uZScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz4KPHBhdGggZD0nTTEyLjQ5ODcgMjMuNDE2M0MxOC4yNTE3IDIzLjQxNjMgMjIuOTE1NCAxOC43NTI2IDIyLjkxNTQgMTIuOTk5N0MyMi45MTU0IDcuMjQ2NzEgMTguMjUxNyAyLjU4MzAxIDEyLjQ5ODcgMi41ODMwMUM2Ljc0NTczIDIuNTgzMDEgMi4wODIwMyA3LjI0NjcxIDIuMDgyMDMgMTIuOTk5N0MyLjA4MjAzIDE4Ljc1MjYgNi43NDU3MyAyMy40MTYzIDEyLjQ5ODcgMjMuNDE2M1onIHN0cm9rZT0nIzNCNTdGRicgc3Ryb2tlLXdpZHRoPScxLjI1JyBzdHJva2UtbGluZWNhcD0ncm91bmQnIHN0cm9rZS1saW5lam9pbj0ncm91bmQnLz4KPHBhdGggZD0nTTguMzMyMDMgMTNIMTYuNjY1NCcgc3Ryb2tlPScjM0I1N0ZGJyBzdHJva2Utd2lkdGg9JzEuMjUnIHN0cm9rZS1saW5lY2FwPSdyb3VuZCcgc3Ryb2tlLWxpbmVqb2luPSdyb3VuZCcvPgo8cGF0aCBkPSdNMTIuNSA4LjgzMzAxVjE3LjE2NjMnIHN0cm9rZT0nIzNCNTdGRicgc3Ryb2tlLXdpZHRoPScxLjI1JyBzdHJva2UtbGluZWNhcD0ncm91bmQnIHN0cm9rZS1saW5lam9pbj0ncm91bmQnLz4KPC9zdmc+Cg=="
                  />
                  <div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-medium">Adding funds</span>
                      <span className="text-xs text-white/50">• 1 day ago</span>
                    </div>
                    <div className="text-xs text-white/60">Deposit from the account **** 5423</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <img
                    alt="arrow"
                    className="h-4 w-4 opacity-70"
                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nOCcgaGVpZ2h0PSc4JyB2aWV3Qm94PScwIDAgOCA4JyBmaWxsPSdub25lJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPgo8cGF0aCBkPSdNMS42NjYwMiA0SDYuMzMyNjgnIHN0cm9rZT0nIzNCNTdGRicgc3Ryb2tlLXdpZHRoPScxLjI1JyBzdHJva2UtbGluZWNhcD0ncm91bmQnIHN0cm9rZS1saW5lam9pbj0ncm91bmQnLz4KPHBhdGggZD0nTTQgMS42NjY5OVY2LjMzMzY2JyBzdHJva2U9JyMzQjU3RkYnIHN0cm9rZS13aWR0aD0nMS4yNScgc3Ryb2tlLWxpbmVjYXA9J3JvdW5kJyBzdHJva2UtbGluZWpvaW49J3JvdW5kJy8+Cjwvc3ZnPgo="
                  />
                  <span>$ 324</span>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                <div className="flex items-center gap-3">
                  <img
                    alt="payment"
                    className="h-6 w-6"
                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMjUnIGhlaWdodD0nMjYnIHZpZXdCb3g9JzAgMCAyNSAyNicgZmlsbD0nbm9uZScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz4KPHBhdGggZD0nTTEyLjQ5ODcgMjMuNDE2M0MxOC4yNTE3IDIzLjQxNjMgMjIuOTE1NCAxOC43NTI2IDIyLjkxNTQgMTIuOTk5N0MyMi45MTU0IDcuMjQ2NzEgMTguMjUxNyAyLjU4MzAxIDEyLjQ5ODcgMi41ODMwMUM2Ljc0NTczIDIuNTgzMDEgMi4wODIwMyA3LjI0NjcxIDIuMDgyMDMgMTIuOTk5N0MyLjA4MjAzIDE4Ljc1MjYgNi43NDU3MyAyMy40MTYzIDEyLjQ5ODcgMjMuNDE2M1onIHN0cm9rZT0nI0Y0RjlGRicgc3Ryb2tlLXdpZHRoPScxLjI1JyBzdHJva2UtbGluZWNhcD0ncm91bmQnIHN0cm9rZS1saW5lam9pbj0ncm91bmQnLz4KPHBhdGggZD0nTTkuMzc1IDEzLjAwMDNMMTEuNDU4MyAxNS4wODM3TDE1LjYyNSAxMC45MTcnIHN0cm9rZT0nI0Y0RjlGRicgc3Ryb2tlLXdpZHRoPScxLjI1JyBzdHJva2UtbGluZWNhcD0ncm91bmQnIHN0cm9rZS1saW5lam9pbj0ncm91bmQnLz4KPC9zdmc+Cg=="
                  />
                  <div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-medium">Payment</span>
                      <span className="text-xs text-white/50">• 1 day ago</span>
                    </div>
                    <div className="text-xs text-white/60">Payment for the standard service</div>
                  </div>
                </div>

                <div className="text-sm">$ 324</div>
              </div>

              {/* Item 3 */}
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                <div className="flex items-center gap-3">
                  <img
                    alt="warning"
                    className="h-6 w-6"
                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMjUnIGhlaWdodD0nMjYnIHZpZXdCb3g9JzAgMCAyNSAyNicgZmlsbD0nbm9uZScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz4KPHBhdGggZD0nTTEyLjQ5ODcgMjMuNDE2M0MxOC4yNTE3IDIzLjQxNjMgMjIuOTE1NCAxOC43NTI2IDIyLjkxNTQgMTIuOTk5N0MyMi45MTU0IDcuMjQ2NzEgMTguMjUxNyAyLjU4MzAxIDEyLjQ5ODcgMi41ODMwMUM2Ljc0NTczIDIuNTgzMDEgMi4wODIwMyA3LjI0NjcxIDIuMDgyMDMgMTIuOTk5N0MyLjA4MjAzIDE4Ljc1MjYgNi43NDU3MyAyMy40MTYzIDEyLjQ5ODcgMjMuNDE2M1onIHN0cm9rZT0nI0VDNDU5RCcgc3Ryb2tlLXdpZHRoPScxLjI1JyBzdHJva2UtbGluZWNhcD0ncm91bmQnIHN0cm9rZS1saW5lam9pbj0ncm91bmQnLz4KPHBhdGggZD0nTTEyLjUgOC44MzMwMVYxMi45OTk3JyBzdHJva2U9JyNFQzQ1OUQnIHN0cm9rZS13aWR0aD0nMS4yNScgc3Ryb2tlLWxpbmVjYXA9J3JvdW5kJyBzdHJva2UtbGluZWpvaW49J3JvdW5kJy8+CjxwYXRoIGQ9J00xMi41IDE3LjE2N0gxMi41MTA0JyBzdHJva2U9JyNFQzQ1OUQnIHN0cm9rZS13aWR0aD0nMS4yNScgc3Ryb2tlLWxpbmVjYXA9J3JvdW5kJyBzdHJva2UtbGluZWpvaW49J3JvdW5kJy8+Cjwvc3ZnPgo="
                  />
                  <div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-medium">Adding funds</span>
                      <span className="text-xs text-white/50">• 1 day ago</span>
                    </div>
                    <div className="text-xs text-white/60">Insufficient funds</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <img
                    alt="arrow"
                    className="h-4 w-4 opacity-70"
                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nOCcgaGVpZ2h0PSc4JyB2aWV3Qm94PScwIDAgOCA4JyBmaWxsPSdub25lJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPgo8cGF0aCBkPSdNMS42NjYwMiA0SDYuMzMyNjgnIHN0cm9rZT0nI0VDNDU5RCcgc3Ryb2tlLXdpZHRoPScxLjI1JyBzdHJva2UtbGluZWNhcD0ncm91bmQnIHN0cm9rZS1saW5lam9pbj0ncm91bmQnLz4KPC9zdmc+Cg=="
                  />
                  <span>$ 324</span>
                </div>
              </div>

              {/* Item 4 */}
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                <div className="flex items-center gap-3">
                  <img
                    alt="card"
                    className="h-6 w-6"
                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMjUnIGhlaWdodD0nMjYnIHZpZXdCb3g9JzAgMCAyNSAyNicgZmlsbD0nbm9uZScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz4KPHBhdGggZD0nTTEyLjQ5ODcgMjMuNDE2M0MxOC4yNTE3IDIzLjQxNjMgMjIuOTE1NCAxOC43NTI2IDIyLjkxNTQgMTIuOTk5N0MyMi45MTU0IDcuMjQ2NzEgMTguMjUxNyAyLjU4MzAxIDEyLjQ5ODcgMi41ODMwMUM2Ljc0NTczIDIuNTgzMDEgMi4wODIwMyA3LjI0NjcxIDIuMDgyMDMgMTIuOTk5N0MyLjA4MjAzIDE4Ljc1MjYgNi43NDU3MyAyMy40MTYzIDEyLjQ5ODcgMjMuNDE2M1onIHN0cm9rZT0nIzNCNTdGRicgc3Ryb2tlLXdpZHRoPScxLjI1JyBzdHJva2UtbGluZWNhcD0ncm91bmQnIHN0cm9rZS1saW5lam9pbj0ncm91bmQnLz4KPHBhdGggZD0nTTguMzMyMDMgMTNIMTYuNjY1NCcgc3Ryb2tlPScjM0I1N0ZGJyBzdHJva2Utd2lkdGg9JzEuMjUnIHN0cm9rZS1saW5lY2FwPSdyb3VuZCcgc3Ryb2tlLWxpbmVqb2luPSdyb3VuZCcvPgo8cGF0aCBkPSdNMTIuNSA4LjgzMzAxVjE3LjE2NjMnIHN0cm9rZT0nIzNCNTdGRicgc3Ryb2tlLXdpZHRoPScxLjI1JyBzdHJva2UtbGluZWNhcD0ncm91bmQnIHN0cm9rZS1saW5lam9pbj0ncm91bmQnLz4KPC9zdmc+Cg=="
                  />
                  <div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-medium">Adding funds</span>
                      <span className="text-xs text-white/50">• 1 day ago</span>
                    </div>
                    <div className="text-xs text-white/60">Deposit from the account **** 5423</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <img
                    alt="arrow"
                    className="h-4 w-4 opacity-70"
                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nOCcgaGVpZ2h0PSc4JyB2aWV3Qm94PScwIDAgOCA4JyBmaWxsPSdub25lJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPgo8cGF0aCBkPSdNMS42NjYwMiA0SDYuMzMyNjgnIHN0cm9rZT0nIzNCNTdGRicgc3Ryb2tlLXdpZHRoPScxLjI1JyBzdHJva2UtbGluZWNhcD0ncm91bmQnIHN0cm9rZS1saW5lam9pbj0ncm91bmQnLz4KPHBhdGggZD0nTTQgMS42NjY5OVY2LjMzMzY2JyBzdHJva2U9JyMzQjU3RkYnIHN0cm9rZS13aWR0aD0nMS4yNScgc3Ryb2tlLWxpbmVjYXA9J3JvdW5kJyBzdHJva2UtbGluZWpvaW49J3JvdW5kJy8+Cjwvc3ZnPgo="
                  />
                  <span>$ 324</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Verification */}
        <section>
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <h2 className="mb-4 text-lg font-semibold">Verification</h2>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white/80">
              Verification page
            </div>
          </div>

          {/* Settings */}
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <h2 className="mb-4 text-lg font-semibold">Settings</h2>

            <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <span className="text-sm">Dark theme</span>
              <img
                alt="switch"
                className="h-5 w-5"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFMSURBVHgBrZXLTcNAEIb/GUciD5kbB1JAKCNuAO5pwA1QAKIAGkgDFEAKcMpICjB3O+/IHmYcLCUmgGzvd9oda37NzsuEK4iIn24QsIdxDjww4b6wA0sSxNRBNOjQ7JovVQ3pUQLK8KJffPyBOsbwMK0KXwiudvKslglqQLmK9mha3rk8rA8S1hUzhBGuNhrIuWCyk0cRhGiKh0m6lcCOxZP1qR/4TnxjBOn2Bk9s0bUWO4Xm9/cYMzPGcIS2VcCauyEcIYSR9ixGcIRqDRmO4VzwCUdIjqUVZQFHECHm/Ig5HKE5jHjfR2RNiZZoy8SDLs34jijV1nlFS1hQLIiiyn6PIi3OOxqS28bpntbYxfpKdONwzSVhgdx26a28/1iwyVpn20PI/8y3WN41Vfa6czv95mDC9gvQcRqW02Q9qzlaHDLMMy2m5b/q9wXs23ekqn2TOwAAAABJRU5ErkJggg=="
              />
            </div>

            <div className="mt-4 flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-4 text-xs text-white/60">
              <span>Fintech Innovation Trade, LLC</span>
              <span>v1.54.464</span>
            </div>
          </div>
        </section>

        {/* Support */}
        <section className="md:col-span-3 lg:col-span-1">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <h2 className="mb-1 text-lg font-semibold">Support</h2>
            <p className="mb-4 text-sm text-white/70">
              Specify your email address and describe the problem
            </p>

            <div className="space-y-3">
              <div className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white/80">
                account@gmail.com
              </div>
              <div className="min-h-24 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white/60">
                Describe the problem....
              </div>

              <button
                className="w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-medium hover:bg-white/[0.1]"
                type="button"
              >
                Send
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-white/10">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 md:grid-cols-3">
          <div>
            <img
              alt="logo"
              className="h-6 opacity-80"
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nNTYnIGhlaWdodD0nMjcnIHZpZXdCb3g9JzAgMCA1NiAyNycgZmlsbD0nd2hpdGUnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHBhdGggZD0nTTcuNDk4MDYgMTAuODE1MUgxNy45OTUyTDE0LjQzNTEgMTYuODY1NUg3LjQ5ODA2VjI3SDAuNVYwSDIxLjA0MjdMMTcuNDgyNCA2LjIwMTY4SDcuNDk4MDZWMTAuODE1MVonLz48cGF0aCBkPSdNNDYuMzEzNSAwTDQyLjc1MzkgNi4yMDE2OEgzOC4yNjE5VjI3SDMxLjI2MzlWNi4yMDE2OEgyMy4yNVYwSDQ2LjMxMzVaJy8+PHBhdGggZD0nTTU1LjUgMFYyMC45NjA1TDUxLjk0MDEgMjdINDguNTAxOVYwSDU1LjVaJy8+PC9zdmc+"
            />
            <nav className="mt-3 grid grid-cols-3 gap-2 text-sm text-white/70">
              <span>Home</span>
              <span>People</span>
              <span>Strategies</span>
              <span>News</span>
              <span>Account</span>
            </nav>
          </div>

          <div className="space-y-1 text-sm text-white/70">
            <div>+7 999 999 99 99</div>
            <div>name@gmail.com</div>
          </div>

          <div className="text-xs text-white/50">
            <div className="mt-2">
              Copyright © 2025 TenWeb. All rights reserved.
              <br />
              Address: 40 E Main St, Suite 721, Newark, DE 19711, United States
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
