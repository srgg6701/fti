'use client';
import { Form } from '@heroui/form';
type Props = {
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  children: React.ReactNode;
};

export default function FormWrapper({ onSubmit, children }: Props) {
  return (
    <section className="relative m-auto flex h-full w-full items-center justify-center">
      {/* <div className="absolute inset-x-0 top-[30%] mx-auto mt-6 inline-block w-max bg-gray-100 px-[40px] py-[20px] text-center text-black">
        <span id="sending-data"> ◻ </span> Sending data...
      </div> */}
      <Form
        className={`flex h-full max-h-[570px] w-full max-w-[328px] flex-col justify-center`}
        onSubmit={onSubmit}
      >
        {children}
      </Form>
    </section>
  );
}
