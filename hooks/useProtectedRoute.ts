'use client'; // This must be the first line

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './useAuth';

/**
 * Hook to protect routes that require authentication
 * Redirects to login page if the user is not authenticated
 */
export function useProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Wait for auth state to finish loading
    if (!loading && !isAuthenticated) {
      router.push('/student/login');
    }
  }, [isAuthenticated, loading, router]);

  return { isAuthenticated, loading };
}

export default useProtectedRoute;