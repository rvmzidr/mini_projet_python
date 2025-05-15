import Link from 'next/link';
import { Terminal, GraduationCap, BookOpen, Library, BookMarked, BarChart3 } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation Bar */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6" />
            <span className="font-bold text-xl">EduConnect</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/student/login" className="text-sm font-medium transition-colors hover:text-primary">
              Student Login
            </Link>
            <Link href="/admin/login" className="text-sm font-medium transition-colors hover:text-primary">
              Admin Login
            </Link>
            <Link 
              href="/student/register" 
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Register
            </Link>
          </nav>
          <button className="md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
              <line x1="4" x2="20" y1="12" y2="12"></line>
              <line x1="4" x2="20" y1="6" y2="6"></line>
              <line x1="4" x2="20" y1="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background to-secondary/20 py-24 md:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Transforming Education Management
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                A comprehensive platform for students, instructors, and administrators to manage courses, departments, and learning materials.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link
                  href="/student/register"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  Get Started
                </Link>
                <Link
                  href="#features"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="mx-auto w-full max-w-[400px] aspect-video overflow-hidden rounded-xl border bg-card p-2 shadow-xl">
              <div className="h-full w-full bg-gradient-to-br from-chart-1 via-chart-2 to-chart-3 rounded-lg flex items-center justify-center">
                <Terminal className="h-24 w-24 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Key Features</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our platform offers a comprehensive suite of tools for educational management
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
            <div className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 p-3">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Student Management</h3>
              <p className="text-sm text-muted-foreground text-center">
                Complete student profile management with course enrollment and progress tracking.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 p-3">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Course Management</h3>
              <p className="text-sm text-muted-foreground text-center">
                Create, update, and manage courses with integrated department organization.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 p-3">
                <BookMarked className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Bookmark System</h3>
              <p className="text-sm text-muted-foreground text-center">
                Save and organize important courses and materials with Redis-cached bookmarks.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 p-3">
                <Library className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Book Recommendations</h3>
              <p className="text-sm text-muted-foreground text-center">
                Get personalized book recommendations with filtering by category and price.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 p-3">
                <Terminal className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">AI Book Summaries</h3>
              <p className="text-sm text-muted-foreground text-center">
                Generate smart summaries of books using advanced AI technology.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 p-3">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Admin Analytics</h3>
              <p className="text-sm text-muted-foreground text-center">
                Comprehensive dashboard with statistics and management tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t bg-muted/40">
        <div className="container flex flex-col gap-4 py-10 md:h-24 md:flex-row md:items-center md:gap-8 md:py-0">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            <span className="font-semibold">EduConnect</span>
          </div>
          <div className="md:ml-auto flex gap-4 sm:gap-6">
            <Link href="#" className="text-xs underline-offset-4 hover:underline">
              Privacy Policy
            </Link>
            <Link href="#" className="text-xs underline-offset-4 hover:underline">
              Terms of Service
            </Link>
            <Link href="#" className="text-xs underline-offset-4 hover:underline">
              Contact Us
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}