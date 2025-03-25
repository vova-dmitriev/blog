import {
  BlogPost,
  BlogPostResponse,
  JsonPlaceholderPost,
  SearchParams,
} from "@/types/blog";

const API_BASE_URL = "https://jsonplaceholder.typicode.com";

function transformJsonPlaceholderPost(post: JsonPlaceholderPost): BlogPost {
  return {
    id: post.id.toString(),
    slug: `post-${post.id}`,
    title: post.title,
    excerpt: post.body.substring(0, 150) + "...",
    content: post.body,
    author: "John Doe",
    publishedAt: new Date(
      Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
    ).toISOString(),
    coverImage: `https://picsum.photos/800/400?random=${post.id}`,
  };
}

export async function fetchBlogPosts(
  params: SearchParams = {}
): Promise<BlogPostResponse> {
  const { query = "", page = 1, limit = 9 } = params;

  try {
    const response = await fetch(
      `${API_BASE_URL}/posts?_start=${(page - 1) * limit}&_limit=${limit}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch blog posts: ${response.statusText}`);
    }

    const posts: JsonPlaceholderPost[] = await response.json();

    const transformedPosts: BlogPost[] = posts.map(
      transformJsonPlaceholderPost
    );

    const filteredPosts = query
      ? transformedPosts.filter(
          (post) =>
            post.title.toLowerCase().includes(query.toLowerCase()) ||
            post.content.toLowerCase().includes(query.toLowerCase())
        )
      : transformedPosts;

    const totalResponse = await fetch(`${API_BASE_URL}/posts`);
    if (!totalResponse.ok) {
      throw new Error(
        `Failed to fetch total posts: ${totalResponse.statusText}`
      );
    }
    const allPosts = await totalResponse.json();
    const total = query ? filteredPosts.length : allPosts.length;

    return {
      posts: filteredPosts,
      total,
      page,
      limit,
    };
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    throw error;
  }
}

export async function fetchBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const postId = slug.replace("post-", "");
    const response = await fetch(`${API_BASE_URL}/posts/${postId}`);
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch blog post: ${response.statusText}`);
    }

    const post: JsonPlaceholderPost = await response.json();
    return transformJsonPlaceholderPost(post);
  } catch (error) {
    console.error("Error fetching blog post:", error);
    throw error;
  }
}

// Mock data for development
const mockPosts: BlogPost[] = [
  {
    id: "1",
    slug: "getting-started-with-nextjs",
    title: "Getting Started with Next.js",
    excerpt:
      "Learn how to build modern web applications with Next.js, the React framework for production.",
    content: `Next.js is a powerful React framework that enables developers to build fast, server-side rendered applications with minimal configuration.

In this comprehensive guide, we'll explore the core features of Next.js and how to leverage them to create robust applications.

Server-side rendering (SSR) in Next.js allows your application to pre-render pages on the server, providing better performance and SEO benefits compared to client-side rendering.

With the App Router introduced in Next.js 13, you can create more intuitive routing structures and leverage features like parallel routes, intercepted routes, and server components.

Getting started with Next.js is straightforward. Just run 'npx create-next-app@latest' and follow the prompts to create your new project with TypeScript, ESLint, and Tailwind CSS already configured.`,
    author: "John Doe",
    publishedAt: "2024-03-20T10:00:00Z",
    coverImage: "https://picsum.photos/800/400",
  },
  {
    id: "2",
    slug: "typescript-best-practices",
    title: "TypeScript Best Practices",
    excerpt:
      "Essential TypeScript practices for better code quality and developer experience.",
    content: `TypeScript has revolutionized JavaScript development by bringing static typing to a dynamic language. Here are some best practices to help you write better TypeScript code.

1. Use strict mode: Always enable "strict": true in your tsconfig.json to catch more potential errors.

2. Prefer interfaces for public APIs and types for complex type definitions and unions. Interfaces are open and can be extended, which makes them ideal for public APIs.

3. Use type inference where possible to reduce verbosity, but explicitly type function parameters and return types for better documentation and error checking.

4. Leverage utility types like Partial<T>, Readonly<T>, Pick<T>, and Omit<T> to create derived types without duplicating type definitions.

5. Use discriminated unions with a shared property (tag) to make type narrowing more predictable and maintainable.

By following these TypeScript best practices, you'll create more maintainable, self-documenting code with fewer runtime errors.`,
    author: "Jane Smith",
    publishedAt: "2024-03-19T15:30:00Z",
    coverImage: "https://picsum.photos/800/401",
  },
  {
    id: "3",
    slug: "modern-css-techniques",
    title: "Modern CSS Techniques Every Developer Should Know",
    excerpt:
      "Discover the latest CSS features and techniques that will transform your web design capabilities.",
    content: `CSS has evolved tremendously over the years, with powerful new features that make previously complex designs much simpler to implement.

CSS Grid and Flexbox have revolutionized layout design, allowing developers to create complex, responsive layouts with minimal code. Grid is perfect for two-dimensional layouts, while Flexbox excels at one-dimensional arrangements.

CSS custom properties (variables) enable more maintainable and themeable stylesheets. Define colors, spacing, and other values once and reuse them throughout your styles.

The :is() and :where() pseudo-classes simplify complex selector lists, while container queries finally allow elements to respond to their parent container's size rather than just the viewport.

Modern CSS animations and transitions provide smooth, performant ways to add motion to your interfaces without JavaScript. The animation-timeline property even allows scroll-driven animations.

With these modern CSS techniques in your toolkit, you'll be able to create more impressive, responsive, and maintainable user interfaces.`,
    author: "Michael Chen",
    publishedAt: "2024-03-18T09:15:00Z",
    coverImage: "https://picsum.photos/800/402",
  },
  {
    id: "4",
    slug: "react-state-management",
    title: "Comparing React State Management Solutions",
    excerpt:
      "An in-depth analysis of different state management approaches in React applications.",
    content: `State management is a critical aspect of React application development, with numerous solutions available. Let's compare the most popular options.

React's built-in useState and useReducer hooks provide simple state management for component-level state. When combined with Context API, they can handle application-wide state for smaller apps.

Redux remains popular for large applications with complex state, offering a predictable state container with powerful developer tools and middleware capabilities.

Zustand simplifies global state management with a hook-based API that reduces boilerplate code while maintaining Redux-like principles of immutability and centralized stores.

Jotai and Recoil introduce atomic state management, allowing you to break state into small, recomposable units that can be used across your application.

TanStack Query (formerly React Query) excels at server state management, handling caching, background updates, and synchronization between server and client state.

When choosing a state management solution, consider your application's complexity, team familiarity, and specific requirements rather than following trends.`,
    author: "Sarah Johnson",
    publishedAt: "2024-03-17T14:20:00Z",
    coverImage: "https://picsum.photos/800/403",
  },
  {
    id: "5",
    slug: "web-accessibility-guide",
    title: "Complete Guide to Web Accessibility",
    excerpt:
      "Learn how to make your websites accessible to everyone, including users with disabilities.",
    content: `Web accessibility ensures that people with disabilities can perceive, understand, navigate, and interact with websites. Here's how to build more accessible web experiences.

Semantic HTML forms the foundation of accessible websites. Use appropriate elements like <nav>, <main>, <button>, and <article> to convey meaning and structure to assistive technologies.

ARIA (Accessible Rich Internet Applications) attributes supplement HTML when necessary, but remember: "No ARIA is better than bad ARIA." Only use ARIA when you can't achieve accessibility with native HTML.

Ensure keyboard navigability by making all interactive elements focusable and operable with a keyboard. Visible focus indicators help keyboard users track their position on the page.

Provide text alternatives for non-text content, like images and icons. Alt text should be concise and convey the same information as the visual element.

Create adequate color contrast between text and backgrounds, and never rely solely on color to convey information. Use tools like the WebAIM Contrast Checker to verify your color choices.

Testing with actual assistive technologies, like screen readers, is invaluable. Automated tools can help identify issues, but they can't replace manual testing.

By prioritizing accessibility from the start of your projects, you'll create more inclusive experiences while often improving usability for all users.`,
    author: "Alex Taylor",
    publishedAt: "2024-03-16T11:45:00Z",
    coverImage: "https://picsum.photos/800/404",
  },
  {
    id: "6",
    slug: "responsive-web-design-principles",
    title: "Responsive Web Design Principles for 2024",
    excerpt:
      "Modern approaches to building websites that work flawlessly across all devices and screen sizes.",
    content: `Responsive web design continues to evolve as device diversity increases. Here are the key principles for creating responsive websites in 2024.

Mobile-first design starts with designing for the smallest screens first, then progressively enhancing the experience for larger screens. This approach forces designers to prioritize content and functionality.

Fluid layouts using relative units (%, vw, vh, rem) rather than fixed pixel values allow content to adapt proportionally to different screen sizes. CSS Grid and Flexbox are essential tools for creating these fluid layouts.

Responsive images ensure optimal performance across devices. Use the srcset and sizes attributes or the <picture> element to serve different image sizes based on the device's capabilities.

Media queries remain important for applying specific styles at different breakpoints, but consider container queries for components that need to adapt based on their parent container rather than the viewport.

Performance optimization is crucial for responsive design. Techniques like lazy loading, code splitting, and serving appropriately sized assets help maintain speed across all devices.

Testing on real devices is essential. Emulators and responsive design tools are useful, but they can't replace testing on actual devices with different screen sizes, browsers, and capabilities.

By applying these responsive design principles, you'll create websites that provide optimal viewing and interaction experiences regardless of the device used.`,
    author: "Olivia Wilson",
    publishedAt: "2024-03-15T13:10:00Z",
    coverImage: "https://picsum.photos/800/405",
  },
  {
    id: "7",
    slug: "javascript-performance-optimization",
    title: "JavaScript Performance Optimization Techniques",
    excerpt:
      "Learn how to write high-performance JavaScript code for modern web applications.",
    content: `JavaScript performance can significantly impact user experience. Here are techniques to optimize your JavaScript code for better performance.

Minimize DOM manipulation, as it's one of the most expensive operations. Batch DOM updates using DocumentFragment or virtual DOM libraries, and consider using CSS for animations when possible.

Debounce and throttle event handlers for performance-intensive events like scroll, resize, and input. These techniques limit how often a function can execute, reducing unnecessary processing.

Use Web Workers for CPU-intensive tasks to prevent blocking the main thread. This keeps your UI responsive even during heavy computation.

Leverage browser caching mechanisms like localStorage, sessionStorage, and IndexedDB to store data locally and reduce server requests.

Implement code splitting to load only the JavaScript needed for the current page or feature. Modern bundlers like webpack and Rollup make this easier with dynamic imports.

Avoid memory leaks by properly cleaning up event listeners, intervals, and references. Tools like Chrome DevTools' Memory panel help identify and fix memory issues.

Implement virtualization for long lists to render only visible items, significantly improving performance when dealing with large datasets.

By applying these optimization techniques, you'll create faster, more responsive web applications that provide a better user experience on all devices.`,
    author: "Daniel Kim",
    publishedAt: "2024-03-14T16:25:00Z",
    coverImage: "https://picsum.photos/800/406",
  },
  {
    id: "8",
    slug: "api-design-best-practices",
    title: "RESTful API Design Best Practices",
    excerpt:
      "Guidelines for designing clean, intuitive, and developer-friendly RESTful APIs.",
    content: `Designing good APIs is crucial for developer experience and application maintainability. Here are best practices for RESTful API design.

Use resource-oriented URLs that represent nouns, not actions. For example, /articles instead of /getArticles. This creates a clear mental model of your API's domain.

Leverage HTTP methods appropriately: GET for retrieval, POST for creation, PUT for full updates, PATCH for partial updates, and DELETE for removal. This aligns with the HTTP specification and meets developer expectations.

Implement proper status codes to indicate success or failure. Use 2xx for success, 4xx for client errors, and 5xx for server errors, with specific codes like 201 for creation and 400 for bad requests.

Include pagination for collection endpoints to improve performance and user experience. Provide consistent pagination parameters and include metadata about total items and available pages.

Enable filtering, sorting, and searching capabilities using query parameters, allowing clients to retrieve precisely the data they need.

Implement versioning to make non-backward-compatible changes without breaking existing clients. Common approaches include URL versioning (/v1/articles) or header-based versioning.

Document your API thoroughly with examples, error descriptions, and endpoint specifications. Tools like OpenAPI (Swagger) can generate interactive documentation.

By following these API design best practices, you'll create interfaces that are intuitive, consistent, and enjoyable for developers to use.`,
    author: "Emily Rodriguez",
    publishedAt: "2024-03-13T08:50:00Z",
    coverImage: "https://picsum.photos/800/407",
  },
  {
    id: "9",
    slug: "frontend-testing-strategies",
    title: "Effective Frontend Testing Strategies",
    excerpt:
      "Comprehensive approaches to testing modern frontend applications for reliability and maintainability.",
    content: `Frontend testing is essential for building reliable applications. Here's a comprehensive approach to testing your frontend codebase.

Unit tests verify that individual functions and components work as expected in isolation. Tools like Jest provide a powerful framework for writing and running these tests with features like mocking and code coverage.

Component tests focus on testing UI components with their interactions and state changes. Libraries like React Testing Library and Vue Testing Library encourage testing components as users would interact with them.

Integration tests verify that different parts of your application work together correctly. These tests might cover scenarios like form submissions, API interactions, or multi-step workflows.

End-to-end tests simulate real user scenarios across the entire application. Tools like Cypress and Playwright allow you to automate browser interactions to test complete user journeys.

Visual regression tests catch unintended changes to your UI's appearance. Tools like Percy and Chromatic compare screenshots to detect visual differences introduced by code changes.

Accessibility tests ensure your application is usable by people with disabilities. Tools like axe can automatically detect many accessibility issues during development or in CI pipelines.

Performance tests measure loading times, interaction responsiveness, and resource usage. Lighthouse and WebPageTest provide metrics to evaluate and improve performance.

A balanced testing strategy typically forms a "testing trophy" with many unit tests, a good number of component and integration tests, and fewer end-to-end tests due to their higher maintenance cost.

By implementing these testing strategies, you'll catch bugs earlier, enable confident refactoring, and deliver a more reliable product to users.`,
    author: "James Wilson",
    publishedAt: "2024-03-12T14:35:00Z",
    coverImage: "https://picsum.photos/800/408",
  },
  {
    id: "10",
    slug: "securing-web-applications",
    title: "Essential Security Practices for Web Applications",
    excerpt:
      "Learn how to protect your web applications from common security vulnerabilities and threats.",
    content: `Web application security is critical in today's landscape of increasing cyber threats. Here are essential practices to secure your web applications.

Implement proper authentication and authorization. Use strong password policies, multi-factor authentication, and JWT or session-based authentication systems. OAuth and OpenID Connect provide standardized authentication flows.

Protect against Cross-Site Scripting (XSS) by sanitizing user input and using Content Security Policy (CSP) to restrict which scripts can run on your pages. Libraries like DOMPurify help sanitize HTML.

Prevent SQL injection by using parameterized queries or ORM libraries rather than concatenating SQL strings. Never trust user input directly in your database queries.

Defend against Cross-Site Request Forgery (CSRF) attacks with anti-CSRF tokens that verify requests come from your application, not malicious sites exploiting user sessions.

Use HTTPS everywhere to encrypt data in transit, preventing man-in-the-middle attacks. HTTP Strict Transport Security (HSTS) ensures users always connect via secure HTTPS.

Implement proper security headers like X-Content-Type-Options, X-Frame-Options, and Referrer-Policy to harden your application against various attacks.

Regularly update dependencies to patch known vulnerabilities. Tools like npm audit, Dependabot, or Snyk can automatically identify and fix vulnerable dependencies.

Conduct security testing including static analysis, dynamic analysis, and penetration testing to identify vulnerabilities before attackers do.

By implementing these security practices, you'll significantly reduce the risk of security breaches and better protect your users' data.`,
    author: "Sophia Chen",
    publishedAt: "2024-03-11T10:15:00Z",
    coverImage: "https://picsum.photos/800/409",
  },
  {
    id: "11",
    slug: "microservices-architecture",
    title: "Microservices Architecture: Benefits and Challenges",
    excerpt:
      "An exploration of the microservices architectural style and when to use it.",
    content: `Microservices architecture has become a popular approach for building complex applications. Let's explore its benefits, challenges, and when to use it.

Microservices decompose applications into small, independent services organized around business capabilities. Each service can be developed, deployed, and scaled independently, typically communicating via APIs.

The benefits include independent deployability, allowing teams to update services without affecting the entire system; technological diversity, enabling teams to choose the best tools for each service; resilience, as failures in one service don't necessarily cascade to others; and scalability, allowing services to scale independently based on demand.

However, microservices come with significant challenges. Distributed systems are inherently more complex, with network latency, data consistency issues, and complicated debugging. They require robust monitoring, service discovery, and often complex deployment pipelines. Testing across service boundaries is more difficult than in monolithic applications.

Microservices are most appropriate for large, complex applications with clear domain boundaries where multiple teams need to work independently. For smaller applications or startups, starting with a well-structured monolith is often more efficient, with the option to extract microservices later as needed.

Common patterns in microservices include API gateways to provide a unified entry point, service discovery to locate instances, circuit breakers to handle failures gracefully, and event-driven communication for asynchronous interactions.

By understanding both the benefits and challenges of microservices, you can make an informed decision about whether this architectural style is right for your specific context.`,
    author: "Robert Johnson",
    publishedAt: "2024-03-10T17:40:00Z",
    coverImage: "https://picsum.photos/800/410",
  },
  {
    id: "12",
    slug: "devops-ci-cd-pipelines",
    title: "Building Effective CI/CD Pipelines",
    excerpt:
      "Learn how to implement continuous integration and delivery pipelines for faster, more reliable software delivery.",
    content: `Continuous Integration and Continuous Delivery (CI/CD) pipelines automate the process of building, testing, and deploying software. Here's how to build effective CI/CD pipelines.

Continuous Integration involves automatically building and testing code changes whenever developers push to version control. This catches integration issues early and ensures code quality. Tools like Jenkins, GitHub Actions, GitLab CI, and CircleCI can automate this process.

The pipeline should start with fast feedback loops. Configure your build to fail fast on issues like compilation errors, linting problems, or test failures. This gives developers immediate feedback on their changes.

Automated testing is the backbone of CI/CD. Include unit tests, integration tests, and end-to-end tests in your pipeline, with each layer providing different kinds of coverage. Performance and security tests can also be automated in later stages.

Continuous Delivery extends CI by automatically deploying code to staging environments after successful builds and tests. Continuous Deployment goes further by automatically deploying to production.

Environment consistency is crucial. Use containerization with Docker or similar technologies to ensure applications run the same way in development, testing, and production environments.

Infrastructure as Code (IaC) with tools like Terraform, Ansible, or CloudFormation allows you to version and automate your infrastructure provisioning as part of your pipeline.

Monitoring and observability should be integrated into your pipeline and deployment process. Automatically verify deployments with smoke tests and monitor for anomalies after releases.

By implementing effective CI/CD pipelines, you'll release software more frequently, with higher quality, and less manual effort, ultimately delivering more value to users more quickly.`,
    author: "Lisa Thompson",
    publishedAt: "2024-03-09T12:30:00Z",
    coverImage: "https://picsum.photos/800/411",
  },
];

export async function getMockBlogPosts(
  params: SearchParams = {}
): Promise<BlogPostResponse> {
  const { query = "", page = 1, limit = 10 } = params;

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  let filteredPosts = [...mockPosts];

  if (query) {
    filteredPosts = filteredPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(query.toLowerCase())
    );
  }

  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedPosts = filteredPosts.slice(start, end);

  return {
    posts: paginatedPosts,
    total: filteredPosts.length,
    page,
    limit,
  };
}

export async function getMockBlogPost(slug: string): Promise<BlogPost> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const post = mockPosts.find((p) => p.slug === slug);
  if (!post) {
    throw new Error("Blog post not found");
  }

  return post;
}
