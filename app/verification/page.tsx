export const metadata = { title: "Verification" };
export default function Verification() {
  return (
    <div className="mx-auto grid w-full gap-6 pb-10 md:grid-cols-12">
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
            <dt className="text-xs tracking-wide text-white/50 uppercase">Country of residence</dt>
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
              <div className="text-xs tracking-wide text-white/50 uppercase">For the last year</div>
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
  );
}
