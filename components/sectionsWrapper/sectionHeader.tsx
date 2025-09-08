import Link from 'next/link';
export default function SectionHeader({
  title,
  textSize = 'text-lg',
  linkSize = 'text-sm',
  textWeight = 'font-semibold',
  h,
  mb = 'mb-4',
  seeAllHref,
  noLink,
}: {
  title: string;
  textSize?: string;
  linkSize?: string;
  textWeight?: string;
  h?: string;
  mb?: string;
  seeAllHref: string;
  noLink?: boolean;
}) {
  return (
    <div className={`${mb} ${h} flex items-center justify-start gap-5`}>
      <h2 className={`${textSize} ${textWeight}`}>{title}</h2>
      {(!noLink && (
        <Link className={`${linkSize} underline hover:text-white`} href={seeAllHref}>
          See all
        </Link>
      )) ||
        null}
    </div>
  );
}
