import ArrowsUpDown from '@/components/arrows/up-down';
export default function UserBlockSecondary({
  direction,
  value, // dynamics[0]
  change, // dynamics[1]
  wrapperJustify = 'justify-end',
  changeTextSize = 'text-xs',
}: {
  direction: string;
  value: string;
  change: string;
  wrapperJustify?: string;
  changeTextSize?: string;
}) {
  return (
    <div className={`flex w-full ${wrapperJustify} text-right`}>
      {direction && <ArrowsUpDown direction={direction} />}
      <div className={`px-[5px] ${changeTextSize} whitespace-nowrap`}>{value}</div>
      {
        <span
          className={`${direction === 'Up' ? 'color-blue-canonical' : 'color-ultra-violet'} ${changeTextSize}`}
        >
          {`(${change})`}
        </span>
      }
    </div>
  );
}
