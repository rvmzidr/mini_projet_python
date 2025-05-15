"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  BookOpen, 
  BookMarked, 
  User, 
  Library, 
  LogOut, 
  Menu, 
  X 
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  className?: string;
}

export function StudentSidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const sidebarItems = [
    {
      name: 'Dashboard',
      href: '/student/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'Enrolled Courses',
      href: '/student/courses',
      icon: BookOpen,
    },
    {
      name: 'Bookmarks',
      href: '/student/bookmarks',
      icon: BookMarked,
    },
    {
      name: 'Book Recommendations',
      href: '/student/books',
      icon: Library,
    },
    {
      name: 'Profile',
      href: '/student/profile',
      icon: User,
    },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button 
        className="md:hidden fixed top-4 left-4 z-50 bg-primary text-primary-foreground p-2 rounded-md"
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-40 w-64 bg-background border-r transform transition-transform duration-200 ease-in-out md:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          className
        )}
      >
        <div className="flex flex-col h-full">
          <div className="px-4 py-6 border-b">
            <div className="flex items-center justify-center space-x-2">
              <BookOpen className="h-6 w-6" />
              <h1 className="font-bold text-xl">EduConnect</h1>
            </div>
          </div>
          <div className="flex flex-col flex-1 py-6 space-y-1 overflow-y-auto">
            {sidebarItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center py-3 px-4 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                  pathname === item.href ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
                )}
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.name}
              </Link>
            ))}
          </div>
          <div className="p-4 border-t">
            <Link
              href="/"
              className="flex items-center py-3 px-4 rounded-md text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
              onClick={() => {
                // Clear local storage on logout
                localStorage.removeItem('studentToken');
                localStorage.removeItem('studentEmail');
                setIsOpen(false);
              }}
            >
              <LogOut className="h-5 w-5 mr-3" />
              Sign out
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}