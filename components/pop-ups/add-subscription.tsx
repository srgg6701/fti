"use client";
import Image from "next/image";
import { useState } from "react";

import StrategiesSearchSortFilter from "@/components/strategies-search-sort-filter";
import { Strategy } from "@/types/apiData";
import UserBlock from "@/components/cards/user-block";
import PopupWrapper from "@/components/pop-ups/popup-wrapper";
import PopupHeader from "@/components/pop-ups/styled-popup-header";
import SortingModal from "@/components/pop-ups/sorting";
import FilterModal from "@/components/pop-ups/filter";
export default function AddSubscription({
  applicableStrategies,
  onClose,
}: {
  applicableStrategies: Strategy[];
  onClose: () => void;
}) {
  const [isSortingOpen, setIsSortingOpen] = useState(false);
  const [currentSort, setCurrentSort] = useState("alphabetical");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const subscribeToStrategy = () => {};

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
        <PopupHeader>All Strategies</PopupHeader>
        <StrategiesSearchSortFilter
          handleFiltering={() => setIsFilterOpen(true)}
          handleSorting={() => setIsSortingOpen(true)}
          verticalOffset={false}
        />
        {applicableStrategies.map((strategy, index) => {
          console.log("Pop-up Strategy", strategy);

          return (
            <div key={`${strategy.name}-${index}`}>
              <UserBlock
                h="h-[55px]"
                headerDisplay="flex justify-between"
                imgAlt={`User asset`}
                padding="unset"
                userImg={strategy.userImg}
              >
                <div className="flex w-[90%] justify-between">
                  <div className="flex w-full justify-between">
                    <div className="flex flex-col gap-[5px]">
                      <div className="flex items-baseline gap-1.5">
                        <div className="font-medium">{strategy.name}</div>
                      </div>
                    </div>
                    <div className="flex">
                      <Image
                        alt="Asset graph"
                        height={14.5}
                        src={`/assets/images/charts/blue.svg`}
                        width={28}
                      />
                    </div>
                  </div>
                </div>
              </UserBlock>
            </div>
          );
        })}
        <SortingModal
          currentSort={currentSort}
          isOpen={isSortingOpen}
          onApply={(sortType) => setCurrentSort(sortType)}
          onClose={() => setIsSortingOpen(false)}
        />
        <FilterModal
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
        />
      </div>
    </PopupWrapper>
  );
}
