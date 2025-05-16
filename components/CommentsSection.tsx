"use client";

import { useState, useEffect } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import { addCourseComment, removeCourseComment } from "@/actions/courseComments";
import { db } from "@/lib/firebase";
import { ref as dbRef, onValue, push, set } from "firebase/database";
import { sendCommentNotification } from "@/lib/resend";
import { GetCourseBySlugQueryResult } from "@/sanity.types";
import Image from "next/image";

interface CommentsSectionProps {
  course: GetCourseBySlugQueryResult | null;
  isEnrolled: boolean;
  clerkId: string | null;
}

export default function CommentsSection({ course, isEnrolled, clerkId }: CommentsSectionProps) {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(course?.comments || []);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const { client } = useClerk();
  const [avatars, setAvatars] = useState<Record<string, string>>({});

  // Realtime comments from Firebase
  useEffect(() => {
    if (!course?._id) return;
    const commentsRef = dbRef(db, `courses/${course._id}/comments`);
    const unsubscribe = onValue(commentsRef, (snapshot) => {
      const data = snapshot.val() || {};
      const commentList = Object.values(data);
      setComments(commentList as typeof comments);
    });
    return () => unsubscribe();
  }, [course?._id]);

  // Fetch Clerk avatars for all unique user._ref in comments
  useEffect(() => {
    async function fetchAvatars() {
      const uniqueIds = Array.from(new Set(comments.map((c) => c.user?._ref).filter(Boolean)));
      const avatarMap: Record<string, string> = {};
      for (const id of uniqueIds) {
        if (!id) continue;
        try {
          const res = await fetch(`/api/clerk/avatar/${id}`);
          const data = await res.json();
          avatarMap[id] = data.imageUrl || "";
        } catch {
          avatarMap[id] = "";
        }
      }
      setAvatars(avatarMap);
    }
    if (comments.length > 0) fetchAvatars();
  }, [comments, client]);

  const handleAddComment = async () => {
    if (!commentText.trim() || !clerkId || !user?.id || !course) return;
    setLoading(true);
    try {
      // Add to Firebase for realtime
      const commentsRef = dbRef(db, `courses/${course._id}/comments`);
      const newCommentRef = push(commentsRef);
      const commentObj = {
        _key: newCommentRef.key!,
        user: { _ref: user.id, _type: "reference" },
        text: commentText,
        createdAt: new Date().toISOString(),
      };
      await set(newCommentRef, commentObj);
      // Add to Sanity for persistence
      await addCourseComment({ courseId: course._id, clerkId, text: commentText });
      // Send notification (e.g., to instructor)
      const instructorEmail = (course.instructor as { email?: string } | null | undefined)?.email;
      if (instructorEmail) {
        await sendCommentNotification({
          to: instructorEmail,
          courseTitle: course.title || "Course",
          commentText,
        });
      }
      setCommentText("");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteComment = async (commentKey: string) => {
    if (!course) return;
    setLoading(true);
    try {
      await removeCourseComment({ courseId: course._id, commentKey });
      setComments(comments.filter((c) => c._key !== commentKey));
    } finally {
      setLoading(false);
    }
  };

  if (!course) return null;

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-2">Comments</h3>
      {isEnrolled ? (
        <div className="mb-4 flex gap-2">
          <input
            className="flex-1 border rounded px-3 py-2"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment..."
            disabled={loading}
          />
          <button
            className="bg-primary text-white px-4 py-2 rounded disabled:opacity-50"
            onClick={handleAddComment}
            disabled={loading || !commentText.trim()}
          >
            Post
          </button>
        </div>
      ) : (
        <div className="mb-4 text-muted-foreground text-sm">Only enrolled students can comment.</div>
      )}
      <div className="space-y-3">
        {comments.length === 0 && <div className="text-muted-foreground text-sm">No comments yet.</div>}
        {comments.map((comment) => (
          <div key={comment._key} className="bg-muted rounded p-3 flex justify-between items-center">
            <div className="flex items-center gap-3">
              {comment.user?._ref && avatars[comment.user._ref] ? (
                <Image
                  src={avatars[comment.user._ref]}
                  alt="avatar"
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full"
                  onError={(e) => {
                    e.currentTarget.src = "/fallback-avatar.png"; // Fallback image
                  }}
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-200" />
              )}
              <div>
                <div className="font-medium text-sm">{comment.user?._ref?.slice(0, 8) || "User"}</div>
                <div className="text-sm">{comment.text}</div>
                <div className="text-xs text-muted-foreground">{comment.createdAt && new Date(comment.createdAt).toLocaleString()}</div>
              </div>
            </div>
            {isEnrolled && comment.user?._ref === clerkId && (
              <button
                className="text-red-500 text-xs ml-2"
                onClick={() => handleDeleteComment(comment._key)}
                disabled={loading}
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
