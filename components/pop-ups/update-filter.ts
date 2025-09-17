import type { FilterActions, FilterState } from '@/components/pop-ups/types';

const updateFilter = (
  key: keyof FilterState,
  target: HTMLInputElement,
  setFilters: FilterActions['setFilters'],
) => {
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

export default updateFilter;
