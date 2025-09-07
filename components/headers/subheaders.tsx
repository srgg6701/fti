import ArrowsUpDown from '@/components/arrows/up-down';
export default function Subheaders({
  header,
  subheader,
  direction,
  h = 'h-[21px]',
  hSize = '',
  sSize = 'text-sm',
  gap = 'gap-[5px]',
  leading = 'leading-[21px]',
}: {
  header: string;
  subheader: string;
  direction: string;
  h?: string;
  hSize?: string;
  sSize?: string;
  gap?: string;
  leading?: string;
}) {
  return (
    <div className={`flex ${gap} ${leading}`}>
      <h4 className={`${h} ${hSize}`}>{header}</h4>
      <ArrowsUpDown direction={direction} />
      <div className={`${direction ==='Up' ? 'color-blue-canonical' : 'color-ultra-violet'} ${sSize}`}>{subheader}</div>
    </div>
  );
}
