'use client';
import { useState, useEffect, FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Input } from '@heroui/input';
import { Button } from '@heroui/button';

import Form from '@/components/form';
import { COUNTRIES, Country } from '@/lib/phones';
import PhoneCountryPicker from '@/components/phoneCountryPicker';

export default function CreateAnAccount() {
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState<Country>(COUNTRIES[226]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!phone) return;
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

  const setCountryCode = (dial: string) => {
    let inputPadding: string = '';

    switch (dial.length) {
      case 2:
        inputPadding = '24px';
        break;
      case 3:
        inputPadding = '36px';
        break;
      case 4:
        inputPadding = '44px';
        break;
      case 5:
        inputPadding = '52px';
        break;
      case 6:
        inputPadding = '60px';
        break;
      default:
        break;
    }

    const input = document.querySelector('.phone-number input[data-slot="input"]');

    if (input) {
      (input as HTMLInputElement).style.paddingLeft = inputPadding;
    }
  };

  useEffect(() => {
    setCountryCode(country.dial);
  }, []);

  const setCountryData = (data: Country) => {
    setCountry(data);
    setCountryCode(data.dial);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <section className="mb-auto">
        <header className="mb-[30px] text-center">
          <h1 className="font-formular-black mb-[15px] text-2xl font-semibold text-white">
            Create an account
          </h1>
          <p className="text-sm">
            <span>
              Please provide your phone number so that we can send you a confirmation code
            </span>
            {/* <span>Enter your gmail to send the confirmation code</span>
            <span>Come up with a strong password</span>
            <span>Please enter your account details</span> */}
          </p>
        </header>
        <div className="relative flex">
          <div className="absolute top-[10px] left-[78px] text-white">{country?.dial || '+7'}</div>
          <PhoneCountryPicker className="shrink-0" value={country} onChange={setCountryData} />
          <Input
            isRequired
            className="form-h-45 bg-translusent-light input-rounded phone-number pt-[2px]"
            inputMode="tel"
            placeholder="999 999-99-99"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </section>
      <div className="m-[0 auto] flex w-full max-w-[300px] flex-col items-center">
        <Button
          className="form-h-45 text-primary bg-translusent-light btn-rounded outline-color-15 m-auto mb-[10px] w-full outline"
          isLoading={status === 'loading'}
          startContent={
            <Image alt="Google" height={18} src="/images/create-account/google.svg" width={18} />
          }
          type="submit"
        >
          Register with Google
        </Button>
        <Button
          className="form-h-45 color-secondary btn-rounded m-auto mb-[10px] w-full bg-[blue]"
          isLoading={status === 'loading'}
          type="submit"
        >
          Complete!
        </Button>
        <p className="mt-[11.5px]">
          Do you already have an account?{' '}
          <Link className="font-bold" href="/login">
            Log in
          </Link>
        </p>
      </div>
      {status === 'error' && (
        <p className="text-sm text-red-400" role="alert">
          Something went wrong. Try again.
        </p>
      )}
    </Form>
  );
}
