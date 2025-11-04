import { Fragment } from "react";

type FOpts = {
  paraGapClass?: string; // отступ между абзацами
  paraClass?: string; // общие стили абзаца
};

export default function formatTextToParagraphs(text: string, opts: FOpts = {}) {
  const { paraGapClass = "mb-4", paraClass = "leading-relaxed" } = opts;

  if (!text) return null;

  // 1) нормализуем переносы строк
  const normalized = text.replace(/\r\n/g, "\n").trim();

  // 2) режем по «пустой строке» → абзацы
  const paragraphs = normalized.split(/\n\s*\n/);

  return paragraphs.map((par, i) => {
    // 3) внутри абзаца сохраняем одиночные переносы:
    const lines = par.split("\n");

    return (
      <p
        key={i}
        className={`${paraClass} ${i < paragraphs.length - 1 ? paraGapClass : ""}`}
      >
        {lines.map((line, j) =>
          j === 0 ? (
            line
          ) : (
            <Fragment key={j}>
              <br />
              {line}
            </Fragment>
          )
        )}
      </p>
    );
  });
}
