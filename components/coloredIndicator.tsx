import Image from 'next/image';
export default function coloredIndicator({ data, direction }: { data: string[]; direction: string }) {
  return (
    <span className={`flex gap-1 ${direction === 'Up' ? 'text-blue-600' : 'color-ultra-violet'}`}>
      <Image alt={`direction`} height={7} src={`/assets/images/icons/arrows/arrow_${direction === 'Up' ? 'up_blue' : 'down_red'}.svg`} width={7} />
      <span>$ {data[0]} ({data[1]}%)</span>
    </span>
  );
}
