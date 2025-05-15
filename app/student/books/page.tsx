"use client";

import { useEffect, useState } from "react";
import { Book, Search, Filter, BookOpen, ArrowRight } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

// Data type for Book
interface Book {
  id: string;
  title: string;
  price: number;
  category: string;
  availability: boolean;
  imageUrl: string;
}

export default function BookRecommendations() {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100 });
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setIsLoading(true);

        // Fetching books from FastAPI backend
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/books`);
        if (!response.ok) {
          throw new Error("Failed to fetch books from the server.");
        }

        const data: Book[] = await response.json();

        setBooks(data);
        setFilteredBooks(data);

        // Extract unique categories
        const uniqueCategories = Array.from(new Set(data.map((book) => book.category)));
        setCategories(uniqueCategories);

        toast.success("Books loaded successfully!");
      } catch (error) {
        console.error("Error fetching books:", error);
        toast.error("Failed to load book recommendations. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    // Filters books dynamically based on search, category, and price
    let results = books;

    // Search filter
    if (searchQuery) {
      results = results.filter((book) =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      results = results.filter((book) => book.category === selectedCategory);
    }

    // Price range filter
    results = results.filter(
        (book) => book.price >= priceRange.min && book.price <= priceRange.max
    );

    setFilteredBooks(results);
  }, [searchQuery, selectedCategory, priceRange, books]);

  if (isLoading) {
    return (
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
    );
  }

  return (
      <div className="space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Book Recommendations</h1>
          <p className="text-muted-foreground">
            Discover books related to your courses and interests.
          </p>
        </div>

        {/* Filters section */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
                type="text"
                placeholder="Search books..."
                className="flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative w-full sm:w-auto">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <select
                  className="flex h-10 w-full sm:w-[180px] rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:w-[240px]">
              <input
                  type="number"
                  min="0"
                  max={priceRange.max}
                  placeholder="Min Price"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  value={priceRange.min}
                  onChange={(e) =>
                      setPriceRange((prev) => ({ ...prev, min: Number(e.target.value) }))
                  }
              />
              <input
                  type="number"
                  min={priceRange.min}
                  placeholder="Max Price"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  value={priceRange.max}
                  onChange={(e) =>
                      setPriceRange((prev) => ({ ...prev, max: Number(e.target.value) }))
                  }
              />
            </div>
          </div>
        </div>

        {/* Books grid */}
        {filteredBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBooks.map((book) => (
                  <div
                      key={book.id}
                      className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden"
                  >
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <img
                          src={book.imageUrl}
                          alt={book.title}
                          className="object-cover w-full h-full"
                      />
                      {!book.availability && (
                          <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                    <span className="px-3 py-1 bg-destructive text-destructive-foreground rounded-md text-sm font-medium">
                      Out of Stock
                    </span>
                          </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold line-clamp-2">{book.title}</h3>
                        <span className="bg-primary/10 text-primary rounded-full px-2 py-1 text-xs font-medium">
                    ${book.price.toFixed(2)}
                  </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">Category: {book.category}</p>
                      <div className="flex justify-between items-center">
                        <Link
                            href={`/student/books/${book.id}`}
                            className="text-sm font-medium text-primary hover:underline flex items-center"
                        >
                          View Summary <ArrowRight className="ml-1 h-3 w-3" />
                        </Link>
                        <button className="inline-flex items-center justify-center bg-secondary text-secondary-foreground rounded-md text-sm font-medium px-3 h-8 hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                          <BookOpen className="mr-2 h-4 w-4" />
                          Book Details
                        </button>
                      </div>
                    </div>
                  </div>
              ))}
            </div>
        ) : (
            <div className="flex flex-col items-center justify-center py-12 px-4 text-center rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="rounded-full bg-muted p-3 mb-4">
                <Book className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold">No books found</h3>
              <p className="text-muted-foreground mt-1 mb-4">
                Try adjusting your search criteria or filters
              </p>
              <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                    setPriceRange({ min: 0, max: 100 });
                  }}
                  className="inline-flex items-center justify-center rounded-md bg-background border border-input hover:bg-accent hover:text-accent-foreground text-sm font-medium px-4 h-10 focus-visible:ring-2 focus-visible:ring-ring"
              >
                Clear Filters
              </button>
            </div>
        )}
      </div>
  );
}