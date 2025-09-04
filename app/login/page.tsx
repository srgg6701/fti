'use client';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@heroui/input';

import Form from '@/components/create-account/form';
import { useUserStore } from '@/lib/store/userStore';
import ErrMess from '@/components/errMess';

export default function LoginPage() {
  const loginUser = useUserStore((state) => state.login);
  //const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //const [otp, setOtp] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  /*   useEffect(() => {
    if (isAuthenticated) {
      // TODO: Uncomment as the app is ready to work in such a regime
      // router.push('/home');
      console.log('User is authenticated');
    }
  }, [isAuthenticated, router]); */

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password /*  || !otp */) {
      setError('Please fill in all fields.');

      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password /* , otp */ }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Unknown error occurred.');
      } else {
        loginUser(data.type, data.email);
        router.replace('/home');
      }
    } catch (err) {
      setError('Network error. Please try again later');
      console.error('Network error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form
      header="Login to your account"
      messageType={['provide-your-email', 'have-you-account']}
      status="ok"
      onSubmit={handleSubmit}
    >
      <Input
        className="btn-account mb-[10px]"
        placeholder="Enter your email"
        type="email"
        value={email}
        onValueChange={setEmail}
      />
      <Input
        className="btn-account"
        placeholder="Enter your password"
        type="password"
        value={password}
        onValueChange={setPassword}
      />
      <ErrMess error={error} />
    </Form>
  );
}
