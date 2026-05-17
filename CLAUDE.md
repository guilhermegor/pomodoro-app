# pomodoro-app

React 19 SPA — rebuilt from the Otávio Miranda `chronos-pomodoro-aula` course project,
organized using the **blueprintx FSD+DDD** architecture.

## Architecture

**Macro (FSD):** `shared/` → `capabilities/` → `routes/` → `App`
**Micro (DDD):** `domain/` → `application/` → `infrastructure/` → `ui/`

### Layer rules (enforced by ESLint `eslint-plugin-boundaries`)

- `domain` — no imports from other layers (pure types only)
- `application` — imports from `domain` only
- `infrastructure` — imports from `domain` only
- `ui` — imports from `application`, `domain`, and the capability composition root
- `shared` — imports from `shared` only
- `routes` — imports from `barrel` and `shared`

### Capability composition root

Each capability has a single composition-root file at the capability
root (e.g. `TaskContextProvider.tsx`). This file imports from all four
layers — that is its purpose. It is **not a layer**; it is a kind of
file. The ESLint boundary rule still treats its directory location
(capability root) as a category, so layer files cannot import their
sibling capability's wiring directly — they go through the barrel.

- composition root — imports from `domain`, `application`, `infrastructure`
- `barrel` (index.ts) — imports from `domain`, `application`, `ui`, composition root

### Chronos → blueprintx mapping

| Chronos                  | Blueprintx                              |
| ------------------------ | --------------------------------------- |
| `models/`                | `capabilities/pomodoro/domain/`         |
| `contexts/`              | `capabilities/pomodoro/context.tsx`     |
| `utils/`                 | `capabilities/pomodoro/application/`    |
| `workers/` + `adapters/` | `capabilities/pomodoro/infrastructure/` |
| `components/` (feature)  | `capabilities/pomodoro/ui/components/`  |
| `components/` (generic)  | `shared/components/`                    |
| `templates/`             | `shared/templates/`                     |
| `pages/`                 | `capabilities/pomodoro/ui/pages/`       |
| `routers/`               | `routes/`                               |

## Capability: pomodoro

Single capability implementing the full Pomodoro timer with history,
settings, and cycle tracking.

## Tooling

- Bundler: Webpack 5 + Babel (blueprintx default)
- Language: TypeScript strict
- Styling: CSS Modules + CSS Variables (design tokens in `shared/styles/foundations/`)
- State: React Context + useReducer (no external state library)
- Routing: react-router v7
- Notifications: react-toastify v11 (wrapped in `show-message.ts` adapter)
- Icons: lucide-react
- Dates: date-fns v4

## Commands

- `npm start` — dev server at localhost:3000
- `npm run build` — production build
- `npm run type-check` — TypeScript check
- `npm run lint` — ESLint check
