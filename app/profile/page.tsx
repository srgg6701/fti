'use client';
import Image from 'next/image';
import SectionHeader from '@/components/sectionsWrapper/sectionHeader';
//import Link from 'next/link';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { Textarea } from '@heroui/input';
import { Switch } from '@heroui/react';
import { ButtonRoundedGrey } from "@/components/button-rounded";

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

  return (
    <div className="mx-auto max-w-[550px]">
      {/* Profile header */}
      <section {...sectionParams}>
        <div className="mx-auto flex flex-wrap gap-4">
          <Image
            alt="avatar"
            src="/assets/images/users/user-joshua.svg"
            width={120}
            height={120}
            className="h-[120px] w-[120px] rounded-2xl object-cover"
          />
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <Button className="bg-blue-second h-[31px] rounded-[15px]">Active</Button>
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
            className="flex flex-wrap items-center justify-between gap-3 rounded-xl my-2.5 py-2.5 min-h-[66px]"
          >
            <div className="flex min-w-0 items-center gap-5">
              <Image
                src={`/assets/images/icons/billing/${item.img}_icon.png`}
                width={25}
                height={25}
                alt={item.title}
              />
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span>{item.title}</span>
                  <span className="text-xs opacity-50">1 day ago</span>
                </div>
                <div className="text-sm">{item.desc}</div>
              </div>
            </div>
            <div className={`text-sm ${colorizeAmount(item.amount)}`}>
              {item.amount}
            </div>
          </div>
        ))}
      </section>
      {/* Verification */}
      <section className={verticalOffset}>
        <SectionHeader title="Verification" noLink={true} {...headerParams} />
        <ButtonRoundedGrey onPress={handleVerification} height='h-[45px]' width='w-[171px]' onClick={handleVerification} btnText="Verification page" />
      </section>
      {/* Settings */}
      <section {...sectionParams}>
        <SectionHeader title="Settings" noLink={true} {...headerParams} />
        <div className="flex items-center justify-between rounded-xl p-4">
          <span className="text-sm">Dark theme</span>
          <Switch defaultSelected size="sm"></Switch>
          {/* <Switch onChange={(e) => handleToggleDark(e.target.checked)} aria-label="Dark theme" /> */}
        </div>
        <div className="mt-3 flex items-center justify-between rounded-xl p-4 text-xs">
          <span>Fintech Innovation Trade, LLC</span>
          <span>v1.54.444</span>
        </div>
      </section>
      {/* Support */}
      <section {...sectionParams}>
        <SectionHeader title="Support" noLink={true} {...headerParams} />
        <p className="mb-3 text-sm">Specify your email address and describe the problem</p>
        <div className="space-y-3 rounded-xl p-4">
          <Input type="email" placeholder="account@gmail.com" className="w-full" />
          <Textarea placeholder="Describe the problem..." className="w-full" minRows={4} />
          <Button onPress={handleSendSupport} className="w-full">
            Send
          </Button>
        </div>
      </section>
    </div>
  );
}
