# UI Library

An Angular workspace that contains a reusable component library and a playground application for developing and testing UI components in isolation.

The workspace currently includes:

- **components** – an Angular library that exposes reusable UI pieces (for example, a configurable, sticky `q-header` component).
- **playground** – a standalone Angular application used to develop, preview, and manually test the components from the library.

---

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm (comes with Node.js)

Install dependencies from the workspace root:

```bash
npm install
```

### Run the Playground App

From the workspace root:

```bash
npm start
```

This runs `ng serve` for the `playground` project. Open your browser at http://localhost:4200/ to see the demo application with the shared UI components.

---

## Projects Overview

### Components Library (`projects/components`)

The **components** project is an Angular library that contains reusable UI building blocks. It is exported via the library public API in `projects/components/src/public-api.ts` and is intended to be consumed by Angular applications.

Key points:

- Built as an Angular library using `ng-packagr`.
- Uses the `q` selector prefix (for example, `q-header`).
- Designed to be tree-shakeable and side-effect free.

**Example: q-header**

The `Header` component provides a configurable, reusable application header that can be made sticky and given a title.

Usage inside an Angular template:

```html
<q-header [title]="'Playground'" [sticky]="true">
  <!-- optional projected actions (buttons, links, etc.) -->
</q-header>
```

### Playground App (`projects/playground`)

The **playground** project is a simple Angular application used to:

- Integrate and visually test components from the **components** library.
- Experiment with layouts, theming, and responsiveness.

It imports components from the library (for example `Header`) and renders them in a realistic page shell.

---

## Development Workflow

### Local Development

1. Install dependencies (once):
	```bash
	npm install
	```
2. Start the playground app:
	```bash
	npm start
	```
3. Make changes in the library (for example under `projects/components/src/lib/...`) and use the playground app to verify behavior.

### Building the Components Library

To produce a distributable build of the library:

```bash
ng build components
```

The build output is placed in `dist/components`. This output can be published to an internal registry or consumed by other Angular applications.

---

## Using the Library in Another Angular App

Once built and published (or linked locally), you can consume the library from another Angular application as follows:

1. Install the package (example, if published as `@your-scope/ui-library`):
	```bash
	npm install @your-scope/ui-library
	```
2. Import and use a component in a standalone component:
	```ts
	import { Component } from '@angular/core';
	import { Header } from '@your-scope/ui-library';

	@Component({
	  selector: 'app-root',
	  standalone: true,
	  imports: [Header],
	  template: `<q-header [title]="'My App'"></q-header>`,
	})
	export class AppComponent {}
	```

Update the actual package name once the library is published.

---

## Testing

Unit tests are executed via Angular’s `ng test` command, backed by Vitest in this workspace.

Run tests from the workspace root:

```bash
npm test
```

This runs the unit tests for all configured projects.

---

## Useful Scripts

Defined in `package.json` at the workspace root:

- `npm start` – serve the playground app in development mode.
- `npm run build` – build all configured Angular projects.
- `npm run watch` – build in watch mode (development configuration).
- `npm test` – run unit tests.

---

## Further Reading

- Angular documentation: https://angular.dev
- Angular CLI command reference: https://angular.dev/tools/cli
