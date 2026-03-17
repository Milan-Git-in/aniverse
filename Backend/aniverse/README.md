# Aniverse Backend API

A comprehensive backend API for the Aniverse platform, built with NestJS. This is the core server-side component that powers the entire Aniverse ecosystem, providing RESTful APIs for user management, content aggregation, recommendations, and real-time data services.

## Overview

The Aniverse Backend is a scalable, microservices-oriented API server that serves as the central hub for all platform operations. It handles authentication, data persistence, content aggregation from external APIs, caching, and business logic processing.

## 🚀 Features

### Core Functionality

- **Personalized YouTube Recommendations**: AI-powered video suggestions based on user search history and preferences
- **User Management**: Complete user lifecycle with profile customization, authentication, and data management
- **Email Verification**: Secure OTP-based authentication system with JWT tokens
- **Anime News Aggregation**: Real-time anime news and airing schedules from AniList GraphQL API
- **Leaderboards**: Dynamic trending anime rankings and popularity metrics
- **Reading Materials**: Comprehensive access to manhwas and light novels with progress tracking
- **Content Filtering**: Advanced filtering and search capabilities across all content types

### Technical Features

- **Scalable Architecture**: Modular NestJS structure with dependency injection and clean architecture principles
- **Data Persistence**: Supabase integration for user data, file storage, and real-time features
- **High-Performance Caching**: Redis (Upstash) for session management, data caching, and performance optimization
- **Email Services**: Nodemailer with Gmail SMTP for secure OTP delivery and notifications
- **Input Validation**: Comprehensive validation using class-validator and class-transformer
- **Bloom Filters**: Memory-efficient duplicate prevention for email registrations
- **Scheduled Tasks**: Automated data refresh and maintenance operations
- **Rate Limiting**: Built-in protection against abuse and excessive API calls

## 🛠 Technology Stack

- **Framework**: NestJS (Node.js)
- **Language**: TypeScript
- **Database**: Supabase (PostgreSQL with real-time capabilities)
- **Cache**: Upstash Redis
- **Authentication**: JWT with OTP verification
- **Email**: Nodemailer (Gmail SMTP)
- **External APIs**:
  - YouTube Data API v3
  - AniList GraphQL API
- **Deployment**: Vercel (Serverless Functions)
- **Validation**: class-validator, class-transformer
- **Testing**: Jest with Supertest
- **Linting**: ESLint
- **Formatting**: Prettier

## 📁 Project Structure

```
src/
├── app.controller.ts          # Root endpoint and health checks
├── app.module.ts              # Main application module
├── app.service.ts             # Root service
├── main.ts                    # Application bootstrap
├── controllers/               # API route handlers
│   ├── app.controller.spec.ts
│   ├── app.controller.ts
│   ├── leaderboards/
│   ├── news/
│   ├── nodemailer/
│   ├── readings/
│   └── youtube/
├── DTOs/                      # Data Transfer Objects
│   ├── create-user.dto.ts
│   ├── email.dto.ts
│   └── user.ts
├── services/                  # Business logic layer
│   ├── app.service.ts
│   ├── filter/
│   ├── leaderboards/
│   ├── news/
│   ├── nodemailer/
│   ├── readings/
│   ├── redis/
│   └── youtube/
├── supabase/                  # Database layer
│   ├── supabase.module.ts
│   ├── user.module.ts
│   ├── controller/
│   └── service/
├── utils/
│   └── types.ts               # TypeScript type definitions
└── test/                      # End-to-end tests
    ├── app.e2e-spec.ts
    └── jest-e2e.json
```

## 🔧 Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager
- Supabase account and project
- Upstash Redis account
- YouTube Data API key
- Gmail account with app password

### Environment Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd aniverse/Backend/aniverse
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Configuration**

   Create a `.env` file in the root directory:

   ```env
   # Server Configuration
   PORT=3000
   NODE_ENV=development

   # Supabase Configuration
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_KEY=your_supabase_anon_key
   SUPABASE_BUCKET_NAME=your_storage_bucket_name

   # Redis Configuration (Upstash)
   UPSTASH_REDIS_REST_URL=your_upstash_redis_url
   UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token

   # YouTube API Configuration
   YOUTUBE_API_KEY=your_youtube_data_api_key

   # Email Configuration (Gmail SMTP)
   APP_PASSWORD=your_gmail_app_password

   # JWT Configuration
   JWT_SECRET=your_secure_jwt_secret_key
   ```

4. **Database Schema**

   Ensure your Supabase database has the required tables:

   - `user` (username, email, profile_picture, search_tokens, etc.)
   - `manhwas` (reading materials data)
   - `light_novels` (LN data)
   - Additional tables for caching and metadata

## 🚀 Running the Application

### Development Mode

```bash
npm run start:dev
```

Starts the server with hot-reload enabled on `http://localhost:3000`

### Production Mode

```bash
npm run build
npm run start:prod
```

### Debug Mode

```bash
npm run start:debug
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
npm run test:cov
```

### Watch Mode

```bash
npm run test:watch
```

## 📡 API Endpoints

### Root & Health

- `GET /` - API health check and welcome message

### YouTube Integration

- `POST /youtube/v1/search/:searchQuery` - Search YouTube videos with personalization
- `POST /youtube/v1/home` - Get personalized home feed based on user history

### User Management

- `POST /supabase/user` - Retrieve user profile details
- `POST /supabase/user/create` - Create new user account
- `POST /supabase/user/customize/profile/image` - Upload/update profile picture
- `POST /supabase/user/customize/email` - Update user email
- `POST /supabase/user/customize/username` - Update username

### Authentication

- `POST /nodemailer/sendMail` - Send OTP to email for verification
- `POST /nodemailer/verifyMail` - Verify OTP code
- `POST /nodemailer/verifyJwt` - Validate JWT token

### Content Services

- `GET /readings/manhwas` - Retrieve manhwa catalog
- `GET /readings/light-novels` - Retrieve light novels catalog
- `GET /news` - Fetch latest anime news from AniList
- `GET /leaderboards` - Get trending anime rankings

## 🔐 Authentication Flow

### User Registration

1. User submits username and email
2. System validates input and checks for duplicates using Bloom filter
3. OTP sent to provided email address
4. User verifies OTP within 20 minutes
5. JWT token issued with 7-day expiration
6. User profile created in database

### User Login

1. User requests OTP for existing account
2. OTP sent to registered email
3. User verifies OTP
4. JWT token issued for session

### Profile Management

- Username and email updates require re-verification
- Profile pictures stored securely in Supabase Storage
- All changes logged and cached appropriately

## 🎯 Key Services Explained

### YouTube Service

- Integrates with YouTube Data API v3
- Maintains user search history for personalized recommendations
- Implements pagination for large result sets
- Filters content based on anime-related keywords

### User Service

- Handles all CRUD operations for user data
- Manages profile picture uploads with signed URLs
- Implements Bloom filter for efficient email uniqueness checking
- Coordinates with authentication services

### Bloom Filter Service

- Prevents duplicate email registrations at scale
- Stored in Redis for persistence across deployments
- Auto-refreshes every hour to maintain accuracy
- Memory-efficient probabilistic data structure

### News & Leaderboards Services

- Fetch real-time data from AniList GraphQL API
- Implement Redis caching with 24-hour TTL
- Scheduled background tasks for data refresh
- Error handling for external API failures

### Nodemailer Service

- Sends styled HTML OTP emails via Gmail SMTP
- Generates and validates JWT tokens
- Manages OTP storage in Redis with expiration
- Implements rate limiting for security

### Redis Service

- Centralized caching layer for performance
- Session management and temporary data storage
- Bloom filter persistence
- Cache invalidation strategies

## 🚀 Deployment

### Vercel (Recommended)

1. Connect GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch
4. Serverless functions scale automatically

### Manual Deployment

```bash
npm run build
npm run start:prod
```

### Docker Deployment (Optional)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
```

## 📊 Performance & Scalability

### Caching Strategy

- Redis caching for external API responses (24-hour TTL)
- User session data with appropriate expiration
- Bloom filter persistence across restarts

### Optimization Features

- Pagination for large datasets
- Lazy loading for content
- Background job processing for heavy operations
- Database query optimization

### Monitoring

- Health check endpoints
- Error logging and tracking
- Performance metrics collection
- Rate limiting and abuse prevention

## 🔒 Security Measures

- JWT authentication with secure secrets
- OTP verification for sensitive operations
- Input sanitization and validation
- CORS configuration for cross-origin requests
- Environment variable protection
- Rate limiting on API endpoints
- Secure file upload handling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Write comprehensive tests for new features
- Update documentation for API changes
- Ensure all tests pass before submitting PR

## 📝 License

This project is licensed under the UNLICENSED License - see the LICENSE file for details.

## 📞 Support & Contact

For technical support, bug reports, or feature requests:

- Create an issue in the GitHub repository
- Contact the development team

---

**Built with ❤️ for the anime community - powering the Aniverse ecosystem**
