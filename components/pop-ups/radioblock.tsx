import type {
  DataType,
  Option,
  RadioBlockProps,
} from "@/components/pop-ups/types";

import { RadioGroup, Radio } from "@heroui/react";

export default function RadioBlock<T extends DataType>({
  header,
  textStyle,
  dataArray,
  onChange,
}: RadioBlockProps<T>) {
  return (
    <div className="mb-8">
      <h3 className={`mb-4 ${textStyle}`}>{header}</h3>
      <div className="space-y-3">
        <RadioGroup onChange={onChange}>
          {dataArray.map((option: Option<T>) => (
            <Radio key={option.value} value={option.value}>
              {option.label}
            </Radio>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}
