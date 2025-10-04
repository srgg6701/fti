import Image from "next/image";
export default function Billing() {
  const billingData = [
    {
      img: "plus",
      title: "Adding funds",
      desc: "Deposit from the account **** 5423",
      amount: "+ $ 324",
    },
    {
      img: "payment_success",
      title: "Payment",
      desc: "Payment for the standard service",
      amount: "$ 324",
    },
    {
      img: "payment_error",
      title: "Adding funds",
      desc: "Insufficient funds",
      amount: "- $ 324",
    },
    {
      img: "plus",
      title: "Adding funds",
      desc: "Deposit from the account **** 5423",
      amount: "+ $ 324",
    },
  ];
  const colorizeAmount = (amount: string): string | undefined => {
    switch (amount[0]) {
      case "+":
        return "color-blue-canonical";
      case "-":
        return "color-ultra-violet";
      default:
        break;
    }
  };

  return (
    <>
      {billingData.map((item, idx) => (
        <div
          key={idx}
          className="my-2.5 flex min-h-[66px] flex-wrap items-center justify-between gap-3 rounded-xl py-2.5"
        >
          <div className="flex min-w-0 items-center gap-5">
            <Image
              alt={item.title}
              height={25}
              src={`/assets/images/icons/billing/${item.img}_icon.png`}
              width={25}
            />
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-base">{item.title}</span>
                <span className="text-xs opacity-50">1 day ago</span>
              </div>
              <div className="text-sm opacity-80">{item.desc}</div>
            </div>
          </div>
          <div className={`text-sm ${colorizeAmount(item.amount)}`}>
            {item.amount}
          </div>
        </div>
      ))}
    </>
  );
}
