"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { LogoFTI } from "@/components/icons";
import { useUserStore } from "@/lib/store/userStore";
import { useDataStore } from "@/lib/store/dataStore";
import { siteConfig, routeAliases } from "@/config/site";

export default function Default() {
  const router = useRouter();
  const { initializeUser } = useUserStore((state) => state);
  const { load } = useDataStore((state) => state);

  useEffect(() => {
    let cancelled = false;
    let userInit = false;

    const tm = setTimeout(() => {
      if (!cancelled && userInit) {
        router.replace(routeAliases.home);
      }
    }, 4000);

    const hydrate = async () => {
      try {
        const userIsIn = await initializeUser();

        if (cancelled) return;

        userInit = userIsIn;

        if (!userIsIn) {
          console.log(
            "%cCan't get user data (/me); redirect to login page",
            "color: orangered",
          );
          router.replace(siteConfig.innerItems.auth.login.href_ui);

          return;
        }

        load.strategies();
        router.replace(routeAliases.home);
      } catch (error) {
        if (!cancelled) {
          console.log(
            "%cError while initializing user",
            "color: orangered",
            error,
          );
          router.replace(siteConfig.innerItems.auth.login.href_ui);
        }
      }
    };

    hydrate();

    return () => {
      cancelled = true;
      clearTimeout(tm); // Clear timeout on unmount
    };
  }, [initializeUser, load, router]);

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center">
      <div className="w-full max-w-[500px] flex-wrap">
        <LogoFTI className="m-auto max-w-[100%]" />
        <div>
          <div className="first-loader mt-[80px] h-[1px] bg-[#F4F9FF]" />
          <div className="font-rubik m-auto mt-[20px] text-center font-semibold">
            Loading...
          </div>
        </div>
      </div>
      <p className="absolute bottom-[80px] text-center">
        Fintech Trade Innovation
      </p>
    </div>
  );
}
