import ColoredIndicator from '@/components/coloredIndicator';

import UserBlock from './user-block';

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
    <UserBlock
      imgAlt={`Card of ${username}`}
      marginRight={marginRight}
      padding={padding}
      userImg={userImg}
    >
      <div className="flex flex-col">
        <span className="text-sm font-medium">{username}</span>
        <span className="text-xs text-white/60">Invested: {invested}</span>
        <span className="text-xs text-white/60">Pro Rata: {proRata}</span>
      </div>
      <div>
        <ColoredIndicator data={data} direction={direction} />
      </div>
    </UserBlock>
  );
}
