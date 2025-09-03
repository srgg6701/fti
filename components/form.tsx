import { Form } from '@heroui/form';
type Props = {
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  children: React.ReactNode;
};

export default function FormWrapper({ onSubmit, children }: Props) {
  return (
    <section className="m-auto flex h-full w-full items-center justify-center">
      <Form
        className={`flex h-full max-h-[570px] w-full max-w-[328px] flex-col justify-center`}
        onSubmit={onSubmit}
      >
        {children}
      </Form>
    </section>
  );
}
