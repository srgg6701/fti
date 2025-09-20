import type { CommonModal } from "@/components/pop-ups/types";

import { ChangeEvent, useState } from "react";
import Image from "next/image";
import { Select, SelectItem } from "@heroui/react";

import allStrategies from "@/mockData/accounts";
import { ButtonRoundedBlue } from "@/components/button-rounded";
import PopupWrapper from "@/components/pop-ups/popup-wrapper";
import SliderInternals from "@/components/pop-ups/slider-internals";
import { Header4Left } from "@/components/pop-ups/styled-popup-header";
import { selectStyle } from "@/styles/style-variables";

import FormElementInput from "./form-elements/form-element-input";
import FormElementWrapper from "./form-elements/form-element-wrapper";
import AddAccount from "./add-account";

export default function Invest({ isOpen, onClose }: CommonModal) {
  const [isAddAccountOpen, setAddAccount] = useState<boolean | null>(null);

  function addAddAccount() {
    setAddAccount(true);
  }

  if (!isOpen) {
    return;
  }
  const onInvest = () => {
    console.log("Invest started");
  };
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("onChange, e:", e);
  };

  return (
    <>
      <PopupWrapper deeper={true} h="519px" reducePb={true} w="380px" onClose={onClose}>
        <SliderInternals header="Invest" slider_header="Choose a risk">
          {({ txtLeftSemibold }) => (
            <>
              <FormElementWrapper header4="Enter the amount" id="enter-amount">
                <FormElementInput />
              </FormElementWrapper>
              <div>
                <Header4Left>
                  <span>Choose an account</span>
                  <button className="text-center" onClick={addAddAccount}>
                    <Image
                      alt="Add your first strategy"
                      className="mx-auto cursor-pointer"
                      height="20"
                      src="/assets/images/cross/cross-blue-small.svg"
                      style={{ margin: "5px auto -5px 10px" }}
                      width="20"
                    />
                  </button>
                </Header4Left>
                <Select classNames={{ trigger: selectStyle }}>
                  {allStrategies.map((acc) => (
                    <SelectItem key={acc.brokerCode}>{acc.brokerName}</SelectItem>
                  ))}
                </Select>
              </div>
            </>
          )}
        </SliderInternals>
        <ButtonRoundedBlue btnText="Invest" onClick={onInvest} />
      </PopupWrapper>
      {(isAddAccountOpen && <AddAccount onClose={() => setAddAccount(null)} />) || null}
    </>
  );
}
