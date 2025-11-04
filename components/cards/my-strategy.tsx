"use client";
import { useRouter } from "next/navigation";

import { siteConfig } from "@/config/site";
import ColoredIndicator from "@/components/coloredIndicator";
import UserBlock from "@/components/cards/user-block";
import { goToStrategy } from "@/lib/utils";

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
  strategyId: number | string;
  userImg: string;
  invested: string;
  proRata: string;
  direction: string;
  changeDynamics: number[];
  marginRight?: string;
  padding?: string;
}) {
  const router = useRouter();
  const href =
    siteConfig.navItems.find((obj) => obj.label === "Strategies")?.href || "#";

  return (
    <UserBlock
      imgAlt={`Card of ${strategyName}`}
      marginRight={marginRight}
      padding={padding}
      userImg={userImg}
      xClassName="cursor-pointer"
      onClick={() => goToStrategy(strategyId, router, href, strategyName)}
    >
      <div className="flex flex-col text-left">
        <span className="text-sm font-medium">{strategyName}</span>
        <span className="text-xs text-white/60">Invested: {invested}</span>
        {/* <span className="text-xs text-white/60">Pro Rata: {proRata}</span> */}
      </div>
      <div>
        <ColoredIndicator data={changeDynamics} direction={direction} />
      </div>
    </UserBlock>
  );
}
