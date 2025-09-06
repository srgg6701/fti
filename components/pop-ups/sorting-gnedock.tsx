'use client';
import { useState } from 'react';
type SortType = 'az' | 'date' | 'profit';

export default function SortingCard({
  onApply,
}: { onApply?: (sort: SortType) => void }) {
  const [sort, setSort] = useState<SortType>('az');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSort(e.target.value as SortType);
  };

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    onApply?.(sort);
  };

  return (
    <div className="w-80 rounded-2xl p-6">
      <h2 className="text-3xl font-bold mb-1">Sorting</h2>
      <p className="text-sm mb-4">Select the sort type</p>

      <form onSubmit={handleApply} className="space-y-3">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="radio"
            name="sort"
            value="az"
            checked={sort === 'az'}
            onChange={handleChange}
          />
          <span>Alphabetically A–Z</span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="radio"
            name="sort"
            value="date"
            checked={sort === 'date'}
            onChange={handleChange}
          />
          <span>By creation date</span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="radio"
            name="sort"
            value="profit"
            checked={sort === 'profit'}
            onChange={handleChange}
          />
          <span>By profit level</span>
        </label>

        <button type="submit" className="w-full rounded-full py-3 font-semibold mt-4">
          Apply
        </button>
      </form>
    </div>
  );
}
