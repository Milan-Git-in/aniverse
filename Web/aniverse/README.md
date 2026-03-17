# Aniverse Web Application

A modern, responsive web application built with Next.js that serves as the primary interface for the Aniverse platform. This web client provides a comprehensive user experience for discovering, tracking, and consuming anime, manga, manhwa, and light novel content across desktop and mobile browsers.

## Overview

The Aniverse Web Application is a Progressive Web App (PWA) that delivers a native-like experience in the browser. It connects to the Aniverse Backend API to provide seamless content discovery, personalized recommendations, and cross-device synchronization.

## 🚀 Features

### Core Functionality

- **Content Discovery**: Advanced search and filtering across anime, manga, manhwa, and light novels
- **Personalized Dashboard**: User-specific recommendations based on viewing/reading history
- **Real-time Updates**: Live notifications for new releases and content updates
- **Social Features**: Community interactions, reviews, ratings, and discussion forums
- **Cross-Device Sync**: Seamless experience across multiple devices with account synchronization
- **Offline Capabilities**: Download content for offline viewing and reading
- **Progressive Web App**: Installable on desktop and mobile devices

### User Experience

- **Responsive Design**: Optimized layouts for desktop, tablet, and mobile screens
- **Intuitive Navigation**: Clean, modern interface with intuitive user flows
- **Fast Performance**: Optimized loading times with Next.js App Router and caching
- **Accessibility**: WCAG-compliant design with keyboard navigation and screen reader support
- **Dark/Light Themes**: User preference-based theming system

### Content Consumption

- **Integrated Video Player**: High-quality anime streaming with custom controls
- **Advanced Reader**: Optimized manga/manhwa reader with zoom, fit-to-screen, and navigation
- **Reading Progress Tracking**: Automatic bookmarking and progress synchronization
- **Reading Lists**: Custom collections and favorites management
- **Content Recommendations**: AI-powered suggestions based on user preferences

## 🛠 Technology Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand/Redux Toolkit
- **UI Components**: Custom component library with Radix UI primitives
- **Forms**: React Hook Form with Zod validation
- **API Integration**: SWR for data fetching and caching
- **Authentication**: JWT-based with secure token management
- **PWA Features**: Service Workers, Web App Manifest
- **Deployment**: Vercel
- **Testing**: Jest, React Testing Library
- **Linting**: ESLint, Prettier

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Main application pages
│   ├── api/               # API routes (if needed)
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   ├── forms/            # Form components
│   ├── layout/           # Layout components
│   └── content/          # Content-specific components
├── hooks/                # Custom React hooks
│   ├── useAuth.ts        # Authentication hook
│   ├── useContent.ts     # Content management hook
│   └── usePreferences.ts # User preferences hook
├── lib/                  # Utility libraries
│   ├── api.ts           # API client configuration
│   ├── config.ts        # Application configuration
│   ├── constants.ts     # Application constants
│   └── utils.ts         # Utility functions
├── store/               # State management
│   ├── auth.ts          # Authentication store
│   ├── content.ts       # Content store
│   └── ui.ts            # UI state store
├── types/               # TypeScript type definitions
└── middleware.ts        # Next.js middleware
```

## 🔧 Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Access to Aniverse Backend API

### Environment Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd aniverse/Web/aniverse
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Configuration**

   Create a `.env.local` file in the root directory:

   ```env
   # API Configuration
   NEXT_PUBLIC_API_URL=https://your-backend-api-url
   NEXT_PUBLIC_API_KEY=your_api_key

   # Authentication
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000

   # External Services
   YOUTUBE_API_KEY=your_youtube_api_key
   ANILIST_CLIENT_ID=your_anilist_client_id

   # Feature Flags
   NEXT_PUBLIC_ENABLE_PWA=true
   NEXT_PUBLIC_ENABLE_ANALYTICS=false
   ```

4. **Development Setup**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🚀 Running the Application

### Development Mode

```bash
npm run dev
```

Starts the development server with hot-reload on `http://localhost:3000`

### Production Build

```bash
npm run build
npm start
```

### Static Export (Optional)

```bash
npm run export
```

## 🧪 Testing

### Unit Tests

```bash
npm run test
```

### End-to-End Tests

```bash
npm run test:e2e
```

### Test Coverage

```bash
npm run test:coverage
```

## 📱 Progressive Web App (PWA)

### Installation

- **Desktop**: Click "Install" in the browser address bar or use the install prompt
- **Mobile**: Add to home screen from browser menu

### Features

- Offline content access
- Push notifications for updates
- Native-like performance
- Automatic updates

## 🎨 UI/UX Design

### Design System

- Consistent color palette and typography
- Modular component architecture
- Responsive grid system
- Accessible design patterns

### Key Components

- **Navigation**: Responsive sidebar and mobile drawer
- **Content Cards**: Optimized for different content types
- **Player/Reader**: Custom-built for optimal UX
- **Forms**: Validated input components
- **Modals/Dialogs**: Accessible overlay components

## 🔐 Authentication & Security

### User Authentication

- JWT-based authentication with refresh tokens
- Secure token storage in httpOnly cookies
- Automatic token refresh
- Logout on token expiration

### Security Features

- CSRF protection
- XSS prevention
- Content Security Policy (CSP)
- Secure headers configuration

## 📊 Performance Optimization

### Core Web Vitals

- Optimized for Lighthouse scores
- Fast First Contentful Paint (FCP)
- Improved Largest Contentful Paint (LCP)
- Reduced Cumulative Layout Shift (CLS)

### Optimization Techniques

- Image optimization with Next.js Image component
- Code splitting and lazy loading
- Service worker caching
- CDN integration for static assets

## 🚀 Deployment

### Vercel (Recommended)

1. Connect GitHub repository to Vercel
2. Configure environment variables
3. Enable automatic deployments
4. Configure custom domain (optional)

### Manual Deployment

```bash
npm run build
npm run start
```

### Docker Deployment

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .

RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

## 🔧 Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run e2e tests

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript and React best practices
- Write comprehensive tests for new features
- Ensure responsive design across all screen sizes
- Maintain accessibility standards
- Update documentation for new components

## 📱 Mobile Responsiveness

### Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Mobile Optimizations

- Touch-friendly interface elements
- Optimized typography for small screens
- Efficient scrolling and navigation
- Reduced motion for performance

## 🔄 API Integration

### Backend Communication

- RESTful API calls to Aniverse Backend
- GraphQL queries for complex data fetching
- Real-time subscriptions for live updates
- Error handling and retry logic

### External APIs

- YouTube Data API for video content
- AniList API for anime/manga data
- Social media APIs for sharing

## 📈 Analytics & Monitoring

### Performance Monitoring

- Core Web Vitals tracking
- Error boundary implementation
- User interaction analytics
- Performance profiling

### User Analytics (Optional)

- Page view tracking
- User journey analysis
- Content engagement metrics
- Conversion funnel analysis

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support & Contact

For technical support, bug reports, or feature requests:

- Create an issue in the GitHub repository
- Contact the development team
- Check the documentation for common solutions

---

**Built with ❤️ for the anime community - the web face of Aniverse**
