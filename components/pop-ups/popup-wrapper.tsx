import { ReactNode } from 'react';

export default function PopupWrapper({
  children,
  onClose,
  h,
  w,
}: {
  children: ReactNode;
  onClose: () => void;
  h: string;
  w: string;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className={`bg-translusent-extreme relative flex h-${h} w-${w} flex-col justify-between overflow-y-auto rounded-lg p-10 shadow-2xl`}>
        {children}
      </div>
    </div>
  );
}
