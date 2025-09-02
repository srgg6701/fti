export default function Meaning() {
  const filters = ['All', 'Strategy', 'Stock', 'Crypto', 'Forex'];

  const items = [
    {
      avatar:
        'data:image/png;base64,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',
      tag: 'strategy',
      arrow: '/images-temp/Meaning/arrow2381.svg',
      delta: '$ 324 (3.23%)',
      vectors: {
        v1: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMjgnIGhlaWdodD0nMTUnIHZpZXdCb3g9JzAgMCAyOCAxNScgZmlsbD0nbm9uZScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz4KPHBhdGggZD0nTTMuMjA5ODUgMTEuMzg2NkwwLjA1ODU5MzggOS42MDA4N1YxNC43NDc5SDI3LjM2OTVWMC45ODc0MjdIMjIuMTE3NEwxOC45NjYyIDIuNjY4MUwxMi42NjM2IDUuOTI0NEw5LjYxNzQyIDMuODIzNTZMNi4zNjExMSAyLjY2ODFMMy4yMDk4NSAxMS4zODY2WicgZmlsbD0ndXJsKCNwYWludDBfbGluZWFyXzIzOF8xODQ0OSknLz4KPGRlZnM+CjxsaW5lYXJHcmFkaWVudCBpZD0ncGFpbnQwX2xpbmVhcl8yMzhfMTg0NDknIHgxPSc3LjIwMTQzJyB5MT0nMTQuNzQ3OScgeDI9JzYuOTkxMzUnIHkyPScyLjk4MzIyJyBncmFkaWVudFVuaXRzPSd1c2VyU3BhY2VPblVzZSc+CjxzdG9wIHN0b3AtY29sb3I9JyMzQjU3RkYnIHN0b3Atb3BhY2l0eT0nMCcvPgo8c3RvcCBvZmZzZXQ9JzEnIHN0b3AtY29sb3I9JyMzQjU3RkYnIHN0b3Atb3BhY2l0eT0nMC4yJy8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+Cg==',
        v2: '/images-temp/Meaning/vector22381.svg',
        dot: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAdSURBVHgBARIA7f8BPVb/UP4BAD8C/QQA4P8AACA83AYkqZeTawAAAABJRU5ErkJggg==',
      },
    },
    {
      avatar:
        'data:image/png;base64,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',
      tag: 'stock',
      arrow: '/images-temp/Meaning/arrow2381-ee6528c1.svg',
      delta: '$ 324 (3.23%)',
      vectors: {
        v1: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMjgnIGhlaWdodD0nMTUnIHZpZXdCb3g9JzAgMCAyOCAxNScgZmlsbD0nbm9uZScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz4KPHBhdGggZD0nTTMuMjA5ODUgMTEuMzg2NkwwLjA1ODU5MzggOS42MDA4N1YxNC43NDc5SDI3LjM2OTVWMC45ODc0MjdIMjIuMTE3NEwxOC45NjYyIDIuNjY4MUwxMi42NjM2IDUuOTI0NEw5LjYxNzQyIDMuODIzNTZMNi4zNjExMSAyLjY2ODFMMy4yMDk4NSAxMS4zODY2WicgZmlsbD0ndXJsKCNwYWludDBfbGluZWFyXzIzOF8xODQ2NSknLz4KPGRlZnM+CjxsaW5lYXJHcmFkaWVudCBpZD0ncGFpbnQwX2xpbmVhcl8yMzhfMTg0NjUnIHgxPSc3LjIwMTQzJyB5MT0nMTQuNzQ3OScgeDI9JzYuOTkxMzUnIHkyPScyLjk4MzIyJyBncmFkaWVudFVuaXRzPSd1c2VyU3BhY2VPblVzZSc+CjxzdG9wIHN0b3AtY29sb3I9JyNGRjMzQTYnIHN0b3Atb3BhY2l0eT0nMCcvPgo8c3RvcCBvZmZzZXQ9JzEnIHN0b3AtY29sb3I9JyNGRjMzQTYnIHN0b3Atb3BhY2l0eT0nMC4yJy8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+Cg==',
        v2: '/images-temp/Meaning/vector22381-47e8c435.svg',
        dot: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAdSURBVHgBARIA7f8B/zOjUAABAz8CAAIC4AD/ACAsfARvZyt7QAAAAABJRU5ErkJggg==',
      },
    },
    {
      avatar:
        'data:image/png;base64,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',
      tag: 'crypto',
      arrow: '/images-temp/fab09e40a788.svg',
      delta: '$ 324 (3.23%)',
      vectors: {
        v1: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMjgnIGhlaWdodD0nMTUnIHZpZXdCb3g9JzAgMCAyOCAxNScgZmlsbD0nbm9uZScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz4KPHBhdGggZD0nTTMuMjA5ODUgMTEuMzg2NkwwLjA1ODU5MzggOS42MDA4N1YxNC43NDc5SDI3LjM2OTVWMC45ODc0MjdIMjIuMTE3NEwxOC45NjYyIDIuNjY4MUwxMi42NjM2IDUuOTI0NEw5LjYxNzQyIDMuODIzNTZMNi4zNjExMSAyLjY2ODFMMy4yMDk4NSAxMS4zODY2WicgZmlsbD0ndXJsKCNwYWludDBfbGluZWFyXzIzOF8xODQ4MSknLz4KPGRlZnM+CjxsaW5lYXJHcmFkaWVudCBpZD0ncGFpbnQwX2xpbmVhcl8yMzhfMTg0ODEnIHgxPSc3LjIwMTQzJyB5MT0nMTQuNzQ3OScgeDI9JzYuOTkxMzUnIHkyPScyLjk4MzIyJyBncmFkaWVudFVuaXRzPSd1c2VyU3BhY2VPblVzZSc+CjxzdG9wIHN0b3AtY29sb3I9JyMzQjU3RkYnIHN0b3Atb3BhY2l0eT0nMCcvPgo8c3RvcCBvZmZzZXQ9JzEnIHN0b3AtY29sb3I9JyMzQjU3RkYnIHN0b3Atb3BhY2l0eT0nMC4yJy8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+Cg==',
        v2: '/images-temp/69602ca52207.svg',
        dot: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAdSURBVHgBARIA7f8BPVb/UP4BAD8C/QQA4P8AACA83AYkqZeTawAAAABJRU5ErkJggg==',
      },
    },
    {
      avatar:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA3CAYAAACo29JGAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAuRSURBVHgBzVoJdFTVGf7em0lIJisMWxIMMYAIVEik4IJIgkqplhORRaD2mAhUa08x9PQctYtApS2CHBKOCpwiUSwUggJhOdAAMpRNlsAkJEASA5MFspFksi+zvP73JcRZ3sx7b0xrv3OSmffevXfe9/7/fv//3/s49DEyMoRwBOBFjscEOozhOHscOIQDdL4XnFkQOBP7hACjYMMpamNMWcjO9R049AFEQjqkchymCQIS4DuMPIfP7DZk9QXR70Uu459CAqfBiu9JSBJ0Y/sFO9KJpAE+widyGZlCHHXc8N8g5QryBgO5bYovllRFTnS/IKykefIW/vdYlfIyt1JNB8XkyAVjwOMkfY3BDwcT7EhUakVeSaOMncKL0OAqflhiEH+fx1XxfhRAllzGLiGViO0jVwzH/wfC2f0QwVS5hl7dUiTGYQN8REtzHUpv5aDg2nEU3vg36u6VorOjBXa7HVo/fwQFDcCDsRMxdfpijP3RM+A1WlXjw4blKYu4NE+XPZLrccV98AHm+rs4uG81rlw6AHPDHUV9hkQ8hJkv/BbTnl1KCqlotnTDhtlEcL/UJUlyoniwOeaDK144twtfbH0Tra0NUAtG6uGxCXh16WYiO0ppNzOJTLyUyEg/IqaKKolZrV34atcfsGXjIkXEXhszBlrO+dkKFLVvFHyN1X98AhVl16AQ4ex+xTDlAjdyGbuFlfBBFU8c/QiH9v2VblDw2k6n1eKL557D88OHw+qhbUtLHd57Ow7fFp2HQsRQ+rfC9aQTOdEd4d5IDvdqTaLVvKGfRoPZsbHIW7AArzz0EM5VVXltL5DopH3wMxQXnoVCpGbsEOIcTziRozwxAyrBXGn71l/BYumQvN6/Xz/8fPRoHEtKwlczZ2JEWJh4/kZ9vezYrS31+HRTCpoaq6EIfs7K3uv0LAnuyUBUoZas9s6yUSTv1u7xeR6xoaH48eDBeGzIENFaw4KD3fqN27kT1xuUic5Tia9h8RufKmrbk8EY2NfewEJWe0tmukjiZPYnGBjgj5NJ8/AAkQjx95ft02WzoaGzE0px5uQ2THpsDsbHPy/fWCNOKwP7Krolm2tETFFK4wimkGcMn2PN449j7IABiogx2OnH1D5HNqctXe3yDalSua+cIjlegyT4gNP0RIdwnXhpxAhsvX4d7Varon48hQANp67aKjMZYcw5pKgtr+uuWkRydiAZKmE2V+HEvz7GG+PGIbe2FruLi9k4yK+rk+3rT8oZTkKjFoez1siGGgY7111n8qL8C4iDShiyN+FOeT5m6vWYQsJx8IUXcLS0FKlnzji1Y2QLzWa3/iN7VFMNSm9fQfHN0/INe1yTJ9upJlZemofDB9ZieGAgwjo60EiWYwKx+vJlbJw61antvKNHkXvvntsYk0hNWVhgIeLsnDl4dNAgKMHZU9sVtSPXTKL1GEyDCthsVmzbshhWimuxOl33OZprG/PykDhsmCgsjrg0fz7mjxzpNs4rFPuyKO5NIYLjyUV3zZiBIK18VXDxfKYYW+VA3hvHU6RTZbn9mStgKrksfn+AyGlo/gQPHIi9t25h+YQJLj8goB9lGlaLxW2c4SEhGEf9AukziAjG0l//gAC5n0dHRzNyLsoXKzQzY8hyguIEOc94BEcOrus9HkjzLYKUMoBuiqVX/7h5Ey0ORBooxaqmeVhtMqGr3bOMcxT4y5ubUd/RASUoyDsm34iMxnO8LQYKUFJ8AVvSF5FbWhz693ySrGfPmoXSlhak5eaK51hB2kbHDMyC7XTz3vCnCxfQpjCUFN88Q+Pb5JqFaznYZS1XU/UtNqcvQFubs+rdc3jSQ4OCsDkhofeYJ2to/fxg7eoSj7US0s+SY2a1/eTSOymUKAVL1M0NlRigH+atWbjsDK6tuY31f5kpDuiKQpncUB8ZibamJmhIKHSUb7qisbUVdnoATGXtKnK/zs5WVFUWypGDV3LNTbXYuO5F1NSUSF7PpRjGXEnnQeX8KB0LI9HwhI00R1lWIxUq5MDCEVt38QZeAG+WusAsterdSVQR53nszG5sU34+1IJZ6Z3z53GTLD+XBMnqQ8bO5p0MzESOcyN3s+Ak1qxMEFer5JBOAqImw79LrsgCOyO4dfp0WHwpRQgV5bLLECZesGuMjmcunN2F9HVJiogxlJMi/uLYMVmlayZh+ejaNcw9dAgLaYlh7ZNPiu6sJHBLof5emfdgLpDl6J/p/nFbWyMO7/8bOtqboQaHKZbNOHAAeRJJM8tetpDrPrt3LwrKyvD55MmYO3Zs7/WBPTFSLSyWTtTXV3i8TmHKqCXyufcXG3S6MKxaexVbP0nGxXO7xXpNKc5WVmJSZiYSoqLwFKlkF5HKoZxzw6hRiKQAnjF+PPQULgbRdUeEkuiwpYiqtjaoxd3yAuj10fBAzsDTLqjTgiZbO1z66+34ze/2ITRsMNSgi+JWdnk53qOAvDonB0fIUgYiGN+TWukjIsC7uGEQhQKlSbMrvC3/2QXk8imzSVC47rLcEayk//PaXDw9fQn8/ORzPk/4hhSRBfT+VBZpPVTqM6Oj4QsKb3gsf8Qt6O5KXHAnxxAWPhTJv9yCN5dn4oHo8fAF+RTEQynWBZBLesI8Cge+zLsy01UxoLuC+HwmfrJ/dn+kexqAuWncxFniXEx+/e+yWYErSkklbVT3eQNL3ZY4iIxSsBRMKnMil8xinyI5T67pCEZyGrnoBxtLsCg53eNEdkUticntZnn1/f3EiYjyYl0psFBwv/z67iT23983+G5R1oZVUACt1h/P/XQZ3l+fL4rOxMkvIVDnecnAnw+hECEfqCOJ2BZKvNWurRTkHXc61vDo3dJyWoKijXy2AZIAFWDlTG3NLdzI/xoltLZfSqtUDRR/9HgU4wcuQVTwFDwcXohlj3ypaDymtiknKqHzi0CAZgAt8gaTBTSUybTTemcjWi3VaLZU0GcVBL4LQyMfxrurTlEYY6+6wJCygEu8P5ZrerCc/q5CBVgtN3jICPFv2jNLIVC5dyurDe0lgfTkup9dZvFWDAooxsJR8ttST0eOwqtj9sBi97wGylY9O60N0Og7oB8TAFs9WTtQvJDi2M5pryBlPsdSsTT4CAtNrds7aSmgRNdLjCE6JBHHySJyYPnmjqI2r8QY2NgBWrJqYySavhmAsh2BKNyMla57dO77c/7i3DNBJaykyGXkee0SmzcRQU/gWHm1bIKdR6XP+5cuQi3omZjWGDg3zXAjJyonbSbQwzFDBSqzyWI10td42ohg61Byddthymgign4CVaAE2SYgUfJ3pU6K5nXxX28wFwBNRd7bDAuZCsMdz/vjzCWzbt2htcxZUAPqlpJmlH4vxePOesrLtIkuiALjFTbKrasNkEVU8NM4fbfW4/V82q+r6xyNobrJUArOjtT1RunNfgavrw2QrKbJEWy4QvOtBbKICpqCu216VLRIN/6Yar3Y0NmK32RgxNYZuXRvbWRHEgkCs6XmIFPHuktQBC3fj+beGLH2cwWrJgwV1YgJnSE/EM0xSkxmyxFjUPSYRBe1IR4uKtpIc82qogyLDnkGl2vcVSeHznXaJ1B2MtJrf6aKVgHx3lzREYrfZmEiQyQfpK8r2bGliayWA1WICn6KQsJdt/M7i4owYdDr3jvbkUaqGO9JPKSg4lWdbhDBVfRDDzbkw6BkrjkizD+GVroecaq6WezbU1JJW87TpTtRSkXzK/5DI7eciKkKT6rJMTArvp3OJXKUh9KfIhcRf4zTYjiR2OWwumyoqKDt5ikI1OqdGzNSNP6HV7lEml9G+IA+ecc5NU6I8QOSBI52aGV2jUqbTtCGRzKOJ3XvVC/IzqaVs9UY3X++SIj90TpaulorSaFPyDmCEaVsfAL5RALbseU0tMPJ22M4rvt1K6vQgT1F0Wbj/DlmnUZrHLTtS1PymCIjj/CsviDkiP8Agg2q7DcAhHwAAAAASUVORK5CYII=',
      tag: 'forex',
      arrow: '/images-temp/Meaning/arrow2381-976c5c1c.svg',
      delta: '$ 324 (3.23%)',
      vectors: {
        v1: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMjgnIGhlaWdodD0nMTUnIHZpZXdCb3g9JzAgMCAyOCAxNScgZmlsbD0nbm9uZScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz4KPHBhdGggZD0nTTMuMjA5ODUgMTEuMzg2NUwwLjA1ODU5MzggOS42MDA3NVYxNC43NDc4SDI3LjM2OTVWMC45ODczMDVIMjIuMTE3NEwxOC45NjYyIDIuNjY3OThMMTIuNjYzNiA1LjkyNDI4TDkuNjE3NDIgMy44MjM0NEw2LjM2MTExIDIuNjY3OThMMy4yMDk4NSAxMS4zODY1WicgZmlsbD0ndXJsKCNwYWludDBfbGluZWFyXzIzOF8xODQ5NyknLz4KPGRlZnM+CjxsaW5lYXJHcmFkaWVudCBpZD0ncGFpbnQwX2xpbmVhcl8yMzhfMTg0OTcnIHgxPSc3LjIwMTQzJyB5MT0nMTQuNzQ3OCcgeDI9JzYuOTkxMzUnIHkyPScyLjk4MzEnIGdyYWRpZW50VW5pdHM9J3VzZXJTcGFjZU9uVXNlJz4KPHN0b3Agc3RvcC1jb2xvcj0nIzNCNTdGRicgc3RvcC1vcGFjaXR5PScwJy8+CjxzdG9wIG9mZnNldD0nMScgc3RvcC1jb2xvcj0nIzNCNTdGRicgc3RvcC1vcGFjaXR5PScwLjInLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4K',
        v2: '/images-temp/Meaning/vector22381-5222c03a.svg',
        dot: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAdSURBVHgBARIA7f8BPVb/UP4BAD8C/QQA4P8AACA83AYkqZeTawAAAABJRU5ErkJggg==',
      },
    },
  ];

  return (
    <section className="w-full">
      {/* Header */}
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
        <h2 className="text-xl font-semibold text-white">Asset list</h2>

        <div className="flex items-center gap-3">
          {/* Search (как в макете: иконка + текст) */}
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
            <img alt="Search2381" className="h-4 w-4" src="/images-temp/7d56aadffa44.svg" />
            <span className="text-sm text-white/60">Search</span>
          </div>

          {/* Filters */}
          <nav className="flex flex-wrap items-center gap-2">
            {filters.map((f, i) => (
              <div
                key={f}
                className={`rounded-full px-3 py-1 text-xs ${
                  i === 0 ? 'bg-white/10 text-white' : 'border border-white/10 text-white/70'
                }`}
              >
                {f}
              </div>
            ))}
          </nav>
        </div>
      </header>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-4 px-4 py-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((it, idx) => (
          <article key={idx} className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-3">
              <img
                alt="image2381"
                className="h-10 w-10 rounded-full object-cover"
                src={it.avatar}
              />
              <div className="flex flex-col">
                <span className="text-sm text-white/90">username</span>
                <span className="text-[11px] tracking-wide text-white/50 uppercase">{it.tag}</span>
              </div>

              <div className="ml-auto flex items-center gap-2">
                <img alt="Arrow2381" className="h-3 w-auto" src={it.arrow} />
                <span className="text-sm text-white/80">{it.delta}</span>
              </div>
            </div>

            {/* мини-граф как в макете: три слоя */}
            <div className="mt-3 flex items-center gap-2">
              <img alt="Vector2381" className="h-3 w-auto" src={it.vectors.v1} />
              <img alt="Vector22381" className="h-3 w-auto" src={it.vectors.v2} />
              <img alt="Ellipse22381" className="h-2 w-2" src={it.vectors.dot} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
