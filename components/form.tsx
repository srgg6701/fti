import { Form } from '@heroui/form';
type Props = {
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  children: React.ReactNode;
};

export default function FormWrapper({ onSubmit, children }: Props) {
  return (
    <section className="m-auto flex h-full w-full items-center justify-center">
      <Form
        className={`flex flex-col w-full max-w-[328px] h-full max-h-[570px] justify-center`}
        onSubmit={onSubmit}
      >
        {children}
      </Form>
    </section>
  );
}
