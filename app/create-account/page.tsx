'use client';
import { useState, FormEvent } from 'react';
import Image from 'next/image';
import { Input } from '@heroui/input';
import { Button } from '@heroui/button';

export default function CreateAnAccount() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    try {
      setStatus('loading');
      // TODO: сюда вставишь реальный вызов BE (SWR mutation / fetch)
      await new Promise((r) => setTimeout(r, 600));
      setStatus('success');
    } catch {
      setStatus('error');
    } finally {
      setTimeout(() => setStatus('idle'), 1500);
    }
  }

  return (
    <section className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold text-white">Create an account</h1>
        <p className="text-sm text-white/60">Enter your gmail to send the confirmation code</p>
      </header>

      <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
        <Input
          isRequired
          label="Email"
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
      </form>
    </section>
  );
}
