import Link from 'next/link';
import Image from 'next/image';
export const metadata = { title: 'Profile' };
export default function Profile() {
  return (
    <div className="min-h-screen bg-[#0B0F14] text-white">
      {/* Profile card */}
      <section className="md:col-span-2 lg:col-span-2">
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <div className="flex items-start gap-5">
            <Image
              alt="avatar"
              className="h-16 w-16 rounded-2xl border border-white/10 object-cover"
              src="/assets/images/users/user-joshua.svg"
              height={120}
              width={120}
            />

            <div className="flex-1 space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center rounded-full border border-emerald-400/40 bg-emerald-400/10 px-2.5 py-1 text-xs text-emerald-300">
                  Active
                </span>
                {/* <Image
                  alt="check"
                  className="h-5 w-5 opacity-80"
                  src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMjEnIGhlaWdodD0nMjEnIHZpZXdCb3g9JzAgMCAyMSAyMScgZmlsbD0nbm9uZScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz4KPHBhdGggZD0nTTcuNDQzMzYgNy40NDMxMkwxMy41NTcgMTMuNTU2OCcgc3Ryb2tlPSd3aGl0ZScgc3Ryb2tlLXdpZHRoPScxLjUnIHN0cm9rZS1saW5lY2FwPSdyb3VuZCcgc3Ryb2tlLWxpbmVqb2luPSdyb3VuZCcvPgo8cGF0aCBkPSdNMTMuNTU2NiA3LjQ0MzEyTDcuNDQyOTUgMTMuNTU2OCcgc3Ryb2tlPSd3aGl0ZScgc3Ryb2tlLXdpZHRoPScxLjUnIHN0cm9rZS1saW5lY2FwPSdyb3VuZCcgc3Ryb2tlLWxpbmVqb2luPSdyb3VuZCcvPgo8L3N2Zz4K"
                /> */}
              </div>

              <div className="flex items-center gap-3">
                <div className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm">
                  <div className="flex items-baseline gap-2">
                    <span className="font-medium">Standard</span>
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
            <Link className="text-sm text-white/70 hover:text-white" href="/#">
              See all
            </Link>
          </div>

          <div className="space-y-3">
            {/* Item 1 */}
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-4">
              <div className="flex items-center gap-3">
                {/* <Image
                  alt="card"
                  className="h-6 w-6"
                  src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMjUnIGhlaWdodD0nMjYnIHZpZXdCb3g9JzAgMCAyNSAyNicgZmlsbD0nbm9uZScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz4KPHBhdGggZD0nTTEyLjQ5ODcgMjMuNDE2M0MxOC4yNTE3IDIzLjQxNjMgMjIuOTE1NCAxOC43NTI2IDIyLjkxNTQgMTIuOTk5N0MyMi45MTU0IDcuMjQ2NzEgMTguMjUxNyAyLjU4MzAxIDEyLjQ5ODcgMi41ODMwMUM2Ljc0NTczIDIuNTgzMDEgMi4wODIwMyA3LjI0NjcxIDIuMDgyMDMgMTIuOTk5N0MyLjA4MjAzIDE4Ljc1MjYgNi43NDU3MyAyMy40MTYzIDEyLjQ5ODcgMjMuNDE2M1onIHN0cm9rZT0nIzNCNTdGRicgc3Ryb2tlLXdpZHRoPScxLjI1JyBzdHJva2UtbGluZWNhcD0ncm91bmQnIHN0cm9rZS1saW5lam9pbj0ncm91bmQnLz4KPHBhdGggZD0nTTguMzMyMDMgMTNIMTYuNjY1NCcgc3Ryb2tlPScjM0I1N0ZGJyBzdHJva2Utd2lkdGg9JzEuMjUnIHN0cm9rZS1saW5lY2FwPSdyb3VuZCcgc3Ryb2tlLWxpbmVqb2luPSdyb3VuZCcvPgo8cGF0aCBkPSdNMTIuNSA4LjgzMzAxVjE3LjE2NjMnIHN0cm9rZT0nIzNCNTdGRicgc3Ryb2tlLXdpZHRoPScxLjI1JyBzdHJva2UtbGluZWNhcD0ncm91bmQnIHN0cm9rZS1saW5lam9pbj0ncm91bmQnLz4KPC9zdmc+Cg=="
                /> */}
                <div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">Adding funds</span>
                    <span className="text-xs text-white/50">• 1 day ago</span>
                  </div>
                  <div className="text-xs text-white/60">Deposit from the account **** 5423</div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm">
                {/* <Image
                  alt="arrow"
                  className="h-4 w-4 opacity-70"
                  src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nOCcgaGVpZ2h0PSc4JyB2aWV3Qm94PScwIDAgOCA4JyBmaWxsPSdub25lJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPgo8cGF0aCBkPSdNMS42NjYwMiA0SDYuMzMyNjgnIHN0cm9rZT0nIzNCNTdGRicgc3Ryb2tlLXdpZHRoPScxLjI1JyBzdHJva2UtbGluZWNhcD0ncm91bmQnIHN0cm9rZS1saW5lam9pbj0ncm91bmQnLz4KPHBhdGggZD0nTTQgMS42NjY5OVY2LjMzMzY2JyBzdHJva2U9JyMzQjU3RkYnIHN0cm9rZS13aWR0aD0nMS4yNScgc3Ryb2tlLWxpbmVjYXA9J3JvdW5kJyBzdHJva2UtbGluZWpvaW49J3JvdW5kJy8+Cjwvc3ZnPgo="
                /> */}
                <span>$ 324</span>
              </div>
            </div>

            {/* Item 2 */}
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-4">
              <div className="flex items-center gap-3">
                {/* <Image
                  alt="payment"
                  className="h-6 w-6"
                  src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMjUnIGhlaWdodD0nMjYnIHZpZXdCb3g9JzAgMCAyNSAyNicgZmlsbD0nbm9uZScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz4KPHBhdGggZD0nTTEyLjQ5ODcgMjMuNDE2M0MxOC4yNTE3IDIzLjQxNjMgMjIuOTE1NCAxOC43NTI2IDIyLjkxNTQgMTIuOTk5N0MyMi45MTU0IDcuMjQ2NzEgMTguMjUxNyAyLjU4MzAxIDEyLjQ5ODcgMi41ODMwMUM2Ljc0NTczIDIuNTgzMDEgMi4wODIwMyA3LjI0NjcxIDIuMDgyMDMgMTIuOTk5N0MyLjA4MjAzIDE4Ljc1MjYgNi43NDU3MyAyMy40MTYzIDEyLjQ5ODcgMjMuNDE2M1onIHN0cm9rZT0nI0Y0RjlGRicgc3Ryb2tlLXdpZHRoPScxLjI1JyBzdHJva2UtbGluZWNhcD0ncm91bmQnIHN0cm9rZS1saW5lam9pbj0ncm91bmQnLz4KPHBhdGggZD0nTTkuMzc1IDEzLjAwMDNMMTEuNDU4MyAxNS4wODM3TDE1LjYyNSAxMC45MTcnIHN0cm9rZT0nI0Y0RjlGRicgc3Ryb2tlLXdpZHRoPScxLjI1JyBzdHJva2UtbGluZWNhcD0ncm91bmQnIHN0cm9rZS1saW5lam9pbj0ncm91bmQnLz4KPC9zdmc+Cg=="
                /> */}
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
                {/* <Image
                  alt="warning"
                  className="h-6 w-6"
                  src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMjUnIGhlaWdodD0nMjYnIHZpZXdCb3g9JzAgMCAyNSAyNicgZmlsbD0nbm9uZScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz4KPHBhdGggZD0nTTEyLjQ5ODcgMjMuNDE2M0MxOC4yNTE3IDIzLjQxNjMgMjIuOTE1NCAxOC43NTI2IDIyLjkxNTQgMTIuOTk5N0MyMi45MTU0IDcuMjQ2NzEgMTguMjUxNyAyLjU4MzAxIDEyLjQ5ODcgMi41ODMwMUM2Ljc0NTczIDIuNTgzMDEgMi4wODIwMyA3LjI0NjcxIDIuMDgyMDMgMTIuOTk5N0MyLjA4MjAzIDE4Ljc1MjYgNi43NDU3MyAyMy40MTYzIDEyLjQ5ODcgMjMuNDE2M1onIHN0cm9rZT0nI0VDNDU5RCcgc3Ryb2tlLXdpZHRoPScxLjI1JyBzdHJva2UtbGluZWNhcD0ncm91bmQnIHN0cm9rZS1saW5lam9pbj0ncm91bmQnLz4KPHBhdGggZD0nTTEyLjUgOC44MzMwMVYxMi45OTk3JyBzdHJva2U9JyNFQzQ1OUQnIHN0cm9rZS13aWR0aD0nMS4yNScgc3Ryb2tlLWxpbmVjYXA9J3JvdW5kJyBzdHJva2UtbGluZWpvaW49J3JvdW5kJy8+CjxwYXRoIGQ9J00xMi41IDE3LjE2N0gxMi41MTA0JyBzdHJva2U9JyNFQzQ1OUQnIHN0cm9rZS13aWR0aD0nMS4yNScgc3Ryb2tlLWxpbmVjYXA9J3JvdW5kJyBzdHJva2UtbGluZWpvaW49J3JvdW5kJy8+Cjwvc3ZnPgo="
                /> */}
                <div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">Adding funds</span>
                    <span className="text-xs text-white/50">• 1 day ago</span>
                  </div>
                  <div className="text-xs text-white/60">Insufficient funds</div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm">
                {/* <Image
                  alt="arrow"
                  className="h-4 w-4 opacity-70"
                  src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nOCcgaGVpZ2h0PSc4JyB2aWV3Qm94PScwIDAgOCA4JyBmaWxsPSdub25lJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPgo8cGF0aCBkPSdNMS42NjYwMiA0SDYuMzMyNjgnIHN0cm9rZT0nI0VDNDU5RCcgc3Ryb2tlLXdpZHRoPScxLjI1JyBzdHJva2UtbGluZWNhcD0ncm91bmQnIHN0cm9rZS1saW5lam9pbj0ncm91bmQnLz4KPC9zdmc+Cg=="
                /> */}
                <span>$ 324</span>
              </div>
            </div>

            {/* Item 4 */}
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-4">
              <div className="flex items-center gap-3">
                {/* <Image
                  alt="card"
                  className="h-6 w-6"
                  src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMjUnIGhlaWdodD0nMjYnIHZpZXdCb3g9JzAgMCAyNSAyNicgZmlsbD0nbm9uZScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz4KPHBhdGggZD0nTTEyLjQ5ODcgMjMuNDE2M0MxOC4yNTE3IDIzLjQxNjMgMjIuOTE1NCAxOC43NTI2IDIyLjkxNTQgMTIuOTk5N0MyMi45MTU0IDcuMjQ2NzEgMTguMjUxNyAyLjU4MzAxIDEyLjQ5ODcgMi41ODMwMUM2Ljc0NTczIDIuNTgzMDEgMi4wODIwMyA3LjI0NjcxIDIuMDgyMDMgMTIuOTk5N0MyLjA4MjAzIDE4Ljc1MjYgNi43NDU3MyAyMy40MTYzIDEyLjQ5ODcgMjMuNDE2M1onIHN0cm9rZT0nIzNCNTdGRicgc3Ryb2tlLXdpZHRoPScxLjI1JyBzdHJva2UtbGluZWNhcD0ncm91bmQnIHN0cm9rZS1saW5lam9pbj0ncm91bmQnLz4KPHBhdGggZD0nTTguMzMyMDMgMTNIMTYuNjY1NCcgc3Ryb2tlPScjM0I1N0ZGJyBzdHJva2Utd2lkdGg9JzEuMjUnIHN0cm9rZS1saW5lY2FwPSdyb3VuZCcgc3Ryb2tlLWxpbmVqb2luPSdyb3VuZCcvPgo8cGF0aCBkPSdNMTIuNSA4LjgzMzAxVjE3LjE2NjMnIHN0cm9rZT0nIzNCNTdGRicgc3Ryb2tlLXdpZHRoPScxLjI1JyBzdHJva2UtbGluZWNhcD0ncm91bmQnIHN0cm9rZS1saW5lam9pbj0ncm91bmQnLz4KPC9zdmc+Cg=="
                /> */}
                <div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">Adding funds</span>
                    <span className="text-xs text-white/50">• 1 day ago</span>
                  </div>
                  <div className="text-xs text-white/60">Deposit from the account **** 5423</div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm">
                {/* <Image
                  alt="arrow"
                  className="h-4 w-4 opacity-70"
                  src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nOCcgaGVpZ2h0PSc4JyB2aWV3Qm94PScwIDAgOCA4JyBmaWxsPSdub25lJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPgo8cGF0aCBkPSdNMS42NjYwMiA0SDYuMzMyNjgnIHN0cm9rZT0nIzNCNTdGRicgc3Ryb2tlLXdpZHRoPScxLjI1JyBzdHJva2UtbGluZWNhcD0ncm91bmQnIHN0cm9rZS1saW5lam9pbj0ncm91bmQnLz4KPHBhdGggZD0nTTQgMS42NjY5OVY2LjMzMzY2JyBzdHJva2U9JyMzQjU3RkYnIHN0cm9rZS13aWR0aD0nMS4yNScgc3Ryb2tlLWxpbmVjYXA9J3JvdW5kJyBzdHJva2UtbGluZWpvaW49J3JvdW5kJy8+Cjwvc3ZnPgo="
                /> */}
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
      </section>
      {/* Settings */}
      <section>
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <h2 className="mb-4 text-lg font-semibold">Settings</h2>

          <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <span className="text-sm">Dark theme</span>
            {/* <Image
              alt="switch"
              className="h-5 w-5"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFMSURBVHgBrZXLTcNAEIb/GUciD5kbB1JAKCNuAO5pwA1QAKIAGkgDFEAKcMpICjB3O+/IHmYcLCUmgGzvd9oda37NzsuEK4iIn24QsIdxDjww4b6wA0sSxNRBNOjQ7JovVQ3pUQLK8KJffPyBOsbwMK0KXwiudvKslglqQLmK9mha3rk8rA8S1hUzhBGuNhrIuWCyk0cRhGiKh0m6lcCOxZP1qR/4TnxjBOn2Bk9s0bUWO4Xm9/cYMzPGcIS2VcCauyEcIYSR9ixGcIRqDRmO4VzwCUdIjqUVZQFHECHm/Ig5HKE5jHjfR2RNiZZoy8SDLs34jijV1nlFS1hQLIiiyn6PIi3OOxqS28bpntbYxfpKdONwzSVhgdx26a28/1iwyVpn20PI/8y3WN41Vfa6czv95mDC9gvQcRqW02Q9qzlaHDLMMy2m5b/q9wXs23ekqn2TOwAAAABJRU5ErkJggg=="
            /> */}
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
    </div>
  );
}
