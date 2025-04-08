# MyCoach AI - Full Stack Agent Chat Application

This project combines a React frontend with a Python/FastAPI backend to create an AI agent chat interface. It utilizes Supabase for the primary database and Chroma for vector storage and retrieval.

## Project Structure

```
/
├── frontend/          # React frontend (Vite + Tailwind CSS)
│   ├── public/
│   ├── src/           # Source files (components, context, etc.)
│   ├── .eslintrc.cjs
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   └── tailwind.config.js
├── backend/           # FastAPI backend
│   ├── app/           # Core application logic
│   │   ├── api/         # API endpoints/routers (e.g., v1)
│   │   ├── core/        # Configuration, core settings
│   │   ├── crud/        # Database interaction (CRUD operations)
│   │   ├── db/          # Database clients (Supabase, Chroma)
│   │   ├── models/      # Pydantic models
│   │   ├── schemas/     # Database schemas (if distinct from models)
│   │   ├── services/    # Business logic
│   │   └── main.py      # FastAPI app entry point
│   ├── tests/         # Backend tests
│   ├── .env.example   # Example environment variables
│   ├── .gitignore
│   ├── requirements.txt # Python dependencies
│   └── README.md      # Optional backend-specific README
├── docker-compose.yml # Optional: For running services (e.g., Chroma)
└── README.md          # This file - Main project README
```

## Prerequisites

- Node.js (v18 or later recommended)
- npm or yarn
- Python (3.10 or later recommended)
- pip
- Docker (Optional, for running dependencies like Chroma locally)

## Getting Started

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd mycoach-ai
    ```

2.  **Setup Frontend:**

    ```bash
    cd frontend
    npm install # or yarn install
    # Create a .env file if needed based on frontend requirements
    cd ..
    ```

3.  **Setup Backend:**

    ```bash
    cd backend
    python -m venv venv
    source venv/bin/activate # On Windows use `venv\Scripts\activate`
    pip install -r requirements.txt
    cp .env.example .env
    # Update .env with your Supabase credentials, Chroma settings, etc.
    cd ..
    ```

4.  **(Optional) Start Services with Docker:**
    If using `docker-compose.yml` for Chroma or other services:

    ```bash
    docker-compose up -d
    ```

5.  **Run Development Servers:**
    - **Frontend:**
      ```bash
      cd frontend
      npm run dev
      ```
    - **Backend:**
      ```bash
      cd backend
      source venv/bin/activate # If needed
      uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
      ```

The frontend will typically be available at `http://localhost:5173` and the backend at `http://localhost:8000`.

## Key Features

### Frontend

- **React + Vite:** Fast development and build process.
- **Tailwind CSS:** Utility-first CSS framework.
- **Dark/Light Mode:** Theme toggling with local storage persistence.
- **Component-Based Structure:** Modular and reusable UI components.

### Backend

- **Python + FastAPI:** Modern, fast web framework for building APIs.
- **Supabase:** PostgreSQL database with auth and real-time capabilities.
- **Chroma:** Vector database for similarity search and RAG.
- **Pydantic:** Data validation and settings management.

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Python, FastAPI
- **Database:** Supabase (PostgreSQL)
- **Vector Store:** Chroma
- **Deployment:** AWS (e.g., ECS, Lambda, S3, CloudFront)

## Further Development

- Implement core chat logic connecting frontend and backend.
- Develop agent creation and management features.
- Integrate Chroma for retrieval-augmented generation (RAG).
- Implement user authentication (leveraging Supabase Auth).
- Define API routes and data models (Pydantic).
- Set up database migrations (if needed beyond Supabase Studio).
- Add comprehensive tests (frontend and backend).
- Establish CI/CD pipelines.
