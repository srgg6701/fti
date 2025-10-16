export default function UserBlockNews({
  title,
  slug,
  //userImg,
  author,
  date,
}: {
  title: string;
  slug?: string;
  //userImg: string;
  author: string;
  date: string;
}) {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {/* <UserImage height={30} title={title} userImg={userImg} width={30} /> */}
        <span className={`${slug ? "text-base" : "text-sm"} font-medium`}>
          {author}
        </span>
      </div>
      <span className="text-xs text-white/60">{date}</span>
    </header>
  );
}
