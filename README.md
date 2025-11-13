# MovieSwiper

MovieSwiper is a modern web app for discovering and managing your personal movie watchlist. It features an interactive swipe interface, AI-powered movie chat, and advanced filtering. All built with React, Vite, and TailwindCSS.

## Features

- **Swipe to Discover:** Browse movies and swipe right to add to your watchlist, left to reject.
- **User Authentication:** Secure login and registration system with session management.
- **Watchlist Management:** Filter, search, and paginate your saved movies.
- **AI Movie Chat:** Chat with Movio, an AI agent, for recommendations and trivia.
- **Responsive UI:** Optimized for desktop and mobile with custom components.
- **Advanced Filtering:** Filter by genre, release date, and rating with slider controls.

## Technologies Used

- **React 19** (with React Router for navigation)
- **Vite** (for fast development and builds)
- **TailwindCSS v4** (custom theming and utility classes)
- **OpenAI API** (AI chat agent)
- **TMDB API** (movie data)
- **Custom Authentication** (login/registration system)
- **ESLint & Prettier** (code quality and formatting)
- **Vitest & Testing Library** (comprehensive test suite)

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

```sh
git clone https://github.com/DevonKalar/MoveSwiper.git
cd movieswiper
npm install
```

### Running Locally

```sh
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```sh
npm run build
```

### Running Tests

Run the full test suite:
```sh
npm run test
```

Run tests with coverage reporting:
```sh
npm run test:coverage
```

Run tests in watch mode during development:
```sh
npm run test:watch
```

## Project Structure

```
src/
  components/      # UI components
    */             # Domain specific components (Watchlist, Discover, Auth, etc.)
    common/        # Reusable components (Button, Modal, Slider, etc.)
  pages/           # Main pages (Discover, WatchList, NotFound)
  layouts/         # Layout components (MainLayout)
  hooks/           # Custom hooks (useModal, usePopover, useMobile, etc.)
  providers/       # Context providers (UserProvider)
  services/        # API services (AuthService, movieService, AiChatService)
  helpers/         # Data transformation utilities
  tests/           # Test files
    integrations/  # Integration tests for user workflows
  styles/          # Tailwind config, fonts, and theme CSS
  assets/          # Static assets (fonts, icons, images)
```

## Environment Variables

Create a `.env` file with the following variables:

```
VITE_BACKEND_URL=<your_backend_api_url>
```

**Required for full functionality:**
- `VITE_BACKEND_URL`: Your backend API URL for authentication and movie data

## API Overview

MovieSwiper was written as a React demo project and uses proxied APIs from TMDB for movie data. Future updates would have endpoints for fetching recommendations, persistant watchlists, and movie look ups.
This would simplify front-end logic such as removing data enrichment requirements, providing cached recommendations, and unique movie data values for filters provided with resource fetch, or a specific watchlist/filters endpoint.

### Backend Endpoints

**Base URL:** `VITE_BACKEND_URL`

#### Authentication
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - End session
- `GET /api/auth/me` - Get current user (coming soon)

#### Movies
- `GET /api/discover` - Get recommended movies (coming soon, to be implemented with a user-specific cache/popular queue for guests)
- `GET /api/watchlist` - Get user's watchlist (coming soon)
- `POST /api/watchlist/:id` - Add to watchlist (coming soon)
- `DELETE /api/watchlist/:id` - Remove from watchlist (coming soon)

### External APIs
- **TMDB API** - Movie data and images (proxied through backend, 1:1 with TMDB documentation)
- **OpenAI API** - AI chat agent (proxied through backend, implements with Responses API )

## Key Features

### Authentication System
- User registration and login
- Session management with secure JWT cookies
- Protected routes and user state management (coming soon)

### Interactive Movie Discovery
- Swipe-based interface for movie selection
- Real-time feedback with animations
- Touch and mouse support
- Accessible with keyboard navigation, event annoucements, and auto focus on new cards (tested with NVDA)

### Advanced Filtering
- Multi-criteria filtering (genre, date, rating)
- Custom slider components for range selection
- Real-time search and pagination
- Fully keyboard accessible

### AI Integration
- Chat with Movio for movie recommendations
- Context-aware responses based on user preferences
- Trivia and movie information

## Testing Strategy

MovieSwiper includes demonstrative testing following best practices with **unit tests**, **integration tests**, and **component tests**.

### Test Coverage

#### **Unit Tests**
- **AuthService** - API authentication methods (register, login, logout)
- **movieDataHelpers** - Data transformation and genre mapping logic

#### **Component Tests**  
- **SignUpForm** - Multi-step form validation and user interactions

#### **Integration Tests**
- **Authentication Flow** - Complete user journey (sign up → log out → log in)

### Testing Architecture

```
tests/
  AuthService.test.js              # Service layer unit tests
  movieDataHelpers.test.js         # Helper function unit tests
  components/auth/SignUpForm.test.jsx   # Component behavior tests
  integrations/auth-flow.integration.test.jsx  # End-to-end user flows
```

### Key Testing Features

- **Comprehensive Mocking**: Services mocked for component isolation
- **Error Scenario Testing**: Both success and failure paths covered
- **User-Centric Approach**: Tests focus on user interactions and business value  
- **Async Testing**: Proper handling of API calls and loading states
- **Real DOM Testing**: Using Testing Library for realistic user simulation

### Test Quality Standards

- ✅ **Happy path and error cases** covered
- ✅ **Service isolation** with proper mocking strategies  
- ✅ **User workflow testing** for critical business flows
- ✅ **Form validation** and interactive component testing
- ✅ **API integration** testing with fetch mocking

## License

For demonstration purposes only. © MovieSwiper
