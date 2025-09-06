import Link from 'next/link';
import Image from 'next/image';
const CardNews = ({
  username,
  userImg,
  date,
  img,
  title,
  text,
  marginRight = 'mr-[10px]',
  padding = 'p-5',
}: {
  username: string;
  userImg: string;
  date: string;
  img: string;
  title: string;
  text: string;
  marginRight?: string;
  padding?: string;
}) => (
  <article className={`
    md:h-[376px]
    md:w-[320px]
    ${marginRight}
    ${padding}
    flex
    flex-col
    gap-5
    `}>
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Image alt="title" height={30} src={`/assets/images/users/${userImg}`} width={30} />
        <span className="text-sm">{username}</span>
      </div>
      <span className="text-xs text-white/60">{date}</span>
    </header>
    <div className="flex h-[180] w-[280] items-center overflow-hidden rounded-[16px]">
      <Image
        alt={title}
        className="h-full w-full"
        height={180}
        src={`/assets/images/news/${img}`}
        width={280}
      />
    </div>
    <div className="p-4">
      <h3 className="mb-[10px] text-lg leading-[1.2] font-semibold">{title}</h3>
      <p className="relative text-sm">
        <span className="color-secondary opacity-80">{text}</span>
        <Link className="read-more" href="/news/news11">
          ... <span className="text-blue-600/100"> read more</span>
        </Link>
      </p>
    </div>
  </article>
);

export default CardNews;
