import type { RadioBlockProps } from '@/components/pop-ups/types';

import GenerateCheckbox from '@/components/checkboxes';
import updateFilter from '@/components/pop-ups/update-filter';

// Stub handler for radio selection side-effects
const onRadioSelect = (group: 'growthType' | 'strategyType', value: string) => {
  // no-op stub; replace with analytics/telemetry or side-effects if needed
  console.debug('Radio selected:', group, value);
};

const RadioBlock = ({
  header,
  textStyle,
  dataArray,
  checkedCondition,
  dataType,
  setFilters,
}: RadioBlockProps) => (
  <div className="mb-8">
    <h3 className={`mb-4 ${textStyle}`}>{header}</h3>
    <div className="space-y-3">
      {dataArray.map((option) => (
        <GenerateCheckbox
          key={option.value}
          checkedCondition={checkedCondition}
          name="growthType"
          option={option}
          type="radio"
          onChange={(e) => {
            onRadioSelect(dataType, option.value);
            updateFilter(dataType, e.currentTarget, setFilters);
          }}
        />
      ))}
    </div>
  </div>
);

export default RadioBlock;
