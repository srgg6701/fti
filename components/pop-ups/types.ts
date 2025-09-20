export type FilterActions = {
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
};

export interface ModalType {
  type: "backtesting" | "invest";
}

export interface CommonModal {
  isOpen?: boolean;
  onClose: () => void;
}

export interface FilterModalProps extends ModalType, CommonModal {}

export interface SortingModalProps extends CommonModal {
  onApply: (sortType: string) => void;
  currentSort?: string;
}

export type DataType = "growthType" | "strategyType";

export type FilterStateTop = {
  growthType: "all" | "raising" | "downgrading";
  strategyType: "stocks" | "crypto";
};

export type FilterStateBottom = {
  winningRatio: number;
  posIndicator: number;
};

export type FilterState = FilterStateTop & FilterStateBottom;

export type LabelMap = {
  growthType: "All" | "Raising" | "Downgrading";
  strategyType: "Stocks" | "Crypto";
};

export type Option<T extends DataType> = {
  value: FilterStateTop[T];
  label: LabelMap[T];
};

export interface RadioBlockProps<T extends DataType> {
  header: string;
  textStyle: string;
  dataArray: Option<T>[];
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}
