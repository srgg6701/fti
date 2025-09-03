export default function ErrMess ({error}: {error: string|null}) {
  return error && <p className="error mx-auto mt-[10px] text-sm">{error}</p>
}