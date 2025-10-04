import Link from "next/link";
export default function SectionHeader({
  title,
  textSize = "text-lg",
  linkSize = "text-sm",
  textWeight = "font-semibold",
  h,
  mb = "mb-4",
  seeAllHref,
  noLink,
  onClick,
}: {
  title: string;
  textSize?: string;
  linkSize?: string;
  textWeight?: string;
  h?: string;
  mb?: string;
  seeAllHref: string;
  noLink?: boolean;
  onClick?: () => void;
}) {
  const buttonClasses = `${linkSize} cursor-pointer underline hover:text-white`;

  return (
    <div className={`${mb} ${h} flex items-center justify-start gap-5`}>
      <h2 className={`${textSize} ${textWeight}`}>{title}</h2>
      {(!noLink && !onClick && (
        <Link className={buttonClasses} href={seeAllHref}>
          See all
        </Link>
      )) ||
        null}
      {onClick && (
        <button className={buttonClasses} onClick={onClick}>
          See all
        </button>
      )}
    </div>
  );
}
