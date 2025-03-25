import { useEffect, useState, Suspense } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useBlogStore } from "@/store/blogStore";
import { useRouter, useSearchParams } from "next/navigation";

function SearchBarContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchInput, setSearchInput] = useState(searchParams.get("q") || "");
  const { setSearchQuery } = useBlogStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(searchInput);
      const params = new URLSearchParams(searchParams.toString());
      if (searchInput) {
        params.set("q", searchInput);
      } else {
        params.delete("q");
      }
      router.push(`/?${params.toString()}`);
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [searchInput, setSearchQuery, router, searchParams]);

  return (
    <div className="relative">
      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Search blog posts..."
        className="w-full px-4 py-2 pl-10 pr-4 text-gray-900 dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
      />
      <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
    </div>
  );
}

export default function SearchBar() {
  return (
    <div className="relative w-full max-w-2xl mx-auto mb-8">
      <Suspense
        fallback={
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        }
      >
        <SearchBarContent />
      </Suspense>
    </div>
  );
}
