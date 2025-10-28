# MovieSwiper

MovieSwiper is a modern web app for discovering, swiping, and managing your personal movie watchlist. It features an interactive swipe interface, AI-powered movie chat, and advanced filtering—all built with React, Vite, and TailwindCSS.

## Features

- **Swipe to Discover:** Browse movies and swipe right to add to your watchlist, left to reject.
- **User Authentication:** Secure login and registration system with session management.
- **Watchlist Management:** Filter, search, and paginate your saved movies.
- **AI Movie Chat:** Chat with Movio, an AI agent, for recommendations and trivia.
- **Responsive UI:** Optimized for desktop and mobile with custom components.
- **Advanced Filtering:** Filter by genre, release date, and rating with slider controls.
- **Modal System:** Interactive modals for movie details and user interactions.

## Technologies Used

- **React 19** (with React Router for navigation)
- **Vite** (for fast development and builds)
- **TailwindCSS v4** (custom theming and utility classes)
- **OpenAI API** (AI chat agent)
- **TMDB API** (movie data)
- **Custom Authentication** (login/registration system)
- **ESLint & Prettier** (code quality and formatting)

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

## Project Structure

```
src/
  components/      # UI components
    auth/          # Authentication forms (LoginForm, SignUpForm, UserMenu)
    common/        # Reusable components (Button, Modal, Slider, etc.)
    *.jsx          # Feature-specific components (DiscoverCard, WatchList, etc.)
  pages/           # Main pages (Discover, WatchList, NotFound)
  layouts/         # Layout components (MainLayout)
  hooks/           # Custom hooks (useModal, usePopover, useMobile, etc.)
  providers/       # Context providers (UserProvider)
  services/        # API services (AuthService, movieService, AiChatService)
  helpers/         # Data transformation utilities
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

## Key Features

### Authentication System
- User registration and login
- Session management with secure cookies
- Protected routes and user state management

### Interactive Movie Discovery
- Swipe-based interface for movie selection
- Real-time feedback with animations
- Touch and mouse support

### Advanced Filtering
- Multi-criteria filtering (genre, date, rating)
- Custom slider components for range selection
- Real-time search and pagination

### AI Integration
- Chat with Movio for movie recommendations
- Context-aware responses based on user preferences
- Trivia and movie information

## License

For demonstration purposes only. © MovieSwiper
