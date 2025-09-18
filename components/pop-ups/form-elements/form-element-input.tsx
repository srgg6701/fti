import { Input } from '@heroui/react';
import { useState } from 'react';

import { validateValue } from '@/lib/utils';
import { inputStyle } from '@/styles/style-variables';

export default function FormElementInput({
  errorMessage = 'error text-sm absolute top-2',
  placeholder = '$1.500',
}: {
  errorMessage?: string;
  placeholder?: string;
}) {
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const MIN = 1500;

  return (
    <Input
      classNames={{
        inputWrapper: inputStyle,
        errorMessage,
      }}
      errorMessage={error ?? undefined}
      isInvalid={!!error}
      placeholder={placeholder}
      value={value}
      onBlur={() => validateValue(value, MIN, setError)}
      onValueChange={setValue}
    />
  );
}
