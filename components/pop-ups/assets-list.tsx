'use client';
import { useState } from 'react';
import { Input } from '@heroui/input';
import Image from 'next/image';

import AssetsData from '@/mockData/assets-data';
import UserBlock from '@/components/cards/user-block';
import PopupWrapper from '@/components/pop-ups/popup-wrapper';
import PopupHeader from '@/components/pop-ups/styled-popup-header';
import UserBlockSecondary from '@/components/user-block-secondary';

import { CommonModal } from './types';
export default function AssetsList({ isOpen, onClose }: CommonModal) {
  const [activeAsset, setActiveAsset] = useState<string>('All');

  if (!isOpen) {
    return;
  }

  return (
    <PopupWrapper deeper={true} h="640px" w="460px" onClose={onClose}>
      <div className="relative flex flex-col gap-5">
        <Image
          alt="Search"
          className="absolute top-[74px] left-[13px] z-10"
          height={10}
          src="/assets/images/service/search-white.svg"
          width={10}
        />
        <PopupHeader>Asset list</PopupHeader>
        <div>
          <Input
            classNames={{
              inputWrapper: 'rounded-[15px] overflow-hidden mb-2.5 w-[380px] max-w-full',
            }}
            id="assets-list-search"
            placeholder="Search"
          />
          <ul
            className="outline-color-15 standard-block-decoration-40 bg-default-100 flex w-[380px] max-w-full justify-between outline"
            id="assets-list"
          >
            {[
              { type: 'All' },
              { type: 'Strategy' },
              { type: 'Stock' },
              { type: 'Crypto' },
              { type: 'Forex' },
            ].map((item) => (
              <li
                key={item.type}
                className={`rounded-[15px] ${item.type === activeAsset && 'bg-translusent-light'}`}
              >
                <button className="text-sm" onClick={() => setActiveAsset(item.type)}>
                  {item.type}
                </button>
              </li>
            ))}
          </ul>
        </div>
        {AssetsData.map((udata, index) => {
          if (activeAsset !== 'All' && activeAsset.toLowerCase() !== udata.asset) {
            return null;
          }

          return (
            <div key={`${udata.username}-${index}`}>
              <UserBlock
                h="h-[55px]"
                headerDisplay="flex justify-between"
                imgAlt={`User asset`}
                padding="unset"
                userImg={udata.userImg}
              >
                <div className="flex w-[90%] justify-between">
                  <div className="flex w-full justify-between">
                    <div className="flex flex-col gap-[5px]">
                      <div className="flex items-baseline gap-1.5">
                        <div className="font-medium">{udata.username}</div>
                        <div className="outline-color-15 standard-colored-01-rounded h-5 px-[5px] py-[3px] text-xs opacity-30 outline">
                          {udata.asset}
                        </div>
                      </div>
                      <UserBlockSecondary
                        change={udata.dynamics[1]}
                        changeTextSize="text-sm"
                        direction={udata.direction}
                        value={udata.dynamics[0]}
                        wrapperJustify="justify-start"
                      />
                    </div>
                    <div className="flex">
                      <Image
                        alt="Asset graph"
                        height={14.5}
                        src={`/assets/images/charts/${
                          udata.direction === 'Up' ? 'blue' : 'purple'
                        }.svg`}
                        style={{ transform: `${udata.direction === 'Down' && 'rotateY(180deg)'}` }}
                        width={28}
                      />
                    </div>
                  </div>
                </div>
              </UserBlock>
            </div>
          );
        })}
      </div>
    </PopupWrapper>
  );
}
