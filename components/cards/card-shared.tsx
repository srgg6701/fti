import Image from "next/image";

import UserImage from "@/components/userImage";
import { Chart } from "@/types/apiData";
import GraphAndBalance from "@/components/graph-and-balance";
const CardShared = ({
  username,
  userImg = "",
  timeFrame,
  chartImg,
  chart,
  roi = 51.25,
  risk = 5,
  brokerImg,
  brokerName,
  brokerCode,
  status,
  marginRight = "mr-[10px]",
  padding = "p-5",
}: {
  username?: string;
  userImg?: string;
  timeFrame?: string;
  chartImg?: string;
  chart?: Chart;
  roi?: number;
  risk?: number;
  brokerImg?: string;
  brokerName?: string;
  brokerCode?: number;
  status?: string;
  marginRight?: string;
  padding?: string;
}) => {
  return (
    <article className={`md:h-[310px] md:w-[352px] ${marginRight} ${padding} `}>
      <header className="mb-5 flex items-center gap-3">
        {username ? (
          <>
            <UserImage height={55} title="User" userImg={userImg} width={55} />
            <div className="flex flex-col">
              <span className="text-sm font-medium">{username}</span>
              <span className="text-xs text-white/60">
                TimeFrame: {timeFrame}
              </span>
            </div>
          </>
        ) : (
          <div className="flex w-full justify-between">
            <div className="flex">
              <Image
                alt="Broker"
                className="mr-5"
                height={55}
                src={`/assets/images/exchange/${brokerImg}`}
                width={55}
              />
              <div className="flex flex-col py-[7px]">
                <span className="text-base font-medium">{brokerCode}</span>
                {/* FIXME: check font color everywhere */}
                <span className="text-xs text-white/60">{brokerName}</span>
              </div>
            </div>
            <div
              className={`pt-[9px] text-xs ${
                status === "Successfully"
                  ? "color-blue-canonical"
                  : status === "Invalid password"
                    ? "color-ultra-violet"
                    : status === "Verifying"
                      ? "opacity-20"
                      : ""
              }`}
            >
              {status}
            </div>
          </div>
        )}
      </header>
      <div className="mb-4 h-[158px] w-[312px]">
        {chartImg && (
          <Image
            alt="Chart1"
            height={158}
            src={`/assets/images/charts/${chartImg}`}
            width={312}
          />
        )}
        {chart && <GraphAndBalance chart={chart} />}
      </div>
      {username && (
        <footer className="flex items-center justify-end gap-3 text-xs font-bold text-white/70">
          <span className="">
            ROI: <span className="text-white">{roi}%</span>
          </span>
          <span className="">
            RISK: <span className="text-white">{risk}</span>
          </span>
        </footer>
      )}
    </article>
  );
};
export default CardShared;
