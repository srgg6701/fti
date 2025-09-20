export const metadata = { title: "Frame" };
export default function Frame() {
  return (
    <section className="w-full">
      {/* Верхняя полоска/шапка */}
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <img
          alt="Vector2385"
          className="h-6 w-auto"
          src="/images-temp/Frame/vector2385.svg"
        />
        <div className="flex items-center gap-3">
          <img
            alt="Vector2385"
            className="h-[2px] w-64 opacity-60"
            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nNTAwJyBoZWlnaHQ9JzEnIHZpZXdCb3g9JzAgMCA1MDAgMScgZmlsbD0nbm9uZScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz4KPHBhdGggZD0nTTAgMC41QzAgMC4yMjM4NTggMC4zNTMwODggMCAwLjc4ODY0NCAwSDQ5OS4yMTFDNDk5LjY0NyAwIDUwMCAwLjIyMzg1OCA1MDAgMC41QzUwMCAwLjc3NjE0MiA0OTkuNjQ3IDEgNDk5LjIxMSAxSDAuNzg4NjI5QzAuMzUzMDczIDEgMCAwLjc3NjE0MiAwIDAuNVonIGZpbGw9JyNGNEY5RkYnIGZpbGwtb3BhY2l0eT0nMC40Jy8+CjxwYXRoIGQ9J00wIDAuNUMwIDAuMjIzODU4IDAuMzUzMDg4IDAgMC43ODg2NDQgMEgzMTQuNjY5QzMxNS4xMDQgMCAzMTUuNDU3IDAuMjIzODU4IDMxNS40NTcgMC41QzMxNS40NTcgMC43NzYxNDIgMzE1LjEwNCAxIDMxNC42NjkgMUgwLjc4ODYyOUMwLjM1MzA3MyAxIDAgMC43NzYxNDIgMCAwLjVaJyBmaWxsPScjRjRGOUZGJy8+Cjwvc3ZnPgo="
          />
          <span className="text-sm text-white/70">Loading...</span>
        </div>
      </div>

      {/* Центр экрана — слоган/бренд */}
      <div className="grid place-items-center px-4 py-16">
        <p className="text-base tracking-wide text-white/70">
          fintech trade innovation
        </p>
      </div>
    </section>
  );
}
