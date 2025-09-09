'use client';
import Image from 'next/image';

//import Link from 'next/link';
//import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { Textarea } from '@heroui/input';
import { Switch } from '@heroui/react';

import { ButtonRoundedBlue } from '@/components/button-rounded';
import SectionHeader from '@/components/sectionsWrapper/sectionHeader';
import { ButtonRoundedGrey } from '@/components/button-rounded';

const headerParams = {
  h: 'h-[33px]',
  mb: 'mb-5',
  seeAllHref: '/#',
};
const verticalOffset = 'pt-[var(--offset-80)]';
const sectionParams = {
  className: `flex flex-col ${verticalOffset}`,
};

const billingData = [
  {
    img: 'plus',
    title: 'Adding funds',
    desc: 'Deposit from the account **** 5423',
    amount: '+ $ 324',
  },
  {
    img: 'payment_success',
    title: 'Payment',
    desc: 'Payment for the standard service',
    amount: '$ 324',
  },
  { img: 'payment_error', title: 'Adding funds', desc: 'Insufficient funds', amount: '- $ 324' },
  {
    img: 'plus',
    title: 'Adding funds',
    desc: 'Deposit from the account **** 5423',
    amount: '+ $ 324',
  },
];

export default function ProfileDraft() {
  // Handlers (placeholders)
  const handleVerification = () => {
    console.log('Handling verification...');
    window.alert('Handling verification...');
  };
  const handleToggleDark = (checked: boolean) => {};
  const handleSendSupport = () => {};

  const colorizeAmount = (amount: string): string | undefined => {
    switch (amount[0]) {
      case '+':
        return 'color-blue-canonical';
      case '-':
        return 'color-ultra-violet';
      default:
        break;
    }
  };

  function closeActive() {
    console.log('Closing active...');
  }

  return (
    <div className="mx-auto max-w-[550px]">
      {/* Profile header */}
      <section {...sectionParams}>
        <div className="mx-auto flex flex-wrap gap-4">
          <Image
            alt="avatar"
            className="h-[120px] w-[120px] rounded-2xl object-cover"
            height={120}
            src="/assets/images/users/user-joshua.svg"
            width={120}
          />
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <div className="flex flex-wrap items-center gap-2">
              {/* <Button className="bg-blue-second h-[31px] rounded-[15px]">Active</Button> */}
              <div className="relative">
                <span
                  className="cursor-pointer"
                  style={{ position: 'absolute', top: '3px', left: '12px', zIndex: 1 }}
                >
                  Active
                </span>
                <Image
                  alt="Close"
                  className="cursor-pointer"
                  height={16}
                  src="/assets/images/cross/cross-light-bolder.svg"
                  onClick={closeActive}
                  width={16}
                  //className="righ-[5px]·absolute·top-[3.5px]·z-[1]"
                  style={{ position: 'absolute', top: '8px', right: '7px', zIndex: 1 }}
                />
                <ButtonRoundedBlue
                  bgColor="bg-blue-second"
                  btnText=""
                  height="h-[31px]"
                  width="w-[94px]"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm">Standard</span>
                <span className="text-sm opacity-50">Active until 24.03.2026</span>
              </div>
            </div>
            <h2 className="h-[28px] text-[28px]">Joshua</h2>
          </div>
        </div>
      </section>
      {/* Billing (stacked with other sections) */}
      <section {...sectionParams}>
        <SectionHeader title="Billing" {...headerParams} />
        {billingData.map((item, idx) => (
          <div
            key={idx}
            className="my-2.5 flex min-h-[66px] flex-wrap items-center justify-between gap-3 rounded-xl py-2.5"
          >
            <div className="flex min-w-0 items-center gap-5">
              <Image
                alt={item.title}
                height={25}
                src={`/assets/images/icons/billing/${item.img}_icon.png`}
                width={25}
              />
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-base">{item.title}</span>
                  <span className="text-xs opacity-50">1 day ago</span>
                </div>
                <div className="text-sm opacity-80">{item.desc}</div>
              </div>
            </div>
            <div className={`text-sm ${colorizeAmount(item.amount)}`}>{item.amount}</div>
          </div>
        ))}
      </section>
      {/* Verification */}
      <section className={verticalOffset}>
        <SectionHeader noLink={true} title="Verification" {...headerParams} />
        <ButtonRoundedGrey
          btnText="Verification page"
          fontSize="text-base"
          height="h-[45px]"
          width="w-[171px]"
          onClick={handleVerification}
          onPress={handleVerification}
        />
      </section>
      {/* Settings */}
      <section {...sectionParams}>
        <SectionHeader noLink={true} title="Settings" {...headerParams} />
        <div className="mb-5 flex items-center justify-between">
          <span className="text-lg font-semibold">Dark theme</span>
          <Switch defaultSelected size="sm" />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold">Fintech Innovation Trade, LLC</span>
          <span className="text-sm opacity-80">v1.54.444</span>
        </div>
      </section>
      {/* Support */}
      <section {...sectionParams}>
        <SectionHeader noLink={true} title="Support" {...headerParams} />
        <p className="mb-5 text-sm opacity-80">
          Specify your email address and describe the problem
        </p>
        <div className="flex flex-col gap-5">
          <Input className="w-full max-w-[300px]" placeholder="account@gmail.com" type="email" />
          <Textarea className="w-full" minRows={4} placeholder="Describe the problem..." />
          <div className="pb-[56px]">
            <ButtonRoundedBlue
              btnText="Send"
              width="w-full max-w-[300px]"
              onClick={handleSendSupport}
            />
          </div>
          {/* <Button className="w-full">
            Send
          </Button> */}
        </div>
      </section>
    </div>
  );
}
