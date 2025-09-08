'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { Textarea } from '@heroui/input';
import { Switch } from '@heroui/switch';

export default function ProfileDraft() {
  // Placeholder handlers
  const handleVerification = () => {};
  const handleToggleDark = (value: boolean) => {};
  const handleSendSupport = () => {};

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 md:px-6 lg:px-8">
      {/* Header / Profile */}
      <section className="mb-8">
        <div className="flex flex-wrap items-start gap-4">
          <Image
            alt="avatar"
            src="/assets/images/users/user-joshua.svg"
            width={120}
            height={120}
            className="h-[120px] w-[120px] rounded-2xl object-cover"
          />
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full px-2 py-1 text-xs">Active</span>
              <span className="rounded-lg px-3 py-1 text-sm">Standard • Active until 24.03.2026</span>
            </div>
            <div className="text-lg">username</div>
          </div>
        </div>
      </section>

      {/* Main grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left column: Billing + Verification */}
        <div className="lg:col-span-2">
          {/* Billing */}
          <section className="mb-6">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg">Billing</h2>
              <Link href="#" className="text-sm">See all</Link>
            </div>
            <div className="space-y-3">
              {[
                { title: 'Adding funds', desc: 'Deposit from the account **** 5423', amount: '+ $ 324' },
                { title: 'Payment', desc: 'Payment for the standard service', amount: '$ 324' },
                { title: 'Adding funds', desc: 'Insufficient funds', amount: '- $ 324' },
                { title: 'Adding funds', desc: 'Deposit from the account **** 5423', amount: '+ $ 324' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded-full" />
                    <div>
                      <div className="flex items-center gap-2 text-sm">
                        <span>{item.title}</span>
                        <span className="text-xs">• 1 day ago</span>
                      </div>
                      <div className="text-xs">{item.desc}</div>
                    </div>
                  </div>
                  <div className="text-sm">{item.amount}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Verification */}
          <section className="mb-6">
            <h2 className="mb-3 text-lg">Verification</h2>
            <div className="rounded-xl p-4">
              <Button onPress={handleVerification} className="w-max">Verification page</Button>
            </div>
          </section>

          {/* Settings */}
          <section className="mb-6">
            <h2 className="mb-3 text-lg">Settings</h2>
            <div className="flex items-center justify-between rounded-xl p-4">
              <span className="text-sm">Dark theme</span>
              <Switch onChange={(e) => handleToggleDark(e.target.checked)} aria-label="Dark theme" />
            </div>
            <div className="mt-3 flex items-center justify-between rounded-xl p-4 text-xs">
              <span>Fintech Innovation Trade, LLC</span>
              <span>v1.54.444</span>
            </div>
          </section>
        </div>

        {/* Right column: Support */}
        <div className="lg:col-span-1">
          <section>
            <h2 className="mb-2 text-lg">Support</h2>
            <p className="mb-3 text-sm">Specify your email address and describe the problem</p>
            <div className="space-y-3 rounded-xl p-4">
              <Input type="email" placeholder="account@gmail.com" className="w-full" />
              <Textarea placeholder="Describe the problem..." className="w-full" minRows={4} />
              <Button onPress={handleSendSupport} className="w-full">Send</Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}


