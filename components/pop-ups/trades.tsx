"use client";
import { Input } from "@heroui/input";
import Image from "next/image";

import TradeData from "@/mockData/trade-data";
import PopupWrapper from "@/components/pop-ups/popup-wrapper";
import PopupHeader from "@/components/pop-ups/styled-popup-header";

import ExchangeBlock from "../cards/exchange-block";
import CurrencyDynamics from "../currency-dynamics";

import { CommonModal } from "./types";
export default function Trades({ isOpen, onClose }: CommonModal) {
  if (!isOpen) {
    return;
  }

  return (
    <PopupWrapper deeper={true} h="auto" w="500px" onClose={onClose}>
      <div className="relative flex flex-col gap-5">
        <Image
          alt="Search"
          className="absolute top-[74px] left-[13px] z-10"
          height={10}
          src="/assets/images/service/search-white.svg"
          width={10}
        />
        <PopupHeader>Trades</PopupHeader>
        <div>
          <Input
            classNames={{
              inputWrapper:
                "rounded-[15px] overflow-hidden mb-2.5 w-[380px] max-w-full",
            }}
            id="assets-list-search"
            placeholder="Search"
            type="search"
          />
        </div>
        {TradeData.map((tdata, index) => {
          return (
            <div key={`${tdata.direction}-${index}`} className="py-[8.5px]">
              <ExchangeBlock
                headerDisplay="flex justify-between"
                imgAlt={`Currency exchange`}
                src={`/assets/images/icons/exchange/${tdata.currencyImg}`}
              >
                <div className="flex w-[90%] justify-between">
                  <div className="flex w-full justify-between">
                    <div className="flex flex-col gap-[2px]">
                      <div className="flex items-baseline gap-1.5">
                        <div className="font-medium">
                          {tdata.directionExchange}
                        </div>
                        <div className="h-5 px-[5px] py-[3px] text-xs opacity-30">
                          {tdata.date} ago
                        </div>
                      </div>
                      <div className="flex items-start text-sm gap-1">
                        <span>
                          <span className="opacity-50">Entry: </span>
                          <span className="opacity-80">{tdata.entry}</span>
                        </span>
                        <span>
                          <span className="opacity-50">Current: </span>
                          <span className="opacity-80">{tdata.current}</span>
                        </span>
                      </div>
                      <div className="text-left text-sm opacity-50">
                        {tdata.lots} lots
                      </div>
                    </div>
                    <CurrencyDynamics
                      change={tdata.dynamics[1]}
                      changeTextSize="text-sm"
                      direction={tdata.direction}
                      value={tdata.dynamics[0]}
                      wrapperJustify="justify-start"
                    />
                  </div>
                </div>
              </ExchangeBlock>
            </div>
          );
        })}
      </div>
    </PopupWrapper>
  );
}
