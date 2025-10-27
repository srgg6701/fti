"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { LogoFTI } from "@/components/icons";
import { useUserStore } from "@/lib/store/userStore";
import { useDataStore } from "@/lib/store/dataStore";
import { siteConfig, routeAliases } from "@/config/site";

export default function Default() {
  const router = useRouter();
  const { isAuthenticated, initializeUser } = useUserStore((state) => state);
  const { load } = useDataStore((state) => state);

  useEffect(() => {
    if (!isAuthenticated) {
      let userInit = false;
      const tm = setTimeout(() => {
        console.log(
          "%cUser is not authenticated, let them go to home and check there",
          "color: green;",
        ); //console.log("Redirecting to /home after 4 seconds");

        if (userInit) router.replace(routeAliases.home);
      }, 4000);

      initializeUser()
        .then((userIsIn) => {
          if (!userIsIn) {
            console.log(
              "%cCan't get user data (/me); redirect to login page",
              "color: orangered",
            );
            router.replace(siteConfig.innerItems.auth.login.href_ui);
          } else {
            load.strategies();
          }
          userInit = userIsIn;
          /* console.log(
            "%cUser is initialized",
            "color: green",
            String(userInit),
          ); */
        })
        .catch((error) => {
          // обработка ошибки
          console.log(
            "%cError whitle initializing user",
            "color: orangered",
            error,
          );
        });

      return () => clearTimeout(tm); // Clear timeout on unmount
    } else {
      console.log(
        "%cUser authenticated, redirected them to home immidiately",
        "color: yellow;",
      );
      router.replace(routeAliases.home);
    }
  }, [isAuthenticated, router]); // Add isAuthenticated and router to the dependency array

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
