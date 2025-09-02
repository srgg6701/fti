import { Form } from '@heroui/form';
type Props = {
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  children: React.ReactNode;
};

export default function FormWrapper({ onSubmit, children }: Props) {
  return (
    <>
      <div className="user-form-wrapper">
        <Form 
          className="flex w-full max-w-sm flex-col gap-4 p-8 dark:bg-gray-800"
          onSubmit={onSubmit}
        >
          {children}
        </Form>
      </div>
    </>
  );
}
