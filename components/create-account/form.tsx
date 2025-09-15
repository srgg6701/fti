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
      <Form
        className={`flex h-full max-h-[570px] w-full max-w-[328px] flex-col justify-center`}
        onSubmit={onSubmit}
      >
        <Header header={header} messageType={messageType[0]} />
        <div className="relative mx-auto flex w-full max-w-[300px] flex-col">{children}</div>
        <Buttons messageType={messageType[1]} status={status} type="submit" />
      </Form>
    </section>
  );
}
