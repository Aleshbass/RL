import { PortableText, PortableTextComponents } from '@portabletext/react';
import type { TypedObject } from '@portabletext/types';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';

const components: PortableTextComponents = {
  types: {
    image: ({ value }: { value: { asset?: { _ref?: string }; alt?: string } }) =>
      value?.asset?._ref ? (
        <div className="my-6">
          <Image
            src={urlFor(value).width(800).url()}
            alt={value.alt || 'Blog image'}
            width={800}
            height={450}
            className="rounded-lg mx-auto"
          />
        </div>
      ) : null,
  },
  block: {
    h1: ({ children }) => <h1 className="text-3xl font-bold my-6">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-semibold my-5">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-semibold my-4">{children}</h3>,
    normal: ({ children }) => <p className="my-4 leading-relaxed text-lg">{children}</p>,
    blockquote: ({ children }) => <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground">{children}</blockquote>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold text-primary">{children}</strong>,
    em: ({ children }) => <em className="italic text-muted-foreground">{children}</em>,
    link: ({ value, children }) => (
      <a
        href={value?.href}
        className="underline text-primary hover:text-primary/80 transition-colors"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc ml-6 my-4">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal ml-6 my-4">{children}</ol>,
  },
};

export default function PortableTextRenderer({ value }: { value: TypedObject | TypedObject[] }) {
  return <PortableText value={value} components={components} />;
}
