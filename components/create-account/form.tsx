'use client';
import { Form } from '@heroui/form';
import Header from '@/components/create-account/header';
import Buttons from '@/components/create-account/buttons';
type Props = {
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  status: string;
  header?: string;
  messageType: [string, string];
  children: React.ReactNode;
};

export default function FormWrapper({ onSubmit, status, messageType, header, children }: Props) {
  return (
    <section className="relative m-auto flex h-full w-full items-center justify-center">
      {/* <div className="absolute inset-x-0 top-[30%] mx-auto mt-6 inline-block w-max bg-gray-100 px-[40px] py-[20px] text-center text-black">
        <span id="sending-data"> ◻ </span> Sending data...
      </div> */}
      <Form
        className={`flex h-full max-h-[570px] w-full max-w-[328px] flex-col justify-center`}
        onSubmit={onSubmit}
      >
        <Header messageType={messageType[0]} header={header} />
        <div className="relative flex flex-col mx-auto w-full max-w-[300px]">
          {children}
        </div>
        <Buttons messageType={messageType[1]} status={status} />
      </Form>
    </section>
  );
}
