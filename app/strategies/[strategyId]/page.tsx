'use client';
//export const metadata = { title: 'Your Strategy' };
import { Fragment, useState } from 'react';
import Image from 'next/image';
import { Button } from '@heroui/button';

import UserBlock from '@/components/cards/user-block';
import Subheaders from '@/components/headers/subheaders';
import ArrowsUpDown from '@/components/arrows/up-down';
import DropdownPill from '@/components/dateDropDown';
import perfData from '@/mockData/performance';

export default function Strategy() {
  const [openId, setOpenId] = useState<string | null>(null);

  function handleTextBlock(id: string) {
    console.log('handleTextBlock', id);
    setOpenId((prev) => (prev === id ? null : id));
  }

  return (
    <div className="mx-auto my-[80px] flex w-full max-w-[880] flex-col">
      <section className="mb-10 flex items-center justify-between">
        <div className="max-w-[207px]">
          <UserBlock
            h="h-auto"
            imgAlt="Strategy of Joshua"
            marginRight="mx-0"
            mb="0"
            padding="0"
            userImg="male-yellow-face-bg-blue.svg"
          >
            Joshua
          </UserBlock>
          <p className="mt-2.5 text-sm">
            This strategy represents a set of the world&apos;s leading assets
          </p>
        </div>
        <div className="flex gap-2.5">
          <Button className="text-primary bg-translusent-light btn-rounded outline-color-15 m-auto mb-[10px] w-[123px] outline">
            Simulation
          </Button>
          <Button className="btn-rounded bg-blue m-auto mb-[10px] w-[90px]">Invest</Button>
        </div>
      </section>
      <section className="mb-2.5 flex justify-between gap-2.5 max-sm:flex-wrap">
        <div className="standard-colored-005-rounded flex flex-col p-5">
          <div className="flex justify-between">
            <Subheaders direction="Up" header="$ 1432" subheader="$ 324 (3.23%)" />
            <DropdownPill
              items={[
                { label: '1 Week', value: '1week' },
                { label: '1 Month', value: '1month' },
                { label: '6 Months', value: '6month' },
                { label: '1 Year', value: '1year' },
                { label: '2 Years', value: '2years' },
                { label: '3 Years', value: '3years' },
              ]}
              onSelect={(item) => console.log('selected:', item)}
            />
          </div>
          <Image
            alt="Strategy Graph"
            className="mt-5"
            height={160.5}
            src="/assets/images/charts/strategies/strategy-graph.svg"
            width={510}
          />
        </div>
        <div className="standard-colored-005-rounded w-[100%] p-5 min-sm:max-w-[320px]">
          <h4 className="h-[21px]">Performance</h4>
          <dl className="mt-5 grid grid-cols-[1fr_auto] gap-x-6 gap-y-2.5">
            {perfData.map((item) => (
              <Fragment key={item.label}>
                <dt className="text-xs">{item.label}</dt>
                <dd className="flex h-[18px] items-center gap-1 tabular-nums">
                  <div className="flex w-full justify-end text-right">
                    {item.direction && <ArrowsUpDown direction={item.direction} />}
                    <div className="pl-[5px] text-xs whitespace-nowrap">{item.value}</div>
                    {item.change && (
                      <span
                        className={`${item.direction === 'Up' ? 'color-blue-canonical' : 'color-ultra-violet'} text-xs`}
                      >
                        {item.change}
                      </span>
                    )}
                  </div>
                </dd>
              </Fragment>
            ))}
          </dl>
        </div>
      </section>
      <section className="standard-colored-005-rounded p-5">
        <h4 className="mb-5 h-[21px]">Details</h4>
        {[
          { header: '2025', subheader: '$ 32 (1.23%)', direction: 'Up' },
          { header: '2024', subheader: '$ 32 (1.23%)', direction: 'Up' },
          { header: '2023', subheader: '$ 674 (16.29%)', direction: 'Up' },
        ].map((data, i) => {
          const itemId = `${data.header}-${i}`;

          return (
            <div key={itemId}>
              <div
                className="mb-2.5 flex h-[23px] justify-between"
                role="button"
                onClick={() => handleTextBlock(itemId)}
              >
                <Subheaders
                  direction={data.direction}
                  h="regular17 mr-1.25"
                  header={data.header}
                  sSize="text-sm"
                  subheader={data.subheader}
                />
                <Image
                  alt="Click to Expand / Collaps"
                  height={9}
                  src="/assets/images/icons/arrows/arrow_down.png"
                  style={{ height: '9px' }}
                  width={14}
                />
              </div>
              {openId === itemId && <div className="mb-5">Hidden text here</div>}
            </div>
          );
        })}
      </section>
    </div>
  );
}
