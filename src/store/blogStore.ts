import { create } from "zustand";
import { BlogPost } from "@/types/blog";

interface BlogStore {
  posts: BlogPost[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  currentPage: number;
  totalPosts: number;
  hasMore: boolean;
  setPosts: (posts: BlogPost[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSearchQuery: (query: string) => void;
  setCurrentPage: (page: number) => void;
  setTotalPosts: (total: number) => void;
  setHasMore: (hasMore: boolean) => void;
  reset: () => void;
}

const initialState = {
  posts: [] as BlogPost[],
  loading: false,
  error: null,
  searchQuery: "",
  currentPage: 1,
  totalPosts: 0,
  hasMore: true,
};

export const useBlogStore = create<BlogStore>((set) => ({
  ...initialState,
  setPosts: (posts) => set({ posts }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setTotalPosts: (total) => set({ totalPosts: total }),
  setHasMore: (hasMore) => set({ hasMore }),
  reset: () => set(initialState),
}));
