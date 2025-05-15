'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BellRing, Book, BookMarked, Home, Settings, User, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export function StudentNavbar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  const isActive = (path: string) => {
    return pathname === path;
  };

  const handleLogout = () => {
    logout();
    toast.success('تم تسجيل الخروج بنجاح');
  };

  return (
    <div className="h-screen border-r flex flex-col">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-primary">EduConnect</h2>
      </div>
      
      <nav className="space-y-2 px-3 flex-1">
        <Link href="/student/dashboard" className={`flex items-center px-3 py-2 rounded-lg ${isActive('/student/dashboard') ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}>
          <Home className="h-5 w-5 mr-3" />
          <span>الرئيسية</span>
        </Link>
        
        <Link href="/student/books" className={`flex items-center px-3 py-2 rounded-lg ${isActive('/student/books') ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}>
          <Book className="h-5 w-5 mr-3" />
          <span>الكتب</span>
        </Link>
        
        <Link href="/student/bookmarks" className={`flex items-center px-3 py-2 rounded-lg ${isActive('/student/bookmarks') ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}>
          <BookMarked className="h-5 w-5 mr-3" />
          <span>المفضلة</span>
        </Link>
        
        <Link href="/student/profile" className={`flex items-center px-3 py-2 rounded-lg ${isActive('/student/profile') ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}>
          <User className="h-5 w-5 mr-3" />
          <span>الملف الشخصي</span>
        </Link>
      </nav>
      
      <div className="p-6 mt-auto">
        <button 
          onClick={handleLogout}
          className="text-red-500 w-full text-right flex items-center hover:bg-red-50 px-3 py-2 rounded-lg"
        >
          <LogOut className="h-5 w-5 mr-3" />
          <span>تسجيل الخروج</span>
        </button>
      </div>
    </div>
  );
}
