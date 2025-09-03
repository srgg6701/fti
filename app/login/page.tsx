'use client';
import { useState, FormEvent } from 'react';
import { Input } from '@heroui/input';

import Form from '@/components/create-account/form';
import { useUserStore } from '@/lib/store/userStore';

export default function LoginPage() {
  const loginUser = useUserStore((state) => state.login);
  //const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  //const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //const [otp, setOtp] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Hardcoded credentials for local testing
  const memberEmail = 'member@valid.email';
  const memberPass = 'Member123!';
  //const memberOtp = '151588';

  const partnerEmail = 'partner@valid.email';
  const partnerPass = 'Partner123!';
  //const partnerOtp = '262699';

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
      }
    } catch (err) {
      setError('Network error. Please try again later.');
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
        className="form-h-45 bg-translusent-light input-rounded phone-number mb-[10px] w-full pt-[2px]"
        placeholder="Enter your email"
        type="email"
        value={email}
        onValueChange={setEmail}
      />
      <Input
        className="form-h-45 bg-translusent-light input-rounded phone-number w-full"
        placeholder="Enter your password"
        type="password"
        value={password}
        onValueChange={setPassword}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
      {/* <Button color="primary" isDisabled={isLoading} isLoading={isLoading} type="submit">
        {isLoading ? 'Logging In...' : 'Log In'}
      </Button> */}
    </Form>
  );
}
