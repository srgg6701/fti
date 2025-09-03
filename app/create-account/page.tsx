'use client';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@heroui/input';
import Form from '@/components/create-account/form';
import Header from '@/components/create-account/header';
import Buttons from '@/components/create-account/buttons';
import ErrMess from '@/components/errMess';
import { validateEmail } from '@/utils';

export default function CreateAccountConfiramtion() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errMess, setErrMess] = useState<string | null>(null);
  const router = useRouter();
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrMess(null);
    if (!email) {
      setErrMess("Please enter your email");
      return;
    }
    const emailValid = validateEmail(email);
    if (!emailValid.valid) {
      let errMess = "";
      switch (emailValid.reason) {
        case 'too_long':
          errMess = "Too long email";
          break;
        case 'at':
          errMess = "'@' is missed";
          break;
        case 'local_too_long':
          errMess = "You put too many characters before '@'";
          break;
        case 'local_chars':
          errMess = "You used invalid characters";
          break;
        case 'local_dots':
          errMess = "You used '.' in wrong position or with wrong sequence";
          break;
        case 'domain_length':
          errMess = "You put too less characters after '@'";
          break;
        case 'no_tld':
          errMess = "Wrong value after '@'";
          break;
        case 'domain_label':
          errMess = "Wrong characters after '@'";
          break;
        case 'tld':
          errMess = "Wrong domain ending";
          break;
        default:
          errMess = "Please, enter your email";
          break;
      }
      setErrMess(errMess);
      return;
    }
    try {
      setStatus('loading');
      await new Promise((r) => setTimeout(r, 600));
      setStatus('success');
      router.push('/create-account/set-password');
    } catch {
      setStatus('error');
    } finally {
      setTimeout(() => setStatus('idle'), 1000);
    }
  }
  return (
    <Form onSubmit={handleSubmit}>
      <section className="mb-auto mx-auto">
        <Header messageType="provide-your-email" />
        <div className="relative flex flex-col">
          <Input
            className="form-h-45 bg-translusent-light input-rounded phone-number pt-[2px]"
            inputMode="email"
            placeholder="account@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <ErrMess error={errMess} />
        </div>
      </section>
      <Buttons messageType="have-you-account" status={status} />
    </Form>
  );
}
