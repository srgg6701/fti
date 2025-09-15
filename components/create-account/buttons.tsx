'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

import { ButtonRoundedGrey, ButtonRoundedBlue } from '@/components/button-rounded';
import { getUrlSegments } from '@/lib/utils';

type ButtonsProps = {
  messageType: string;
  status?: string;
  type: 'button' | 'submit' | 'reset' | undefined;
};

export default function Buttons({ messageType, status, type }: ButtonsProps) {
  const urlFirstSegment = getUrlSegments(usePathname, 1);

  return (
    <div className="mx-auto mt-auto flex w-full max-w-[300px] flex-col items-center">
      <ButtonRoundedGrey
        startContent={
          <Image alt="Google" height={18} src="/assets/images/icons/google.svg" width={18} />
        }
      />
      <ButtonRoundedBlue type={type} />
      {urlFirstSegment !== '/login' && urlFirstSegment !== '/logout' && (
        <p className="mt-[11.5px] text-sm">
          {messageType === 'have-you-account' && 'Do you already have an account?'}
          <Link className="ml-1 font-bold" href="/login">
            Log in
          </Link>
        </p>
      )}
      {status === 'error' && (
        <p className="text-sm text-red-400" role="alert">
          Something went wrong. Try again.
        </p>
      )}
    </div>
  );
}
