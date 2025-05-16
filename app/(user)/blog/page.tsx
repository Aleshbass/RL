import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { groq } from "next-sanity";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export const revalidate = 60;

const postsQuery = groq`
  *[_type == "post"]|order(publishedAt desc){
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    bannerImage,
    author->{name, slug, profileImage},
  }
`;

// Define the Post type for the posts array
interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  publishedAt?: string;
  bannerImage?: Record<string, unknown>;
  thumbnail?: Record<string, unknown>;
  author?: {
    name?: string;
    slug?: { current: string };
    profileImage?: Record<string, unknown>;
  };
}

export default async function BlogPage() {
  const posts = await client.fetch(postsQuery);

  return (
    <div className="min-h-screen bg-[#FAF6E7] pt-24">
      <div className="container mx-auto px-4">
        <Breadcrumb
          className="mb-6"
          segments={[
            { title: "Home", href: "/" },
            { title: "Blog", href: "/blog" },
          ]}
        />
        <h1 className="text-4xl font-bold mb-8 text-center">Blog</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(posts as Post[]).map((post) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug.current}`}
              className="group rounded-xl overflow-hidden shadow-lg bg-white dark:bg-zinc-900 border border-border hover:shadow-2xl transition-all flex flex-col"
            >
              {post.thumbnail ? (
                <div className="relative w-full aspect-[400/164] flex items-center justify-center bg-[#FAF6E7]">
                  <Image
                    src={urlFor(post.thumbnail).width(400).height(164).url()}
                    alt={post.title}
                    fill
                    className="object-contain object-center group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              ) : post.bannerImage ? (
                <div className="relative w-full aspect-[400/164] flex items-center justify-center bg-[#FAF6E7]">
                  <Image
                    src={urlFor(post.bannerImage).width(400).height(164).url()}
                    alt={post.title}
                    fill
                    className="object-contain object-center group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              ) : (
                <Skeleton className="aspect-[400/164] w-full" />
              )}
              <div className="flex-1 flex flex-col p-6">
                <h2 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-muted-foreground mb-4 line-clamp-3 flex-1">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-3 mt-4">
                  {post.author?.profileImage ? (
                    <Image
                      src={urlFor(post.author.profileImage).width(48).height(48).url()}
                      alt={post.author.name || "Author"}
                      width={40}
                      height={40}
                      className="rounded-full object-cover border"
                    />
                  ) : (
                    <Skeleton className="h-10 w-10 rounded-full" />
                  )}
                  <div>
                    <div className="text-sm font-medium text-foreground">
                      {post.author?.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {post.publishedAt && new Date(post.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {(posts as Post[]).length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">No blog posts yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
