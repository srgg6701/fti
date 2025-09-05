import { useLayoutEffect } from "react";

export function useAdjustArticleWidth() {
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const main = document.querySelector<HTMLElement>("main");
    const overlay = document.querySelector<HTMLElement>("[data-overlay-container]");
    if (!main) return;

    const apply = () => {
      const { left } = main.getBoundingClientRect();
      const workingWidth = window.innerWidth - left;
      const els = document.getElementsByClassName("article-container") as HTMLCollectionOf<HTMLElement>;
      for (let i = 0; i < els.length; i++) {
        els[i].style.width = `${workingWidth}px`;
      }
    };

    if (overlay) overlay.style.overflowX = "hidden";

    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(main);
    window.addEventListener("resize", apply, { passive: true });

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", apply);
    };
  }, []);
}
