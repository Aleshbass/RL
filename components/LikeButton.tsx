"use client";

import { useState, useEffect } from "react";
import { likeCourse, unlikeCourse } from "@/actions/courseLikes";
import { GetCourseBySlugQueryResult } from "@/sanity.types";
import { Heart } from "lucide-react";
import { db } from "@/lib/firebase";
import { ref as dbRef, onValue, set, remove } from "firebase/database";

interface LikeButtonProps {
  course: GetCourseBySlugQueryResult | null;
  isEnrolled: boolean;
  clerkId: string | null;
}

export default function LikeButton({ course, isEnrolled, clerkId }: LikeButtonProps) {
  const [likes, setLikes] = useState(course?.likes || []);
  const [loading, setLoading] = useState(false);
  const userId = clerkId;
  const hasLiked = !!likes.find((like) => like.user?._ref === userId);

  // Realtime likes from Firebase
  useEffect(() => {
    if (!course || !course._id) return;
    const likesRef = dbRef(db, `courses/${course._id}/likes`);
    const unsubscribe = onValue(likesRef, (snapshot) => {
      const data = snapshot.val() || {};
      const likeList = Object.values(data);
      setLikes(likeList as typeof likes);
    });
    return () => unsubscribe();
  }, [course]);

  const handleLike = async () => {
    if (!userId || !isEnrolled || !course) return;
    setLoading(true);
    try {
      // Add to Firebase for realtime
      const likeRef = dbRef(db, `courses/${course._id}/likes/${userId}`);
      await set(likeRef, {
        _key: userId,
        user: { _ref: userId, _type: "reference" },
        createdAt: new Date().toISOString(),
      });
      // Add to Sanity for persistence
      await likeCourse({ courseId: course._id, clerkId: userId });
    } finally {
      setLoading(false);
    }
  };

  const handleUnlike = async () => {
    if (!userId || !isEnrolled || !course) return;
    setLoading(true);
    try {
      // Remove from Firebase for realtime
      const likeRef = dbRef(db, `courses/${course._id}/likes/${userId}`);
      await remove(likeRef);
      // Remove from Sanity for persistence
      await unlikeCourse({ courseId: course._id, clerkId: userId });
    } finally {
      setLoading(false);
    }
  };

  if (!course) return null;

  return (
    <div className="flex items-center gap-2 mt-6">
      <button
        className={`flex items-center gap-1 px-3 py-1 rounded-full border ${hasLiked ? "bg-red-100 border-red-400 text-red-600" : "bg-white border-gray-300 text-gray-600"} disabled:opacity-50`}
        onClick={hasLiked ? handleUnlike : handleLike}
        disabled={!isEnrolled || loading}
        aria-label={hasLiked ? "Unlike" : "Like"}
      >
        <Heart className={`w-4 h-4 ${hasLiked ? "fill-red-500" : ""}`} />
        <span>{likes.length}</span>
      </button>
      {!isEnrolled && <span className="text-xs text-muted-foreground">Only enrolled students can like</span>}
    </div>
  );
}
