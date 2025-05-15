"use client";

import { useState } from "react";
import { GraduationCap, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { useFetch } from "@/hooks/useFetch"; // Reuse fetch logic

interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  department: string;
}

export default function StudentRegister() {
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    department: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();


  const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/students/register`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              firstName: formData.firstName,
              lastName: formData.lastName,
              email: formData.email,
              password: formData.password,
              
            }),
          }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      // On success, notify and redirect the user
      toast.success("Account registered successfully!");
      router.push("/student/login");
    } catch (err: any) {
      console.error("Registration error:", err);
      setError(err.message || "An error occurred during registration.");
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="min-h-screen bg-background flex flex-col">
        <div className="container flex flex-col items-center justify-center min-h-screen py-12">
          <Link
              href="/"
              className="absolute top-8 left-8 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Link>

          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
            <div className="flex flex-col space-y-2 text-center">
              <div className="flex justify-center">
                <GraduationCap className="h-10 w-10" />
              </div>
              <h1 className="text-2xl font-semibold tracking-tight">
                Create a Student Account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your details to create your student account
              </p>
            </div>

            {/* Error notification */}
            {error && (
                <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
                  {error}
                </div>
            )}

            {/* Registration form */}
            <div className="grid gap-6">
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4">
                  {/* First and last name */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <label
                          htmlFor="firstName"
                          className="text-sm font-medium leading-none"
                      >
                        First Name
                      </label>
                      <input
                          id="firstName"
                          name="firstName"
                          type="text"
                          className="input-styles"
                          placeholder="John"
                          required
                          value={formData.firstName}
                          onChange={handleChange}
                      />
                    </div>
                    <div className="grid gap-2">
                      <label
                          htmlFor="lastName"
                          className="text-sm font-medium leading-none"
                      >
                        Last Name
                      </label>
                      <input
                          id="lastName"
                          name="lastName"
                          type="text"
                          className="input-styles"
                          placeholder="Doe"
                          required
                          value={formData.lastName}
                          onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="grid gap-2">
                    <label
                        htmlFor="email"
                        className="text-sm font-medium leading-none"
                    >
                      Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        className="input-styles"
                        placeholder="m.smith@example.com"
                        required
                        value={formData.email}
                        onChange={handleChange}
                    />
                  </div>

                  {/* Department */}
                  <div className="grid gap-2">
                    <label
                        htmlFor="department"
                        className="text-sm font-medium leading-none"
                    >
                      Department
                    </label>
                    <select
                        id="department"
                        name="department"
                        className="input-styles"
                        required
                        value={formData.department}
                        onChange={handleChange}
                    >
                      <option value="">Select Department</option>
                      <option value="computer-science">Computer Science</option>
                      <option value="mathematics">Mathematics</option>
                      <option value="business">Business</option>
                      <option value="engineering">Engineering</option>
                      <option value="arts">Arts & Humanities</option>
                    </select>
                  </div>

                  {/* Passwords */}
                  <div className="grid gap-2">
                    <label
                        htmlFor="password"
                        className="text-sm font-medium leading-none"
                    >
                      Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        className="input-styles"
                        required
                        value={formData.password}
                        onChange={handleChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <label
                        htmlFor="confirmPassword"
                        className="text-sm font-medium leading-none"
                    >
                      Confirm Password
                    </label>
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        className="input-styles"
                        required
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                  </div>

                  {/* Submit button */}
                  <button
                      type="submit"
                      className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4"
                      disabled={loading}
                  >
                    {loading ? "Creating account..." : "Create Account"}
                  </button>
                </div>
              </form>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link
                    href="/student/login"
                    className="underline underline-offset-4 hover:text-primary"
                >
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}