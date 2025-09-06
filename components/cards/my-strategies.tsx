import Image from 'next/image';

import ColoredIndicator from '@/components/coloredIndicator';
export default function CardMyStrategies({
  username,
  userImg,
  invested,
  proRata,
  direction,
  data,
  marginRight = 'mr-[10px]',
  padding = 'p-5',
}: {
  username: string;
  userImg: string;
  invested: string;
  proRata: string;
  direction: string;
  data: string[];
  marginRight?: string;
  padding?: string;
}) {
  return (
    <article className={`md:h-[95px] md:w-[380px] ${marginRight} ${padding} `}>
      <header className="mb-5 flex items-center gap-3">
        <Image alt="User" height="55" src={`/assets/images/users/${userImg}`} width="55" />
        <div className="flex flex-col">
          <span className="text-sm font-medium">{username}</span>
          <span className="text-xs text-white/60">Invested: {invested}</span>
          <span className="text-xs text-white/60">Pro Rata: {proRata}</span>
        </div>
        <div>
          <ColoredIndicator data={data} direction={direction} />
        </div>
      </header>
    </article>
  );
}
