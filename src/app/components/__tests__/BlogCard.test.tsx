import { render, screen } from "@testing-library/react";
import BlogCard from "../BlogCard";

const mockPost = {
  id: "1",
  slug: "test-post",
  title: "Test Post",
  excerpt: "This is a test post excerpt",
  content: "This is the full content of the test post",
  author: "Test Author",
  publishedAt: "2024-03-15T12:00:00Z",
  coverImage: "https://example.com/image.jpg",
};

describe("BlogCard", () => {
  it("renders blog post information", () => {
    render(<BlogCard post={mockPost} />);

    expect(screen.getByText(mockPost.title)).toBeInTheDocument();
    expect(screen.getByText(mockPost.excerpt)).toBeInTheDocument();
    expect(screen.getByText(mockPost.author)).toBeInTheDocument();
  });

  it("renders the cover image", () => {
    render(<BlogCard post={mockPost} />);
    const image = screen.getByRole("img");

    expect(image).toHaveAttribute(
      "src",
      expect.stringContaining(mockPost.coverImage)
    );
    expect(image).toHaveAttribute("alt", mockPost.title);
  });

  it("links to the blog post page", () => {
    render(<BlogCard post={mockPost} />);
    const link = screen.getByRole("link");

    expect(link).toHaveAttribute("href", `/blog/${mockPost.slug}`);
  });
});
