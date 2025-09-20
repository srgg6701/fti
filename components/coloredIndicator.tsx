import ArrowsUpDown from "@/components/arrows/up-down";
export default function coloredIndicator({
  data,
  direction,
}: {
  data: string[];
  direction: string;
}) {
  return (
    <span
      className={`flex gap-1 ${direction === "Up" ? "text-blue-600" : "color-ultra-violet"}`}
    >
      <ArrowsUpDown direction={direction} />
      <span>
        $ {data[0]} ({data[1]}%)
      </span>
    </span>
  );
}
