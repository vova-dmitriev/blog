import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { fetchBlogPost } from "@/lib/api";
import { notFound } from "next/navigation";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  try {
    const { slug } = await params;
    const post = await fetchBlogPost(slug);

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
  } catch (error) {
    console.error("Error loading blog post:", error);
    return (
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-6 group"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" />
          Back to posts
        </Link>
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            Oops! Something went wrong
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            We couldn&apos;t load this blog post. Please try again later or
            check if the URL is correct.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }
}
