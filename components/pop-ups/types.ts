export type FilterActions = {
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
};

export interface ModalType {
  type: 'backtesting' | 'invest';
}

export interface FilterModalProps extends ModalType {
  isOpen?: boolean;
  onClose: () => void;
  onApply?: (filters: FilterState) => void;
  initialBoxValues?: FilterStateTop;
}

export type DataType = 'growthType' | 'strategyType';

export type FilterStateTop = {
  growthType: 'all' | 'raising' | 'downgrading';
  strategyType: 'stocks' | 'crypto';
};

export type FilterStateBottom = {
  winningRatio: number;
  posIndicator: number;
};

export type FilterState = FilterStateTop & FilterStateBottom;

export type LabelMap = {
  growthType: 'All' | 'Raising' | 'Downgrading';
  strategyType: 'Stocks' | 'Crypto';
};

export type Option<T extends DataType> = {
  value: FilterStateTop[T];
  label: LabelMap[T];
};


export interface RadioBlockProps<T extends DataType> {
  header: string;
  textStyle: string;
  dataType: T;
  dataArray: Option<T>[];
  checkedCondition: FilterStateTop[T];
  updateFilter: Function /* (key: T, value: FilterStateTop[T]) => void */;
}
