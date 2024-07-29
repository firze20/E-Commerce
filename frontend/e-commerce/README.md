# E-Commerce Front End Project

## Configure your vite config

**Define your ports, here is 3001**:

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // for external access
    port: 3001, // for external access
  },
});
```

**To Open Cypress**

_Cypress has to be open locally, on Docker it will run headless browser for e2e (end-to-end) tests_

```bash
yarn cypress open
```

## Project Libraries

Below is a table of the main libraries used in this React e-commerce project:

| Library      | Purpose                                                  |
| ------------ | -------------------------------------------------------- |
| React-Query  | Good for caching responses and avoid refech              |
| React Router | Declarative routing for React.                           |
| Tailwind     | Simple way for styling                                   |
| Toastify     | Displays http request status in a friendly way           |
| daisyUi      | Style library that uses Tailwind.                        |
| Axios        | Promise based HTTP client for the browser and node.js.   |
| Cypress      | End-to-end testing framework.                            |
| react-forms  | Building forms in React, cool hooks for form validation. |

# Project Structure

```
├── index.html                  (The html file)
├── package.json                (The packages the project uses)
├── postcss.config.js           (For tailwind)
├── public                      (SVG folder)
│   └── vite.svg
├── src                         (src folder)
│   ├── App.css                 (Main App CSS)
│   ├── App.tsx                 (Main App Component)
│   ├── api                     (Api folder, contains all the endpoints seperated by files, axios logic, cancellers interceptors)
│   ├── assets                  (Assets folder)
│   ├── components              (Global Components folder)
│   ├── config                  (Configuration folder)
│   ├── constants               (If you need to store constants)
│   ├── context                 (For Context Provider, Global State Management)
│   ├── helpers                 (Reusable functions or modules that assist with specific tasks or operations)
│   ├── hooks                   (For Reusable Logic)
│   ├── index.css               
│   ├── intl                    (Internationalization, support multiple language)
│   ├── layout                  (Encapsulate folder for layout-related logic,)
│   ├── main.tsx  
│   ├── services                (For external API's)
│   ├── views                   (Folder for Different Pages, Like Shop, Authentication, Item [id])
│   └── vite-env.d.ts
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
```
