import { Loader } from "@/components/ui/loader";
import { Skeleton } from "@/components/ui/skeleton";

function Loading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section Skeleton */}
      <div className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="container mx-auto px-4 relative max-w-5xl md:max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <Skeleton className="h-16 w-4/5" />
              <Skeleton className="h-8 w-3/5" />
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Skeleton className="h-12 w-40" />
                <Skeleton className="h-12 w-48" />
              </div>
            </div>
            <div className="hidden md:block relative h-[400px] w-full">
              <Skeleton className="h-full w-full rounded-2xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section Skeleton */}
      <div className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Skeleton className="h-10 w-64 mx-auto" />
            <Skeleton className="h-6 w-96 mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-card p-6 rounded-xl border border-border">
                <Skeleton className="h-12 w-12 rounded-full mb-4" />
                <Skeleton className="h-6 w-3/4 mb-3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6 mt-2" />
                <Skeleton className="h-4 w-4/6 mt-2" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trending Courses Section Skeleton */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Skeleton className="h-10 w-64 mx-auto" />
            <Skeleton className="h-6 w-96 mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="bg-card rounded-xl overflow-hidden shadow-lg border border-border flex flex-col"
              >
                <div className="relative h-52 w-full bg-muted flex items-center justify-center">
                  <Loader size="lg" />
                </div>
                <div className="p-6 flex flex-col flex-1 space-y-4">
                  <Skeleton className="h-8 w-3/4" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                  <div className="flex items-center gap-2 mt-4">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center py-8">
            <Skeleton className="h-12 w-40 mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loading;
