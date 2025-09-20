"use client";
import { useState } from "react";
import { Button } from "@heroui/button";

//import GenerateCheckbox from '@/.sources/checkboxes';
import { RadioGroup, Radio } from "@heroui/react";

import PopupWrapper from "@/components/pop-ups/popup-wrapper";
import PopupHeader, {
  Subheader,
} from "@/components/pop-ups/styled-popup-header";

import { SortingModalProps } from "./types";

const sortOptions = [
  { value: "alphabetical", label: "Alphabetically A-Z" },
  { value: "creation-date", label: "By creation date" },
  { value: "profit-level", label: "By profit level" },
];

export default function SortingModal({
  isOpen,
  onClose,
  onApply,
  currentSort = "alphabetical",
}: SortingModalProps) {
  const [selectedSort, setSelectedSort] = useState(currentSort);

  if (!isOpen) return null;

  const handleApply = () => {
    onApply(selectedSort);
    onClose();
  };
  // Stub handler for radio selection side-effects
  const onChange = (value: string) => {
    // no-op stub; replace with analytics/telemetry or side-effects if needed
    console.debug("Radio selected:", value);
  };

  return (
    <PopupWrapper
      deeper={true}
      h="357px"
      reducePb={true}
      w="380px"
      onClose={onClose}
    >
      <div className="mb-6">
        <PopupHeader>Sorting</PopupHeader>
        <Subheader>Select the sort type</Subheader>
      </div>
      <div className="mb-8 space-y-4">
        <RadioGroup
          onChange={(e) => {
            onChange(e.target.value);
            setSelectedSort(e.target.value);
          }}
        >
          {sortOptions.map((option) => (
            <Radio key={option.value} value={option.value}>
              {option.label}
            </Radio>
          ))}
        </RadioGroup>
      </div>
      <Button className="btn-rounded bg-blue h-10 w-full" onClick={handleApply}>
        Apply
      </Button>
    </PopupWrapper>
  );
}
