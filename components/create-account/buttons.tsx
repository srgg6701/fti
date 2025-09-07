'use client';
import { Button } from '@heroui/button';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { getUrlSegments } from '@/lib/utils';

export default function Buttons({ messageType, status }: { messageType: string; status?: string }) {
  const urlFirstSegment = getUrlSegments(usePathname, 1);

  return (
    <div className="mx-auto mt-auto flex w-full max-w-[300px] flex-col items-center">
      <Button
        className="text-primary bg-translusent-light btn-rounded outline-color-15 m-auto mb-[10px] w-full outline"
        //TODO: update later on:
        isLoading={status === 'loading'}
        startContent={
          <Image alt="Google" height={18} src="/assets/images/icons/google.svg" width={18} />
        }
        type="submit"
      >
        Register with Google
      </Button>
      <Button
        className="btn-rounded bg-blue m-auto mb-[10px] w-full"
        isLoading={status === 'loading'}
        type="submit"
      >
        Complete!
      </Button>
      {urlFirstSegment !== '/login' && urlFirstSegment !== '/logout' && (
        <p className="mt-[11.5px]">
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
