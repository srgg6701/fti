import type { CommonModal } from "@/components/pop-ups/types";

import { ChangeEvent } from "react";

import { ButtonRoundedBlue } from "@/components/button-rounded";
import PopupWrapper from "@/components/pop-ups/popup-wrapper";
import SliderInternals from "@/components/pop-ups/slider-internals";

import FormElementInput from "./form-elements/form-element-input";
import FormElementWrapper from "./form-elements/form-element-wrapper";

export default function Backtesting({ isOpen, onClose }: CommonModal) {
  if (!isOpen) {
    return;
  }
  const onSimulation = () => {
    console.log("Simulation started");
  };
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("onChange, e:", e);
  };

  return (
    <PopupWrapper deeper={true} h="396px" reducePb={true} w="380px" onClose={onClose}>
      <SliderInternals header="Backtesting" slider_header="Choose a risk">
        {({ txtLeftSemibold }) => (
          <FormElementWrapper header4="Enter the amount" id="enter-amount">
            <FormElementInput />
          </FormElementWrapper>
        )}
      </SliderInternals>
      <ButtonRoundedBlue btnText="Simulation" onClick={onSimulation} />
    </PopupWrapper>
  );
}
