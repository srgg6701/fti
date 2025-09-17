import type { DataType, Option } from '@/components/pop-ups/types';

type Props<T extends DataType> = {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  checked: boolean;
  type?: 'radio' | 'checkbox';
  name: T; // keep inputs in a single group per dataType
  option: Option<T>; // { value: FilterStateTop[T]; label: LabelMap[T] }
};

export default function GenerateCheckbox<T extends DataType>({
  onChange,
  checked,
  type = 'radio',
  name,
  option,
}: Props<T>) {
  return (
    <label className="group flex cursor-pointer items-center">
      <div className="relative mr-3">
        {/* Hidden native input to drive accessibility and state */}
        <input
          checked={checked}
          className="sr-only"
          name={name}
          type={type}
          value={option.value} // string literal union (safe for <input>)
          onChange={onChange}
        />
        <div
          className={`h-5 w-5 rounded-full border-[1px] transition-all duration-200 ${
            checked ? 'border-blue-500' : 'border-white/30 group-hover:border-white/50'
          }`}
        >
          {checked && (
            <div className="absolute top-1/2 left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-blue-500" />
          )}
        </div>
      </div>

      <span className={`${checked ? 'text-white' : 'opacity-60'} text-sm`}>{option.label}</span>
    </label>
  );
}
