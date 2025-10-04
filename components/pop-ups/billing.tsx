import PopupWrapper from "@/components/pop-ups/popup-wrapper";
import PopupHeader from "@/components/pop-ups/styled-popup-header";
import Billing from "@/components/billing";
export default function BillingModal({ onClose }: { onClose: () => void }) {
  return (
    <PopupWrapper deeper={true} reducePb={true} onClose={onClose}>
      <PopupHeader>Billing</PopupHeader>
      <Billing />
    </PopupWrapper>
  );
}
