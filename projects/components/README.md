# Components

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.0.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the library, run:

```bash
ng build components
```

This command will compile your project, and the build artifacts will be placed in the `dist/` directory.

### Publishing the Library

Once the project is built, you can publish your library by following these steps:

1. Navigate to the `dist` directory:
   ```bash
   cd dist/components
   ```

2. Run the `npm publish` command to publish your library to the npm registry:
   ```bash
   npm publish
   ```
### Publishing the Library to npmjs

This library is configured to be published as `@quinntyne/components`.

1. Build the library from the workspace root:

   ```bash
   ng build components
   ```

   This command places the build output in `dist/components`.

2. Change into the built package directory:

   ```bash
   cd dist/components
   ```

3. Make sure you are logged in to npm and your `@quinntyne` scope is public:

   ```bash
   npm login
   npm config set @quinntyne:registry=https://registry.npmjs.org/
   ```

4. Publish the package to npm:

   ```bash
   npm publish --access public
   ```

After publishing, the library is available from npm as `@quinntyne/components`.

### Consuming `@quinntyne/components`

In another Angular application, install the package:

```bash
npm install @quinntyne/components
```

Then import and use the reusable `Header` component (selector `q-header`) in a standalone component:

```ts
import { Component } from '@angular/core';
import { Header } from '@quinntyne/components';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Header],
  template: `<q-header [title]="'My App'"></q-header>`,
})
export class AppComponent {}
```

## Automated Versioning and Changelog

This library uses [standard-version](https://github.com/conventional-changelog/standard-version) to automate semantic versioning and changelog generation based on Conventional Commits.

### Commit message format

Use the Conventional Commits format for changes, for example:

- `fix: correct sticky header behavior`
- `feat: add dark mode toggle to header`
- `chore: update dependencies`

### Cutting a new release

From the workspace root, run:

```bash
npm run release:components
```

This will:

- Analyze commits and determine the next semantic version.
- Bump the version in `projects/components/package.json`.
- Update `projects/components/CHANGELOG.md` with the new release notes.
- Create a corresponding git tag.

After that, you can rebuild and publish the updated version to npm as usual:

```bash
ng build components
cd dist/components
npm publish --access public
```

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
