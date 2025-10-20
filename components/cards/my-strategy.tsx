"use client";
import { useRouter } from "next/navigation";

import { siteConfig } from "@/config/site";
import ColoredIndicator from "@/components/coloredIndicator";
import UserBlock from "@/components/cards/user-block";
import { makeSlug } from "@/lib/utils";

export default function CardMyStrategy({
  strategyName,
  strategyId,
  userImg,
  invested,
  proRata,
  direction,
  changeDynamics,
  marginRight = "mr-[10px]",
  padding = "p-5",
}: {
  strategyName: string;
  strategyId: number;
  userImg: string;
  invested: string;
  proRata: string;
  direction: string;
  changeDynamics: number[];
  marginRight?: string;
  padding?: string;
}) {
  const router = useRouter();
  const href = siteConfig.navItems.find(
    (obj) => obj.label === "Strategies",
  )?.href;
  const goToStrategy = () => {
    localStorage.setItem("mystrategyId", `/${strategyId}`);
    router.push(`${href}/${makeSlug(strategyName)}`);
  };

  return (
    <UserBlock
      imgAlt={`Card of ${strategyName}`}
      marginRight={marginRight}
      padding={padding}
      userImg={userImg}
    >
      <button
        className="flex flex-col text-left cursor-pointer"
        onClick={goToStrategy}
      >
        <span className="text-sm font-medium">{strategyName}</span>
        <span className="text-xs text-white/60">Invested: {invested}</span>
        {/* <span className="text-xs text-white/60">Pro Rata: {proRata}</span> */}
      </button>
      <div>
        <ColoredIndicator data={changeDynamics} direction={direction} />
      </div>
    </UserBlock>
  );
}
