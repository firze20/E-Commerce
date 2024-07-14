# E-Commerce Front End Project

## Configure your vite config

__Define your ports, here is 3001__:

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // for external access
    port: 3001, // for external access
  }
})
```

__To Open Cypress__

*Cypress has to be open locally, on Docker it will run headless browser for e2e (end-to-end) tests*

```bash
yarn cypress open
```

