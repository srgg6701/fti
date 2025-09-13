'use client';
import { Fragment, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@heroui/button';

import UserBlock from '@/components/cards/user-block';
import Subheaders from '@/components/headers/subheaders';
import DropdownPill from '@/components/dateDropDown';
import Notification from '@/components/pop-ups/notification';
import UserBlockSecondary from '@/components/user-block-secondary';
import AssetsList from '@/components/pop-ups/assets-list';
import AddAccount from '@/components/pop-ups/add-account';
import Backtesting from '@/components/pop-ups/backtesting';
import perfData from '@/mockData/performance';

function Collapsible({ open, children }: { open: boolean; children: React.ReactNode }) {
  const [shouldRender, setShouldRender] = useState(open);

  useEffect(() => {
    if (open) setShouldRender(true);
  }, [open]);

  const handleEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    if (!open) setShouldRender(false);
  };

  return (
    <div
      className={`relative overflow-hidden transition-[max-height,opacity,margin] duration-300 ${
        open ? 'mb-5 max-h-40 opacity-100' : 'mb-0 max-h-0 opacity-0'
      }`}
      onTransitionEnd={handleEnd}
    >
      {shouldRender && children}
    </div>
  );
}

export default function Strategy() {
  const [openIds, setOpenIds] = useState<string[]>([]);
  const [notificationIsOpen, setNotification] = useState<boolean>(false);
  const [assetsListIsOpen, setAssetsList] = useState<boolean>(false);
  // TODO: remove after clarifying the way of opening Backtesting and Add Account modals
  const params = useSearchParams();
  const backtestingOpen = params.get('backtesting');
  //const addAccountOpen = params.get('account');

  console.log({ backtestingOpen, params });

  const [isBacktestingOpen, setBacktestingOpen] = useState<string | null>(backtestingOpen);
  const [idAddAccountIsOpen, setAddAccount] = useState<boolean | null>(null);

  // ******************************************************************

  function addAddAccount() {
    setAddAccount(true);
    setBacktestingOpen(null);
  }
  function swtchBacktesting() {
    setBacktestingOpen(null);
  }
  function onRemove() {
    alert('Remove account or what?');
  }
  function swtchAddAccount() {
    setAddAccount(null);
  }
  function switchNotification() {
    setNotification(!notificationIsOpen);
  }
  function switchAssetsList() {
    setAssetsList(!assetsListIsOpen);
  }

  function handleTextBlock(id: string) {
    setOpenIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  function onSimulation() {
    console.log('onSimulation called');
    setNotification(true);
  }
  function onInvest() {
    console.log('onInvest called');
    setAssetsList(true);
  }

  return (
    <>
      <div className="mx-auto my-[80px] flex w-full max-w-[880] flex-col">
        <section className="mb-10 flex items-center justify-between">
          <div className="max-w-[207px]">
            <UserBlock
              h="h-auto"
              imgAlt="Strategy of Joshua"
              marginRight="mx-0"
              mb="0"
              padding="0"
              userImg="user-joshua.svg"
            >
              Joshua
            </UserBlock>
            <p className="mt-2.5 text-sm">
              This strategy represents a set of the world&apos;s leading assets
            </p>
          </div>
          <div className="flex gap-2.5">
            <Button
              className="bg-translusent-light btn-rounded outline-color-15 m-auto mb-[10px] w-[123px] outline"
              onPress={onSimulation}
            >
              Simulation
            </Button>
            <Button className="btn-rounded bg-blue m-auto mb-[10px] w-[90px]" onPress={onInvest}>
              Invest
            </Button>
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
              className="mt-5 mb-[22px]"
              height={160.5}
              src="/assets/images/charts/strategies/strategy-graph.svg"
              width={510}
            />
            <div className="flex justify-center gap-[5px] py-0.5">
              <div className="color-blue-canonical">- Strategy</div>
              <div className="color-ultra-violet">- S&P500</div>
            </div>
          </div>
          <div className="standard-colored-005-rounded w-[100%] p-5 min-sm:max-w-[320px]">
            <h4 className="h-[21px]">Performance</h4>
            <dl className="mt-5 grid grid-cols-[1fr_auto] gap-x-6 gap-y-2.5">
              {perfData.map((item) => (
                <Fragment key={item.label}>
                  <dt className="text-xs">{item.label}</dt>
                  <dd className="flex h-[18px] items-center gap-1 tabular-nums">
                    {(item.direction && (
                      <UserBlockSecondary
                        change={item.change}
                        direction={item.direction}
                        value={item.value}
                      />
                    )) || (
                      <div className="w-full pr-[2px] pl-[5px] text-right text-xs">
                        {item.value}
                      </div>
                    )}
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
            const open = openIds.includes(itemId);

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
                    style={{ height: '9px', transform: `rotate(${open ? 180 : 0}deg)` }}
                    width={14}
                  />
                </div>
                <Collapsible open={openIds.includes(itemId)}>
                  <div className="absolute top-[20%] left-[30%] z-2 flex flex-col gap-[5px] p-2.5">
                    <div className="text-xs">April 23</div>
                    <div>
                      <Subheaders direction="Up" header="$ 1432" subheader="$ 324 (3.23%)" />
                    </div>
                  </div>
                  <Image
                    alt="Graph dynamics"
                    className="max-w-[100%]"
                    height={157}
                    src="/assets/images/charts/strategies/strategy-graph-inside.svg"
                    width={840}
                  />
                </Collapsible>
              </div>
            );
          })}
        </section>
      </div>
      {(notificationIsOpen && <Notification onCloseModal={switchNotification} />) || null}
      {(assetsListIsOpen && <AssetsList onCloseModal={switchAssetsList} />) || null}
      {(isBacktestingOpen && (
        <Backtesting
          addAccount={addAddAccount}
          onClose={swtchBacktesting}
          onRemove={onRemove}
          onSimulation={switchNotification}
        />
      )) ||
        null}
      {(idAddAccountIsOpen && <AddAccount onClose={swtchAddAccount} />) || null}
    </>
  );
}
