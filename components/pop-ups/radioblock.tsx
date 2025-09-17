import type { DataType, Option, RadioBlockProps } from '@/components/pop-ups/types';

import GenerateCheckbox from '@/components/checkboxes';

// Stub handler for radio selection side-effects
const onRadioSelect = (group: 'growthType' | 'strategyType', value: string) => {
  // no-op stub; replace with analytics/telemetry or side-effects if needed
  console.debug('Radio selected:', group, value);
};

export default function RadioBlock<T extends DataType>({
  header,
  textStyle,
  dataType,
  dataArray,
  checkedCondition,
  updateFilter,
}: RadioBlockProps<T>) {
  return (
    <div className="mb-8">
      <h3 className={`mb-4 ${textStyle}`}>{header}</h3>
      <div className="space-y-3">
        {dataArray.map((option: Option<T>) => (
          <GenerateCheckbox
            key={`${dataType}:${option.value}`}
            checked={checkedCondition === option.value}
            name={dataType}
            option={option}
            type="radio"
            onChange={() => {
              onRadioSelect(dataType, option.value);
              updateFilter(dataType, option.value);
            }}
          />
        ))}
      </div>
    </div>
  );
}
