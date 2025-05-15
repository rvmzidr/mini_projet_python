"use client"

import { useState } from 'react';
import Link from 'next/link';
import { GraduationCap, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function StudentLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Call the backend API for login
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/students/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Invalid credentials. Please try again.');
      }

      // Save the JWT token and student ID to localStorage
      localStorage.setItem('studentToken', data.token);
      localStorage.setItem('studentId', data.studentId);

      // Notify the user of success
      toast.success('Login successful!');

      // Redirect to the student dashboard
      router.push('/student/dashboard');
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="min-h-screen bg-background flex flex-col">
        <div className="container flex flex-col items-center justify-center min-h-screen py-12">
          <Link
              href="/"
              className="absolute top-8 left-8 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Link>

          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <div className="flex justify-center">
                <GraduationCap className="h-10 w-10" />
              </div>
              <h1 className="text-2xl font-semibold tracking-tight">Student Login</h1>
              <p className="text-sm text-muted-foreground">
                Enter your credentials to access your student account
              </p>
            </div>

            {error && (
                <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
                  {error}
                </div>
            )}

            <div className="grid gap-6">
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <label
                        htmlFor="email"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="m.smith@example.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <label
                        htmlFor="password"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button
                      type="submit"
                      className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4"
                      disabled={loading}
                  >
                    {loading ? 'Signing in...' : 'Sign In'}
                  </button>
                </div>
              </form>
              <div className="flex items-center justify-between">
                <Link
                    href="/student/forgot-password"
                    className="text-sm underline underline-offset-4 hover:text-primary"
                >
                  Forgot password?
                </Link>
                <Link
                    href="/student/register"
                    className="text-sm underline underline-offset-4 hover:text-primary"
                >
                  Don&apos;t have an account?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}