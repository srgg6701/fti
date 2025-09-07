'use client';
import { useState, FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@heroui/input';

import Form from '@/components/create-account/form';
import ErrMess from '@/components/errMess';
import { validatePassword } from '@/lib/utils';
import { apiFetch } from '@/lib/api';

export default function SetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams(); // <-- hook at top level
  const email = searchParams.get('email');
  const username = email?.split('@').join('').split('.').shift() || 'unknown';

  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errMess, setErrMess] = useState<string | null>(null);
  //const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrMess(null);

    const passwordMessagesEN = {
      empty: 'Please enter password.',
      too_short: 'At least 8 characters.',
      too_long: 'Too long (max 128).',
      whitespace: 'No whitespace allowed.',
      invalid_char: 'ASCII only (no Unicode).',
      lower: 'Add a lowercase letter (a–z).',
      upper: 'Add an uppercase letter (A–Z).',
      digit: 'Add a digit (0–9).',
      symbol: 'Add a symbol (!@#$… ).',
      repeat: 'Avoid 3+ repeated characters.',
      sequence: 'Avoid sequences like 1234/abcd.',
      common: 'Password is too common.',
    };

    const passwordValid = validatePassword(password);

    if (!passwordValid.valid) {
      const errMess = passwordMessagesEN[passwordValid.reason];

      setErrMess(errMess);

      return;
    } else if (!password_confirmation) {
      setErrMess('Please enter password confirmation');

      return;
    } else if (password !== password_confirmation) {
      setErrMess("Passwords don't match");

      return;
    }
    try {
      setStatus('loading');
      await apiFetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, password, username }),
      });
      setStatus('success');
      console.log('%cRegistration is successful', 'color: green');
      router.push('/login');
    } catch (e) {
      setStatus('error');
    } finally {
      setTimeout(() => setStatus('idle'), 1000);
    }
  }

  return (
    <Form
      messageType={['set-your-password', 'have-you-account']}
      status={status}
      onSubmit={handleSubmit}
    >
      <Input
        className="bg-translusent-light blick-rounded mb-[10px] w-full pt-[2px]"
        inputMode="text"
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        className="bg-translusent-light blick-rounded w-full pt-[2px]"
        inputMode="text"
        placeholder="password retry"
        type="password"
        value={password_confirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
      />
      <ErrMess error={errMess} />
    </Form>
  );
}
