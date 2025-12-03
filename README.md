# Xclues

A multi-domain connections game. Group 16 items into 4 categories of 4!

## Supported Domains

- **Filmclues** (filmclues.space) - Film connections
- **Musiclues** (musiclues.space) - Music connections
- **Sportsclues** (sportsclues.space) - Sports connections (future)
- **Litclues** (litclues.space) - Literature connections (future)

## Features

- 🎬 Dynamic puzzle generation
- 🎨 Clean UI with Mond Design System
- 🌐 Multi-domain support with build-time SEO
- 🧩 Multiple grouping strategies per genre
- ⚡ Fast, modern tech stack

## Tech Stack

- **React 19** with TypeScript
- **Vite** for build tooling
- **Bun** for package management
- **Zustand** for state management
- **TanStack Query** for API caching
- **Mond Design System** for UI components
- **Supabase** for backend

## Setup

1. **Install dependencies**:
   ```bash
   bun install
   ```

2. **Configure environment**:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Supabase keys
   ```

3. **Start development server**:
   ```bash
   bun run dev
   ```

4. **Test different genres locally**:
   ```bash
   # Add ?genre=music to URL
   http://localhost:5173?genre=music
   ```

## Building for Production

Each domain gets its own build with correct SEO:

```bash
# Build for Filmclues
VITE_GENRE=films bun run build

# Build for Musiclues
VITE_GENRE=music bun run build
```

The build script automatically generates:
- `index.html` with correct meta tags
- `sitemap.xml` with correct domain
- `robots.txt` with correct sitemap URL
- Copies the correct favicon

## Vercel Deployment

1. Create separate Vercel projects for each domain
2. Point all projects to the same GitHub repo
3. Set `VITE_GENRE` environment variable per project:
   - filmclues project: `VITE_GENRE=films`
   - musiclues project: `VITE_GENRE=music`
4. Push once → all projects deploy with correct branding

## How to Play

1. You'll see 16 items arranged in a 4×4 grid
2. Select 4 items you think belong to the same group
3. Click "Submit" to check your guess
4. You have 4 mistakes allowed
5. Find all 4 groups to win!

## Adding a New Genre

1. Add config to `src/config/seoConfig.ts`
2. Add domain mapping to `src/config/domainDetector.ts`
3. Add favicon to `src/assets/favicons/{genre}.ico`
4. Create new Vercel project with `VITE_GENRE={genre}`

## Project Structure

```
src/
├── config/
│   ├── seoConfig.ts      # Single source of truth for all genres
│   ├── siteConfig.ts     # Re-exports from seoConfig
│   └── domainDetector.ts # Domain → genre mapping
├── providers/
│   ├── SiteProvider.tsx  # Genre context provider
│   └── useSite.ts        # Hook to access site config
├── components/game/      # Game UI components
├── hooks/                # Custom React hooks
├── services/             # API services
├── store/                # Zustand store
└── types/                # TypeScript definitions
```

## Scripts

```bash
bun run dev          # Start development server
bun run build        # Build for production (uses VITE_GENRE)
bun run preview      # Preview production build
bun run test         # Run tests
bun run storybook    # Start Storybook
```

## License

MIT
