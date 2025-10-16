# Repository Guidelines

Use this guide to get productive quickly in the `npm-dist-compare` monorepo. Follow the conventions below to keep tooling, builds, and reviews predictable for everyone.

## Project Structure & Module Organization

Deployable apps live under `apps/` (e.g., `cli`, `client`, `server`, `website`), while reusable templates sit in `packages/` such as `monorepo` and `vue-lib-template`. Shared configuration is centralized in root files like `turbo.json`, `tsconfig.json`, and `eslint.config.js`. Tests colocate beside source in `test/*.test.ts`, and each app owns its own `public/` or `worker/` assets to keep releases self-contained.

## Build, Test, and Development Commands

Run `pnpm install` (Node 20+) once to hydrate the workspaces. Use `pnpm dev` to launch `turbo run dev --parallel` across all apps that expose a `dev` target. `pnpm build` triggers `turbo run build`, benefiting from the shared cache. Run fast feedback suites with `pnpm test` or watch mode via `pnpm test:dev`. Execute `pnpm lint` before commits, and reach for `pnpm script:sync` or `pnpm script:clean` to align dependency versions or purge generated artifacts.

## Coding Style & Naming Conventions

The repository follows the root `.editorconfig`: UTF-8, LF endings, and two-space indentation. Prefer TypeScript (`.ts`, `.tsx`) and Vue SFCs. Name files in kebab-case (`user-table.vue`), default to PascalCase for components, and camelCase for utilities. Husky with lint-staged enforces formatting through `eslint --fix` using `@icebreakers/eslint-config`, so keep imports ordered and unused code trimmed.

## Testing Guidelines

Vitest drives unit tests; add suites next to their targets in `test/*.test.ts`. Craft assertions that exercise behavior rather than snapshots. Run `pnpm test -- --coverage` to generate `coverage/` reports, and ensure new public APIs ship with integration-style tests in the owning app.

## Commit & Pull Request Guidelines

Write Conventional Commits mirroring existing history (e.g., `feat(server): add auth router`). Use `pnpm commit` for the guided prompt or ensure `pnpm commitlint --edit` passes. Before opening a PR, verify `pnpm lint` and `pnpm test` are green, link related issues, and include screenshots or logs for user-facing changes. Touching publishable packages requires a `pnpm changeset` entry so releases stay traceable.
