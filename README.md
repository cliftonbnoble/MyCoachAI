# MyCoach AI - Agent Chat Frontend

This project is the React frontend for the MyCoach AI agent chat interface, built with Vite. Styling is handled primarily with **Tailwind CSS** and component primitives from **shadcn/ui**.

_(Note: While a backend (FastAPI, Supabase, Chroma) is planned, this repository currently only contains the frontend code.)_

## Project Structure (Frontend)

```
/
├── dist/            # Build output directory (Generated, ignored by Git)
├── node_modules/    # Project dependencies (Ignored by Git)
├── public/          # Optional: Static assets served from root (e.g., favicon)
├── src/             # Source files
│   ├── assets/      # Images and other static assets processed by Vite
│   ├── components/  # Custom UI Components (ChatInterface, Sidebar, etc.)
│   │   └── ui/      # shadcn/ui components (e.g., button.jsx)
│   ├── context/     # React Context (e.g., ThemeContext)
│   ├── lib/         # Utility functions (e.g., utils.js for cn)
│   ├── App.jsx      # Main App component
│   ├── index.css    # Main CSS file (Tailwind imports, custom styles)
│   └── main.jsx     # React entry point
├── .eslintrc.cjs    # ESLint configuration
├── .gitignore       # Specifies intentionally untracked files
├── components.json  # shadcn/ui configuration
├── index.html       # HTML entry point
├── jsconfig.json    # JS path alias configuration
├── package.json     # Project metadata and dependencies
├── postcss.config.js# PostCSS config for Tailwind
├── README.md        # This file
└── tailwind.config.js # Tailwind CSS config
└── vite.config.js   # Vite configuration (including path alias)
```

## Prerequisites

- Node.js (v18 or later recommended)
- npm or yarn

## Getting Started (Frontend)

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/cliftonbnoble/MyCoachAI.git
    cd MyCoachAI # Corrected directory name
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Run the development server:**

    ```bash
    npm run dev
    ```

    The application will usually be available at `http://localhost:5173`.

4.  **Build for Production:**
    ```bash
    npm run build
    ```
    This generates the static files in the `dist` directory, ready for deployment.

## Adding shadcn/ui Components

Once the project is set up, you can add more components from [shadcn/ui](https://ui.shadcn.com/docs/components) using the CLI:

```bash
npx shadcn@latest add <component-name>
# Example: npx shadcn@latest add dialog
```

This will add the component's source code to `src/components/ui`.

## Deployment (Cloudflare Pages)

This project is configured for deployment via Cloudflare Pages using Git integration:

1.  Connect your Git repository (GitHub/GitLab) to Cloudflare Pages.
2.  Configure the build settings:
    - **Framework preset:** Vite
    - **Build command:** `npm run build`
    - **Build output directory:** `dist`
    - **Root directory:** `/` (or leave blank)
    - Ensure the **Production branch** is set correctly (e.g., `main`).
3.  Pushing changes to the configured production branch will automatically trigger a new build and deployment on Cloudflare.

## Key Features

- **React + Vite:** Fast development and build process.
- **Tailwind CSS + shadcn/ui:** Utility-first styling combined with accessible, unstyled component primitives.
- **Dark/Light Mode:** Theme toggling powered by CSS variables and React Context.
- **Component-Based Structure:** Organized into reusable custom and shadcn/ui components.
- **Dynamic Image Handling:** Images imported within `src` for correct path handling.
- **Custom Scrollbars:** Consistent scrollbar styling.
- **Path Aliases:** Uses `@/` for cleaner import paths.

## Tech Stack (Frontend)

- **Framework/Library:** React
- **Build Tool:** Vite
- **Styling:** Tailwind CSS, shadcn/ui
- **UI Primitives:** Radix UI (via shadcn/ui)
- **Class Name Utilities:** `clsx`, `tailwind-merge`
- **Icons:** React Icons, Heroicons
- **State Management:** React Context (for Theme)
- **Deployment:** Cloudflare Pages

## Further Development (Potential)

- Implement actual chat logic (connecting to a backend API).
- Utilize more `shadcn/ui` components for UI elements (Dialogs, Forms, etc.).
- Add state management for messages, agent selection, and chat history.
- Integrate with backend services (FastAPI, Supabase, Chroma as previously planned).
- Implement user authentication.
- Add routing if multiple pages/views are needed.
- Add comprehensive tests.
