'use client';
import { useState } from 'react';

export default function Header({ messageType, header = "Create an account" }: { messageType?: string, header?: string }) {
  const [hint, setHint] = useState(false);
  return (
    <header className="mx-auto mb-[30px] text-center">
      <h1 className="font-formular-black mb-[15px] text-2xl font-semibold text-white mx-[-1rem]">
        {header}
      </h1>
      <p className="text-sm">
        {messageType === 'provide-your-email' && (
          <span>Enter your gmail to send the confirmation code</span>
        )}
        {messageType === 'set-your-password' && (
          <span>
            Come up with a strong password{' '}
            <span onClick={() => setHint(!hint)} className="cursor-pointer">
              🛈︎
            </span>
          </span>
        )}
        {messageType === 'enter-your-account-details' && (
          <span>Please enter your account details</span>
        )}
      </p>
      {hint && (
        <div className="w-full text-left mt-4 max-w-[300px] text-sm">
          Password: 8–128 chars, including:
          <ul className="pl-8 list-disc">
            <li>lowercase</li>
            <li>uppercase</li>
            <li>digit and</li>
            <li>symbol</li>
          </ul>
          No spaces, ASCII only. Avoid common passwords, 3+ repeats, and sequences.
        </div>
      )}
    </header>
  );
}
