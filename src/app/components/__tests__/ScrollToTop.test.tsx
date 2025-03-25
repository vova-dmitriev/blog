import { render, screen, fireEvent } from "@testing-library/react";
import ScrollToTop from "../ScrollToTop";

// Mock window.scrollTo
const scrollToMock = jest.fn();
window.scrollTo = scrollToMock;

describe("ScrollToTop", () => {
  beforeEach(() => {
    scrollToMock.mockClear();
    // Reset scroll position
    Object.defineProperty(window, "scrollY", {
      value: 0,
      writable: true,
    });
  });

  it("is hidden by default", () => {
    render(<ScrollToTop />);
    const button = screen.getByRole("button", { name: /scroll to top/i });
    expect(button).toHaveClass("opacity-0");
  });

  it("becomes visible when scrolling down", () => {
    render(<ScrollToTop />);
    const button = screen.getByRole("button", { name: /scroll to top/i });

    // Simulate scrolling down
    Object.defineProperty(window, "scrollY", { value: 400 });
    fireEvent.scroll(window);

    expect(button).toHaveClass("opacity-100");
  });

  it("scrolls to top when clicked", () => {
    render(<ScrollToTop />);
    const button = screen.getByRole("button", { name: /scroll to top/i });

    // Simulate scrolling down
    Object.defineProperty(window, "scrollY", { value: 400 });
    fireEvent.scroll(window);

    // Click the button
    fireEvent.click(button);

    expect(scrollToMock).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });
  });
});
