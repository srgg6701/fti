import Link from 'next/link';
import Image from 'next/image';
const CardNews = ({
  userImg,
  date,
  img,
  title,
  text,
}: {
  userImg: string;
  date: string;
  img: string;
  title: string;
  text: string;
}) => (
  <article className="flex flex-col gap-5 mr-[10px] p-5 md:h-[376px] md:w-[320px]">
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Image src={`/assets/images/users/${userImg}`} alt="title" width={30} height={30} />
        <span className="text-sm">username</span>
      </div>
      <span className="text-xs text-white/60">{date}</span>
    </header>
    <div className="flex w-[280] h-[180] items-center rounded-[16px] overflow-hidden">
      <Image
        alt={title}
        src={`/assets/images/news/${img}`}
        width={280}
        height={180}
        className="h-full w-full"
      />
    </div>
    <div className="p-4">
      <h3 className="mb-[10px] text-lg leading-[1.2] font-semibold">{title}</h3>
      <p className="relative text-sm">
        {text}
        <Link className="read-more" href="/news/news11">... <span className="text-blue-600/100"> read more</span></Link>
      </p>
    </div>
  </article>
);

export default CardNews;
