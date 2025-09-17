import type {
  FilterState,
  FilterStateBottom,
  FilterStateTop,
  ModalType,
  Option,
} from '@/components/pop-ups/types';

import { Select, SelectItem } from '@heroui/react';
import { ReactNode, useEffect, useState } from 'react';

import PopupWrapper from '@/components/pop-ups/popup-wrapper';
import PopupHeader, { Header4Left, Subheader } from '@/components/pop-ups/styled-popup-header';
import RadioBlock from '@/components/pop-ups/radioblock';
import FormElementWrapper from '@/components/pop-ups/form-elements/form-element-wrapper';
import FormElementInput from '@/components/pop-ups/form-elements/form-element-input';
import Slider from '@/components/slider';
import { selectStyle } from '@/styles/style-variables';
import allStrategies from '@/mockData/accounts';

/* ===== Local option sets (values only; types come from types.ts) ===== */
const growthOptions: Option<'growthType'>[] = [
  { value: 'all', label: 'All' },
  { value: 'raising', label: 'Raising' },
  { value: 'downgrading', label: 'Downgrading' },
];

const strategyOptions: Option<'strategyType'>[] = [
  { value: 'stocks', label: 'Stocks' },
  { value: 'crypto', label: 'Crypto' },
];

export default function SliderInternals({
  onClose,
  modalType,
  initialBoxValues,
  children,
}: {
  onClose: () => void;
  modalType?: ModalType['type'];
  initialBoxValues?: FilterStateTop;
  children: ReactNode;
}) {
  const txtLeftSemibold = 'text-left font-semibold';

  const [filters, setFilters] = useState<FilterStateBottom>({
    winningRatio: 0,
    posIndicator: 0,
  });

  useEffect(() => {
    setFilters({ ...filters, posIndicator: -4 });
  }, []);

  const updateFilter = (key: keyof FilterState, target: HTMLInputElement) => {
    if (key === 'winningRatio') {
      const value = parseInt(target.value, 10);
      const pos = target.getBoundingClientRect();
      const actualWidth = pos.width - 30;
      const indicatorPos = (actualWidth / 99) * value - 2.29 || 0;

      const wrLen = String(value).length;
      let posFix = 4;

      switch (wrLen) {
        case 3:
          posFix = 8;
          break;
        case 2:
          posFix = 6;
          break;
        default:
          break;
      }

      setFilters((prev) => ({
        ...prev,
        winningRatio: value,
        posIndicator: Number(indicatorPos.toFixed()) - posFix,
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        [key]: target.value as FilterState['growthType'] | FilterState['strategyType'],
      }));
    }
  };

  const sliderPosition = filters.winningRatio;

  const setHeader = () => {
    switch (modalType) {
      case 'backtesting':
        return 'Backtesting';
      case 'invest':
        return 'Invest';
      default:
        return 'Filter';
    }
  };

  return (
    <PopupWrapper deeper={true} h="673px" reducePb={true} w="380px" onClose={onClose}>
      <span>
        {/* Header */}
        <div className="mb-8">
          <PopupHeader>{setHeader()}</PopupHeader>
          {!modalType && <Subheader>Select the types of filtering</Subheader>}
        </div>
        {/* !modalType  */}
        {initialBoxValues && (
          <>
            {/* Type of growth */}
            <RadioBlock
              checkedCondition={initialBoxValues.growthType}
              dataArray={growthOptions}
              dataType="growthType"
              header="Growth type"
              textStyle={txtLeftSemibold}
              updateFilter={updateFilter}
            />
            {/* Type of strategy */}
            <RadioBlock
              checkedCondition={initialBoxValues?.strategyType}
              dataArray={strategyOptions}
              dataType="strategyType"
              header="Type of strategy"
              textStyle={txtLeftSemibold}
              updateFilter={updateFilter}
            />
          </>
        )}
        {modalType && (
          <FormElementWrapper header4="Enter the amount" id="enter-amount">
            <FormElementInput />
          </FormElementWrapper>
        )}
        {!modalType && <Header4Left>Choose a risk</Header4Left>}
        {modalType && modalType === 'invest' && (
          <FormElementWrapper header4="Enter the amount" id="enter-amount">
            <Select
              classNames={{
                trigger: selectStyle,
              }}
            >
              {allStrategies.map((str) => (
                <SelectItem key={str.brokerCode}>{str.brokerName}</SelectItem>
              ))}
            </Select>
          </FormElementWrapper>
        )}
      </span>
      {/* The winning ratio outline-dotted outline-1 */}
      <div>
        <h3 className={`h-[144px] ${txtLeftSemibold}`}>The winning ratio</h3>
        <Slider
          posIndicator={filters?.posIndicator}
          ratioType="winningRatio"
          setFilters={setFilters}
          sliderPosition={sliderPosition}
          updateFilter={updateFilter}
          winningRatio={filters?.winningRatio}
        />
      </div>
      {children}
    </PopupWrapper>
  );
}
