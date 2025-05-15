'use client'; // Ensure this is at the very top

import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

// Extended fetch options interface
interface FetchOptions extends RequestInit {
  requireAuth?: boolean;
  useBaseApi?: boolean;
}

/**
 * Generic fetch hook for making API requests with optional authentication
 */
export function useFetch<T>(url: string, options: FetchOptions = {}) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  // Function to fetch data from API
  const fetchData = async () => {
    // Prevent request if authentication is required but the user is not authenticated
    if (options.requireAuth && !isAuthenticated) {
      setError(new Error('User is not authenticated'));
      toast.error('You must be logged in to access this data.');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Determine the proper base URL
      const baseUrl = options.useBaseApi
          ? process.env.NEXT_PUBLIC_API_URL
          : process.env.NEXT_PUBLIC_RECOMMENDATION_API;

      // Construct the full URL
      const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url}`;

      // Set up headers, adding Authorization token if required
      const headers = new Headers(options.headers);
      if (options.requireAuth) {
        const token = localStorage.getItem('studentToken');
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
        }
      }

      // Perform the fetch request
      const response = await fetch(fullUrl, {
        ...options,
        headers,
      });

      // Handle non-OK responses
      if (!response.ok) {
        // Special handling for unauthorized responses
        if (response.status === 401) {
          toast.error('Session expired, please log in again.');
        }
        throw new Error(`Request failed with status: ${response.status}`);
      }

      // Parse and store the response data
      const responseData = await response.json();
      setData(responseData);
      return responseData;
    } catch (err) {
      const error = err as Error;
      setError(error);
      console.error('Error fetching data:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Automatically fetch data for GET requests upon component mount or URL change
  useEffect(() => {
    if (!options.method || options.method === 'GET') {
      fetchData();
    }
  }, [url]); // Re-run when URL changes

  // Return data, loading/error states, and refetch function
  return { data, error, loading, refetch: fetchData };
}

export default useFetch;