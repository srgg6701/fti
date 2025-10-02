import React from "react";

import SectionHeader from "@/components/sectionsWrapper/sectionHeader";
type SectionDataProps<T> = {
  data: T[];
  title?: string;
  seeAllHref?: string | undefined;
  height?: number | string; // 327 | "20rem" | "327px"
  noHeader?: boolean;
  rowClassName?: string;
  sectionClassName?: string;
  horizontalLayout?: boolean;
  getKey?: (item: T, index: number) => React.Key;
  renderItem: (item: T, index: number) => React.ReactNode; // вместо children
};
export function SectionData<T>({
  data,
  title,
  seeAllHref = "/#",
  height,
  noHeader = false,
  rowClassName = "",
  sectionClassName = "",
  horizontalLayout = true,
  getKey,
  renderItem,
}: SectionDataProps<T>) {
  //console.log("SectionData data", { [title || "no title"]: data });
  const style =
    height !== undefined
      ? { height: typeof height === "number" ? `${height}px` : height }
      : undefined;

  return (
    <section
      className={`${horizontalLayout ? "scroller w-full" : "w-[320px]"}${sectionClassName && " " + sectionClassName}`}
    >
      {!noHeader && (
        <SectionHeader seeAllHref={seeAllHref} title={title || ""} />
      )}
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
