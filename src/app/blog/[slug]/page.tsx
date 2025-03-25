import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { fetchBlogPost } from "@/lib/api";
import { notFound } from "next/navigation";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await fetchBlogPost(params.slug);

  if (!post) {
    notFound();
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/"
        className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-6 group"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" />
        Back to posts
      </Link>
      <article className="prose dark:prose-invert lg:prose-xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          {post.title}
        </h1>
        <div className="flex items-center text-gray-600 dark:text-gray-400 mb-8">
          <span>By {post.author}</span>
          <span className="mx-2">•</span>
          <time>{new Date(post.publishedAt).toLocaleDateString()}</time>
        </div>
        <div className="relative w-full h-[400px] mb-8">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover rounded-lg"
            data-testid="next-image"
          />
        </div>
        <div className="mt-8 text-gray-800 dark:text-gray-200">
          {post.content}
        </div>
      </article>
    </div>
  );
}
