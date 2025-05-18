"use client";

import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function ClerkRedirects() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Only execute this effect when auth is loaded and the user is signed in
    if (isLoaded && isSignedIn) {
      // Check if we have a stored redirection flag
      const shouldRedirect = sessionStorage.getItem('clerk:justAuthenticated');
      
      if (shouldRedirect === 'true') {
        // Clear the flag
        sessionStorage.removeItem('clerk:justAuthenticated');
        
        // Redirect to the courses page
        router.push('/courses');
      }
    }
  }, [isSignedIn, isLoaded, router]);

  return null; // This component doesn't render anything
}

export default ClerkRedirects;
