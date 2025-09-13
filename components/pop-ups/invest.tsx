import BacktestingInvest from '@/components/pop-ups/backtesting-invest';
export default function Invest({
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
      popupHeader="Invest"
      onClose={onClose}
      onRemove={onRemove}
      onSimulation={onSimulation}
    />
  );
}
