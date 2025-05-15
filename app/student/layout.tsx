"use client"

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { StudentSidebar } from '@/components/student/layout/student-sidebar';

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('studentToken');
    setIsAuthenticated(!!token);
    setIsLoading(false);

    // If not authenticated and not on login/register pages, redirect to login
    if (!token && 
        !pathname.includes('/student/login') && 
        !pathname.includes('/student/register') &&
        !pathname.includes('/student/forgot-password')) {
      router.push('/student/login');
    }
  }, [pathname, router]);

  // Skip layout for login/register/forgot-password pages
  if (pathname.includes('/student/login') || 
      pathname.includes('/student/register') || 
      pathname.includes('/student/forgot-password')) {
    return <>{children}</>;
  }

  // Show loading state
  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  // Show student dashboard layout
  if (isAuthenticated) {
    return (
      <div className="flex h-screen overflow-hidden">
        <StudentSidebar />
        <div className="flex-1 md:ml-64 overflow-y-auto">
          <main className="p-6">{children}</main>
        </div>
      </div>
    );
  }

  // Fallback, should not reach here
  return <>{children}</>;
}