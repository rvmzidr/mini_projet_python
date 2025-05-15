"use client";

import { useEffect, useState } from "react";
import { BookMarked, Trash2, Search, Filter } from "lucide-react";
import { toast } from "sonner";

interface Bookmark {
  id: string;
  title: string;
  type: "course" | "material";
  courseId?: string;
  courseName: string;
  createdAt: string;
  url: string;
}

export default function StudentBookmarks() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [filteredBookmarks, setFilteredBookmarks] = useState<Bookmark[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "course" | "material">("all");

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("studentToken");

        // Fetch bookmarks from backend
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookmarks`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch bookmarks.");
        }

        const data: Bookmark[] = await response.json();
        setBookmarks(data);
        setFilteredBookmarks(data);

        toast.success("Bookmarks loaded successfully!");
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
        toast.error("Failed to load bookmarks. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookmarks();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  useEffect(() => {
    let results = bookmarks;

    if (searchQuery) {
      results = results.filter(
          (bookmark) =>
              bookmark.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              bookmark.courseName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterType !== "all") {
      results = results.filter((bookmark) => bookmark.type === filterType);
    }

    setFilteredBookmarks(results);
  }, [searchQuery, filterType, bookmarks]);

  const removeBookmark = async (id: string) => {
    try {
      const token = localStorage.getItem("studentToken");

      // Delete bookmark from backend
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookmarks/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete the bookmark.");
      }

      // Update state
      setBookmarks((prev) => prev.filter((bookmark) => bookmark.id !== id));
      toast.success("Bookmark removed successfully.");
    } catch (error) {
      console.error("Error removing bookmark:", error);
      toast.error("Failed to remove the bookmark. Please try again.");
    }
  };

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
          <h1 className="text-3xl font-bold tracking-tight">My Bookmarks</h1>
          <p className="text-muted-foreground">Manage your saved courses and materials.</p>
        </div>

        {/* Filters section */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
                type="text"
                placeholder="Search bookmarks..."
                className="flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="relative w-full sm:w-auto">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <select
                className="flex h-10 w-full sm:w-[180px] rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as "all" | "course" | "material")}
            >
              <option value="all">All Types</option>
              <option value="course">Courses</option>
              <option value="material">Materials</option>
            </select>
          </div>
        </div>

        {/* Bookmarks table */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
          {filteredBookmarks.length > 0 ? (
              <div className="p-0">
                <table className="w-full caption-bottom text-sm">
                  <thead className="[&_tr]:border-b">
                  <tr className="border-b hover:bg-muted/50">
                    <th className="h-12 px-4 text-left w-12">Type</th>
                    <th className="h-12 px-4 text-left">Title</th>
                    <th className="h-12 px-4 text-left">Course</th>
                    <th className="h-12 px-4 text-left">Added On</th>
                    <th className="h-12 px-4 text-right">Actions</th>
                  </tr>
                  </thead>
                  <tbody>
                  {filteredBookmarks.map((bookmark) => (
                      <tr
                          key={bookmark.id}
                          className="border-b hover:bg-muted/50"
                      >
                        <td className="p-4">
                          <div className="rounded-full bg-primary/10 p-2 w-fit">
                            <BookMarked className="h-4 w-4 text-primary" />
                          </div>
                        </td>
                        <td className="p-4 font-medium">
                          <a href={bookmark.url} className="hover:underline">
                            {bookmark.title}
                          </a>
                        </td>
                        <td className="p-4 text-muted-foreground">{bookmark.courseName}</td>
                        <td className="p-4 text-muted-foreground">{formatDate(bookmark.createdAt)}</td>
                        <td className="p-4 text-right">
                          <button
                              onClick={() => removeBookmark(bookmark.id)}
                              className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input hover:bg-accent hover:text-accent-foreground h-9 w-9"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                  ))}
                  </tbody>
                </table>
              </div>
          ) : (
              <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                <div className="rounded-full bg-muted p-3 mb-4">
                  <BookMarked className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold">No bookmarks found</h3>
                <p className="text-muted-foreground mt-1 mb-4">
                  {searchQuery || filterType !== "all"
                      ? "Try adjusting your search or filters"
                      : "You haven't saved any bookmarks yet."}
                </p>
                {searchQuery || filterType !== "all" ? (
                    <button
                        onClick={() => {
                          setSearchQuery("");
                          setFilterType("all");
                        }}
                        className="rounded-md bg-background px-4 py-2 text-sm font-medium border hover:bg-accent"
                    >
                      Clear Filters
                    </button>
                ) : (
                    <a
                        href="/student/courses"
                        className="rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90"
                    >
                      Browse Courses
                    </a>
                )}
              </div>
          )}
        </div>
      </div>
  );
}