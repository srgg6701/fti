import Image from 'next/image';
export default function ArrowsUpDown({ direction, alt = '' }: { direction: string; alt?: string }) {
  return (
    <Image
      alt={alt}
      height={7}
      src={`/assets/images/icons/arrows/arrow_${direction === 'Up' ? 'up_blue' : 'down_red'}.svg`}
      width={7}
    />
  );
}
