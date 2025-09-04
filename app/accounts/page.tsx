export const metadata = { title: 'Accounts' };
export default function Accounts() {
  return (
    <div className="grid grid-cols-12 gap-6 py-6">
      {/* Контент: три карточки статусов (успех / верификация / ошибка) */}
      <div className="col-span-12 grid gap-6 lg:grid-cols-3">
        {/* Successfully */}
        <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <header className="flex items-center gap-3">
            <img
              alt="image2386"
              className="h-10 w-10 rounded-md"
              src="/images/Accounts/image2386.png"
            />
            <div>
              <div className="flex items-center gap-2 text-sm text-white/80">
                <span className="font-mono">54354535342</span>
                <span>Binance</span>
              </div>
              <span className="text-xs text-emerald-400">Successfully</span>
            </div>
          </header>

          <div className="mt-4">
            {/* оси */}
            <div className="mb-2 flex items-center justify-between text-[10px] text-white/50">
              <span>30</span>
              <span>20</span>
              <span>10</span>
              <span>-10</span>
              <span>-20</span>
            </div>
            <div className="mb-1 flex items-center justify-between text-[10px] text-white/50">
              <span>oct 24</span>
              <span>nov 24</span>
              <span>dec 24</span>
              <span>jan 24</span>
              <span>feb 24</span>
              <span>mar 24</span>
            </div>
            {/* график (временно картинками из макета) */}
            <div className="relative isolate">
              <img
                alt="Vector2386"
                className="w-full"
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMjc4JyBoZWlnaHQ9JzY2JyB2aWV3Qm94PScwIDAgMjc4IDY2JyBmaWxsPSdub25lJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPgo8cGF0aCBkPSdNMTcuNzEwMSAxOS41TDAgMzAuNVY2NkgyNzcuNDU4VjAuNUgyNDcuOTQxTDIzMC4yMzEgOC41TDE5NC44MTEgMjRMMTc3LjY5MSAxNEwxNTkuMzkxIDguNUwxNDEuNjgxIDUwTDEyMy45NzEgNDEuNUwxMDYuODUxIDMwLjVIODguNTUwNEw3MC44NDAzIDEySDM1LjQyMDJMMTcuNzEwMSAxOS41WicgZmlsbD0ndXJsKCNwYWludDBfbGluZWFyXzIzOF82OTU0KScvPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSdwYWludDBfbGluZWFyXzIzOF82OTU0JyB4MT0nMTM4LjcyOScgeTE9JzAuNScgeDI9JzEzOC43MjknIHkyPSc2NicgZ3JhZGllbnRVbml0cz0ndXNlclNwYWNlT25Vc2UnPgo8c3RvcCBzdG9wLWNvbG9yPScjM0I1N0ZGJyBzdG9wLW9wYWNpdHk9JzAuMicvPgo8c3RvcCBvZmZzZXQ9JzEnIHN0b3AtY29sb3I9JyMzQjU3RkYnIHN0b3Atb3BhY2l0eT0nMCcvPgo8L2xpbmVhckdyYWRpZW50Pgo8L2RlZnM+Cjwvc3ZnPgo="
              />
              <img
                alt="Vector22386"
                className="w-full"
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMjgwJyBoZWlnaHQ9JzUyJyB2aWV3Qm94PScwIDAgMjgwIDUyJyBmaWxsPSdub25lJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPgo8cGF0aCBkPSdNMSAzMS41TDE4LjcxMDEgMjAuNUwzNi40MjAyIDEzSDU0LjEzMDNINzEuODQwM0w4OS41NTA0IDMxLjVIMTA3Ljg1MUwxMjQuOTcxIDQyLjVMMTQyLjY4MSA1MUwxNjAuMzkxIDkuNUwxNzguNjkxIDE1TDE5NS44MTEgMjVMMjMxLjIzMSA5LjVMMjQ4Ljk0MSAxLjVIMjY2LjY1MUgyNzguNDU4JyBzdHJva2U9JyMzQjU3RkYnIHN0cm9rZS13aWR0aD0nMicgc3Ryb2tlLW1pdGVybGltaXQ9JzEuNTg2MTEnIHN0cm9rZS1saW5lY2FwPSdyb3VuZCcgc3Ryb2tlLWxpbmVqb2luPSdyb3VuZCcvPgo8L3N2Zz4K"
              />
            </div>
          </div>
        </article>

        {/* Verifing */}
        <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <header className="flex items-center gap-3">
            <img
              alt="image2386"
              className="h-10 w-10 rounded-md"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA3CAYAAACo29JGAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAb4SURBVHgB3VpbbBRVGP7O7IVuLXQjRawE3BKDhosUDIlCDMWaCL6ARp94kVdNLEQTHzShjcYXH1pMTHjD+OIthIsvRElaTDCEKAU1RgPqBkMaS4ACpbWwO8f/n3NmOzs7c2Z2u9tWv83ZmTnzzzn/dy7/f24CdYaUMkuXXRTWU8hR6KSQ1cHFGIW8vp6ncIqvQog85huYEIVeCoNyZhim0EMhh7kGKdFVB0JhOMLpY7ZBmXY2kJQfg3I2alKq5jcg5wa9qBIirqAuvUEoIzFXyFPYFtfwWHGEiBhbv2HMLTHo/Ie1PjMHJbRXzk/sjdJdxCDWf+X6OApSKGmpv3Kepb7adLXUM7wyVcg6+dlIJy20pFNYmElRNP2EUcV99H4A1ZKTquqP3C0U0P3OYZy7Mq51oQylnFbeTcZVmiKlYLU0GVQnm0gCLUSwY0kLtqx5EM+ufQhPr16BTDoZpu4LRPBobHJSGQ/uY9mpewVsfutLnB8Zd4jNNjKJIjZ2LMb7u5/EU6vakbQSfhEe5WwIMjJhBoWtohouccFTE5IRHzQKk8UETl8aQ/e7J/DGoVMo2LZfhPUclGrYV4YKXaXyJ7mKXOTs15oXBeL00clLOHD8B8hKgjkK+/2RZeR0c/QJCSUmJOYaNunRf+JX/DZyI+g1G79Ob4S/5g5VfiOdZOcLRm5N4YvTF7kigl73ex9K5KQapHYFJylCm6WKFp4AlNspb1zYvVdWassqEWTvmNT3F/9GsRhY4F3SM9hOel70IBBaERGcmUVKdK9ahBX336d0cuS4zOxyhcuuqIhjpQuOwjqeni9cvoWfRqcq8rx6exKGTsLdaqhETve1kCFNRLOk16/veBzPbVzJZhVhJR4FVVnTVtkmh/7moW+J3GWfpEBRwkSOay9LrmHMrbmd4bLaoBjep8nBptJp1BNsEZOJZPh7GMGtsM/V+hUYk4kwKA0ypLJ2r9rFf5Zukp1mWdEwAqYsZ+B+nKbJRRNNDCK8GzXK/0lzx4rRq3cyua1mmahm6VrHOJC+AMPVf+9FLIPVyT02Xs2FgfK3Ta+1s1UXk3vwuwa2mCHkyJIKyWlZMOiWY3JZGOEt5SBYsIvF0Lf3aFD40gfHcXPS1rMKLwmgXLlpH8m88tfu+GQVmtPCmSpFwKm5HOLA4L5sw6D6HhE/e+kaRieBWvyfHzz325hro6mPsdYY2Rg1F2FQYphR1TRFLNkoNKcS2L5+OSwrsqCyMSyBWaHZngjt2rCEZugrYuUcg5y5xHX3hzmJmdca5/FoWwJ9L29CJtMU6xsmN2YWiRorxnDwshZi7rDPcgbnW3KL8FnPM1i5bCmseM3FGVsyuSxqBTtxoyO3VdHIyhp2i8016s6zUFKcZCZZwGNLm/Fq9yN4cfNqtLYu1K0gFvJMjreQcuEyUYmZapZWs4SF7WvbcHPC9si7o3/3u2l6Finf2pzCuuWt2LRqGdbm2tHakoGVSKBKODWXR6TyJggkQtuJQNOCNA6+tkNZTHfp0pAq1xwTTCYTELTSZcWvKT/OM7kLZpnoxEWETFNTPANQZwxxWzhqlomoOXc1ef7hgsUzVuhp+f8Izha06+eGwuXq46Zt/S/1j+/dOLVyon51Wmf7mP/cefwBCr1oAHiF+MS5P5xFVeGob5HR4IGxKlc3Tu0fCL0WZaN98UI8sbKNrG2ylmyP8Z/zJTdNsmZDCF3aq71PTf5zF7sHTmK8mPLMCpxcA+6n45a2WPj67eex7uEHqvFtjKPuvoF3+NUXLOsutaEm6NlcqSkq46Pv3emUsCviRseL+GTod2cVrEqUtrRK5IjtEAL7nii7VA2B8j22oEKSwVEHv/kZf47eRhUYorxOuQ/+gfM+1BWqFkSNjvgOTfHfO/xd0MZHGPZ4H8rIkRI8FBtA3aBICav2av/8zIiz8RGjV/T69+iCpjzc9zxCUcsM5tc8pp+JM5ksSHz41bmo2ssTsb7KvH3QTn0byqZCtRsU6LFiwJYG/Ik629Fu0Pny79Ozf+HH/FVnzzwArr4VSAbrI/LkGrj9HuHp/Jr2Jkq4gDKrIqYTaM6EL6UnSW5LRyuuTxap9IuKUtk+OE+JLG1NpXYXapYgda1boogzv+SxvmNJUBZ7ws6lGFuMPg7RPzExgQJt/LMypT2akhGVNDPOIJlKhaWBiSnaqSmtkLlzd1EiZIGnM0Vnc1E4ZAW8JyBschWpRIpmGAv8Gu8lYgdQK+T8PYfSg3qAEtpF4YacH2A9Yp0gim3I5H/w7FfVIJL75dygXwYcx2gEwZyc3fOWnZhtUKZbpTrR2ihSWzHXkKom+WzysJwZBqVq9nVpfvWZZnsgleHhk+ldmD6ZnkPl6XT3ZHpeX4/p0VHd8C8VQIT7kSkY4QAAAABJRU5ErkJggg=="
            />
            <div>
              <div className="flex items-center gap-2 text-sm text-white/80">
                <span className="font-mono">54354535342</span>
                <span>Binance</span>
              </div>
              <span className="text-xs text-amber-300">Verifing...</span>
            </div>
          </header>

          <div className="mt-4">
            <div className="mb-2 flex items-center justify-between text-[10px] text-white/50">
              <span>30</span>
              <span>20</span>
              <span>10</span>
              <span>-10</span>
              <span>-20</span>
            </div>
            <div className="mb-1 flex items-center justify-between text-[10px] text-white/50">
              <span>oct 24</span>
              <span>nov 24</span>
              <span>dec 24</span>
              <span>jan 24</span>
              <span>feb 24</span>
              <span>mar 24</span>
            </div>
            <div className="relative isolate">
              <img alt="Vector2386" className="w-full" src="/images/Accounts/vector2386.svg" />
              <img
                alt="Vector22386"
                className="w-full"
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMjgwJyBoZWlnaHQ9JzUyJyB2aWV3Qm94PScwIDAgMjgwIDUyJyBmaWxsPSdub25lJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPgo8cGF0aCBkPSdNMSAzMS41TDE4LjcxMDEgMjAuNUwzNi40MjAyIDEzSDU0LjEzMDNINzEuODQwM0w4OS41NTA0IDMxLjVIMTA3Ljg1MUwxMjQuOTcxIDQyLjVMMTQyLjY4MSA1MUwxNjAuMzkxIDkuNUwxNzguNjkxIDE1TDE5NS44MTEgMjVMMjMxLjIzMSA5LjVMMjQ4Ljk0MSAxLjVIMjY2LjY1MUgyNzguNDU4JyBzdHJva2U9JyMzQjU3RkYnIHN0cm9rZS13aWR0aD0nMicgc3Ryb2tlLW1pdGVybGltaXQ9JzEuNTg2MTEnIHN0cm9rZS1saW5lY2FwPSdyb3VuZCcvPgo8L3N2Zz4K"
              />
            </div>
          </div>
        </article>

        {/* Invalid password */}
        <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <header className="flex items-center gap-3">
            <img
              alt="image2386"
              className="h-10 w-10 rounded-md"
              src="/images/Accounts/image2386-6f0f5852.png"
            />
            <div>
              <div className="flex items-center gap-2 text-sm text-white/80">
                <span className="font-mono">54354535342</span>
                <span>Binance</span>
              </div>
              <span className="text-xs text-red-400">Invalid password</span>
            </div>
          </header>

          <div className="mt-4">
            <div className="mb-2 flex items-center justify-between text-[10px] text-white/50">
              <span>30</span>
              <span>20</span>
              <span>10</span>
              <span>-10</span>
              <span>-20</span>
            </div>
            <div className="mb-1 flex items-center justify-between text-[10px] text-white/50">
              <span>oct 24</span>
              <span>nov 24</span>
              <span>dec 24</span>
              <span>jan 24</span>
              <span>feb 24</span>
              <span>mar 24</span>
            </div>
            <div className="relative isolate">
              <img
                alt="Vector2387"
                className="w-full"
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMjc4JyBoZWlnaHQ9JzY2JyB2aWV3Qm94PScwIDAgMjc4IDY2JyBmaWxsPSdub25lJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPgo8cGF0aCBkPSdNMTcuNzEwMSAxOS41TDAgMzAuNVY2NkgyNzcuNDU4VjAuNUgyNDcuOTQxTDIzMC4yMzEgOC41TDE5NC44MTEgMjRMMTc3LjY5MSAxNEwxNTkuMzkxIDguNUwxNDEuNjgxIDUwTDEyMy45NzEgNDEuNUwxMDYuODUxIDMwLjVIODguNTUwNEw3MC44NDAzIDEySDM1LjQyMDJMMTcuNzEwMSAxOS41WicgZmlsbD0ndXJsKCNwYWludDBfbGluZWFyXzIzOF83MDE0KScvPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSdwYWludDBfbGluZWFyXzIzOF83MDE0JyB4MT0nMTM4LjcyOScgeTE9JzAuNScgeDI9JzEzOC43MjknIHkyPSc2NicgZ3JhZGllbnRVbml0cz0ndXNlclNwYWNlT25Vc2UnPgo8c3RvcCBzdG9wLWNvbG9yPScjM0I1N0ZGJyBzdG9wLW9wYWNpdHk9JzAuMicvPgo8c3RvcCBvZmZzZXQ9JzEnIHN0b3AtY29sb3I9JyMzQjU3RkYnIHN0b3Atb3BhY2l0eT0nMCcvPgo8L2xpbmVhckdyYWRpZW50Pgo8L2RlZnM+Cjwvc3ZnPgo="
              />
              <img
                alt="Vector22387"
                className="w-full"
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMjgwJyBoZWlnaHQ9JzUyJyB2aWV3Qm94PScwIDAgMjgwIDUyJyBmaWxsPSdub25lJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPgo8cGF0aCBkPSdNMSAzMS41TDE4LjcxMDEgMjAuNUwzNi40MjAyIDEzSDU0LjEzMDNINzEuODQwM0w4OS41NTA0IDMxLjVIMTA3Ljg1MUwxMjQuOTcxIDQyLjVMMTQyLjY4MSA1MUwxNjAuMzkxIDkuNUwxNzguNjkxIDE1TDE5NS44MTEgMjVMMjMxLjIzMSA5LjVMMjQ4Ljk0MSAxLjVIMjY2LjY1MUgyNzguNDU4JyBzdHJva2U9JyMzQjU3RkYnIHN0cm9rZS13aWR0aD0nMicgc3Ryb2tlLW1pdGVybGltaXQ9JzEuNTg2MTEnIHN0cm9rZS1saW5lY2FwPSdyb3VuZCcgc3Ryb2tlLWxpbmVqb2luPSdyb3VuZCcvPgo8L3N2Zz4K"
              />
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
