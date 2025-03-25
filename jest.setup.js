import "@testing-library/jest-dom";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn(),
    toString: jest.fn(),
  }),
  usePathname: () => "",
}));

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props) => {
    // Convert fill to a string to avoid React warning
    const { fill, ...rest } = props;
    return (
      <img
        {...rest}
        data-testid="next-image"
        fill={fill ? "true" : undefined}
      />
    );
  },
}));
