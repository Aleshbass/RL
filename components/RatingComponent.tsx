"use client";

import { useState, useEffect } from "react";
import { Star, CheckCircle } from "lucide-react";
import { db } from "@/lib/firebase";
import { ref as dbRef, onValue, set } from "firebase/database";
import { GetCourseBySlugQueryResult } from "@/sanity.types";

interface RatingComponentProps {
  course: GetCourseBySlugQueryResult | null;
  isEnrolled: boolean;
  clerkId: string | null;
}

export default function RatingComponent({ course, isEnrolled, clerkId }: RatingComponentProps) {
  const [userRating, setUserRating] = useState<number>(0);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [totalRatings, setTotalRatings] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null);

  // Fetch ratings from Firebase
  useEffect(() => {
    if (!course?._id) return;
    
    // Get user's rating if logged in
    if (clerkId) {
      const userRatingRef = dbRef(db, `courses/${course._id}/likes/${clerkId}/rating`);
      const unsubscribeUser = onValue(userRatingRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setUserRating(data || 0);
        }
      });
      
      // Clean up
      return () => unsubscribeUser();
    }
  }, [course?._id, clerkId]);

  // Fetch average ratings
  useEffect(() => {
    if (!course?._id) return;
    
    const likesRef = dbRef(db, `courses/${course._id}/likes`);
    const unsubscribe = onValue(likesRef, (snapshot) => {
      const data = snapshot.val() || {};
      // Define proper type for Firebase like objects
      type LikeObject = { rating?: number; _key?: string; user?: { _ref: string } };
      
      const ratings = Object.values(data as Record<string, LikeObject>)
        .map(like => like.rating || 0)
        .filter(rating => rating > 0);
      
      if (ratings.length > 0) {
        const sum = ratings.reduce((acc: number, curr: number) => acc + curr, 0);
        setAverageRating(parseFloat((sum / ratings.length).toFixed(1)));
        setTotalRatings(ratings.length);
      } else {
        setAverageRating(0);
        setTotalRatings(0);
      }
    });
    
    return () => unsubscribe();
  }, [course?._id]);

  const handleRating = async (rating: number) => {
    if (!isEnrolled || !clerkId || !course) return;
    
    setLoading(true);
    try {
      // Use set to update or create the rating directly under the user's like
      const likeRef = dbRef(db, `courses/${course._id}/likes/${clerkId}`);
      const ratingRef = dbRef(db, `courses/${course._id}/likes/${clerkId}/rating`);
      
      // If rating is 0, just clear the rating
      if (rating === 0) {
        // Just clear the rating field
        await set(ratingRef, null);
      } else {
        // First make sure the like object exists
        await set(likeRef, {
          _key: clerkId,
          user: { _ref: clerkId, _type: "reference" },
          createdAt: new Date().toISOString(),
          rating: rating
        });
      }
      
      setUserRating(rating);
      setNotification({
        message: `You rated this course ${rating} out of 5 stars!`,
        type: 'success'
      });
      
      // Clear notification after 3 seconds
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    } catch (error) {
      console.error("Error saving rating:", error);
      setNotification({
        message: "There was a problem saving your rating. Please try again.",
        type: 'error'
      });
      
      // Clear notification after 3 seconds
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 border-t border-border pt-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-medium dark:text-secondary-honeydew">Course Rating</h3>
        {averageRating > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold dark:text-secondary-honeydew">{averageRating}</span>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={16}
                  className={`${
                    star <= Math.round(averageRating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground dark:text-secondary-honeydew/70">
              ({totalRatings} {totalRatings === 1 ? "rating" : "ratings"})
            </span>
          </div>
        )}
      </div>
      
      {/* Notification message */}
      {notification && (
        <div className={`mb-4 p-2 rounded-md flex items-center gap-2 ${notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {notification.type === 'success' && <CheckCircle className="w-4 h-4" />}
          <span>{notification.message}</span>
        </div>
      )}
      
      {isEnrolled ? (
        <div>
          <p className="text-sm text-muted-foreground dark:text-secondary-honeydew/80 mb-2">
            {userRating > 0 
              ? "Your rating:" 
              : "Rate this course:"}
          </p>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                disabled={loading}
                onClick={() => handleRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="p-1 focus:outline-none transition-colors disabled:opacity-50"
              >
                <Star
                  size={24}
                  className={`transition-colors ${
                    star <= (hoverRating || userRating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300 hover:text-yellow-200"
                  }`}
                />
              </button>
            ))}
            {userRating > 0 && (
              <button 
                className="ml-3 text-xs text-muted-foreground hover:text-primary dark:text-secondary-honeydew/60 dark:hover:text-secondary-honeydew"
                onClick={() => handleRating(0)}
                disabled={loading}
              >
                Clear
              </button>
            )}
          </div>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground dark:text-secondary-honeydew/80">
          Enroll in this course to rate it.
        </p>
      )}
    </div>
  );
}
