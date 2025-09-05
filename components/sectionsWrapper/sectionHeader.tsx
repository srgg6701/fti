import Link from 'next/link';
export default function SectionHeader({
  title,
  seeAllHref,
}: {
  title: string;
  seeAllHref: string;
}) {
  return (
    <div className="mb-4 flex items-center justify-start gap-5">
      <h2 className="text-lg font-semibold">{title}</h2>
      <Link className="text-sm text-white/70 underline hover:text-white" href={seeAllHref}>
        See all
      </Link>
    </div>
  );
}
