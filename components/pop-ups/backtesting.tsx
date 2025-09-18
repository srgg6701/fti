//import BacktestingInvest from '@/components/pop-ups/backtesting-invest';
export default function Backtesting({ onClose }: { onClose: () => void }) {
  return true; //<FilterModal type="backtesting" onClose={onClose} />;
}
/* export default function Backtesting({
  onClose,
  onRemove,
  onSimulation,
  addAccount,
}: {
  onClose: () => void;
  onRemove: () => void;
  onSimulation: () => void;
  addAccount: () => void;
}) {
  return (
    <BacktestingInvest
      addAccount={addAccount}
      popupHeader="Backtesting"
      onClose={onClose}
      onRemove={onRemove}
      onSimulation={onSimulation}
    />
  );
} */
