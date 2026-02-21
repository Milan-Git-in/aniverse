<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Aniverse Backend API

A comprehensive backend API for the Aniverse platform, built with NestJS. Aniverse is an anime-centric application that provides personalized YouTube video recommendations, user management, news, leaderboards, and reading materials (manhwas and light novels).

## 🚀 Features

### Core Functionality

- **Personalized YouTube Recommendations**: AI-powered video suggestions based on user search history
- **User Management**: Complete user lifecycle with profile customization
- **Email Verification**: OTP-based authentication with JWT tokens
- **Anime News**: Real-time anime news and airing schedules from AniList
- **Leaderboards**: Trending anime rankings
- **Reading Materials**: Access to manhwas and light novels

### Technical Features

- **Scalable Architecture**: Modular NestJS structure with dependency injection
- **Data Persistence**: Supabase for user data and file storage
- **Caching**: Redis (Upstash) for performance optimization
- **Email Services**: Nodemailer for OTP delivery
- **Validation**: Class-validator for input validation
- **Bloom Filters**: Efficient email uniqueness checking
- **Scheduled Tasks**: Automatic data refresh intervals

## 🛠 Tech Stack

- **Framework**: NestJS (Node.js)
- **Database**: Supabase (PostgreSQL)
- **Cache**: Upstash Redis
- **Authentication**: JWT
- **Email**: Nodemailer (Gmail SMTP)
- **APIs**:
  - YouTube Data API v3
  - AniList GraphQL API
- **Deployment**: Vercel (Serverless)
- **Validation**: class-validator, class-transformer
- **Testing**: Jest
- **Linting**: ESLint
- **Formatting**: Prettier

## 📁 Project Structure

```
src/
├── app.controller.ts          # Root endpoint
├── app.module.ts              # Main application module
├── app.service.ts             # Root service
├── controllers/               # API endpoints
│   ├── app.controller.ts
│   ├── youtube/
│   │   ├── youtube.controller.ts
│   │   └── youtube.service.ts
│   ├── nodemailer/
│   ├── readings/
│   ├── news/
│   └── leaderboards/
├── services/                  # Business logic
│   ├── youtube/
│   ├── nodemailer/
│   ├── readings/
│   ├── news/
│   ├── leaderboards/
│   ├── redis/
│   └── filter/
├── supabase/                  # Database layer
│   ├── supabase.module.ts
│   ├── user.module.ts
│   ├── controller/
│   └── service/
├── DTOs/                      # Data Transfer Objects
│   ├── create-user.dto.ts
│   └── email.dto.ts
├── utils/
│   └── types.ts               # TypeScript type definitions
└── test/                      # End-to-end tests
```

## 🔧 Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account
- Upstash Redis account
- YouTube Data API key
- Gmail account for SMTP

### Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd aniverse/backend/aniverse
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Configuration**

   Create a `.env` file in the root directory with the following variables:

   ```env
   # Server
   PORT=3000

   # Supabase
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_anon_key
   SUPABASE_BUCKET_NAME=your_bucket_name

   # Redis (Upstash)
   UPSTASH_REDIS_REST_URL=your_upstash_redis_url
   UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token

   # YouTube API
   YOUTUBE_API_KEY=your_youtube_api_key

   # Email (Gmail SMTP)
   APP_PASSWORD=your_gmail_app_password

   # JWT
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Database Setup**

   Ensure your Supabase database has the following tables:

   - `user` (username, email, profile_picture, search_tokens)
   - `manhwas` (reading materials)
   - `LN` (light novels)

## 🚀 Running the Application

### Development

```bash
npm run start:dev
```

### Production

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

### E2E Tests

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

### Root

- `GET /` - Welcome message

### YouTube API

- `POST /youtube/v1/search/:Search_Query` - Search YouTube videos
- `POST /youtube/v1/home` - Get personalized home feed

### User Management

- `POST /supabase/user` - Fetch User details
- `POST /supabase/user/create` - Create new user
- `POST /supabase/user/customize/profile/image` - Upload profile picture
- `POST /supabase/user/customize/email` - Update email
- `POST /supabase/user/customize/username` - Update username

### Authentication

- `POST /nodemailer/sendMail` - Send OTP
- `POST /nodemailer/verifyMail` - Verify OTP
- `POST /nodemailer/verifyJwt` - Verify JWT token

### Content

- `GET /readings/manhwas` - Get manhwas
- `GET /readings/light-novels` - Get light novels
- `GET /news` - Get anime news
- `GET /leaderboards` - Get trending anime

## 🔐 Authentication Flow

1. **Registration**:

   - User provides username and email
   - System sends OTP to email
   - User verifies OTP
   - JWT token issued for 7 days

2. **Login**:

   - User requests OTP
   - Verifies OTP
   - Receives JWT token

3. **Profile Customization**:
   - Update username/email
   - Upload profile picture (stored in Supabase Storage)

## 🎯 Key Services

### YouTube Service

- Searches YouTube for anime AMVs/edits
- Maintains user search history for personalization
- Provides paginated results

### User Service

- Handles user CRUD operations
- Manages profile picture uploads with signed URLs
- Uses Bloom filter for email uniqueness

### Bloom Filter Service

- Prevents duplicate email registrations
- Stored in Redis for persistence
- Auto-refreshes every hour

### News & Leaderboards Services

- Fetch data from AniList GraphQL API
- Cached in Redis for 24 hours
- Auto-refresh scheduled tasks

### Nodemailer Service

- Sends styled OTP emails
- JWT token generation and verification
- OTP stored in Redis with 20-minute expiry

## 🚀 Deployment

### Vercel (Recommended)

The application is configured for Vercel serverless deployment:

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

### Manual Deployment

```bash
npm run build
npm run start:prod
```

## 🔧 Development Scripts

- `npm run build` - Build the application
- `npm run format` - Format code with Prettier
- `npm run lint` - Lint code with ESLint
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run e2e tests

## 📊 Performance Optimizations

- **Redis Caching**: News and leaderboards cached for 24 hours
- **Bloom Filters**: Efficient duplicate checking
- **Supabase Storage**: Optimized file uploads with signed URLs
- **Scheduled Tasks**: Automatic data refresh
- **Pagination**: YouTube API results paginated

## 🔒 Security

- JWT authentication with 7-day expiry
- OTP verification for email validation
- Input validation with class-validator
- Environment variable configuration
- CORS enabled for cross-origin requests

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📝 License

This project is licensed under the UNLICENSED License.

## 📞 Support

For support or questions, please contact the development team.

---

**Built with ❤️ for the anime community**
