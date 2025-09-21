"use client";
import { useRouter } from "next/navigation";

import { LogoFTI } from "@/components/icons";
import { useUserStore } from "@/lib/store/userStore";

export default function Default() {
  const router = useRouter();
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  //console.log(`isAuthenticated: ${isAuthenticated}`);
  if (!isAuthenticated) {
    const tm = setTimeout(() => {
      clearTimeout(tm);
      router.replace("/home");
    }, 4000);
  } else {
    router.replace("/home");
  }

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
