export default function GenerateCheckbox({
  onChange,
  checkedCondition,
  type = 'radio',
  name,
  option,
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checkedCondition: string;
  type: string;
  name: string;
  option: { value: string; label: string };
}) {
  return (
    <label className="group flex cursor-pointer items-center">
      <div className="relative mr-3">
        <input
          checked={checkedCondition === option.value}
          className="sr-only"
          name={name}
          type={type}
          value={option.value}
          onChange={onChange}
        />
        <div
          className={`h-5 w-5 rounded-full border-[1px] transition-all duration-200 ${
            checkedCondition === option.value
              ? 'border-blue-500'
              : 'border-white/30 group-hover:border-white/50'
          }`}
        >
          {checkedCondition === option.value && (
            <div className="absolute top-1/2 left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-blue-500" />
          )}
        </div>
      </div>
      <span
        className={`${checkedCondition === option.value ? 'text-white' : 'opacity-60'} text-sm`}
      >
        {option.label}
      </span>
    </label>
  );
}
