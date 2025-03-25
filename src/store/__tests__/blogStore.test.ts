import { useBlogStore } from "../blogStore";
import { act } from "@testing-library/react";

describe("blogStore", () => {
  beforeEach(() => {
    useBlogStore.setState({
      posts: [],
      loading: false,
      error: null,
      searchQuery: "",
      currentPage: 1,
      totalPosts: 0,
      hasMore: true,
    });
  });

  it("sets posts", () => {
    const mockPosts = [
      {
        id: "1",
        slug: "test-post",
        title: "Test Post",
        excerpt: "Test excerpt",
        content: "Test content",
        author: "Test Author",
        publishedAt: "2024-03-15T12:00:00Z",
        coverImage: "https://example.com/image.jpg",
      },
    ];

    act(() => {
      useBlogStore.getState().setPosts(mockPosts);
    });

    expect(useBlogStore.getState().posts).toEqual(mockPosts);
  });

  it("sets loading state", () => {
    act(() => {
      useBlogStore.getState().setLoading(true);
    });

    expect(useBlogStore.getState().loading).toBe(true);
  });

  it("sets error state", () => {
    const error = "Test error";
    act(() => {
      useBlogStore.getState().setError(error);
    });

    expect(useBlogStore.getState().error).toBe(error);
  });

  it("sets search query", () => {
    const query = "test query";
    act(() => {
      useBlogStore.getState().setSearchQuery(query);
    });

    expect(useBlogStore.getState().searchQuery).toBe(query);
  });

  it("sets current page", () => {
    act(() => {
      useBlogStore.getState().setCurrentPage(2);
    });

    expect(useBlogStore.getState().currentPage).toBe(2);
  });

  it("sets total posts", () => {
    act(() => {
      useBlogStore.getState().setTotalPosts(100);
    });

    expect(useBlogStore.getState().totalPosts).toBe(100);
  });

  it("sets has more flag", () => {
    act(() => {
      useBlogStore.getState().setHasMore(false);
    });

    expect(useBlogStore.getState().hasMore).toBe(false);
  });

  it("resets store state", () => {
    // Set some values
    act(() => {
      useBlogStore.setState({
        posts: [
          {
            id: "1",
            slug: "test",
            title: "Test",
            excerpt: "Test",
            content: "Test",
            author: "Test",
            publishedAt: "",
            coverImage: "",
          },
        ],
        loading: true,
        error: "error",
        searchQuery: "query",
        currentPage: 2,
        totalPosts: 100,
        hasMore: false,
      });
    });

    // Reset state
    act(() => {
      useBlogStore.getState().reset();
    });

    // Verify reset state
    expect(useBlogStore.getState()).toEqual({
      posts: [],
      loading: false,
      error: null,
      searchQuery: "",
      currentPage: 1,
      totalPosts: 0,
      hasMore: true,
      setPosts: expect.any(Function),
      setLoading: expect.any(Function),
      setError: expect.any(Function),
      setSearchQuery: expect.any(Function),
      setCurrentPage: expect.any(Function),
      setTotalPosts: expect.any(Function),
      setHasMore: expect.any(Function),
      reset: expect.any(Function),
    });
  });
});
