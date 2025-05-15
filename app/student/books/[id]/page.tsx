"use client"

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Book, ArrowLeft, Clock, BookOpen, Share2 } from 'lucide-react';

// Mock data types
interface BookDetails {
  id: string;
  title: string;
  price: number;
  category: string;
  availability: boolean;
  imageUrl: string;
}

interface BookSummary {
  loading: boolean;
  content: string | null;
  error: string | null;
}

export default function BookSummaryPage() {
  const params = useParams();
  const router = useRouter();
  const [book, setBook] = useState<BookDetails | null>(null);
  const [summary, setSummary] = useState<BookSummary>({
    loading: false,
    content: null,
    error: null
  });
  const [isLoading, setIsLoading] = useState(true);

  const bookId = params?.id as string;

  useEffect(() => {
    // Simulate API call to fetch book details
    setTimeout(() => {
      // This would be replaced with actual API call
      const mockBook: BookDetails = {
        id: bookId,
        title: 'Python Programming for Beginners',
        price: 29.99,
        category: 'Programming',
        availability: true,
        imageUrl: 'https://images.pexels.com/photos/2465877/pexels-photo-2465877.jpeg?auto=compress&cs=tinysrgb&w=600',
      };
      
      setBook(mockBook);
      setIsLoading(false);
    }, 1000);
  }, [bookId]);

  const generateSummary = () => {
    setSummary({
      loading: true,
      content: null,
      error: null
    });
    
    // Simulate API call to FastAPI backend that uses Groq LLM
    setTimeout(() => {
      // This would be replaced with actual API call
      const mockSummary = `
# Python Programming for Beginners

This comprehensive guide introduces readers to the fundamentals of Python programming, one of the most versatile and beginner-friendly programming languages available today.

## Key Topics Covered:

1. **Python Basics**
   - Setting up your Python environment
   - Understanding variables, data types, and operators
   - Writing your first Python program

2. **Control Flow**
   - Conditional statements (if, elif, else)
   - Loops (for, while)
   - Exception handling

3. **Data Structures**
   - Lists, tuples, and dictionaries
   - Sets and arrays
   - Working with collections

4. **Functions and Modules**
   - Defining and calling functions
   - Parameters and return values
   - Creating and importing modules

5. **Object-Oriented Programming**
   - Classes and objects
   - Inheritance and polymorphism
   - Encapsulation and abstraction

The book provides numerous examples and practical exercises that reinforce learning and help readers build confidence in their programming skills. Each chapter builds upon the previous one, gradually introducing more complex concepts while maintaining an accessible approach.

Perfect for absolute beginners with no prior programming experience, this book will guide you from writing simple scripts to developing more sophisticated applications. By the end, readers will have a solid foundation in Python programming and be prepared to explore more advanced topics or specialize in areas like data science, web development, or automation.
      `;
      
      setSummary({
        loading: false,
        content: mockSummary,
        error: null
      });
    }, 2000);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
        <div className="rounded-full bg-muted p-3 mb-4">
          <Book className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold">Book not found</h3>
        <p className="text-muted-foreground mt-1 mb-4">
          The book you're looking for doesn't exist or has been removed.
        </p>
        <button
          onClick={() => router.back()}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Books
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <button
        onClick={() => router.back()}
        className="mb-4 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Books
      </button>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Book details */}
        <div className="md:col-span-1">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
            <div className="aspect-square relative overflow-hidden">
              <img 
                src={book.imageUrl} 
                alt={book.title}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
              <div className="flex items-center justify-between mb-4">
                <span className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-medium">
                  ${book.price.toFixed(2)}
                </span>
                <span className="text-sm text-muted-foreground">
                  Category: {book.category}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4">
                  <BookOpen className="mr-2 h-4 w-4" />
                  View Details
                </button>
                <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 py-2 px-4">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Book summary */}
        <div className="md:col-span-2">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm h-full">
            <div className="p-6 space-y-4 h-full">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">AI-Generated Summary</h2>
                {!summary.content && !summary.loading && (
                  <button
                    onClick={generateSummary}
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-primary text-primary-foreground hover:bg-primary/90 h-9 py-2 px-4"
                  >
                    Generate Summary
                  </button>
                )}
              </div>

              {summary.loading && (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mb-4"></div>
                  <p className="text-muted-foreground flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    Generating summary with AI...
                  </p>
                </div>
              )}

              {summary.error && (
                <div className="bg-destructive/15 text-destructive p-4 rounded-md">
                  <p>{summary.error}</p>
                </div>
              )}

              {summary.content && (
                <div className="prose prose-sm max-w-none overflow-y-auto max-h-[600px] pr-4" 
                  dangerouslySetInnerHTML={{ __html: summary.content.replace(/\n/g, '<br>') }}>
                </div>
              )}

              {!summary.content && !summary.loading && !summary.error && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="rounded-full bg-muted p-3 mb-4">
                    <Book className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold">No summary available</h3>
                  <p className="text-muted-foreground mt-1 mb-4">
                    Generate an AI-powered summary to get a quick overview of this book.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}