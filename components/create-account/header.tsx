"use client";
import { useState } from "react";

export default function Header({
  messageType,
  header = "Create an account",
}: {
  messageType?: string;
  header?: string;
}) {
  const [hint, setHint] = useState(false);

  return (
    <header className="mx-auto mb-[30px] text-center">
      <h1 className="font-formular-black mx-[-1rem] mb-[15px] text-2xl font-semibold text-white">
        {header}
      </h1>
      <p className="text-sm">
        {messageType === "provide-your-email" && (
          <span>Enter your gmail to send the confirmation code</span>
        )}
        {messageType === "set-your-password" && (
          <span>
            Come up with a strong password
            <button
              className="ml-[8px] scale-[1.5] cursor-pointer"
              type="button"
              onClick={() => setHint(!hint)}
            >
              🛈︎
            </button>
          </span>
        )}
        {messageType === "enter-your-account-details" && (
          <span>Please enter your account details</span>
        )}
      </p>
      {hint && (
        <div className="mt-4 w-full max-w-[300px] text-left text-sm">
          Password: 8–128 chars, including:
          <ul className="list-disc pl-8">
            <li>lowercase</li>
            <li>uppercase</li>
            <li>digit and</li>
            <li>symbol</li>
          </ul>
          No spaces, ASCII only. Avoid common passwords, 3+ repeats, and
          sequences.
        </div>
      )}
    </header>
  );
}
