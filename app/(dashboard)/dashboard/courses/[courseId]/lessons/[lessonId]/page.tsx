import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { getLessonById } from "@/sanity/lib/lessons/getLessonById";
import { PortableText } from "@portabletext/react";
import { LoomEmbed } from "@/components/LoomEmbed";
import { VideoPlayer } from "@/components/VideoPlayer";
import { LessonCompleteButton } from "@/components/LessonCompleteButton";
import LikeButton from "@/components/LikeButton";
import CommentsSection from "@/components/CommentsSection";
import RatingComponent from "@/components/RatingComponent";
import { MessageCircle, ThumbsUp } from "lucide-react";
import getCourseById from "@/sanity/lib/courses/getCourseById";

interface LessonPageProps {
  params: Promise<{
    courseId: string;
    lessonId: string;
  }>;
}

export default async function LessonPage({ params }: LessonPageProps) {
  const user = await currentUser();
  const { courseId, lessonId } = await params;

  const lesson = await getLessonById(lessonId);
  if (!lesson) {
    return redirect(`/dashboard/courses/${courseId}`);
  }
  
  // Get the full course data for likes and comments
  const course = await getCourseById(courseId);
  if (!course) {
    return redirect(`/dashboard/courses`);
  }

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto pt-12 pb-20 px-4">
          <h1 className="text-2xl font-bold mb-4">{lesson.title}</h1>

          {lesson.description && (
            <p className="text-muted-foreground mb-8">{lesson.description}</p>
          )}

          <div className="space-y-8">
            {/* Video Section */}
            {lesson.videoUrl && <VideoPlayer url={lesson.videoUrl} />}

            {/* Loom Embed Video if loomUrl is provided */}
            {lesson.loomUrl && <LoomEmbed shareUrl={lesson.loomUrl} />}

            {/* Lesson Content */}
            {lesson.content && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Lesson Notes</h2>
                <div className="prose prose-blue dark:prose-invert max-w-none">
                  <PortableText value={lesson.content} />
                </div>
              </div>
            )}

            <div className="flex justify-end">
              <LessonCompleteButton lessonId={lesson._id} clerkId={user!.id} />
            </div>

            {/* Course Discussion Section */}
            <div className="mt-12 border-t border-border pt-8">
              <div className="flex items-center gap-2 mb-6">
                <MessageCircle className="w-5 h-5 text-secondary-honeydew dark:text-secondary-honeydew" />
                <h2 className="text-xl font-semibold dark:text-secondary-honeydew">Course Discussion</h2>
              </div>
              
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground dark:text-secondary-honeydew/80">
                  Share your thoughts about this course
                </p>
                <div className="flex items-center gap-2">
                  <ThumbsUp className="w-4 h-4 text-secondary-honeydew/80" />
                  <LikeButton
                    course={course}
                    isEnrolled={true}
                    clerkId={user!.id}
                  />
                </div>
              </div>
              
              <RatingComponent 
                course={course}
                isEnrolled={true}
                clerkId={user!.id}
              />
              
              <CommentsSection
                course={course}
                isEnrolled={true}
                clerkId={user!.id}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
