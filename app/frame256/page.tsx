export const metadata = { title: 'Frame256' };
export default function Frame256() {
  // мок-данные из макета — одинаковые карточки
  const items = Array.from({ length: 16 }, () => ({
    title: "Last week's news",
    time: '1 day ago',
  }));

  return (
    <section className="w-full">
      {/* Заголовок секции */}
      <header className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3">
        <h2 className="text-xl font-semibold text-white">Notifications</h2>
        <img alt="Frame692381" className="h-6 w-auto" src="/images-temp/Frame256/frame692381.svg" />
      </header>

      {/* Лента уведомлений */}
      <div className="px-4 py-4">
        <ul className="grid gap-3">
          {items.map((it, idx) => (
            <li
              key={idx}
              className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3"
            >
              <div className="flex items-center gap-3">
                {/* маленькая аватар-точка из макета */}
                <img
                  alt="Ellipse112381"
                  className="h-2.5 w-2.5 rounded-full"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABPSURBVHgBXckxEYAwEETRf8RASgYaJCABC5GAMqSQKCCGuCUMQwG/2nlrsd8nQtiQFqDiniyO5UDMvMmyxaGIX939fETUhufaVn1AGXm6AB+FGmps/dF3AAAAAElFTkSuQmCC"
                />
                <div className="flex flex-col">
                  <span className="text-sm text-white/90">{it.title}</span>
                  <span className="text-xs text-white/50">{it.time}</span>
                </div>
              </div>

              {/* справа в макете были [object Object] — трактуем как плейсхолдер под экшены/иконки */}
              <div className="flex items-center gap-2 text-xs text-white/40">
                {/* плейсхолдеры под кнопки/иконки действий; оставляю текст, чтобы не ломать макет */}
                <span>[object]</span>
                <span>[object]</span>
                <span>[object]</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
