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
  <article className="md:w-[352px] md:h-[310px] p-5 mr-[10px]">
    <header className="mb-5 flex items-center gap-3">
      <Image src={`/assets/images/users/${userImg}`} width="55" height="55" alt="User" />
      <div className="flex flex-col">
        <span className="text-sm font-medium">username</span>
        <span className="text-xs text-white/60">TimeFrame: {timeFrame}</span>
      </div>
    </header>
    <div className="mb-4 w-[312px] h-[158px]">
      <Image alt="Chart1" src={`/assets/images/charts/${chartImg}`} width={312} height={158} />
    </div>
    <footer className="flex items-center justify-between text-xs">
      <span className="text-emerald-400">ROI: {roi}%</span>
      <span className="text-white/70">RISK: {risk}</span>
    </footer>
  </article>
);

export default CardTopPerforming;
