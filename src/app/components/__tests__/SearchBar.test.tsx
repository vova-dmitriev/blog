import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "../SearchBar";

const mockSetSearchQuery = jest.fn();
const mockPush = jest.fn();

jest.mock("@/store/blogStore", () => ({
  useBlogStore: () => ({
    setSearchQuery: mockSetSearchQuery,
  }),
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  useSearchParams: () => ({
    get: () => null,
    toString: () => "",
  }),
}));

describe("SearchBar", () => {
  beforeEach(() => {
    mockSetSearchQuery.mockClear();
    mockPush.mockClear();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders search input", () => {
    render(<SearchBar />);
    expect(
      screen.getByPlaceholderText("Search blog posts...")
    ).toBeInTheDocument();
  });

  it("updates input value on user type", async () => {
    const user = userEvent.setup({ delay: null });
    render(<SearchBar />);
    const searchInput = screen.getByPlaceholderText("Search blog posts...");

    await user.type(searchInput, "test");
    expect(searchInput).toHaveValue("test");
  });

  it("debounces search updates", async () => {
    const user = userEvent.setup({ delay: null });
    const { container } = render(<SearchBar />);
    const searchInput = screen.getByPlaceholderText("Search blog posts...");

    await user.type(searchInput, "test");
    expect(searchInput).toHaveValue("test");

    // Fast-forward timers
    await act(async () => {
      jest.runAllTimers();
    });

    // Verify the search icon is present and search was triggered
    expect(container.querySelector("svg")).toBeInTheDocument();
    expect(mockSetSearchQuery).toHaveBeenCalledWith("test");
    expect(mockPush).toHaveBeenCalledWith("/?q=test");
  });
});
