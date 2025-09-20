export default function ErrMess({
  error,
  mx = "mx-auto",
  my,
  mt = "mt-[10px]",
  mb,
}: {
  error: string | null;
  mx?: string | null;
  my?: string | null;
  mt?: string | null;
  mb?: string | null;
}) {
  return (
    error && <p className={`error ${mx} ${my} ${mt} ${mb} text-sm`}>{error}</p>
  );
}
