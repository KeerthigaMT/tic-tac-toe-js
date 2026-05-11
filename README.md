# Tic Tac Toe

A modern, accessible Tic Tac Toe game built with vanilla JavaScript, featuring comprehensive testing, automated CI/CD, and WCAG 2.1 AA accessibility compliance.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Development](#development)
- [Architecture](#architecture)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Overview

This is a two-player Tic Tac Toe game that runs entirely in the browser. Players take turns placing X's and O's on a 3x3 grid, with the goal of getting three in a row (horizontally, vertically, or diagonally). The game features:

- **Accessible gameplay**: Full keyboard navigation and screen reader support
- **Input validation**: Player name length limits and whitespace trimming
- **Visual feedback**: Winner cell highlighting and inline error messages
- **Modern build tooling**: Vite for fast development and optimized production builds
- **Quality assurance**: ESLint for code quality, Vitest for testing with 100% coverage
- **Automated CI/CD**: GitHub Actions pipeline with deployment to GitHub Pages

🎮 **[Play the game live](https://keerthigamt.github.io/tic-tac-toe-js/)**

## Features

### Core Gameplay
- Two-player mode with custom player names
- Win detection for all 8 possible winning combinations
- Tie detection with proper winner-first logic
- Visual highlighting of winning cells
- Board reset functionality

### Accessibility (WCAG 2.1 AA Compliant)
- **Keyboard navigation**: All cells focusable and activatable via Enter/Space
- **Screen reader support**: ARIA live regions for game state announcements
- **Semantic HTML**: Proper landmark elements and heading structure
- **Color contrast**: All text meets 4.5:1 minimum ratio
- **Focus indicators**: Visible keyboard focus with 3:1 contrast ratio

### Developer Experience
- **Modern tooling**: Vite for dev server and builds, Vitest for testing
- **Code quality**: ESLint with security rules (no-unsanitized plugin)
- **Type safety**: Pure game engine module with comprehensive unit tests
- **CI/CD pipeline**: Automated linting, testing, security audits, and deployment

## Prerequisites

- **Node.js**: LTS version (v20.x or higher recommended)
- **npm**: v10.x or higher (comes with Node.js)
- **Git**: For cloning the repository

Check your versions:
```bash
node --version
npm --version
git --version
```

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/KeerthigaMT/tic-tac-toe-js.git
   cd tic-tac-toe-js
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173/tic-tac-toe-js/`

You should now have the game running locally! ⚡

## Development

### Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| **dev** | `npm run dev` | Starts Vite dev server with hot module replacement (HMR) on port 5173 |
| **build** | `npm run build` | Creates optimized production build in `dist/` folder |
| **preview** | `npm run preview` | Previews production build locally |
| **test** | `npm test` | Runs all tests with Vitest (CI mode, single run) |
| **test:watch** | `npm run test:watch` | Runs tests in watch mode for development |
| **test:coverage** | `npm run test:coverage` | Runs tests and generates coverage report |
| **lint** | `npm run lint` | Lints all JavaScript files with ESLint |

### Quick Development Workflow

1. **Make changes**: Edit files in `js/`, `css/`, or `index.html`
2. **See changes instantly**: Vite HMR updates the browser automatically
3. **Run tests**: `npm test` to verify game logic
4. **Check code quality**: `npm run lint` before committing
5. **Build for production**: `npm run build` to test the final output

## Architecture

### Module Structure

```
tic-tac-toe-js/
├── index.html              # Main HTML file with semantic structure
├── css/
│   └── master.css          # All styles including accessibility focus states
├── js/
│   ├── main.js             # DOM manipulation and event handling
│   └── gameEngine.js       # Pure game logic (testable, no DOM dependencies)
├── tests/
│   └── gameEngine.test.js  # Comprehensive unit tests (61 tests, 100% coverage)
├── .github/
│   └── workflows/
│       └── ci.yml          # CI/CD pipeline configuration
├── vite.config.js          # Vite build configuration
├── eslint.config.js        # ESLint rules (flat config format)
└── package.json            # Dependencies and scripts
```

### Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                        User Input                            │
│              (Click cell or press Enter/Space)              │
└────────────────────────────┬────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                    Event Handler (main.js)                   │
│  - makeMove()                                                │
│  - Validates input (cell occupied check)                     │
│  - Updates aria-labels for accessibility                     │
└────────────────────────────┬────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────┐
│               Game Engine (gameEngine.js)                    │
│  - isWinner(): Check all 8 winning combinations              │
│  - isTie(): Check if board is full with no winner           │
│  - getGameState(): Determine current game status             │
└────────────────────────────┬────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                   DOM Update (main.js)                       │
│  - Update cell content (X or O)                              │
│  - Highlight winning cells                                   │
│  - Update player turn message                                │
│  - Announce to screen readers (ARIA live regions)            │
└─────────────────────────────────────────────────────────────┘
```

### Key Design Principles

1. **Separation of Concerns**
   - `gameEngine.js`: Pure functions for game logic (no DOM access)
   - `main.js`: DOM manipulation and event handling
   - CSS: All styling including accessibility features

2. **Testability**
   - Game engine is pure JavaScript with no external dependencies
   - 100% test coverage on all game logic
   - 61 comprehensive unit tests covering edge cases

3. **Accessibility First**
   - Keyboard navigation built-in from the start
   - ARIA live regions for dynamic content
   - Semantic HTML with proper landmarks

4. **Modern Build Process**
   - ES modules for better code organization
   - Vite for fast development and optimized builds
   - Tree-shaking for minimal bundle size

## Testing

### Unit Tests

The project uses Vitest for testing with comprehensive coverage:

```bash
# Run all tests
npm test

# Run tests in watch mode (development)
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Test Coverage

- **Statements**: 100% (24/24)
- **Branches**: 100% (17/17)
- **Functions**: 100% (8/8)
- **Lines**: 100% (23/23)

### Test Structure

All tests are in `tests/gameEngine.test.js` and cover:

- **Win detection**: All 8 winning combinations for both X and O
- **Tie detection**: Edge cases including win-on-9th-move scenarios
- **Turn alternation**: Even/odd turn validation
- **Move validation**: Invalid moves, occupied cells, out-of-bounds
- **Game state**: Playing, won, and tie states with proper prioritization

## Deployment

### Automated CI/CD Pipeline

The project uses GitHub Actions for continuous integration and deployment:

#### Quality Gates (Runs on all PRs and master pushes)
1. **Install**: `npm ci` for clean dependency installation
2. **Lint**: `npm run lint` for code quality checks
3. **Test**: `npm test -- --coverage` for test validation
4. **Security**: `npm audit --audit-level=moderate` for vulnerability scanning
5. **Build**: `npm run build` for production build verification

#### Deployment (Master branch only)
6. **Deploy**: Automatically deploys `dist/` folder to GitHub Pages

### Manual Deployment

To deploy manually (not recommended):

```bash
# Build for production
npm run build

# Preview the build locally
npm run preview

# The dist/ folder contains the production build
```

### Deployment URL

The game is automatically deployed to: **https://keerthigamt.github.io/tic-tac-toe-js/**

### Rollback Process

To rollback to a previous version:

```bash
# Identify the commit to rollback to
git log

# Revert to that commit
git revert <commit-hash>

# Push to master (triggers automatic redeployment)
git push origin master
```

## Contributing

We welcome contributions! Please follow these guidelines:

### Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally
3. **Create a feature branch** from master
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. **Make your changes** with clear, focused commits
5. **Test your changes**
   ```bash
   npm run lint    # Ensure code quality
   npm test        # All tests pass
   npm run build   # Build succeeds
   ```
6. **Push to your fork** and **submit a Pull Request**

### Code Quality Standards

- **ESLint**: All code must pass `npm run lint` with no errors
- **Tests**: Maintain 100% coverage on `gameEngine.js`
- **Accessibility**: Preserve WCAG 2.1 AA compliance
- **Commits**: Use descriptive commit messages

### PR Requirements

All pull requests must:
- Pass all CI quality gates (lint, test, audit, build)
- Include tests for new functionality
- Update documentation if behavior changes
- Have a clear description of what and why

### Areas for Contribution

- **Bug fixes**: Always welcome!
- **Accessibility improvements**: Enhance WCAG compliance
- **Test coverage**: Add edge case tests
- **Documentation**: Improve clarity and completeness
- **Performance**: Optimize rendering or bundle size

### Testing Your Contributions

Before submitting a PR, verify everything works:

```bash
# Full quality check (same as CI)
npm ci && npm run lint && npm test -- --coverage && npm audit --audit-level=moderate && npm run build
```

### Questions or Issues?

- Open an issue on GitHub for bugs or feature requests
- Check existing issues before creating new ones
- Provide clear reproduction steps for bug reports

## License

ISC

## Credits

**Original Author**: [Rob Hitt](https://github.com/robhitt)

**Current Maintainer**: [KeerthigaMT](https://github.com/KeerthigaMT)

### Contributors

- Rob Hitt - Original implementation
- Community contributors - See [GitHub contributors](https://github.com/KeerthigaMT/tic-tac-toe-js/graphs/contributors)

---

**Built with** ⚡ Vite | 🧪 Vitest | ♿ Accessibility | 🚀 GitHub Actions
