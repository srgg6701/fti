export default function Header({messageType}:{messageType?: string}) {
  return (
    <header className="mb-[30px] text-center">
      <h1 className="font-formular-black mb-[15px] text-2xl font-semibold text-white">
        Create an account
      </h1>
      <p className="text-sm">
        {messageType === 'provide-your-phone' && <span>Please provide your phone number so that we can send you a confirmation code</span>}
        {messageType === 'provide-your-email' && <span>Enter your gmail to send the confirmation code</span>}
        {messageType === 'set-your-password' && <span>Come up with a strong password</span>}
        {messageType === 'enter-your-account-details' && <span>Please enter your account details</span>}
      </p>
    </header>
  );
}
