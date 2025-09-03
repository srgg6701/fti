"use client";
import { useState,FormEvent } from 'react';
import { Input } from '@heroui/input';
import Section from '@/components/create-account/section'
import Form from '@/components/create-account/form';
import Header from '@/components/create-account/header';
import { useRouter } from 'next/navigation';
export default function SetPassword () {
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    async function handleSubmit(e: FormEvent) {
      e.preventDefault();
      if (!password) return;
      try {
        setStatus('loading');
        await new Promise((r) => setTimeout(r, 600));
        setStatus('success');
        router.push('/login');
      } catch {
        setStatus('error');
      } finally {
        setTimeout(() => setStatus('idle'), 1000);
      }
    }
  return <Form onSubmit={handleSubmit}>
      <Section messageType="have-you-account" status={status} >
        <Header messageType="set-your-password" />
        <div className="relative flex">
          
        </div>
      </Section>
    </Form>
}