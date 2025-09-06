'use client';
import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@heroui/input';

import Form from '@/components/create-account/form';
import { useUserStore } from '@/lib/store/userStore';
import ErrMess from '@/components/errMess';
import { apiFetch } from '@/lib/api';

export default function LoginPage() {
  const loginUser = useUserStore((state) => state.login);
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errMess, setErrMess] = useState<string | null>(null);
  // const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/home');
      console.log('User is authenticated');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrMess(null);

    if (!email || !password /*  || !otp */) {
      setErrMess('Please fill in all fields.');

      return;
    }

    //setIsLoading(true);

    type loginResponse = {
      success: boolean;
      message: string;
      token: string;
      user: {
        id: number;
        email: string;
        username: string;
        default_language_id: number;
        start_page: string;
        is_ban: boolean;
        tour_step: number;
      };
    };

    try {
      const { success, message, token, user }: loginResponse = await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      setStatus('success');
      console.log('%cLogin is successful', 'color: green', { success, message, token, user });
      // store user email and isAuthenticated in sessionStorage and Cookies
      loginUser(user.email);
      router.push('/home');
    } catch (err) {
      setErrMess('Network error. Please try again later');
      console.error('Network error:', err);
    } finally {
      //setIsLoading(false);
      setTimeout(() => setStatus('idle'), 1000);
    }
  };

  return (
    <Form
      header="Login to your account"
      messageType={['provide-your-email', 'have-you-account']}
      status={status}
      onSubmit={handleSubmit}
    >
      <Input
        className="input-standard-45 mb-[10px]"
        placeholder="Enter your email"
        type="email"
        value={email}
        onValueChange={setEmail}
      />
      <Input
        className="input-standard-45"
        placeholder="Enter your password"
        type="password"
        value={password}
        onValueChange={setPassword}
      />
      <ErrMess error={errMess} />
    </Form>
  );
}
