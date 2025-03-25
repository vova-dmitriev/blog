import { render, screen } from "@testing-library/react";
import BlogPostPage from "../../[slug]/page";
import { fetchBlogPost } from "@/lib/api";

jest.mock("@/lib/api");
jest.mock("next/navigation", () => ({
  notFound: jest.fn(),
}));

const mockPost = {
  id: 1,
  slug: "test-post",
  title: "Test Post",
  excerpt: "Test excerpt",
  content: "This is the full content of the test post",
  author: "Test Author",
  publishedAt: "2024-03-15",
  coverImage: "https://example.com/image.jpg",
};

describe("BlogPostPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders blog post content", async () => {
    (fetchBlogPost as jest.Mock).mockResolvedValue(mockPost);

    const { container } = render(
      await BlogPostPage({ params: { slug: "test-post" } })
    );

    expect(screen.getByText(mockPost.title)).toBeInTheDocument();
    expect(screen.getByText(/by test author/i)).toBeInTheDocument();
    expect(screen.getByText(mockPost.content)).toBeInTheDocument();
    expect(container.querySelector("img")).toHaveAttribute(
      "src",
      mockPost.coverImage
    );
    expect(screen.getByText(/back to posts/i)).toBeInTheDocument();
  });

  it("handles missing post", async () => {
    (fetchBlogPost as jest.Mock).mockResolvedValue(null);
    const notFound = jest.requireMock("next/navigation").notFound;

    await BlogPostPage({ params: { slug: "non-existent" } });

    expect(notFound).toHaveBeenCalled();
  });
});
