"use client"

import { useEffect, useState } from 'react';
import { User, Mail, GraduationCap, BookOpen, Save } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';

interface StudentProfile {
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  enrollmentYear: number;
  enrolledCourses: number;
  joinDate: string;
  id: string;
}

export default function StudentProfile() {
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [formData, setFormData] = useState<Partial<StudentProfile>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { studentId, isAuthenticated } = useAuth();
  const router = useRouter();
  useProtectedRoute();

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('studentToken');
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/students/${studentId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
        );

        if (!response.ok) throw new Error('Failed to fetch profile');

        const data = await response.json();
        setProfile(data);
        setFormData(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [studentId, isAuthenticated]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSaving(true);
      const token = localStorage.getItem('studentToken');

      const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/students/${studentId}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
          }
      );

      if (!response.ok) throw new Error('Failed to update profile');

      const updatedData = await response.json();
      setProfile(updatedData);
      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
    );
  }

  if (!profile) return null;

  return (
      <div className="space-y-6 p-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>

        <div className="grid gap-6">
          {/* Profile Overview Card */}
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-6">
              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-primary/10 p-6">
                  <User className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold">
                    {profile.firstName} {profile.lastName}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Student ID: {profile.id}
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{profile.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{profile.department}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{profile.enrolledCourses} Courses Enrolled</span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Profile Information</h3>
                {!isEditing ? (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                    >
                      Edit Profile
                    </button>
                ) : (
                    <div className="space-x-2">
                      <button
                          type="button"
                          onClick={() => {
                            setIsEditing(false);
                            setFormData(profile);
                          }}
                          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                          type="submit"
                          form="profile-form"
                          disabled={saving}
                          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 flex items-center disabled:opacity-70"
                      >
                        {saving ? (
                            <>
                              <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                              Saving...
                            </>
                        ) : (
                            <>
                              <Save className="h-4 w-4 mr-2" />
                              Save Changes
                            </>
                        )}
                      </button>
                    </div>
                )}
              </div>

              <form id="profile-form" onSubmit={handleSubmit}>
                <div className="grid gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <label htmlFor="firstName" className="text-sm font-medium leading-none">
                        First Name
                      </label>
                      <input
                          id="firstName"
                          name="firstName"
                          type="text"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          value={formData.firstName || ''}
                          onChange={handleChange}
                          disabled={!isEditing}
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="lastName" className="text-sm font-medium leading-none">
                        Last Name
                      </label>
                      <input
                          id="lastName"
                          name="lastName"
                          type="text"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          value={formData.lastName || ''}
                          onChange={handleChange}
                          disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <label htmlFor="email" className="text-sm font-medium leading-none">
                      Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={formData.email || ''}
                        onChange={handleChange}
                        disabled={!isEditing}
                    />
                  </div>

                  <div className="grid gap-2">
                    <label htmlFor="department" className="text-sm font-medium leading-none">
                      Department
                    </label>
                    <input
                        id="department"
                        name="department"
                        type="text"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={formData.department || ''}
                        disabled={true}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
}