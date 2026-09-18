# Contributing to Sopplayer

Thank you for your interest in contributing to **Sopplayer**! We are committed to building an exceptional, open, accessible, and lightweight HTML5 video player for the web.

---

## Code of Conduct

All contributors and maintainers are expected to adhere to our [Code of Conduct](./CODE_OF_CONDUCT.md). Please report unacceptable behavior to `sh20raj@gmail.com`.

---

## Development Setup

### Prerequisites
- [Node.js](https://nodejs.org/) v18.0.0 or later (v20+ recommended)
- `npm` v9.0.0 or later

### Getting Started

1. **Fork and Clone the repository**:
   ```bash
   git clone https://github.com/SH20RAJ/Sopplayer.git
   cd Sopplayer
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) or [http://localhost:3000/demo/](http://localhost:3000/demo/) in your browser.

4. **Run the test suite**:
   ```bash
   npm test
   ```

5. **Lint the code**:
   ```bash
   npm run lint
   ```

6. **Build production bundles**:
   ```bash
   npm run build
   ```

---

## Branching & Commit Conventions

### Branch Naming
- Features: `feature/short-description` (e.g. `feature/audio-tracks`)
- Bug fixes: `fix/short-description` (e.g. `fix/scrubber-touch-ios`)
- Documentation: `docs/short-description` (e.g. `docs/api-guide`)
- Performance / Refactor: `refactor/short-description`

### Conventional Commits
We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:
- `feat:` A new user-facing feature
- `fix:` A bug fix
- `docs:` Documentation changes only
- `style:` Code style / formatting changes (no logic modification)
- `refactor:` Code refactoring without new features or bug fixes
- `test:` Adding or updating tests
- `chore:` Maintenance tasks, dependency bumps, build configurations

---

## Pull Request Guidelines

1. Ensure all tests pass (`npm test`) and code passes linting (`npm run lint`).
2. Run `npm run build` so generated distribution files in `dist/` remain in sync.
3. Keep pull requests focused on a single change or feature.
4. Update or add automated tests in `tests/` where applicable.
5. Update documentation in `docs/` or `README.md` if public APIs or options change.

---

## Core Engineering Principles

1. **Zero Runtime Dependencies**: The runtime player code must remain dependency-free.
2. **Backwards Compatibility**: Existing CDN URLs (`cdn.jsdelivr.net/gh/SH20RAJ/Sopplayer/...`) and legacy integrations must continue working without breaking existing users.
3. **Accessibility First (WCAG 2.1 AA)**: All new UI controls must include ARIA roles, labels, keyboard operability, and high contrast.
4. **Security by Default**: Never use unsafe `innerHTML` on user input; always validate external media URLs.
