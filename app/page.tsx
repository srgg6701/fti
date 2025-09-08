import Link from 'next/link';
export default function Default() {
  return (
    <div>
      <h1>Page here</h1>
      <Link href="/temp">Go temp!</Link>
      |
      <Link href="/profile">Profile</Link>
    </div>
  );
}
