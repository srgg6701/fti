'use client';

import { LogoFTI } from '@/components/icons';

export default function Default() {
  const tm = setTimeout(() => {
    clearTimeout(tm);
    console.log('Will redirect to the create account');
    //redirect('/create-account');
    //redirect('/login');
  }, 3600);

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center">
      <div className="w-full max-w-[500px] flex-wrap">
        <LogoFTI className="m-auto max-w-[100%]" />
        <div>
          <div className="first-loader mt-[80px] h-[1px] bg-[#F4F9FF]" />
          <div className="font-rubik m-auto mt-[20px] text-center font-semibold">Loading...</div>
        </div>
      </div>
      <p className="absolute bottom-[80px] text-center">Fintech Trade Innovation</p>
    </div>
  );
}
