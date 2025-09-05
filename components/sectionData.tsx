import React from "react";
import Link from "next/link";
type SectionDataProps<T> = {
  data: T[];
  title: React.ReactNode;
  seeAllHref?: string;
  height?: number | string;             // 327 | "20rem" | "327px"
  rowClassName?: string;
  sectionClassName?: string;
  getKey?: (item: T, index: number) => React.Key;
  renderItem: (item: T, index: number) => React.ReactNode; // вместо children
};
export function SectionData<T>({
  data,
  title,
  seeAllHref = "/#",
  height,
  rowClassName = "",
  sectionClassName = "",
  getKey,
  renderItem,
}: SectionDataProps<T>) {
  const style =
    height !== undefined
      ? { height: typeof height === "number" ? `${height}px` : height }
      : undefined;

  return (
    <section className={`scroller w-full ${sectionClassName}`}>
      <div className="mb-4 flex items-center justify-start gap-5">
        <h2 className="text-lg font-semibold">{title}</h2>
        <Link className="text-sm text-white/70 underline hover:text-white" href={seeAllHref}>
          See all
        </Link>
      </div>
      <div className={`row article-container ${rowClassName}`} style={style}>
        {data.map((item, i) => (
          <React.Fragment key={getKey?.(item, i) ?? i}>
            {renderItem(item, i)}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
