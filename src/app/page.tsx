"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import SearchBar from "./components/SearchBar";
import Loading from "./components/Loading";
import { fetchBlogPosts } from "@/lib/api";
import { useBlogStore } from "@/store/blogStore";
import { BlogPost } from "@/types/blog";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import ScrollToTop from "./components/ScrollToTop";

export default function Home() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const { searchQuery, setSearchQuery } = useBlogStore();

  useEffect(() => {
    const query = searchParams.get("q") || "";
    setSearchQuery(query);
  }, [searchParams, setSearchQuery]);

  const loadPosts = useCallback(
    async (pageNum: number) => {
      try {
        setLoading(true);
        const response = await fetchBlogPosts({
          query: searchQuery,
          page: pageNum,
          limit: 9,
        });

        if (pageNum === 1) {
          setPosts(response.posts);
        } else {
          setPosts((prev) => [...prev, ...response.posts]);
        }

        setHasMore(response.posts.length === 9);
        setPage(pageNum);
      } catch (error) {
        console.error("Error loading posts:", error);
      } finally {
        setLoading(false);
      }
    },
    [searchQuery]
  );

  useEffect(() => {
    loadPosts(1);
  }, [searchQuery, loadPosts]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore && !loading) {
          loadPosts(page + 1);
        }
      },
      {
        root: null,
        rootMargin: "20px",
        threshold: 0.1,
      }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasMore, loading, page]);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
        Welcome to Our Blog
      </h1>
      <SearchBar />

      {posts.length === 0 && !loading && (
        <p className="text-center text-gray-600 dark:text-gray-400 mt-8">
          No posts found{searchQuery ? ` for "${searchQuery}"` : ""}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="block group cursor-pointer"
          >
            <article className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl group-hover:transform group-hover:-translate-y-2">
              <div className="relative h-48 w-full">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  priority={index < 3}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                  <span>{post.author}</span>
                  <time dateTime={post.publishedAt}>
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </time>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {loading && <Loading />}

      {!loading && hasMore && <div ref={loadMoreRef} className="h-20" />}

      {!loading && !hasMore && posts.length > 0 && (
        <p className="text-center text-gray-600 dark:text-gray-400 mt-8">
          No more posts to load
        </p>
      )}

      <ScrollToTop />
    </main>
  );
}
