export default function Verification() {
  return (
    <div className="flex w-full flex-col">
      {/* Top bar */}
      <div className="sticky top-0 z-10 border-b border-white/10 bg-black/40 backdrop-blur">
        <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-4">
          <nav className="flex items-center gap-6 text-sm text-white/70">
            <a className="flex items-center gap-2 hover:text-white" href="#">
              <img alt="Home2381" className="h-4 w-4" src="/images-temp/b9f5aa840e2d.svg" />
              <span>Home</span>
            </a>
            <a className="flex items-center gap-2 hover:text-white" href="#">
              <img
                alt="Peoples2381"
                className="h-4 w-4"
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTUnIGhlaWdodD0nMTQnIHZpZXdCb3g9JzAgMCAxNSAxNCcgZmlsbD0nbm9uZScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz4KPHBhdGggZD0nTTEwIDEyLjYyNVYxMS4zNzVDMTAgMTAuNzEyIDkuNzM2NjEgMTAuMDc2MSA5LjI2Nzc3IDkuNjA3MjNDOC43OTg5MyA5LjEzODM5IDguMTYzMDQgOC44NzUgNy41IDguODc1SDMuNzVDMy4wODY5NiA4Ljg3NSAyLjQ1MTA3IDkuMTM4MzkgMS45ODIyMyA5LjYwNzIzQzEuNTEzMzkgMTAuMDc2MSAxLjI1IDEwLjcxMiAxLjI1IDExLjM3NVYxMi42MjVNMTMuNzUgMTIuNjI1VjExLjM3NUMxMy43NDk2IDEwLjgyMTEgMTMuNTY1MiAxMC4yODMgMTMuMjI1OSA5Ljg0NTJDMTIuODg2NSA5LjQwNzQxIDEyLjQxMTMgOS4wOTQ3MyAxMS44NzUgOC45NTYyNU0xMCAxLjQ1NjI1QzEwLjUzNzggMS41OTM5NCAxMS4wMTQ0IDEuOTA2NjkgMTEuMzU0OCAyLjM0NTE5QzExLjY5NTIgMi43ODM3IDExLjg3OTkgMy4zMjMwMiAxMS44Nzk5IDMuODc4MTNDMTEuODc5OSA0LjQzMzIzIDExLjY5NTIgNC45NzI1NSAxMS4zNTQ4IDUuNDExMDZDMTEuMDE0NCA1Ljg0OTU2IDEwLjUzNzggNi4xNjIzMSAxMCA2LjNNOC4xMjUgMy44NzVDOC4xMjUgNS4yNTU3MSA3LjAwNTcxIDYuMzc1IDUuNjI1IDYuMzc1QzQuMjQ0MjkgNi4zNzUgMy4xMjUgNS4yNTU3MSAzLjEyNSAzLjg3NUMzLjEyNSAyLjQ5NDI5IDQuMjQ0MjkgMS4zNzUgNS42MjUgMS4zNzVDNy4wMDU3MSAxLjM3NSA4LjEyNSAyLjQ5NDI5IDguMTI1IDMuODc1Wicgc3Ryb2tlPScjRjRGOUZGJyBzdHJva2Utb3BhY2l0eT0nMC41JyBzdHJva2Utd2lkdGg9JzEuNScgc3Ryb2tlLWxpbmVjYXA9J3JvdW5kJyBzdHJva2UtbGluZWpvaW49J3JvdW5kJy8+Cjwvc3ZnPgo="
              />
              <span>People</span>
            </a>
            <a className="flex items-center gap-2 hover:text-white" href="#">
              <img alt="Graph2381" className="h-4 w-4" src="/images-temp/99403c74c582.svg" />
              <span>Strategies</span>
            </a>
            <a className="flex items-center gap-2 hover:text-white" href="#">
              <img
                alt="News2381"
                className="h-4 w-4"
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTUnIGhlaWdodD0nMTYnIHZpZXdCb3g9JzAgMCAxNSAxNicgZmlsbD0nbm9uZScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz4KPHBhdGggZD0nTTkuMzc1IDExLjc1SDYuMjVNMTEuMjUgOS4yNUg2LjI1TTIuNSAxNC4yNUgxMi41QzEyLjgzMTUgMTQuMjUgMTMuMTQ5NSAxNC4xMTgzIDEzLjM4MzkgMTMuODgzOUMxMy42MTgzIDEzLjY0OTUgMTMuNzUgMTMuMzMxNSAxMy43NSAxM1YzQzEzLjc1IDIuNjY4NDggMTMuNjE4MyAyLjM1MDU0IDEzLjM4MzkgMi4xMTYxMkMxMy4xNDk1IDEuODgxNyAxMi44MzE1IDEuNzUgMTIuNSAxLjc1SDVDNC42Njg0OCAxLjc1IDQuMzUwNTQgMS44ODE3IDQuMTE2MTIgMi4xMTYxMkMzLjg4MTcgMi4zNTA1NCAzLjc1IDIuNjY4NDggMy43NSAzVjEzQzMuNzUgMTMuMzMxNSAzLjYxODMgMTMuNjQ5NSAzLjM4Mzg4IDEzLjg4MzlDMy4xNDk0NiAxNC4xMTgzIDIuODMxNTIgMTQuMjUgMi41IDE0LjI1Wk0yLjUgMTQuMjVDMi4xNjg0OCAxNC4yNSAxLjg1MDU0IDE0LjExODMgMS42MTYxMiAxMy44ODM5QzEuMzgxNyAxMy42NDk1IDEuMjUgMTMuMzMxNSAxLjI1IDEzVjcuMzc1QzEuMjUgNy4wNDM0OCAxLjM4MTcgNi43MjU1NCAxLjYxNjEyIDYuNDkxMTJDMS44NTA1NCA2LjI1NjcgMi4xNjg0OCA2LjEyNSAyLjUgNi4xMjVIMy43NU02Ljg3NSA0LjI1SDEwLjYyNUMxMC45NzAyIDQuMjUgMTEuMjUgNC41Mjk4MiAxMS4yNSA0Ljg3NVY2LjEyNUMxMS4yNSA2LjQ3MDE4IDEwLjk3MDIgNi43NSAxMC42MjUgNi43NUg2Ljg3NUM2LjUyOTgyIDYuNzUgNi4yNSA2LjQ3MDE4IDYuMjUgNi4xMjVWNC44NzVDNi4yNSA0LjUyOTgyIDYuNTI5ODIgNC4yNSA2Ljg3NSA0LjI1Wicgc3Ryb2tlPScjRjRGOUZGJyBzdHJva2Utb3BhY2l0eT0nMC41JyBzdHJva2Utd2lkdGg9JzEuNScgc3Ryb2tlLWxpbmVjYXA9J3JvdW5kJyBzdHJva2UtbGluZWpvaW49J3JvdW5kJy8+Cjwvc3ZnPgo="
              />
              <span>News</span>
            </a>
            <a className="flex items-center gap-2 hover:text-white" href="#">
              <img alt="Account2381" className="h-4 w-4" src="/images-temp/41dd40048729.svg" />
              <span>Account</span>
            </a>
          </nav>

          <div className="flex items-center gap-6">
            <div className="text-xs text-white/70">+7 999 999 99 99</div>
            <div className="text-xs text-white/70">name@gmail.com</div>
            <button className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/80 hover:bg-white/10">
              <img
                alt="Bell2381"
                className="h-4 w-4"
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMjAnIGhlaWdodD0nMjAnIHZpZXdCb3g9JzAgMCAyMCAyMCcgZmlsbD0nbm9uZScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz4KPHBhdGggZD0nTTguNDYwNDEgMTguMTM0N0M4LjYxNjQ1IDE4LjM5NzggOC44NDA4OCAxOC42MTYyIDkuMTExMTMgMTguNzY4MUM5LjM4MTM4IDE4LjkyIDkuNjg3OTQgMTkgMTAgMTlDMTAuMzEyMSAxOSAxMC42MTg2IDE4LjkyIDEwLjg4ODkgMTguNzY4MUMxMS4xNTkxIDE4LjYxNjIgMTEuMzgzNSAxOC4zOTc4IDExLjUzOTYgMTguMTM0N00yLjIzMjI0IDEyLjUzMjJDMi4xMTYxMiAxMi42NTYxIDIuMDM5NDkgMTIuODEwMiAyLjAxMTY3IDEyLjk3NTdDMS45ODM4NSAxMy4xNDEyIDIuMDA2MDMgMTMuMzExMSAyLjA3NTU0IDEzLjQ2NDVDMi4xNDUwNCAxMy42MTggMi4yNTg4NSAxMy43NDg1IDIuNDAzMTQgMTMuODQwMkMyLjU0NzQzIDEzLjkzMTggMi43MTU5NyAxMy45ODA3IDIuODg4MjYgMTMuOTgwOEgxNy4xMTA4QzE3LjI4MyAxMy45ODA5IDE3LjQ1MTYgMTMuOTMyMiAxNy41OTYgMTMuODQwN0MxNy43NDA0IDEzLjc0OTIgMTcuODU0MyAxMy42MTg5IDE3LjkyNCAxMy40NjU1QzE3Ljk5MzcgMTMuMzEyMSAxOC4wMTYxIDEzLjE0MjMgMTcuOTg4NSAxMi45NzY4QzE3Ljk2MDkgMTIuODExMiAxNy44ODQ1IDEyLjY1NzEgMTcuNzY4NiAxMi41MzNDMTYuNTg2MyAxMS4zNDY2IDE1LjMzMyAxMC4wODU3IDE1LjMzMyA2LjE5MjMzQzE1LjMzMyA0LjgxNTI0IDE0Ljc3MSAzLjQ5NDU1IDEzLjc3MDggMi41MjA4QzEyLjc3MDYgMS41NDcwNSAxMS40MTQgMSA5Ljk5OTUyIDFDOC41ODUgMSA3LjIyODQyIDEuNTQ3MDUgNi4yMjgyIDIuNTIwOEM1LjIyNzk5IDMuNDk0NTUgNC42NjYwNyA0LjgxNTI0IDQuNjY2MDcgNi4xOTIzM0M0LjY2NjA3IDEwLjA4NTcgMy40MTE4MiAxMS4zNDY2IDIuMjMyMjQgMTIuNTMyMlonIHN0cm9rZT0nI0Y0RjlGRicgc3Ryb2tlLXdpZHRoPScxLjc1JyBzdHJva2UtbGluZWNhcD0ncm91bmQnIHN0cm9rZS1saW5lam9pbj0ncm91bmQnLz4KPC9zdmc+Cg=="
              />
              <span>Exit</span>
            </button>
          </div>
        </div>
      </div>

      {/* Page header */}
      <header className="mx-auto w-full max-w-7xl px-4 py-6">
        <h1 className="text-2xl font-semibold text-white">Profile</h1>
      </header>

      {/* Content */}
      <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 pb-10 md:grid-cols-12">
        {/* Personal info card */}
        <section className="rounded-2xl border border-white/10 bg-white/5 p-5 md:col-span-7">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-medium text-white">Personal information</h2>
            <button className="rounded-lg border border-white/15 px-3 py-1.5 text-xs text-white/80 hover:bg-white/10">
              To change
            </button>
          </div>

          <dl className="grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs tracking-wide text-white/50 uppercase">Full name</dt>
              <dd className="mt-1 text-sm text-white">Ivanov Inav Ivanovich</dd>
            </div>
            <div>
              <dt className="text-xs tracking-wide text-white/50 uppercase">Gender</dt>
              <dd className="mt-1 text-sm text-white">Man</dd>
            </div>
            <div>
              <dt className="text-xs tracking-wide text-white/50 uppercase">Date of birth</dt>
              <dd className="mt-1 text-sm text-white">17.10.1999</dd>
            </div>
            <div>
              <dt className="text-xs tracking-wide text-white/50 uppercase">
                Country of residence
              </dt>
              <dd className="mt-1 text-sm text-white">Russia</dd>
            </div>
            <div>
              <dt className="text-xs tracking-wide text-white/50 uppercase">
                Country of citizenship
              </dt>
              <dd className="mt-1 text-sm text-white">Russia</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-xs tracking-wide text-white/50 uppercase">Residential address</dt>
              <dd className="mt-1 text-sm text-white">Moskow, Marshala Tyhachevskogo</dd>
            </div>
          </dl>
        </section>

        {/* Activity & income */}
        <section className="grid gap-6 md:col-span-5">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-baseline justify-between">
              <h3 className="text-sm font-medium text-white">Type of activity</h3>
            </div>
            <div className="mt-2 text-sm text-white/80">Welder</div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm font-medium text-white">Income</h3>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs tracking-wide text-white/50 uppercase">
                  For the last month
                </div>
                <div className="mt-1 text-sm text-white">$236</div>
              </div>
              <div>
                <div className="text-xs tracking-wide text-white/50 uppercase">
                  For the last year
                </div>
                <div className="mt-1 text-sm text-white">$2856</div>
              </div>
            </div>
          </div>
        </section>

        {/* KYC: passport */}
        <section className="rounded-2xl border border-white/10 bg-white/5 p-5 md:col-span-6">
          <h3 className="text-sm font-medium text-white">Passport photo</h3>
          <div className="mt-4 flex items-center gap-3">
            <img
              alt="srep2382"
              className="h-9 w-9 rounded-md border border-white/10 bg-white/5 p-1"
              src="/images-temp/Verification/srep2382.svg"
            />
            <button className="rounded-lg border border-white/15 px-3 py-1.5 text-xs text-white/80 hover:bg-white/10">
              Add
            </button>
          </div>
        </section>

        {/* KYC: biometrics */}
        <section className="rounded-2xl border border-white/10 bg-white/5 p-5 md:col-span-6">
          <h3 className="text-sm font-medium text-white">Biometrics</h3>
          <button className="mt-4 inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/80 hover:bg-white/10">
            <img
              alt="camera2382"
              className="h-4 w-4"
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTUnIGhlaWdodD0nMTYnIHZpZXdCb3g9JzAgMCAxNSAxNicgZmlsbD0nbm9uZScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz4KPHBhdGggZD0nTTkuMDYyNSAzSDUuOTM3NUw0LjM3NSA0Ljg3NUgyLjVDMi4xNjg0OCA0Ljg3NSAxLjg1MDU0IDUuMDA2NyAxLjYxNjEyIDUuMjQxMTJDMS4zODE3IDUuNDc1NTQgMS4yNSA1Ljc5MzQ4IDEuMjUgNi4xMjVWMTEuNzVDMS4yNSAxMi4wODE1IDEuMzgxNyAxMi4zOTk1IDEuNjE2MTIgMTIuNjMzOUMxLjg1MDU0IDEyLjg2ODMgMi4xNjg0OCAxMyAyLjUgMTNIMTIuNUMxMi44MzE1IDEzIDEzLjE0OTUgMTIuODY4MyAxMy4zODM5IDEyLjYzMzlDMTMuNjE4MyAxMi4zOTk1IDEzLjc1IDEyLjA4MTUgMTMuNzUgMTEuNzVWNi4xMjVDMTMuNzUgNS43OTM0OCAxMy42MTgzIDUuNDc1NTQgMTMuMzgzOSA1LjI0MTEyQzEzLjE0OTUgNS4wMDY3IDEyLjgzMTUgNC44NzUgMTIuNSA0Ljg3NUgxMC42MjVMOS4wNjI1IDNaJyBzdHJva2U9JyMzQjU3RkYnIHN0cm9rZS13aWR0aD0nMS41JyBzdHJva2UtbGluZWNhcD0ncm91bmQnIHN0cm9rZS1saW5lam9pbj0ncm91bmQnLz4KPHBhdGggZD0nTTcuNSAxMC41QzguNTM1NTMgMTAuNSA5LjM3NSA5LjY2MDUzIDkuMzc1IDguNjI1QzkuMzc1IDcuNTg5NDcgOC41MzU1MyA2Ljc1IDcuNSA2Ljc1QzYuNDY0NDcgNi43NSA1LjYyNSA3LjU4OTQ3IDUuNjI1IDguNjI1QzUuNjI1IDkuNjYwNTMgNi40NjQ0NyAxMC41IDcuNSAxMC41Wicgc3Ryb2tlPScjM0I1N0ZGJyBzdHJva2Utd2lkdGg9JzEuNScgc3Ryb2tlLWxpbmVjYXA9J3JvdW5kJyBzdHJva2UtbGluZWpvaW49J3JvdW5kJy8+Cjwvc3ZnPgo="
            />
            <span>Go to the camera</span>
          </button>
        </section>
      </div>

      {/* Footer nav (from layout) */}
      <footer className="mt-auto border-t border-white/10">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-4 py-4 text-sm text-white/70">
          <div className="flex items-center gap-6">
            <img alt="Vector2382" className="h-5 w-auto" src="/images-temp/4f917a926962.svg" />
            <a href="#">Home</a>
            <a href="#">People</a>
            <a href="#">Strategies</a>
            <a href="#">News</a>
            <a href="#">Account</a>
          </div>
          <div className="flex items-center gap-6">
            <span>+7 999 999 99 99</span>
            <span>name@gmail.com</span>
            <span className="text-white/40">[object Object][object Object][object Object]</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
