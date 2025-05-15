import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { groq } from "next-sanity";
import { notFound } from "next/navigation";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export const revalidate = 60;

const postQuery = groq`
  *[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    bannerImage,
    body,
    author->{name, slug, profileImage, bio},
  }
`;

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await client.fetch(postQuery, { slug: params.slug });
  if (!post) return notFound();

  return (
    <div className="min-h-screen bg-[#FAF6E7] pt-24">
      <div className="container mx-auto px-4 max-w-3xl">
        <Breadcrumb
          className="mb-6"
          segments={[
            { title: "Home", href: "/" },
            { title: "Blog", href: "/blog" },
            { title: post.title, href: `/blog/${post.slug.current}` },
          ]}
        />
        {post.bannerImage && (
          <div className="relative w-full max-w-[960px] aspect-[960/392] rounded-2xl overflow-hidden mb-8 shadow-lg mx-auto bg-white">
            <Image
              src={urlFor(post.bannerImage).width(960).height(392).url()}
              alt={post.title}
              fill
              className="object-contain object-center"
              sizes="(max-width: 960px) 100vw, 960px"
              priority
            />
          </div>
        )}
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground text-left">
          {post.title}
        </h1>
        <div className="flex items-center gap-4 mb-8 justify-start">
          {post.author?.profileImage && (
            <Image
              src={urlFor(post.author.profileImage).width(64).height(64).url()}
              alt={post.author.name}
              width={48}
              height={48}
              className="rounded-full object-cover border"
            />
          )}
          <div className="text-left">
            <div className="text-lg font-semibold text-foreground">
              {post.author?.name}
            </div>
            <div className="text-xs text-muted-foreground">
              {post.publishedAt && new Date(post.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
            </div>
            {post.author?.bio && (
              <div className="text-xs text-muted-foreground mt-1 line-clamp-2 max-w-xs">
                {post.author.bio}
              </div>
            )}
          </div>
        </div>
        <article className="prose prose-lg dark:prose-invert max-w-none mx-auto">
          <PortableTextRenderer value={post.body} />
        </article>
      </div>
    </div>
  );
}
