import Link from "next/link";

export default function ContactBlocks() {
  return (
    <div>
      <hr className="opacity-60 my-7" />
      <h3 className="py-4 text-2xl">Contacts</h3>
      <div className="space-y-2">
        <p>FTI-Trade</p>
        <p>
          Email:{" "}
          <Link href="mailto:support@fti-trade.com">support@fti-trade.com</Link>
        </p>
        <p>
          Address: Clover Bay Tower, 2nd Floor, Al Abraj Street, Business Bay,
          Dubai, UAE
        </p>
      </div>
    </div>
  );
}
