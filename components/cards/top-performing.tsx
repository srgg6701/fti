import Image from 'next/image';
const CardTopPerforming = ({
  userImg,
  timeFrame,
  chartImg,
  roi = 51.25,
  risk = 5,
}: {
  userImg: string;
  timeFrame: string;
  chartImg: string;
  roi: number;
  risk: number;
}) => (
  <article className="mr-[10px] p-5 md:h-[310px] md:w-[352px]">
    <header className="mb-5 flex items-center gap-3">
      <Image alt="User" height="55" src={`/assets/images/users/${userImg}`} width="55" />
      <div className="flex flex-col">
        <span className="text-sm font-medium">username</span>
        <span className="text-xs text-white/60">TimeFrame: {timeFrame}</span>
      </div>
    </header>
    <div className="mb-4 h-[158px] w-[312px]">
      <Image alt="Chart1" height={158} src={`/assets/images/charts/${chartImg}`} width={312} />
    </div>
    <footer className="flex items-center justify-end gap-3 text-xs font-bold text-white/70">
      <span className="">
        ROI: <span className="text-white">{roi}%</span>
      </span>
      <span className="">
        RISK: <span className="text-white">{risk}</span>
      </span>
    </footer>
  </article>
);

export default CardTopPerforming;
