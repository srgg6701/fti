export type FilterActions = {
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
};

export interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: FilterState) => void;
  initialFilters?: FilterState;
}

export interface FilterState {
  growthType: 'all' | 'raising' | 'downgrading';
  strategyType: 'stocks' | 'crypto';
  winningRatio: number;
  posIndicator?: number;
}

export interface RadioBlockProps {
  header: string;
  textStyle: string;
  dataArray: {
    value: string;
    label: string;
  }[];
  checkedCondition: FilterState['growthType'] | FilterState['strategyType'];
  dataType: 'growthType' | 'strategyType';
  updateFilter: Function;
  setFilters: FilterActions['setFilters'];
}
