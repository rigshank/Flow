# Flow

Flow is an unfinished AI-assisted productivity app with a React frontend and a FastAPI backend. The current codebase exposes a small set of working screens and API endpoints for a task-oriented dashboard, but several navigation targets are still placeholders and most data is stored in memory rather than a persistent database.

## Project Overview

The application is organized as a two-part stack:

- `flow-frontend/` is a Create React App project that renders the main user interface.
- `flow-backend/` is a FastAPI service that exposes task, category, section, and AI overview endpoints.

Current architecture and tech stack:

- Frontend: React 19.2.x, React Router DOM 7.18.x, React Icons 5.7.x, Axios 1.18.x, Create React App, CSS files.
- Backend: FastAPI 0.139.x, Pydantic 2.13.x, Uvicorn 0.51.x, Hugging Face Transformers 5.13.x, CORS middleware.
- Data model: in-memory lists for categories, sections, and tasks. There is no database, authentication layer, or durable persistence yet.
- AI layer: the backend uses Hugging Face pipelines for summarization and sentiment analysis to generate an AI overview response.
- Shared dependency files:
	- `flow-frontend/package.json` for the React app.
	- `flow-backend/requirements.txt` for the Python service.

At a high level, the UI currently loads a summary dashboard from the backend and provides a basic to-do management screen. The sidebar advertises more sections than the app actually implements, so the project should be treated as partially built rather than feature complete.

## Feature Inventory

### Implemented

- A persistent sidebar navigation shell with links for Summary, To-Do List, Whiteboard, Calendar, Progress, Tools, and Settings.
- A Summary page at `/` that fetches `GET /ai-overview` from the backend and renders:
	- task summaries
	- deadlines
	- whiteboard image results
	- upcoming events
	- notifications
	- a personal message
	- a productivity score
- A To-Do List page at `/todo` with forms to add categories, sections, and tasks in the UI.
- Backend endpoints for categories, sections, tasks, and an AI overview response:
	- `GET /`
	- `GET /categories`
	- `POST /categories`
	- `GET /sections/{category_id}`
	- `POST /sections`
	- `GET /tasks`
	- `GET /tasks/section/{section_id}`
	- `POST /tasks`
	- `GET /ai-overview`
- Basic CORS configuration allowing the React frontend at `http://localhost:3000` to call the backend.
- Baseline styling for the app shell, content panels, forms, and loading state.

### Partially Built or Placeholder

- The To-Do List page is not connected to the FastAPI backend. It currently uses mock categories and logs additions to the console instead of saving data remotely.
- The Whiteboard component file exists, but it is empty.
- Sidebar links for Whiteboard, Calendar, Progress, Tools, and Settings do not have matching routes in `App.js`.
- The login/sign-up component is present only as a commented-out file and is not used anywhere in the app.
- The backend AI overview uses hardcoded mock calendar events and mock whiteboard image data.
- There is no persistent storage, no authentication, no user profiles, and no server-side task ownership model.
- There is no API client abstraction, so frontend calls are hardcoded directly into the view components.

## Setup & Execution

### Prerequisites

- Node.js 18 or newer
- Python 3.10 or newer
- `npm` and `pip` available in your shell

### 1) Install the frontend dependencies

From the repository root:

```powershell
cd flow-frontend
npm install
```

### 2) Install the backend dependencies

Install the backend packages from the pinned requirements file inside a virtual environment:

```powershell
cd ..\flow-backend
python -m venv venv
venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

Notes:

- The backend imports Hugging Face models at startup, so the first run may download model files and take a while.
- Python 3.10 to 3.12 is the safest choice for the current backend stack. The workspace environment is Python 3.14, but Torch wheels and model dependencies can be more brittle there.
- If `torch` installation fails on your machine, install the platform-specific build recommended by PyTorch for your Python version.

### 3) Environment variables

The current codebase does not require any environment variables to run locally.

- The frontend calls the backend at `http://127.0.0.1:8000` directly.
- The backend allows requests from `http://localhost:3000`.

If you later externalize these URLs, the project will need a frontend environment file such as `.env`, but none is used today.

### 4) Run the backend

From `flow-backend/` with the virtual environment activated:

```powershell
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

### 5) Run the frontend

In a second terminal:

```powershell
cd flow-frontend
npm start
```

### 6) Open the app

Visit:

- Frontend: `http://localhost:3000`
- Backend health/root response: `http://127.0.0.1:8000/`

## Dependency Updates

The repository now includes pinned dependency files instead of ad hoc install steps.

Frontend updates:

- `react` and `react-dom` are pinned to `19.2.7`.
- `react-router-dom` is pinned to `7.18.1`.
- `react-icons` is pinned to `5.7.0`.
- `@testing-library/jest-dom` is pinned to `6.9.1`.
- `@testing-library/react` is pinned to `16.3.2`.
- `@testing-library/user-event` is pinned to `14.6.1`.
- `axios` is pinned to `1.18.1`.
- `web-vitals` is pinned to `5.3.0`.
- `autoprefixer` is pinned to `10.5.2`.

Backend updates:

- `fastapi` is pinned to `0.139.0`.
- `pydantic` is pinned to `2.13.4`.
- `uvicorn` is pinned to `0.51.0`.
- `transformers` is pinned to `5.13.0`.
- `sentencepiece` is pinned to `0.2.1`.
- `torch` is pinned to `2.13.0`.

Compatibility note:

- `web-vitals` 5 uses the newer `onCLS`, `onFCP`, `onINP`, `onLCP`, and `onTTFB` helpers. The CRA `reportWebVitals.js` file has already been updated for this API.
- `@testing-library/user-event` 14 is a newer major release, so any future tests should follow the v14 API rather than older v13 examples.
- The backend `torch` pin may still require a platform-specific wheel on Windows or a different Python version if pip cannot resolve the default build.

## Technical Debt & TODOs

The codebase has several known gaps that should be addressed before calling the project complete:

- Add the missing frontend routes for Whiteboard, Calendar, Progress, Tools, and Settings.
- Connect the To-Do List page to the backend instead of using mock categories and console logging.
- Implement the Whiteboard feature or remove the sidebar link until it is ready.
- Restore or replace the commented-out login/sign-up flow and decide how authentication should work.
- Add durable storage for categories, sections, tasks, and user data. The current in-memory lists are lost on restart.
- Replace the mock event and image data in `/ai-overview` with real data sources or an explicit integration layer.
- Move backend model loading out of import time if startup latency becomes an issue.
- Replace mutable default list values in the Pydantic models with safer defaults.
- Harden date parsing and AI response generation so malformed input cannot crash the overview endpoint.
- Replace broad `except:` handling in the backend with targeted exceptions and logging.
- Remove duplicated navigation rendering patterns in the frontend and define a single layout shell.
- Add a shared configuration layer for API URLs instead of hardcoding `127.0.0.1:8000` in components.
- Add tests for the FastAPI endpoints and React screens once the basic flows are wired together.
- Review or remove the root-level scratch scripts `test.py` and `test1.js` if they are no longer needed; they are not part of the app runtime.
- Consider replacing the Create React App toolchain if you want a more modern dependency management and build story; CRA is stable but effectively in maintenance mode.

## Current Status Summary

This repository is best described as a prototype: the dashboard shell and some backend endpoints exist, but the app still needs routing, persistence, backend integration, and feature completion before it behaves like a finished productivity platform.
