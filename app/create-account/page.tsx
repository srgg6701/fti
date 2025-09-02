'use client';
import { useState, FormEvent } from 'react';
import Image from 'next/image';
import { Form } from '@heroui/form';
import { Input } from '@heroui/input';
import { Button } from '@heroui/button';

export default function CreateAnAccount() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    try {
      setStatus('loading');
      await new Promise((r) => setTimeout(r, 600));
      setStatus('success');
    } catch {
      setStatus('error');
    } finally {
      setTimeout(() => setStatus('idle'), 1500);
    }
  }

  return (
    <section className="m-auto flex h-full w-full max-w-[328px] items-center text-white text-center">
      <Form className="max-h-[531px]" onSubmit={handleSubmit}>
        <header className="mb-[30px]">
          <h1 className="text-2xl font-semibold text-white font-formular-black mb-[15px]">Create an account</h1>
          <p className="text-sm">
            <span>Please provide your phone number so that we can send you a confirmation code</span>
            {/* <span>Enter your gmail to send the confirmation code</span>
            <span>Come up with a strong password</span>
            <span>Please enter your account details</span> */}
          </p>
        </header>

        <Input
          isRequired
          placeholder="account@gmail.com"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button
          color="primary"
          isLoading={status === 'loading'}
          startContent={
            <Image
              alt="Google"
              height={18}
              src="/images-temp/Createanaccount11/vector2381.svg"
              width={18}
            />
          }
          type="submit"
        >
          Register with Google
        </Button>

        {status === 'success' && (
          <p className="text-sm text-emerald-400" role="status">
            Complete!
          </p>
        )}
        {status === 'error' && (
          <p className="text-sm text-red-400" role="alert">
            Something went wrong. Try again.
          </p>
        )}
      </Form>
    </section>
  );
}
