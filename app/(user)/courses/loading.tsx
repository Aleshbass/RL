import { Loader } from "@/components/ui/loader";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background pt-24">
      <div className="container mx-auto px-4">
        {/* Title skeleton */}
        <div className="h-12 w-64 bg-muted rounded-lg animate-pulse mb-8" />
        
        {/* Course grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-card rounded-xl overflow-hidden border border-border h-[400px]"
            >
              {/* Image skeleton */}
              <div className="relative h-52 w-full bg-muted animate-pulse" />
              
              {/* Content skeleton */}
              <div className="p-6">
                <div className="h-6 w-3/4 bg-muted rounded animate-pulse mb-4" />
                <div className="h-4 w-full bg-muted rounded animate-pulse mb-2" />
                <div className="h-4 w-2/3 bg-muted rounded animate-pulse mb-6" />
                
                {/* Author skeleton */}
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-muted animate-pulse mr-3" />
                  <div className="h-4 w-24 bg-muted rounded animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}