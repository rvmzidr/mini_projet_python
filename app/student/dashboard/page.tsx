"use client";

import { useEffect, useState } from "react";
import { BookOpen, Clock, GraduationCap, Bookmark, TrendingUp } from "lucide-react";
import { toast } from "sonner";

interface EnrolledCourse {
  id: string;
  title: string;
  department: string;
  progress: number;
  nextLesson: string;
}

interface Activity {
  id: string;
  type: "enrollment" | "completion" | "bookmark";
  course: string;
  date: string;
}

export default function StudentDashboard() {
  const [studentName, setStudentName] = useState("");
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);
  const [recentActivity, setRecentActivity] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("studentToken");

        // Fetch student profile
        const profileResponse = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/students/profile`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
        );

        if (!profileResponse.ok) {
          throw new Error("Failed to fetch student profile.");
        }
        const profileData = await profileResponse.json();
        setStudentName(profileData.name);

        // Fetch enrolled courses
        const coursesResponse = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/students/courses`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
        );

        if (!coursesResponse.ok) {
          throw new Error("Failed to fetch enrolled courses.");
        }
        const coursesData = await coursesResponse.json();
        setEnrolledCourses(coursesData.courses);

        // Fetch recent activity
        const activityResponse = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/students/activity`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
        );

        if (!activityResponse.ok) {
          throw new Error("Failed to fetch recent activity.");
        }
        const activityData = await activityResponse.json();
        setRecentActivity(activityData.activities);

        toast.success("Dashboard data loaded successfully.");
      } catch (error) {
        console.error("Error loading dashboard data:", error);
        toast.error("Failed to load dashboard data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

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
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, {studentName}</h1>
          <p className="text-muted-foreground">Here's an overview of your academic progress and recent activities.</p>
        </div>

        {/* Stats overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4 text-muted-foreground" />
              <h3 className="whitespace-nowrap text-sm font-medium leading-none tracking-tight">Enrolled Courses</h3>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-bold">{enrolledCourses.length}</div>
              <p className="text-xs text-muted-foreground">Across {new Set(enrolledCourses.map(c => c.department)).size} departments</p>
            </div>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <h3 className="whitespace-nowrap text-sm font-medium leading-none tracking-tight">Average Progress</h3>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-bold">
                {Math.round(
                    enrolledCourses.reduce((acc, course) => acc + course.progress, 0) / enrolledCourses.length
                ) || 0}%
              </div>
              <p className="text-xs text-muted-foreground">Across all courses</p>
            </div>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="flex items-center space-x-2">
              <Bookmark className="h-4 w-4 text-muted-foreground" />
              <h3 className="whitespace-nowrap text-sm font-medium leading-none tracking-tight">Bookmarks</h3>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-bold">{recentActivity.filter(activity => activity.type === "bookmark").length}</div>
              <p className="text-xs text-muted-foreground">Saved resources</p>
            </div>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
              <h3 className="whitespace-nowrap text-sm font-medium leading-none tracking-tight">Completed Courses</h3>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-bold">{recentActivity.filter(activity => activity.type === "completion").length}</div>
              <p className="text-xs text-muted-foreground">Out of {enrolledCourses.length}</p>
            </div>
          </div>
        </div>

        {/* Enrolled courses */}
        <div>
          <h2 className="text-xl font-semibold tracking-tight mb-4">Currently Enrolled Courses</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {enrolledCourses.map((course) => (
                <div key={course.id} className="rounded-lg border bg-card text-card-foreground shadow-sm">
                  <div className="p-6 space-y-4">
                    <div className="space-y-1">
                      <h3 className="font-medium">{course.title}</h3>
                      <p className="text-sm text-muted-foreground">Department: {course.department}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Progress: {course.progress}%</div>
                      <div className="h-2 rounded-full bg-secondary">
                        <div
                            className="h-2 rounded-full bg-primary"
                            style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex items-center pt-2">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">Next: {course.nextLesson}</span>
                    </div>
                    <button className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4">
                      Continue Learning
                    </button>
                  </div>
                </div>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div>
          <h2 className="text-xl font-semibold tracking-tight mb-4">Recent Activity</h2>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-6 space-y-4">
              {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-4 pb-4 border-b last:border-0 last:pb-0">
                    <div className="rounded-full bg-primary/10 p-2">
                      {activity.type === "enrollment" && <BookOpen className="h-4 w-4 text-primary" />}
                      {activity.type === "bookmark" && <Bookmark className="h-4 w-4 text-primary" />}
                      {activity.type === "completion" && <GraduationCap className="h-4 w-4 text-primary" />}
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm">
                        {activity.type === "enrollment" && "Enrolled in "}
                        {activity.type === "bookmark" && "Bookmarked "}
                        {activity.type === "completion" && "Completed "}
                        <span className="font-medium">{activity.course}</span>
                      </p>
                      <p className="text-xs text-muted-foreground">{activity.date}</p>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  );
}