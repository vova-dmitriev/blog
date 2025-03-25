import { render, screen } from "@testing-library/react";
import Loading from "../Loading";

describe("Loading", () => {
  it("renders loading spinner", () => {
    render(<Loading />);
    const loadingElement = screen.getByRole("status");
    expect(loadingElement).toBeInTheDocument();
    expect(loadingElement).toHaveClass("animate-spin");
  });
});
