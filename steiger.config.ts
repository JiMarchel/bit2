import { defineConfig } from 'steiger';
import fsd from '@feature-sliced/steiger-plugin';

export default defineConfig([
  ...fsd.configs.recommended,
  { ignores: ['**/routeTree.gen.ts'] },
  {
    // shadcn/ui = third-party UI kit, often imported per file (@/shared/ui/button)
    files: ['./src/shared/ui/**'],
    rules: { 'fsd/no-public-api-sidestep': 'off' },
  },
]);
