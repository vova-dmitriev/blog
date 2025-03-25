import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ThemeToggle from "../ThemeToggle";

// Mock the store
const mockToggleTheme = jest.fn();
jest.mock("@/store/appStore", () => ({
  useAppStore: () => ({
    theme: "light",
    toggleTheme: mockToggleTheme,
  }),
}));

describe("ThemeToggle", () => {
  beforeEach(() => {
    mockToggleTheme.mockClear();
  });

  it("renders theme toggle button", () => {
    render(<ThemeToggle />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("shows correct icon based on theme", () => {
    render(<ThemeToggle />);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-label", "Switch to dark mode");
  });

  it("calls toggleTheme when clicked", async () => {
    render(<ThemeToggle />);
    const button = screen.getByRole("button");
    await userEvent.click(button);
    expect(mockToggleTheme).toHaveBeenCalled();
  });
});
