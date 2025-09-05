export default function CardMyStrategies({
  username,
  userImg,
  invested,
  proRata,
  direction,
  dynamics,
}: {
  username: string;
  userImg: string;
  invested: string;
  proRata: string;
  direction: string;
  dynamics: string;
}) {
  return (
    <>
      {username} : {userImg} : {invested} : {proRata} : {direction} : {dynamics}
    </>
  );
}
