# Dynamic Blog Platform

A modern blog platform built with Next.js, featuring server-side rendering, client-side rendering, and dynamic routing.

## Features

- 🚀 Server-side rendering (SSR) for optimal performance
- 🔍 Real-time search functionality with debouncing and URL query sync
- 📱 Responsive design for all devices
- 🌓 Dark/Light mode support
- 📝 Dynamic blog post pages
- 🔄 Infinite scroll for blog posts
- 🎨 Styled with Tailwind CSS
- 📊 State management with Zustand
- ⬆️ Scroll to top functionality
- 🔎 Search with URL query parameters

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Zustand (State Management)
- Hero Icons
- JSONPlaceholder API

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/vova-dmitriev/blog
cd blog
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── blog/              # Blog post pages
│   ├── components/        # Reusable components
│   └── page.tsx           # Homepage
├── lib/                   # Utility functions and API
├── store/                 # Zustand store
└── types/                 # TypeScript types
```

## API Integration

This project uses a mock API for blog data. The API endpoints are:

- `GET /api/posts` - Get all blog posts
- `GET /api/posts/[slug]` - Get a specific blog post
- `GET /api/posts/search?q=query` - Search blog posts

## Performance Optimizations

- Server-side rendering for initial page load
- Image optimization with Next.js Image component
- Code splitting and lazy loading
- Debounced search functionality
- Infinite scroll with pagination

## Accessibility

- ARIA roles and labels
- Keyboard navigation support
- Semantic HTML structure
- Color contrast compliance

## Testing

The project uses Jest and React Testing Library for unit testing. The test suite includes:

- Component tests for critical UI elements
- State management tests
- User interaction tests

Run tests with:
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

Test files are located in `src/app/components/__tests__/` directory.

## Deployment

The application is deployed on Vercel. Visit [deployment-url] to see it in action.

## Live Demo

Visit the live demo: [Blog Platform](https://blog-5mqfr6bxf-vadmitrievs-projects.vercel.app/)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License.
