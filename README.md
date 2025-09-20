# MovieSwiper

MovieSwiper is a modern web app for discovering, swiping, and managing your personal movie watchlist. It features an interactive swipe interface, AI-powered movie chat, and advanced filtering—all built with React, Vite, and TailwindCSS.

## Features

- **Swipe to Discover:** Browse movies and swipe right to add to your watchlist, left to reject.
- **Watchlist Management:** Filter, search, and paginate your saved movies.
- **AI Movie Chat:** Chat with Movio, an AI agent, for recommendations and trivia.
- **Responsive UI:** Optimized for desktop and mobile.
- **Genre, Date, and Rating Filters:** Easily find movies by your favorite criteria.

## Technologies Used

- **React** (with React Router)
- **Vite** (for fast development and builds)
- **TailwindCSS** (custom theming and utility classes)
- **OpenAI** (AI chat agent)
- **TMDB API** (movie data)
- **ESLint & Prettier** (code quality)

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
	components/      # UI components (DiscoverCard, WatchList, AiChat, etc.)
	pages/           # Main pages (Discover, WatchList, NotFound)
	providers/       # Context providers (UserProvider)
	services/        # API and AI chat services
	helpers/         # Data helpers
	styles/          # Tailwind, fonts, and theme CSS
	assets/          # Fonts, icons, images
```

## Environment Variables

Create a `.env` file with your backend API URL:

```
VITE_BACKEND_URL=<your_backend_url>
```

## License

For demonstration purposes only. © MovieSwiper
