import { render, screen } from "@testing-library/react";
import BlogPostPage from "../../[slug]/page";
import { fetchBlogPost } from "@/lib/api";

// Mock the fetchBlogPost function
jest.mock("@/lib/api", () => ({
  fetchBlogPost: jest.fn(),
}));

// Mock next/navigation
jest.mock("next/navigation", () => ({
  notFound: jest.fn(),
}));

const mockNotFound = jest.requireMock("next/navigation").notFound;

describe("BlogPostPage", () => {
  const mockPost = {
    id: 1,
    slug: "post-1",
    title: "Test Post",
    excerpt: "Test excerpt",
    content: "Test content",
    author: "Test Author",
    publishedAt: "2024-01-01",
    coverImage: "https://example.com/image.jpg",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders blog post content correctly", async () => {
    (fetchBlogPost as jest.Mock).mockResolvedValue(mockPost);
    const { container } = render(
      await BlogPostPage({
        params: Promise.resolve({ slug: "post-1" }),
      })
    );

    expect(screen.getByText("Test Post")).toBeInTheDocument();
    expect(screen.getByText(/by test author/i)).toBeInTheDocument();
    expect(screen.getByText("Test content")).toBeInTheDocument();
    expect(
      container.querySelector('[data-testid="next-image"]')
    ).toBeInTheDocument();
  });

  it("handles missing post", async () => {
    (fetchBlogPost as jest.Mock).mockResolvedValue(null);

    render(
      await BlogPostPage({
        params: Promise.resolve({ slug: "non-existent" }),
      })
    );

    expect(mockNotFound).toHaveBeenCalled();
  });

  it("handles API error", async () => {
    (fetchBlogPost as jest.Mock).mockRejectedValue(new Error("API Error"));

    render(
      await BlogPostPage({
        params: Promise.resolve({ slug: "post-1" }),
      })
    );

    expect(screen.getByText("Oops! Something went wrong")).toBeInTheDocument();
    expect(
      screen.getByText(
        "We couldn't load this blog post. Please try again later or check if the URL is correct."
      )
    ).toBeInTheDocument();
    expect(screen.getByText("Return to Home")).toBeInTheDocument();
  });
});
